import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import BrandTable from './PaymentDetails';
const Brand = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Payment Details' mainTitle='Payment Details' />
      <Container fluid={true}>
        <Row>
          <BrandTable/>
        </Row>
      </Container> 
    </Fragment>
  );
};

export default Brand;
