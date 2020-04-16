import * as Yup from 'yup';

async function SessionSchema(bodyRequest) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  const SchemaValidation = await schema.isValid(bodyRequest);

  return SchemaValidation;
}

export default SessionSchema;
