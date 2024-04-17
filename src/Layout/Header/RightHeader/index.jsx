import React, { Fragment } from 'react';
import MoonLight from './MoonLight';
import UserHeader from './UserHeader';
import { UL } from '../../../AbstractElements';
import { Col } from 'reactstrap';

const RightHeader = () => {
  return (
    <Fragment>
      <Col xxl='7' xl='6' md='7' className='nav-right pull-right right-header col-8 p-0 ms-auto'>
        <UL attrUL={{ className: 'simple-list nav-menus flex-row' }}>
          <MoonLight />
          <UserHeader />
        </UL>
      </Col>
    </Fragment>
  );
};

export default RightHeader;
