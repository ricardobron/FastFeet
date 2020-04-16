import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  padding: 0 30px;
  flex: 1;

  justify-content: flex-start;
  align-items: center;
`;

export const ProfileContainer = styled.View`
  width: 100%;
  padding-top: 4px;
  margin-top: 40px;
`;

export const Avatar = styled.Image`
  margin-top: 80px;
  height: 140px;
  width: 140px;
  border-radius: 70px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const InfoUser = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  background: #e74040;
  height: 45px;
  margin-top: 15px;

  width: 100%;
`;
