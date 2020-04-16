import * as Yup from 'yup';

class DeliverymanSchema {
  async createValidation(bodyRequest) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    const SchemaValidation = await schema.isValid(bodyRequest);

    return SchemaValidation;
  }

  async updateValidation(bodyRequest) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    const SchemaValidation = await schema.isValid(bodyRequest);

    return SchemaValidation;
  }
}

export default new DeliverymanSchema();
