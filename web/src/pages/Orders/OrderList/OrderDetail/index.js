import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';

import { Container, ListDate } from './styles';

export default function OrderDetail({ visible, handleVisible, order }) {
  return (
    <Container visible={visible}>
      <MdClose size={18} color="#DE3B3B" onClick={() => handleVisible()} />

      <Form initialData={order}>
        <div>
          <strong>Informações da encomenda</strong>
          <Input name="numberOfStreet" readOnly />
          <Input name="cityOfState" readOnly />
          <Input name="recipient.zip" readOnly />
        </div>
        <div>
          <strong>DATAS</strong>
          <ListDate>
            <strong>Retirada:</strong>
            <Input name="startDateFormatted" readOnly />
          </ListDate>
          <ListDate>
            <strong>Entrega:</strong>
            <Input name="endDateFormatted" readOnly />
          </ListDate>
        </div>
        <div>
          <strong>Assinatura do destinatário</strong>
          {order.signature && <img src={order.signature.url} alt="signature" />}
        </div>
      </Form>
    </Container>
  );
}

OrderDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  order: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleVisible: PropTypes.func.isRequired,
};
