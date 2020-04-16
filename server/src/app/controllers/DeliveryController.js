import { Op } from 'sequelize';

import { parseISO, getHours, isBefore } from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import DeliverySchema from '../../validations/DeliverySchema';

import RegistraionMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { name = '', page = 1 } = req.query;

    const { docs, pages, total } = await Delivery.paginate({
      paginate: 10,
      page,
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      where: {
        product: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'state',
            'city',
            'zip',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    return res.json({
      docs,
      page,
      pages,
      total,
    });
  }

  async show(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'state',
            'city',
            'zip',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schemaIsValid = await DeliverySchema.createValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    /**
     * Check deliveryman exists
     */

    const checkDeliverynameExists = await Deliveryman.findByPk(deliveryman_id);

    if (!checkDeliverynameExists) {
      return res.status(400).json({ error: 'Deliverynman not found' });
    }

    /**
     * Check recipient exists
     */
    const checkRecipientExists = await Recipient.findByPk(recipient_id);

    if (!checkRecipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const delivery = await Delivery.create(req.body);

    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'state',
            'city',
            'zip',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });

    await Queue.add(RegistraionMail.key, {
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schemaIsValid = await DeliverySchema.updateValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id } = req.params;

    /**
     * Check delivery exists
     */

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const {
      recipient_id,
      deliveryman_id,
      signature_id,
      start_date,
      end_date,
    } = req.body;

    /**
     * Check recipient exists
     */

    if (recipient_id) {
      const recipient = await Recipient.findByPk(recipient_id);

      if (!recipient) {
        return res.status(400).json({ error: 'Recipient not found' });
      }
    }

    /**
     * Check exist deliveryman
     */

    if (deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);

      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman not found' });
      }
    }

    /**
     * check is signature exists
     */

    if (signature_id) {
      const signature = await File.findByPk(signature_id);

      if (!signature) {
        return res.status(400).json({ error: 'Signature not found' });
      }
    }

    const parsedStart = parseISO(start_date);
    const parsedEnd = parseISO(end_date);

    if (start_date) {
      const hour = getHours(parsedStart);

      if (hour <= 8 || hour >= 18) {
        return res
          .status(400)
          .json({ error: 'The start data must be between 08:00 and 18:00' });
      }
    }

    if (end_date && !start_date) {
      if (!delivery.start_date) {
        return res.status(400).json({
          error:
            'The delivery must have a pick-up time to be marked as delivered',
        });
      }
    }

    if (start_date && end_date) {
      if (isBefore(parsedEnd, parsedStart)) {
        return res
          .status(400)
          .json({ error: 'The end date must be after the start date' });
      }
    }

    const updatedDelivery = await delivery.update(req.body);

    return res.json(updatedDelivery);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json({ deleted: true });
  }
}

export default new DeliveryController();
