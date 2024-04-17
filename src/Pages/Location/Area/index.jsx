import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import AreaTable from './Table';
const Area = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Area' mainTitle='Area' subParent='State' subParent2='City' />
      <Container fluid={true}>
        <Row>
          <AreaTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Area;
