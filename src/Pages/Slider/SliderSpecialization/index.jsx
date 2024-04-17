import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import SliderSpecializationTable from './Slider-specialization';
const SliderSpecialization = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Slider' mainTitle='Slider Specialization' title='Slider Specialization' />
      <Container fluid={true}>
        <Row>
          <SliderSpecializationTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default SliderSpecialization;
