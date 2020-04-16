import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';

import { Container, SearchBar } from './styles';

export default function HeaderList({
  headerName,
  page,
  visible,
  search,
  setSearch,
}) {
  return (
    <Container visible={visible}>
      <h1>Gerenciando {headerName}</h1>
      <div>
        <SearchBar>
          <MdSearch size={22} color="#999" />
          <input
            type="text"
            placeholder={`Buscar por ${headerName}`}
            value={search}
            onChange={e => [setSearch(e.target.value)]}
          />
        </SearchBar>
        <Link to={`/${page}`}>
          <MdAdd size={22} color="#fff" />
          Cadastrar
        </Link>
      </div>
    </Container>
  );
}

HeaderList.defaultProps = {
  search: null,
  setSearch: null,
};

HeaderList.propTypes = {
  headerName: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
