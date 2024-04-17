import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import FaqsSpecializationTable from './Faq-specialization';
const FaqsSpecialization = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Faq' mainTitle='Faq Specialization' title='Faq Specialization' />
      <Container fluid={true}>
        <Row>
          <FaqsSpecializationTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default FaqsSpecialization;
