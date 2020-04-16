import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const Background = styled.View`
  background: #7d40e7;
  height: 150px;
`;

export const Content = styled.View`
  margin-top: -70px;
  padding: 0 30px;
`;

export const TextAreaInput = styled.TextInput.attrs({
  multiline: true,
  textAlignVertical: 'top',
  placeholderTextColor: '#999',
})`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  height: 70%;
  font-size: 16px;
  border: 1px solid #0000001a;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  background: #7d40e7;
  margin-top: 20px;
`;
