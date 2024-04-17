import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import Orders from './Orders';
const Brand = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Orders' mainTitle='Orders' />
      <Container fluid={true}>
        <Row>
          <Orders/>
        </Row>
      </Container> 
    </Fragment>
  );
};

export default Brand;
