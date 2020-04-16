import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import { useOnClickOutside } from '~/hooks';

import api from '~/services/api';

import { TableAction } from '~/components/Table';

import { Container } from './styles';

export default function OrderAction({
  page,
  handleDetails,
  id,
  setOrders,
  orders,
}) {
  const menuref = useRef();
  const [visible, setVisible] = useState(false);

  useOnClickOutside(menuref, () => {
    if (visible) {
      setVisible(false);
    }
  });

  function handleVisible() {
    setVisible(!visible);
  }

  async function handleDelete() {
    try {
      await api.delete(`/delivery/${id}`);

      const orderFilter = orders.filter(d => d.id !== id);

      setOrders(orderFilter);

      toast.success(`Item #${id} deletado com sucesso`);
    } catch (err) {
      console.tron.log(err);
      toast.error('Ocorreu um erro ao tentar excluir a item');
    }
  }

  function confirmDelete() {
    confirmAlert({
      title: 'Alerta',
      message: `Tem certeza que deseja deletar a encomenda ${id}?`,
      closeOnEscape: true,
      closeOnClickOutside: false,
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(),
        },
        {
          label: 'Não',
        },
      ],
    });
  }

  return (
    <Container>
      <button type="button" onClick={handleVisible}>
        <MdMoreHoriz size={22} color="#c6c6c6" />
      </button>

      <TableAction ref={menuref} visible={visible}>
        <div>
          <button type="button" onClick={() => handleDetails()}>
            <MdVisibility size={18} color="#4D85EE" />
            Visualizar
          </button>
        </div>
        <div>
          <Link to={page}>
            <MdCreate size={18} color="#DE3B3B" />
            Editar
          </Link>
        </div>
        <div>
          <button type="button" onClick={confirmDelete}>
            <MdDeleteForever size={18} color="#8e5be8" />
            Excluir
          </button>
        </div>
      </TableAction>
    </Container>
  );
}

OrderAction.defaultProps = {
  orders: [],
  setOrders: null,
};

OrderAction.propTypes = {
  page: PropTypes.string.isRequired,
  orders: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setOrders: PropTypes.func,
  id: PropTypes.number.isRequired,
  handleDetails: PropTypes.func.isRequired,
};
