import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';

import File from '../models/File';

import DeliverymanSchema from '../../validations/DeliverymanSchema';

class DeliverymanController {
  async index(req, res) {
    const { name = '', page = 1 } = req.query;

    const deliverymans = await Deliveryman.paginate({
      paginate: 10,
      page,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymans);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schemaIsValid = await DeliverymanSchema.createValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email } = req.body;

    const checkDeliverymanExists = await Deliveryman.findOne({
      where: { email },
    });

    if (checkDeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { name } = Deliveryman.create(req.body);

    return res.json({ name, email });
  }

  async update(req, res) {
    const schemaIsValid = await DeliverymanSchema.updateValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email },
      });

      if (deliverymanExists) {
        return res.status(400).json({ error: 'Email already registered' });
      }
    }

    const { name, avatar_id } = deliveryman.update(req.body);

    return res.json({
      deliveryman: {
        id,
        name,
        email,
        avatar_id,
      },
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists' });
    }

    await deliveryman.destroy();

    return res.json({ deleted: true });
  }
}

export default new DeliverymanController();
