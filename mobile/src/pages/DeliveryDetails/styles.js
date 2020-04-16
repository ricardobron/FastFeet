import styled from 'styled-components/native';

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

export const Card = styled.View`
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 15px 30px 10px 15px;

  border: 1px solid #eee;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
`;

export const Label = styled.Text`
  color: #999;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const LabelValue = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Dates = styled.View``;

export const Menu = styled.View`
  background: #f8f9fd;
  border-radius: 4px;
  border: 1px solid #eee;
  height: 90px;

  flex-direction: row;
`;

export const ActionMenu = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;

  border: 1px solid #eee;
`;

export const ActionTitle = styled.Text`
  font-size: 13px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;
