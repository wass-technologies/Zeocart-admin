import React, { Fragment, useContext } from 'react';
import { Card, CardBody, CardHeader, Form, Row } from 'reactstrap';
import { H5, H4, P } from '../../../AbstractElements';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MyProfile } from '../../../Constant';
import CustomizerContext from '../../../_helper/Customizer';
import { profileAvtar } from '../../../Data/svgIcons';

const MyProfileEdit = () => {
  const storeVar = useSelector(state => state.users)
  const { layoutURL } = useContext(CustomizerContext);
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <H4 attrH4={{ className: 'card-title mb-0' }}>{MyProfile}</H4>
          <div className='card-options'>
            <a className='card-options-collapse' href='#javascript'>
              <i className='fe fe-chevron-up'></i>
            </a>
            <a className='card-options-remove' href='#javascript'>
              <i className='fe fe-x'></i>
            </a>
          </div>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className='mb-2'>
              <div className='profile-title'>
                <div className='media'>
                  {/* <Image attrImage={{ className: 'img-70 m-0 rounded-circle', alt: '', src: `${require('../../../assets/images/user/7.jpg')}` }} /> */}
                  {profileAvtar}
                  <div className='media-body'>
                    <Link to={`${process.env.PUBLIC_URL}/app/users/userProfile/${layoutURL}`}>
                      <H5 attrH5={{ className: 'mb-1' }}>{storeVar.name}</H5>
                    </Link>
                    <P>PID : {storeVar.pid}</P>
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};
export default MyProfileEdit;
