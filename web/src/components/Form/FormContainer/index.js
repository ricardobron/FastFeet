import styled from 'styled-components';
import { Form } from '@unform/web';

const FormContainer = styled(Form)`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  section {
    background: #fff;
    padding: 25px;
    border-radius: 4px;
  }
`;

export default FormContainer;
