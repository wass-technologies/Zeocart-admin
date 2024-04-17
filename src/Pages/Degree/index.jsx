import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import DegreeTable from './DegreeTable';
const Degree = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Degree' mainTitle='Degree' />
      <Container fluid={true}>
        <Row>
          <DegreeTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Degree;
