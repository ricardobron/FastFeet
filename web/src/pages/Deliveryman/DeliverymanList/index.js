import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { HeaderList } from '~/components/HeaderActions';
import { TableContainer, TableLoading } from '~/components/Table';
import Paginates from '~/components/Paginates';

import Action from './DeliverymanAction';

export default function DeliverymanList() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);

  const [deliverymans, setDeliverymans] = useState([]);
  const [totalDeliverymans, setTotalDeliverymans] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDeliverymans() {
      try {
        setLoading(true);

        const response = await api.get('deliveryman', {
          params: {
            page: currentPage,
            name: search,
          },
        });

        if (!response.data) {
          toast.warn('Nenhum entregador cadastrado');
        }

        setPages(response.data.pages);
        setTotalDeliverymans(response.data.total);
        setDeliverymans(response.data.docs);
        setLoading(false);
      } catch (err) {
        toast.error('Não possivel carregar as informações dos entregadores');
      }
    }

    loadDeliverymans();
  }, [currentPage, search]);

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
        headerName="entregadores"
        page="deliveryman/new"
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
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymans.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>#{deliveryman.id}</td>
                  <td>
                    <div>
                      <img
                        src={
                          deliveryman.avatar
                            ? deliveryman.avatar.url
                            : 'https://api.adorable.io/avatars/40/abott@adorable.pngC'
                        }
                        alt="Avatar"
                      />
                    </div>
                  </td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <Action
                    id={deliveryman.id}
                    page={`deliveryman/edit/${deliveryman.id}`}
                    deliverymans={deliverymans}
                    setDeliverymans={setDeliverymans}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <Paginates
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalDeliverymans}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
