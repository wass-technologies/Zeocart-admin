import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import State from './Table';
const BasicState = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Tables' title='Basic Tables' mainTitle='Basic Tables' />
      <Container fluid={true}>
        <Row>
          <State />
        </Row>
      </Container>
    </Fragment>
  );
};

export default BasicState;
