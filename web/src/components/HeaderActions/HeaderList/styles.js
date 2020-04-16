import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 990px;

  h1 {
    color: #444;
    font-size: 24px;
    margin-bottom: 35px;
  }

  div {
    display: ${props => (props.visible ? 'flex' : 'none')};
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      background: #7d40e7;
      color: #fff;
      height: 36px;
      padding: 10px 15px;
      font-weight: bold;
      border-radius: 5px;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const SearchBar = styled.div`
  position: relative;

  input {
    width: 240px;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 10px 10px 40px;
    transition: box-shadow 0.1s, border-color 0.1s;

    &:focus {
      border-color: #7d40e7;
      box-shadow: 0 0 0 1px #7d40e7;
    }
    &::placeholder {
      color: #999;
    }
  }
  svg {
    position: absolute;
    left: 10px;
  }
`;
