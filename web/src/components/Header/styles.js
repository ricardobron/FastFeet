import styled from 'styled-components';

export const Container = styled.header`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      border-right: 1px solid #ddd;
      margin-right: 30px;
      padding-right: 30px;
    }

    div {
      display: flex;
      align-items: center;

      a {
        color: #999;
        font-weight: bold;
        font-size: 15px;
        transition: color 0.2s;

        & + a {
          margin-left: 20px;
        }

        &:hover {
          color: #444;
        }

        &.selected {
          color: #444;
          font-weight: bold;
        }
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    margin-bottom: 5px;
    color: #333;
  }

  button {
    align-self: flex-end;
    background: none;
    border: none;
    color: #de3b3b;
  }
`;
