import styled from 'styled-components';

const TableContainer = styled.table`
  max-width: 990px;
  margin: 0 auto;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;

  thead th {
    text-align: left;
    color: #444;
    font-size: 16px;
    padding: 6px 15px 0;

    &:last-child {
      text-align: right;
    }
  }

  tbody td {
    border-radius: 4px;
    background: #fff;
    padding: 6px 15px;
    height: 57px;
    font-size: 16px;
    border-radius: 4px;

    &:last-child {
      text-align: right;
      padding-right: 25px;
    }

    div {
      display: flex;
      align-items: center;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
`;

export default TableContainer;
