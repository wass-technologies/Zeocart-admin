import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import Coupons from './Coupons';
const Coupon = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Coupons' mainTitle='Coupons' />
      <Container fluid={true}>
        <Row>
          <Coupons />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Coupon;
