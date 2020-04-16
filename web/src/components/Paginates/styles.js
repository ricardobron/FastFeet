import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 5px auto;
  max-width: 990px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    color: #444;
    margin-bottom: 20px;
  }

  aside {
    display: flex;
    align-items: center;

    button {
      border: 0;
      background: #7d40e7;
      border-radius: 4px;
      padding: 8px;
      border: 1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;

      & + button {
        margin-left: 5px;
      }

      &:hover {
        background: ${darken(0.07, '#7d40e7')};

        & > svg {
          color: #fff;
        }
      }
      svg {
        color: #fff;
      }
    }

    span {
      margin: 0 10px;
      font-size: 16px;
      font-weight: bold;
      color: #666;
    }
  }
`;
