import React from 'react';
import { TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  Card,
  TitleContainer,
  Title,
  Label,
  LabelValue,
  DateContainer,
  Dates,
  Menu,
  ActionMenu,
  ActionTitle,
} from './styles';

export default function DeliveryDetails({ navigation }) {
  const auth = useSelector((state) => state.auth);

  const delivery = navigation.getParam('delivery');

  const deliveryAdress = `${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zip}`;

  async function handleDeliveryWithdraw() {
    async function deliveryWithdraw() {
      try {
        await api.patch(
          `/deliveryman/${auth.id}/deliveries/${delivery.id}/withdraw`,
          {
            start_date: new Date('2017-12-26T16:12:00'),
          }
        );

        navigation.navigate('Dashboard');
      } catch (err) {
        Alert.alert('Horário de retirada inválida.');
      }
    }

    Alert.alert(
      'Confirmação de retirada',
      'Confirma que deseja realizar a retirada desta encomenda?',
      [
        {
          text: 'Cancelar',
          style: 'destructive',
        },
        {
          text: 'Confirmar',
          onPress: deliveryWithdraw,
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  return (
    <Container>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Background />
      <Content>
        <Card>
          <TitleContainer>
            <Icon name="local-shipping" color="#7d40e7" size={20} />
            <Title>Informações da entrega</Title>
          </TitleContainer>
          <Label>DESTINATÁRIO</Label>
          <LabelValue>{delivery.recipient.name}</LabelValue>
          <Label>ENEDEREÇO DE ENTREGA</Label>
          <LabelValue>{deliveryAdress}</LabelValue>
          <Label>PRODUTO</Label>
          <LabelValue>{delivery.product}</LabelValue>
        </Card>
        <Card>
          <TitleContainer>
            <Icon name="event" color="#7d40e7" size={20} />
            <Title>Situação da entrega</Title>
          </TitleContainer>
          <Label>STATUS</Label>
          <LabelValue>{delivery.status.pt}</LabelValue>
          <DateContainer>
            <Dates>
              <Label>DATA DE RETIRADA</Label>
              <LabelValue>{delivery.start_date_formated}</LabelValue>
            </Dates>
            <Dates>
              <Label>DATA DE ENTREGA</Label>
              <LabelValue>{delivery.end_date_formated}</LabelValue>
            </Dates>
          </DateContainer>
        </Card>

        <Menu>
          <ActionMenu
            onPress={() =>
              navigation.navigate('CreateProblem', { delivery_id: delivery.id })
            }
          >
            <Icon name="highlight-off" size={20} color="#e74040" />
            <ActionTitle>Informar{'\n'} problemas</ActionTitle>
          </ActionMenu>
          <ActionMenu
            onPress={() =>
              navigation.navigate('VisualizeProblem', {
                delivery_id: delivery.id,
              })
            }
          >
            <Icon name="info-outline" size={20} color="#E7BA40" />
            <ActionTitle>Visualizar{'\n'} problemas</ActionTitle>
          </ActionMenu>
          {delivery.status.eng === 'PENDING' ? (
            <ActionMenu onPress={handleDeliveryWithdraw}>
              <Icon name="local-shipping" color="#7d40e7" size={20} />
              <ActionTitle>Realizar{`\n`}Retirada</ActionTitle>
            </ActionMenu>
          ) : (
            <ActionMenu
              onPress={() =>
                navigation.navigate('ConfirmPhoto', {
                  delivery_id: delivery.id,
                })
              }
            >
              <Icon name="check-circle" size={20} color="#7d40e7" />
              <ActionTitle>Confirmar{'\n'} entrega</ActionTitle>
            </ActionMenu>
          )}
        </Menu>
      </Content>
    </Container>
  );
}

DeliveryDetails.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

DeliveryDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
