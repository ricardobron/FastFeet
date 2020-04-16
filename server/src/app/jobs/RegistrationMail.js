import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Registrada nova entrega',
      template: 'registrationDelivery',
      context: {
        provider: delivery.deliveryman.name,
        recipient: delivery.recipient.name,
        product: delivery.product,
      },
    });
  }
}

export default new CancellationMail();
