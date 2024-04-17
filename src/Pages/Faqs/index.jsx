import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import FaqsTable from './FaqsTable';
const Faqs = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Faq' mainTitle='Faq' />
      <Container fluid={true}>
        <Row>
          <FaqsTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Faqs;
 