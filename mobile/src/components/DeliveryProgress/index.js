import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  Container,
  ProgressContainer,
  Ball,
  Line,
  Descriptions,
  Description,
} from './styles';

export default function DeliveryProgress({ status }) {
  return (
    <Container>
      <ProgressContainer>
        <Ball
          marked={
            status === 'PENDING' ||
            status === 'WITHDRAW' ||
            status === 'DELIVERED'
          }
        />
        <Line />
        <Ball marked={status === 'DELIVERED' || status === 'WITHDRAW'} />
        <Line />
        <Ball marked={status === 'DELIVERED'} />
      </ProgressContainer>
      <Descriptions>
        <View>
          <Description>Aguardando</Description>
          <Description>Retirada</Description>
        </View>
        <Description style={{ marginRight: 15 }}>Retirada</Description>
        <Description>Entregue</Description>
      </Descriptions>
    </Container>
  );
}

DeliveryProgress.propTypes = {
  status: PropTypes.string.isRequired,
};
