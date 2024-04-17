import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import Products from './Products';
const Brand = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Brand' mainTitle='Brand' />
      <Container fluid={true}>
        <Row>
          <Products/>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Brand;
