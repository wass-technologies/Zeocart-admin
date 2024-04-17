import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import SettingsTable from './SettingsTable';
const Settings = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Settings' mainTitle='Settings' />
      <Container fluid={true}>
        <Row>
          <SettingsTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Settings;
