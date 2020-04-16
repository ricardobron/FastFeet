import styled from 'styled-components';

export const OrderStatus = styled.td`
  span {
    background: ${props => props.info.background};
    color: ${props => props.info.color};
    font-weight: bold;
    font-size: 14px;
    position: relative;
    padding: 3px 7px 3px 25px;
    border-radius: 15px;

    &:before {
      content: '';
      position: absolute;
      height: 10px;
      width: 10px;
      top: 6px;
      left: 8px;
      background: ${props => props.info.color};
      border-radius: 50%;
    }
  }
`;
