import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import LoadingPages from '~/components/LoadingPages';

import { Container } from './styles';

export default function HeaderForm({ id, prevPage, title, loading }) {
  console.tron.log(id);
  return (
    <Container>
      <h1>{id ? `Edição de ${title}` : `Cadastro de ${title} `}</h1>

      <div>
        <Link to={`${prevPage}`}>
          <MdChevronLeft size={24} color="#fff" />
          VOLTAR
        </Link>

        <button type="submit">
          {loading ? (
            <LoadingPages />
          ) : (
            <>
              <MdCheck size={22} color="#fff" />
              SALVAR
            </>
          )}
        </button>
      </div>
    </Container>
  );
}

HeaderForm.defaultProps = {
  id: null,
};

HeaderForm.propTypes = {
  id: PropTypes.string,
  prevPage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};
