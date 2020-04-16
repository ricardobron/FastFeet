/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { TouchableOpacity, StatusBar, Alert } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  TextAreaInput,
  SubmitButton,
} from './styles';

export default function CreateProblem({ navigation }) {
  const [description, setDescription] = useState('');

  const delivery_id = navigation.getParam('delivery_id');

  async function handleSubmit() {
    try {
      if (description === '') {
        Alert.alert('A mensagem precisa de ser preenchida');
        return '';
      }
      await api.post(`/delivery/${delivery_id}/problems`, {
        description,
      });

      Alert.alert(
        'Sucesso',
        `Problema cadastrado com sucesso, Entrega ${delivery_id}`
      );

      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro ao enviar o problema');
    }
  }

  return (
    <Container>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Background />
      <Content>
        <TextAreaInput
          placeholder="Inclua aqui o problema que ocorreu na entrega"
          value={description}
          onChangeText={setDescription}
        />
        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      </Content>
    </Container>
  );
}

CreateProblem.navigationOptions = ({ navigation }) => ({
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

CreateProblem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
