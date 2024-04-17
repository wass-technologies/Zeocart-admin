import React, { Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../AbstractElements';
import TicketTable from './TicketTable';
const Ticket = () => {
  return (
    <Fragment>
      <Breadcrumbs parent='Ticket' mainTitle='Ticket' />
      <Container fluid={true}>
        <Row>
          <TicketTable />
        </Row>
      </Container>
    </Fragment>
  );
};

export default Ticket;
