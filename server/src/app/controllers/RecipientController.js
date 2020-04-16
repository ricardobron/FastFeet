import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

import RecipientSchema from '../../validations/RecipientSchema';

class RecipientController {
  async index(req, res) {
    const { name = '', page = 1 } = req.query;

    const recipient = await Recipient.paginate({
      paginate: 10,
      page,
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      order: [['id', 'ASC']],
    });

    return res.json(recipient);
  }

  async show(req, res) {
    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    } = await Recipient.findByPk(req.params.id);

    return res.json({ id, name, street, number, complement, state, city, zip });
  }

  async store(req, res) {
    const schemaIsValid = await RecipientSchema.createValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { number: req.body.number, name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    } = await Recipient.create(req.body);

    return res.json({ id, name, street, number, complement, state, city, zip });
  }

  async update(req, res) {
    const schemaIsValid = await RecipientSchema.updateValidation(req.body);

    if (!schemaIsValid) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip,
    } = await recipient.update(req.body);

    return res.json({ id, name, street, number, complement, state, city, zip });
  }

  async destroy(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exists' });
    }

    await recipient.destroy();

    return res.json({ deleted: true });
  }
}

export default new RecipientController();
