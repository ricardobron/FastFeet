import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveredController {
  async update(req, res) {
    const { id, delivery_id } = req.params;

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

    if (!delivery.start_date) {
      return res.status(400).json({ error: 'Delivery has not been started' });
    }

    if (delivery.end_date || delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery closed' });
    }

    const { signature_id } = req.body;

    const signatureImage = await File.findByPk(signature_id);

    if (!signatureImage) {
      return res.status(400).json({ error: 'Signature image does not exists' });
    }

    const updated = await delivery.update({
      end_date: new Date(),
      signature_id,
    });

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

export default new DeliveredController();
