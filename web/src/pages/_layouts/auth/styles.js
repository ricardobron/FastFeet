import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;

  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  padding: 50px 30px;
  border-radius: 5px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);

  img {
    width: 250px;
    height: 44px;
  }

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      text-align: left;
      font-weight: bold;
      font-size: 15px;
    }

    input {
      background: none;
      border: 1px solid #dcdce6;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 10px 0 10px;

      &::placeholder {
        color: #999;
      }

      &:focus {
        border-color: #7d40e7;
        box-shadow: 0 0 0 1px #7d40e7;
      }
    }
  }

  span {
    color: #ff0000;
    align-self: flex-start;
    margin: 0 0 10px;
  }

  button {
    margin: 5px 0 0;
    height: 44px;
    background: #7d40e7;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#7d40e7')};
    }
  }
`;
