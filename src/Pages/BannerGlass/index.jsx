import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import BannerTable from './BannerTable';
const Banner = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Banner' mainTitle='Banner' />
      <Container fluid={true}>
        <Row>
          <BannerTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Banner;
