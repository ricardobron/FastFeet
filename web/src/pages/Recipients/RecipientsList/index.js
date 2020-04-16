import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import RecipientAction from './RecipientAction';
import { HeaderList } from '~/components/HeaderActions';
import { TableContainer, TableLoading } from '~/components/Table';
import Paginates from '~/components/Paginates';

export default function RecipientsList() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(null);

  const [recipients, setRecipients] = useState([]);
  const [totalRecipients, setTotalRecipients] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadingRecipients() {
      try {
        setLoading(true);

        const response = await api.get('recipient', {
          params: {
            page: currentPage,
            name: search,
          },
        });

        if (!response.data) {
          toast.warn('Nenhum destinatário cadastrado');
        }

        setRecipients(response.data.docs);
        setPages(response.data.pages);
        setTotalRecipients(response.data.total);
        setLoading(false);
      } catch (err) {
        toast.error(
          'Não foi possivel carregar as informações dos destinatários'
        );
      }
    }
    loadingRecipients();
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
        headerName="destinatários"
        page="recipient/new"
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
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map(recipient => (
                <tr>
                  <td>#{recipient.id}</td>
                  <td>{recipient.name}</td>
                  <td>
                    {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                    {recipient.state}
                  </td>
                  <RecipientAction
                    id={recipient.id}
                    page={`recipient/edit/${recipient.id}`}
                    recipients={recipients}
                    setRecipients={setRecipients}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <Paginates
            currentPage={currentPage}
            pages={pages}
            totalDocs={totalRecipients}
            handlePage={handlePage}
          />
        </>
      )}
    </>
  );
}
