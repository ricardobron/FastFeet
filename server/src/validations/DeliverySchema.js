import * as Yup from 'yup';

class RecipientSchema {
  async createValidation(bodyRequest) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number()
        .integer()
        .positive()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .positive()
        .required(),
      signature_id: Yup.number()
        .integer()
        .positive(),
    });

    const SchemaValidation = await schema.isValid(bodyRequest);

    return SchemaValidation;
  }

  async updateValidation(bodyRequest) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .integer()
        .positive(),
      deliveryman_id: Yup.number()
        .integer()
        .positive(),
      signature_id: Yup.number()
        .integer()
        .positive(),
    });

    const SchemaValidation = await schema.isValid(bodyRequest);

    return SchemaValidation;
  }
}

export default new RecipientSchema();
