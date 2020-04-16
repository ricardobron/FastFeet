import { parseISO, getHours, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import WithdrawSchema from '../../validations/WithdrawSchema';

class WithdrawController {
  async update(req, res) {
    const schemaIsValid = await WithdrawSchema.updateValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id, delivery_id } = req.params;

    const { start_date } = req.body;

    /**
     * check deliveryman exists
     */

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    /**
     * check delivery exists
     */

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    /**
     * check delivery belongs deliveryman
     */

    if (delivery.deliveryman_id !== Number(id)) {
      return res
        .status(400)
        .json({ error: 'Delivery does not belongs to the deliveryman' });
    }

    if (delivery.start_date || delivery.end_date || delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery closed' });
    }

    const parsedStart = parseISO(start_date);
    const hour = getHours(parsedStart);

    if (hour <= 8 || hour >= 18) {
      return res.status(400).json({
        error:
          'The delivery must have a pick-up time to be marked as delivered',
      });
    }

    const deliveriesAll = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        start_date: {
          [Op.between]: [startOfDay(parsedStart), endOfDay(parsedStart)],
        },
        end_date: null,
      },
    });

    if (deliveriesAll.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Deliveryman already has 5 deliveries on the day' });
    }

    const updated = await delivery.update(req.body);

    await updated.reload({
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

    return res.json(updated);
  }
}

export default new WithdrawController();
