import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Breadcrumbs } from '../../../AbstractElements';
import { SmallWidgetsData, SocialWidgetData } from '../../../Data/Social';
import { dashboardsData, dashboardpie } from '../../../store/dashboardSlice';
import AllCampaigns from './AllCampaigns';
import FacebookCampaign from './FacebookCampaign';
import FollowerGender from './FollowerGender';
import InstagramSubscription from './InstagramSubscription';
import MobileAppCard from './MobileAppCard';
import SmallWidgets from './SmallWidgets';
import SocialProfileCard from './SocialProfileCard';
import SocialWidget from '../../Common/CommonWidgets/SocialWidget';
import Views from './Views';
import MonthlyProfits from './MonthlyProfits';

const Social = () => {
  const dispatch = useDispatch();

  const dashboard = useSelector(state => state.dashboard);
  console.log(dashboard);

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const formattedOneMonthAgo = `/${oneMonthAgo.getFullYear()}-${(oneMonthAgo.getMonth() + 1).toString().padStart(2, '0')}-${oneMonthAgo.getDate().toString().padStart(2, '0')}`;
    const formattedToday = `/${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}/`;
    dispatch(dashboardsData(formattedOneMonthAgo + formattedToday));
    dispatch(dashboardpie());
  }, [])
  return (
    <Fragment>
      <Breadcrumbs mainTitle='Dashboard' parent='Dashboard' title='Zeo Cart' />
      <Container fluid={true}>
        <Row>
          <Col xxl='12' xl='12' >
            <Row>
              <Col md='4' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.categoryCount} increment={dashboard?.dashboardData?.categoryOneMonthCount} title={'Total Category'} />
              </Col>
              <Col md='4' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.productCount} increment={dashboard?.dashboardData?.productOneMonthCount} title={'Total Product'} />
              </Col>
              <Col md='4' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderDeliveredCount} increment={dashboard?.dashboardData?.orderDeliveredOneMonthCount} title={'Orders Delivered'} />
              </Col>
              <Col md='4' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderDispatchCount} increment={dashboard?.dashboardData?.orderDispatchOneMonthCount} title={'Orders Dispatched'} />
              </Col>
              <Col md='4' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderReturnCount} increment={dashboard?.dashboardData?.orderReturnOneMonthCount} title={'Orders Returned'} />
              </Col>
              <Col md='4' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.totalOrderCount} increment={dashboard?.dashboardData?.totalOrderOneMonthCount} title={'Total Orders'} />
              </Col>
              <Col md='4'>
                <MonthlyProfits />
              </Col>
              <Col md='4'>
                <MonthlyProfits />
              </Col>
              <Col md='4'>
                <MonthlyProfits />
              </Col>
              
            </Row>
          </Col>
          {/* <Col xl='3' className='col-ed-none d-xxl-block d-lg-none box-col-none'>
            <Row>
              <Col lg='12' sm='6'>
                <FollowerGender />
              </Col>
              <Col lg='12' sm='6'>
                <FacebookCampaign />
              </Col>
            </Row>
          </Col> */}
          {/* <Col xl='7'>
            <AllCampaigns />
          </Col>
          <Col xl='5'>
            <Views />
          </Col> */}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Social;
