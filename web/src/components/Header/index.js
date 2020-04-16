import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logoImg from '~/assets/fastfeet-logo.png';

import { Container, Content, Profile } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logoImg} alt="FastFeet" />
          <div>
            <NavLink to="/orders" activeClassName="selected">
              Encomendas
            </NavLink>
            <NavLink to="/deliverymans" activeClassName="selected">
              Entregadores
            </NavLink>
            <NavLink to="/recipients" activeClassName="selected">
              Destinatários
            </NavLink>
            <NavLink to="/problems" activeClassName="selected">
              Problemas
            </NavLink>
          </div>
        </nav>
        <Profile>
          <strong>{profile.name}</strong>
          <button type="button" onClick={handleSignOut}>
            Sair do Sistema
          </button>
        </Profile>
      </Content>
    </Container>
  );
}
