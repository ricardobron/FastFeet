import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

import { Container, ProblemDescription, ProblemDate } from './styles';

export default function Problem({ data }) {
  const dateFormatted = format(parseISO(data.created_at), 'dd/MM/yyyy');
  return (
    <Container>
      <ProblemDescription>{data.description}</ProblemDescription>
      <ProblemDate>{dateFormatted}</ProblemDate>
    </Container>
  );
}

Problem.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};
