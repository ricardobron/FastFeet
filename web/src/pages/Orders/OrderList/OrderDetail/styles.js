import styled from 'styled-components';

export const Container = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  background: #fff;
  padding: 15px;
  box-shadow: 10px 10px 10px 10000px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  z-index: 3;

  svg {
    margin-left: auto;

    &:hover {
      cursor: pointer;
    }
  }

  form {
    padding: 15px 15px;

    div {
      display: flex;
      flex-direction: column;

      & + div {
        margin-top: 15px;
        border-top: 1px solid #eeee;
        padding-top: 15px;
      }
    }

    strong {
      color: #444;
      margin-bottom: 10px;
    }

    input {
      color: #666;
      font-size: 16px;
      border: 0;
      background: none;

      & + input {
        margin-top: 5px;
      }
    }

    img {
      width: 100px;
      margin: 0 auto;
    }
  }
`;

export const ListDate = styled.div`
  flex-direction: row !important;
  margin-top: 0 !important;
  border-top: 0 !important;
  padding-top: 0 !important;
  font-size: 16px;

  strong {
    color: #666 !important;
    margin-bottom: 3px !important;
  }

  input {
    margin-left: 6px;
  }
`;
