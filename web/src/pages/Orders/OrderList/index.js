import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import OrderDetail from './OrderDetail';
import OrderAction from './OrderAction';

import { HeaderList } from '~/components/HeaderActions';

import { TableContainer, TableLoading } from '~/components/Table';
import Paginate from '~/components/Paginates';

import { OrderStatus } from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetail, setOrderDetail] = useState({});
  const [pages, setPages] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const FormattedStatus = order => {
    let status = {};

    if (order.canceled_at) {
      status = { text: 'CANCELADA', background: '#FAB0B0', color: '#DE3B3B' };
      return status;
    }

    if (order.end_date) {
      status = { text: 'ENTREGUE', background: '#DFF0DF', color: '#2CA42B' };
      return status;
    }

    if (order.start_date) {
      status = { text: 'RETIRADA', background: '#BAD2FF', color: '#4D85EE' };
      return status;
    }

    status = { text: 'PENDENTE', background: '#F0F0DF', color: '#C1BC35' };

    return status;
  };

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get('delivery', {
          params: {
            page: currentPage,
            name: search,
          },
        });

        const data = response.data.docs.map(order => {
          return {
            ...order,
            formattedStatus: FormattedStatus(order),
            numberOfStreet: `${order.recipient.street}, ${order.recipient.number}`,
            cityOfState: `${order.recipient.city} - ${order.recipient.state}`,
            startDateFormatted: order.start_date
              ? format(parseISO(order.start_date), 'dd/MM/yyyy')
              : null,
            endDateFormatted: order.end_date
              ? format(parseISO(order.end_date), 'dd/MM/yyyy')
              : null,
          };
        });

        if (!response.data) {
          toast.warn('Nenhuma encomenda cadastrada');
        }

        setOrders(data);
        setPages(response.data.pages);
        setTotalOrders(response.data.total);
        setLoading(false);
      } catch (err) {
        toast.error('Não foi possível carregar as informações das encomendas');
        console.tron.log(err);
      }
    }
    loadOrders();
  }, [currentPage, search]);

  function handleVisible() {
    setVisible(!visible);
  }

  function handleDetails(order) {
    setOrderDetail(order);
    handleVisible();
  }

  function handlePage(page) {
    if (page === 0) {
      setCurrentPage(1);
    } else if (page > pages) {
      setCurrentPage(pages);
    } else {
      setCurrentPage(page);
    }
  }

  return (
    <>
      <HeaderList
        headerName="encomendas"
        page="order/new"
        search={search}
        setSearch={setSearch}
        visible
      />

      {loading ? (
        <TableLoading />
      ) : (
        <>
          <TableContainer>
            <thead>
              <tr>
                <th>ID</th>
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Acões</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.recipient.name}</td>
                  <td>
                    <div>
                      <img
                        src={
                          order.deliveryman.avatar
                            ? order.deliveryman.avatar.url
                            : 'https://api.adorable.io/avatars/40/abott@adorable.pngC'
                        }
                        alt="Avatar"
                      />
                      {order.deliveryman ? order.deliveryman.name : 'null'}
                    </div>
                  </td>
                  <td>{order.recipient.city}</td>
                  <td>{order.recipient.state}</td>
                  <OrderStatus info={order.formattedStatus}>
                    <span>{order.formattedStatus.text}</span>
                  </OrderStatus>
                  <OrderAction
                    visible={visible}
                    page={`order/edit/${order.id}`}
                    setOrders={setOrders}
                    orders={orders}
                    id={order.id}
                    handleDetails={() => handleDetails(order)}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <OrderDetail
            visible={visible}
            handleVisible={handleVisible}
            order={orderDetail}
          />

          <Paginate
            currentPage={currentPage}
            pages={pages}
            handlePage={handlePage}
            totalDocs={totalOrders}
          />
        </>
      )}
    </>
  );
}
