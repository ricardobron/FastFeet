import { Alert } from 'react-native';

import { parseISO, format } from 'date-fns';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliveryman/${id}`);

    const { name, email, created_at, avatar } = response.data;

    yield put(
      signInSuccess(id, {
        name,
        email,
        created_at: format(parseISO(created_at), 'dd/MM/yyyy'),
        avatar,
      })
    );

    // history.push('/orders');
  } catch (err) {
    Alert.alert('Erro no login', 'Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
