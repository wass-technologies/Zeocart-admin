import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import SliderTable from './SliderTable';
const Slider = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Slider' mainTitle='Slider' />
      <Container fluid={true}>
        <Row>
          <SliderTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Slider;
