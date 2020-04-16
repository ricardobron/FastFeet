import * as Yup from 'yup';

class DeliveryProblemSchema {
  async createValidation(bodyRequest) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    const SchemaValidation = await schema.isValid(bodyRequest);

    return SchemaValidation;
  }
}

export default new DeliveryProblemSchema();
