import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import EditPage from './EditPage';
const PageEdit = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Update Page' mainTitle='Update Page' />
      <Container fluid={true}>
        <Row>
          <EditPage />
        </Row>
      </Container>
    </Fragment>
  );
};

export default PageEdit;
