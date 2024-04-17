import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import CityTable from './Table';
const City = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='City' mainTitle='City' subParent='State' />
      <Container fluid={true}>
        <Row>
          <CityTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default City;
