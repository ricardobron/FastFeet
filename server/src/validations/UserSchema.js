import * as Yup from 'yup';

class UserSchema {
  async createValidation(bodyRequest) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    const SchemaValidation = await schema.isValid(bodyRequest);

    return SchemaValidation;
  }

  async updateValidation(bodyRequest) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    const SchemaValidation = await schema.isValid(bodyRequest);

    return SchemaValidation;
  }
}

export default new UserSchema();
