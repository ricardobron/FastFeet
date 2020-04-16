import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 0 30px;
`;

export const Profile = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const TitleContainer = styled.View`
  flex: 3;
`;

export const Welcome = styled.Text`
  font-size: 16px;
  color: #666;
  margin: 12px 0 0 12px;
`;

export const Name = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  font-size: 20px;
  font-weight: bold;
  color: #444;
  margin: 0 0 0 12px;
`;

export const Menu = styled.View`
  margin-top: 22px;

  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;
export const MenuTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #444;
`;

export const Options = styled.View`
  flex-direction: row;
`;

export const Option = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.selected ? '#7D40E7' : '#999')};
  text-decoration: ${(props) => (props.selected ? 'underline' : 'none')};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 10 },
})``;
