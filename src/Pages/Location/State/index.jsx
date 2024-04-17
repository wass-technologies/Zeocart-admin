import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import StateTable from './Table';
const State = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='State' mainTitle='State' />
      <Container fluid={true}>
        <Row>
          <StateTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default State;
