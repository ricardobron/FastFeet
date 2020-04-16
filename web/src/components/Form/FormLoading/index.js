import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { Container, HeaderAction } from './styles';

export default function FormLoading() {
  return (
    <Container>
      <div>
        <HeaderAction>
          <Skeleton width={280} height={32} />

          <div>
            <Skeleton width={112} height={36} count={2} />
          </div>
        </HeaderAction>
      </div>
    </Container>
  );
}
