import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import AddProductBanners from './AddProductBanners';
const AddBanners = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Disease' mainTitle='Product Images' subParent='Disease Questions' subParent2='Product Images' />
      <Container fluid={true}>
        <Row>
          <AddProductBanners/>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AddBanners;
