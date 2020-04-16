import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  div {
    width: 100%;
    font-size: 20px;
    line-height: 2.5;
  }
`;

export const HeaderAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  > div {
    display: flex;
    width: 234px;

    > span {
      margin-right: 10px;
    }
  }
`;
