import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 25px;
`;

export const ProgressContainer = styled.View`
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Ball = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;

  background: ${(props) => (props.marked ? '#7d40e7' : '#fff')};
  border: 1px solid #7d40e7;
`;

export const Line = styled.View`
  flex: 1;
  height: 1px;
  background: #7d40e7;
`;

export const Descriptions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  margin-top: 10px;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: #999;
  text-align: center;
`;
