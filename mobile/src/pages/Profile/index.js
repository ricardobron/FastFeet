/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  ProfileContainer,
  Avatar,
  Label,
  InfoUser,
  LogoutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);

  const image_url_formatted = profile.avatar.url.replace(
    'localhost',
    '192.168.1.6'
  );

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Avatar
        source={{
          uri: profile.avatar
            ? image_url_formatted
            : `https://api.adorable.io/avatar/50/fastfeet.png`,
        }}
      />

      <ProfileContainer>
        <Label>Nome Completo</Label>
        <InfoUser>{profile.name}</InfoUser>
        <Label>Email</Label>
        <InfoUser>{profile.email}</InfoUser>
        <Label>Data de cadastro</Label>
        <InfoUser>{profile.created_at}</InfoUser>
      </ProfileContainer>

      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
