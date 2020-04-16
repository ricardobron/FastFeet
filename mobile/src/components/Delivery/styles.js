import styled from 'styled-components/native';

export const Container = styled.View`
  border: 1px solid #eee;
  padding-top: 15px;
  border-radius: 4px;
  margin-bottom: 30px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
`;

export const Title = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 14px;
  margin-left: 10px;
`;

export const DetailContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  background: #f8f9fd;
  padding: 20px;
  margin-top: 20px;
`;

export const Detail = styled.View`
  justify-content: flex-end;
`;

export const TitleDetail = styled.Text`
  font-size: 10px;
  color: #999;
`;

export const TextDetail = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 12px;
`;

export const TextLink = styled.Text`
  color: #7d40e7;
  font-weight: bold;
`;
