import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import ProductKeyword from './ProductKeywordTable';
const Faqs = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Product Keywords' mainTitle='Product Keywords' />
      <Container fluid={true}>
        <Row>
          <ProductKeyword />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Faqs;
 