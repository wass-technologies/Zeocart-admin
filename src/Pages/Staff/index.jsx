import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import UserTable from './UsersTable';
const Staff = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Users' mainTitle='Users' />
      <Container fluid={true}>
        <Row>
          <UserTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Staff;
