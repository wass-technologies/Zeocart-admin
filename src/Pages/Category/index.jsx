import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import CategoryTable from './CategoryTable';
const Category = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Category' mainTitle='Category' />
      <Container fluid={true}>
        <Row>
          <CategoryTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Category;
