import React, { useState, useRef, useEffect } from 'react';

import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import {
  FormContainer,
  FormLoading,
  Input,
  InputMask,
} from '~/components/Form';
import { HeaderForm } from '~/components/HeaderActions';

import { InputGroup1, InputGroup2 } from './styles';

export default function RecipientsForm({ match }) {
  const { id } = match.params;

  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadRecipients() {
        try {
          setLoading(true);

          const response = await api.get(`recipient/${id}`);

          setRecipient(response.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error('Falha ao carregar dados');
        }
      }

      loadRecipients();
    }
  }, []);

  async function handleSubmit(data) {
    try {
      setButtonLoading(true);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do destinatário é obrigatório'),
        street: Yup.string().required('A rua do destinatário é obrigatório'),
        number: Yup.string().required('O número do destinatário é obrigatório'),
        complement: Yup.string(),
        city: Yup.string().required('A cidade do destinatário é obrigatório'),
        state: Yup.string().required('O estado do destinatário é obrigatório'),
        zip: Yup.string()
          .min(7, 'O código postal deve ter no mínimo 7 digitos')
          .required('O código postal do destinatário é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        console.tron.log(data);
        await api.put(`/recipient/${id}`, data);
      }

      if (!id) {
        await api.post('/recipient', data);
      }

      toast.success('Destinatário salvo com sucesso');
      history.push('/recipients');
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);

        setButtonLoading(false);
      } else {
        setButtonLoading(false);
        toast.error('Algo deu errado ao salvar o destinatário');
      }
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          initialData={recipient}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <HeaderForm
            id={id}
            prevPage="/recipients"
            title="destinatário"
            loading={buttonLoading}
          />

          <section>
            <Input name="name" label="Nome" placeholder="John Doe" />
            <InputGroup1>
              <Input name="street" label="Rua" placeholder="Rua Beethoven" />
              <Input name="number" label="Número" placeholder="1729" />
              <Input name="complement" label="Complemento" />
            </InputGroup1>
            <InputGroup2>
              <Input name="city" label="Cidade" placeholder="Diadema" />
              <Input name="state" label="Estado" placeholder="São Paulo" />
              <InputMask
                name="zip"
                label="ZIP"
                mask="9999-999"
                maskChar=""
                placeholder="0996-580"
              />
            </InputGroup2>
          </section>
        </FormContainer>
      )}
    </>
  );
}

RecipientsForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
