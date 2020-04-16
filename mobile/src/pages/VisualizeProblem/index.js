import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, Alert } from 'react-native';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Problem from '~/components/Problem';

import { Container, Background, Content, TitleDelivery, List } from './styles';

export default function VisualizeProblem({ navigation }) {
  const delivery_id = navigation.getParam('delivery_id');

  const [deliveryProblem, setDeliveryProblem] = useState([]);

  useEffect(() => {
    async function loadProblemsDelivery() {
      try {
        const response = await api.get(`delivery/${delivery_id}/problems`);

        console.tron.log(response.data);

        setDeliveryProblem(response.data);
      } catch (err) {
        Alert.alert('Erro ao buscar informações do problema da encomenda');
      }
    }
    loadProblemsDelivery();
  }, [delivery_id]);

  return (
    <Container>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Background />
      <Content>
        <TitleDelivery>
          Encomenda {delivery_id > 9 ? '' : `0`} {delivery_id}
        </TitleDelivery>
        <List
          data={deliveryProblem}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Problem data={item} />}
        />
      </Content>
    </Container>
  );
}

VisualizeProblem.navigationOptions = ({ navigation }) => ({
  title: 'Informar problema',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DeliveryDetails');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});

VisualizeProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
