import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Label } from 'reactstrap';
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
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.categoryCount} title={'Total Category'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderCounts?.orderedTotal} title={'Total Orders'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderCounts?.deliveredTotal} title={'Orders Delivered'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderCounts?.dispatchedTotal} title={'Orders Dispatched'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderCounts?.cancelledTotal} title={'Orders Cancelled'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderCounts?.paymentPendingTotal} title={'Orders Payment Pending'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.orderCounts?.returnTotal} title={'Total Orders Returned'} />
              </Col>
            </Row>
            <Label className="col-form-label  fw-semibold f-20" for="recipient-name">Total Payment</Label>

            <Row>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.paymentCounts?.completedTotal} title={'Completed'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.paymentCounts?.pendingTotal} title={'Pending'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.paymentCounts?.cancelledTotal} title={'Cancelled'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.paymentCounts?.failedTotal} title={'Failed'} />
              </Col>
            </Row>
            <Label className="col-form-label  fw-semibold f-20" for="recipient-name">Actual Payment</Label>

            {dashboard.dashboardData.paymentCounts && (
              <Row>
                <Col md='3' sm='6' >
                  <SocialWidget data={dashboard.dashboardData.paymentCounts.completedTotal - dashboard.dashboardData.paymentCounts.completedWalletTotal} title={'Completed'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={dashboard.dashboardData.paymentCounts.pendingTotal - dashboard.dashboardData.paymentCounts.pendingWalletTotal} title={'Pending'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={dashboard.dashboardData.paymentCounts.cancelledTotal - dashboard.dashboardData.paymentCounts.cancelledWalletTotal} title={'Cancelled'} />
                </Col>
                <Col md='3' sm='6' >
                  <SocialWidget data={dashboard.dashboardData.paymentCounts.failedTotal - dashboard.dashboardData.paymentCounts.failedWalletTotal} title={'Failed'} />
                </Col>
              </Row>
            )}
            <Label className="col-form-label  fw-semibold f-20" for="recipient-name">Wallet Payment</Label>
            <Row>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.paymentCounts?.completedWalletTotal} title={'Completed'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.paymentCounts?.pendingWalletTotal} title={'Pending'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.paymentCounts?.cancelledWalletTotal} title={'Cancelled'} />
              </Col>
              <Col md='3' sm='6' >
                <SocialWidget data={dashboard?.dashboardData?.paymentCounts?.failedWalletTotal} title={'Failed'} />
              </Col>
            </Row>

            <Col md='3'>
              {/* <MonthlyProfits /> */}
            </Col>
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
