import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  TitleContainer,
  Title,
  DetailContainer,
  Detail,
  TitleDetail,
  TextDetail,
  TextLink,
} from './styles';

import DeliveryProgess from '~/components/DeliveryProgress';

export default function Delivery({ data, navigation }) {
  return (
    <Container>
      <TitleContainer>
        <Icon name="local-shipping" size={20} color="#7D40E7" />
        <Title>
          Encomenda {data.id > 9 ? '' : '0'} {data.id}
        </Title>
      </TitleContainer>

      <DeliveryProgess status={data.status.eng} />

      <DetailContainer>
        <Detail>
          <TitleDetail>Data</TitleDetail>
          <TextDetail>14/01/2020</TextDetail>
        </Detail>
        <Detail>
          <TitleDetail>Cidade</TitleDetail>
          <TextDetail>TOMAR</TextDetail>
        </Detail>
        <Detail>
          <TextLink
            onPress={() =>
              navigation.navigate('DeliveryDetails', { delivery: data })
            }
          >
            Ver detalhes
          </TextLink>
        </Detail>
      </DetailContainer>
    </Container>
  );
}

Delivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.object.isRequired,
    start_date_formated: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
