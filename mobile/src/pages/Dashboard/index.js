/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { parseISO, format } from 'date-fns';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

import Delivery from '~/components/Delivery';

import {
  Container,
  Profile,
  Avatar,
  TitleContainer,
  Welcome,
  Name,
  Menu,
  MenuTitle,
  Options,
  Option,
  List,
} from './styles';

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();

  const [deliveries, setDeliveries] = useState([]);
  const [typeDeliveries, setTypeDeliveries] = useState('PENDING');

  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.user.profile);

  const image_url_formatted = profile.avatar.url.replace(
    'localhost',
    '192.168.1.6'
  );

  function handleTypePending() {
    setTypeDeliveries('PENDING');
  }

  function handleTypeDelivered() {
    setTypeDeliveries('DELIVERED');
  }

  function handleLogout() {
    dispatch(signOut());
  }

  function formattedStatus(delivery) {
    let status = {};

    if (delivery.end_date) {
      status = { eng: 'DELIVERED', pt: 'ENTREGUE' };
      return status;
    }

    if (delivery.start_date) {
      status = { eng: 'WITHDRAW', pt: 'RETIRADA' };
      return status;
    }

    status = { eng: 'PENDING', pt: 'PENDENTE' };

    return status;
  }

  useEffect(() => {
    async function loadDeliveries() {
      if (!auth.id) return;

      const response =
        typeDeliveries === 'PENDING'
          ? await api.get(`deliverymen/${auth.id}`)
          : await api.get(`deliveryman/${auth.id}/deliveries`);

      const data = response.data.map((delivery) => ({
        ...delivery,
        start_date_formated: delivery.start_date
          ? format(parseISO(delivery ? delivery.start_date : ''), 'dd/MM/yyyy')
          : '- - / - - / - -',
        end_date_formated: delivery.end_date
          ? format(parseISO(delivery ? delivery.end_date : ''), 'dd/MM/yyyy')
          : '- - / - - / - -',
        status: formattedStatus(delivery),
      }));

      setDeliveries(data);
    }
    loadDeliveries();
  }, [auth.id, typeDeliveries]);

  return (
    <Container>
      <Profile>
        <Avatar
          source={{
            uri: profile.avatar
              ? image_url_formatted
              : `https://api.adorable.io/avatar/50/fastfeet.png`,
          }}
        />

        <TitleContainer>
          <Welcome>Bem vindo de volta,</Welcome>
          <Name>{profile.name}</Name>
        </TitleContainer>

        <Icon
          name="exit-to-app"
          color="#e74040"
          size={25}
          onPress={handleLogout}
        />
      </Profile>

      <Menu>
        <MenuTitle>Entregas</MenuTitle>
        <Options>
          <Option
            style={{ marginRight: 5 }}
            onPress={handleTypePending}
            selected={typeDeliveries === 'PENDING'}
          >
            PENDENTES
          </Option>
          <Option
            onPress={handleTypeDelivered}
            selected={typeDeliveries === 'DELIVERED'}
          >
            ENTREGUES
          </Option>
        </Options>
      </Menu>

      <List
        data={deliveries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Delivery data={item} navigation={navigation} />
        )}
      />
    </Container>
  );
}
