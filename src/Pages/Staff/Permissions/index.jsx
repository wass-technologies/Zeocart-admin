import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import PermissionsTable from './PermissionsTable';
const Permissions = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Staff' mainTitle='Permissions' subParent='Permissions' />
      <Container fluid={true}>
        <Row>
          <PermissionsTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Permissions;
