import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import Advertisement from './Advertisement';
const Banner = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Banner' mainTitle='Banner' />
      <Container fluid={true}>
        <Row>
          <Advertisement />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Banner;
