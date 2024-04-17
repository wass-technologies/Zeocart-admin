import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import SubCategoryTable from './SubCategoryTable';
const Category = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Sub Category' mainTitle='Sub Category' />
      <Container fluid={true}>
        <Row>
          <SubCategoryTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Category;
