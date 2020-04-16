import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { HeaderForm } from '~/components/HeaderActions';
import { FormContainer, FormLoading, Input } from '~/components/Form';

import AvatarUpload from './AvatarUpload';

export default function DeliverymanForm({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [deliveryman, setDeliveryman] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadingDeliveryman() {
        try {
          setLoading(true);

          const response = await api.get(`deliveryman/${id}`);

          setDeliveryman(response.data);

          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error('Falha ao carregar dados');
        }
      }
      loadingDeliveryman();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      setButtonLoading(true);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do entregador é obrigatório'),
        email: Yup.string()
          .email()
          .required('O e-mail do entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/deliveryman/${id}`, data);
      }

      if (!id) {
        await api.post('/deliveryman', data);
      }

      setButtonLoading(false);

      toast.success('Entregador salvo com sucesso');
      history.push('/deliverymans');
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

        toast.error('Algo deu errado ao salvar o entregador');
      }
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          initialData={deliveryman}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <HeaderForm
            id={id}
            prevPage="/deliverymans"
            title="entregadores"
            loading={buttonLoading}
          />

          <section>
            <AvatarUpload name="avatar_id" />

            <Input name="name" label="Nome" placeholder="John Perry" />
            <br />
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="example@rocketseat.com"
            />
          </section>
        </FormContainer>
      )}
    </>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
