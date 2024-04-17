import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import LanguagesTable from './Table';
const Languages = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Languages' mainTitle='Languages' />
      <Container fluid={true}>
        <Row>
          <LanguagesTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Languages;
