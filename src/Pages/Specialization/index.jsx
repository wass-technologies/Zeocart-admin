import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import SpecializationTable from './SpecializationTable';
const Specialization = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Specialization' mainTitle='Specialization' />
      <Container fluid={true}>
        <Row>
          <SpecializationTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Specialization;
