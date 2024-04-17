import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import Blogs from './Blogs';
const Brand = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Brand' mainTitle='Brand' />
      <Container fluid={true}>
        <Row>
          <BrandTable/>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Brand;
