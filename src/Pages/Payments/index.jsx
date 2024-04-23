import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import PaymentTable from './PaymentsTable';
const Payment = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Payment' mainTitle='Payment' />
      <Container fluid={true}>
        <Row>
          <PaymentTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Payment;
