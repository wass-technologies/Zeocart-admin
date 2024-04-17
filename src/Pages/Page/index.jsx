import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import PageTable from './Page';
const Page = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Page' mainTitle='Page' />
      <Container fluid={true}>
        <Row>
          <PageTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Page;
