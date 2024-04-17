import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import UsersTable from './UsersTable';
const Users = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Patient' mainTitle='Patient' />
      <Container fluid={true}>
        <Row>
          <UsersTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Users;
