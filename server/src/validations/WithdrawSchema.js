import * as Yup from 'yup';

class DeliveredSchema {
  async updateValidation(bodyRequest) {
    const schema = Yup.object().shape({
      start_date: Yup.string().required(),
    });

    const SchemaValidation = await schema.isValid(bodyRequest);

    return SchemaValidation;
  }
}

export default new DeliveredSchema();
