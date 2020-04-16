import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;

  background: #fff;
  border-radius: 4px;
  border: 1px solid #0000001a;
  height: 60px;
  padding: 15px;

  margin-bottom: 20px;

  flex-direction: row;
  justify-content: space-between;
`;

export const ProblemDescription = styled.Text`
  color: #999;
  font-weight: bold;
`;

export const ProblemDate = styled.Text`
  color: #999;
`;
