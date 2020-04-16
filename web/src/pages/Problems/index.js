import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import ProblemDetail from './ProblemDetail';
import ProblemAction from './ProblemAction';

import { HeaderList } from '~/components/HeaderActions';

import { TableContainer, TableLoading } from '~/components/Table';
import Paginate from '~/components/Paginates';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemDetail, setProblemDetail] = useState({});
  const [pages, setPages] = useState(null);
  const [totalProblems, setTotalProblems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get('delivery/problems', {
          params: {
            page: currentPage,
          },
        });

        if (!response.data) {
          toast.warn('Nenhum problema cadastrada');
        }

        setPages(response.data.pages);
        setTotalProblems(response.data.total);
        setProblems(response.data.docs);
        setLoading(false);
      } catch (err) {
        toast.error('Não foi possível carregar as informações dos problemas');
      }
    }
    loadProblems();
  }, [currentPage]);

  function handleVisible() {
    setVisible(!visible);
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

  function handleDetails(order) {
    setProblemDetail(order);
    handleVisible();
  }

  return (
    <>
      <HeaderList headerName="problemas" page="problem/new" visible={false} />

      {loading ? (
        <TableLoading />
      ) : (
        <>
          <TableContainer>
            <thead>
              <tr>
                <th>ID</th>
                <th>Encomenda</th>
                <th>Problema</th>
                <th>Acões</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.id}>
                  <td>#{problem.id}</td>
                  <td>#{problem.delivery.id}</td>
                  <td>{problem.description}</td>
                  <ProblemAction
                    handleDetails={() => handleDetails(problem)}
                    id={problem.id}
                    problem={problemDetail}
                  />
                </tr>
              ))}
            </tbody>
          </TableContainer>

          <ProblemDetail
            visible={visible}
            problem={problemDetail}
            handleVisible={handleVisible}
          />

          <Paginate
            currentPage={currentPage}
            pages={pages}
            handlePage={handlePage}
            totalDocs={totalProblems}
          />
        </>
      )}
    </>
  );
}
