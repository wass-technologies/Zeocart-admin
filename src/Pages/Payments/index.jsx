import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import PaymentTable from './PaymentsTable';
import Cards from './Cards';

const Payment = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Payment' mainTitle='Payment' />
      <Container fluid={true}>
        <Row>
          <Cards/>
          <PaymentTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Payment;
