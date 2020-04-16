import React, { useState, useRef } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector } from 'react-redux';

import api from '~/services/api';

import {
  Container,
  Background,
  Content,
  CameraWrapper,
  Camera,
  Button,
  TakePictureButton,
} from './styles';

export default function ConfirmPhoto({ navigation }) {
  const delivery_id = navigation.getParam('delivery_id');

  const auth = useSelector((state) => state.auth);

  const cameraRef = useRef(null);
  const [pictureUri, setPictureUri] = useState('');

  async function handleSubmit() {
    console.tron.log(pictureUri);

    const dataFile = new FormData();
    dataFile.append('file', {
      type: 'image/jpg',
      uri: pictureUri,
      name: 'assignature.jpg',
    });

    console.tron.log(dataFile);
    const pictureResponse = await api.post('files', dataFile);

    await api.patch(
      `/deliveryman/${auth.id}/deliveries/${delivery_id}/delivered`,
      {
        signature_id: pictureResponse.data.id,
      }
    );
    navigation.navigate('Dashboard');
  }

  async function handletakePicture() {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      await setPictureUri(data.uri);
    }
  }

  return (
    <Container>
      <Background />
      <Content>
        {pictureUri ? (
          <CameraWrapper>
            <Image source={{ uri: pictureUri }} style={{ height: '100%' }} />
          </CameraWrapper>
        ) : (
          <CameraWrapper>
            <Camera ref={cameraRef} type="back" captureAudio={false} />
            <TakePictureButton onPress={handletakePicture}>
              <Icon name="photo-camera" color="#fff" size={30} />
            </TakePictureButton>
          </CameraWrapper>
        )}
        <Button onPress={handleSubmit} loading={false}>
          Enviar
        </Button>
      </Content>
    </Container>
  );
}

ConfirmPhoto.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar entrega',
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

ConfirmPhoto.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
