import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import AddProductBanners from './AddProductBanners';
const AddBanners = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Product Images' mainTitle='Product Images' />
      <Container fluid={true}>
        <Row>
          <AddProductBanners/>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddBanners;
