import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { FormContainer, FormLoading, Select, Input } from '~/components/Form';
import { HeaderForm } from '~/components/HeaderActions';

import { SelectContainer } from './styles';

export default function OrderForm({ match }) {
  const { id } = match.params;
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [order, setOrder] = useState({});

  const [selectedRecipient, setSelectedRecipient] = useState([]);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState([]);

  const [recipients, setRecipients] = useState([]);
  const [deliverymans, setDeliverymans] = useState([]);

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line no-inner-declarations
      async function loadOrder() {
        try {
          setLoading(true);

          const response = await api.get(`/delivery/${id}`);

          setOrder(response.data);

          setSelectedRecipient(response.data.recipient);
          setSelectedDeliveryman(response.data.deliveryman);

          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error('Falha ao carregar os dados ');
        }
      }
      loadOrder();
    }
  }, [id]);

  useEffect(() => {
    async function loadSelectOptions() {
      try {
        const [recipientPromise, deliverymanPromise] = await Promise.all([
          api.get('recipient'),
          api.get('deliveryman'),
        ]);

        setRecipients(recipientPromise.data.docs);
        setDeliverymans(deliverymanPromise.data.docs);
      } catch (err) {
        toast.error('Falha ao carregar dados');
      }
    }

    loadSelectOptions();
  }, []);

  const recipientsOptions = recipients.map(recipient => {
    const data = {
      value: recipient,
      label: recipient.name,
    };

    return data;
  });

  const handleChangeRecipient = selectedOption => {
    const { value } = selectedOption;

    setSelectedRecipient(value);
  };

  const deliverymansOptions = deliverymans.map(deliveryman => {
    const data = {
      value: deliveryman,
      label: deliveryman.name,
    };

    return data;
  });

  const handleChangeDeliveryman = selectedOption => {
    const { value } = selectedOption;

    setSelectedDeliveryman(value);
  };

  async function handleSubmit({ product, recipient_id, deliveryman_id }) {
    try {
      setButtonLoading(true);

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        product: Yup.string().required('O producto da entrega é obrigatório'),
      });

      const datas = {
        product,
        recipient_id,
        deliveryman_id,
      };

      await schema.validate(datas, {
        abortEarly: false,
      });

      if (id) {
        deliveryman_id = selectedDeliveryman.id;
        recipient_id = selectedRecipient.id;
        const data = { product, deliveryman_id, recipient_id };
        await api.put(`/delivery/${id}`, data);
      }

      if (!id) {
        deliveryman_id = selectedDeliveryman.id;
        recipient_id = selectedRecipient.id;

        const data = { product, deliveryman_id, recipient_id };
        await api.post('/delivery', data);
      }

      setButtonLoading(false);

      toast.success('Encomenda salva com sucesso');
      history.push('/orders');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });
        formRef.current.setErrors(errorMessages);
      } else {
        setButtonLoading(false);
        toast.error('Algo deu errado ao salvar a encomenda');
      }
    }
  }

  return (
    <>
      {loading ? (
        <FormLoading />
      ) : (
        <FormContainer
          ref={formRef}
          initialData={order}
          onSubmit={handleSubmit}
        >
          <HeaderForm
            id={id}
            prevPage="/orders"
            title="encomendas"
            loading={buttonLoading}
          />

          <section>
            <SelectContainer>
              <Select
                name="recipient.name"
                label="Destinatário"
                placeholder="Selecione um destinatário"
                options={recipientsOptions}
                defaultValue={{
                  value: selectedRecipient.id,
                  label: selectedRecipient.name,
                }}
                onChange={handleChangeRecipient}
              />
              <Select
                name="deliveryman.name"
                label="Entregador"
                placeholder="Selecione um entregador"
                options={deliverymansOptions}
                defaultValue={{
                  value: selectedDeliveryman.id,
                  label: selectedDeliveryman.name,
                }}
                onChange={handleChangeDeliveryman}
              />
            </SelectContainer>

            <Input
              name="product"
              label="Nome do produto"
              placeholder="Ex: iPhone"
            />
          </section>
        </FormContainer>
      )}
    </>
  );
}

OrderForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
