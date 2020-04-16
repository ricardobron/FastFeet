import { Op } from 'sequelize';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class ProblemAdminController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const problems = await DeliveryProblem.findAll({
      attributes: ['delivery_id'],
    });

    const idsWithProblem = problems.map(r => r.delivery_id);

    const deliveriesWithProblem = await Delivery.paginate({
      pages: 10,
      page,
      where: {
        id: {
          [Op.in]: idsWithProblem,
        },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
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
            'city',
            'zip',
          ],
        },
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
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveriesWithProblem);
  }

  async update(req, res) {
    const { id } = req.params;

    /**
     * Check if problem exists
     */

    const problem = await DeliveryProblem.findByPk(id);
    if (!problem) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    const { delivery_id } = problem;

    /**
     * check exists delivery
     */

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery already canceled' });
    }

    await delivery.update({ canceled_at: new Date() });
    await delivery.reload({
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
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
            'city',
            'zip',
          ],
        },
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
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    await Queue.add(CancellationMail.key, { delivery });

    return res.json(delivery);
  }
}

export default new ProblemAdminController();
