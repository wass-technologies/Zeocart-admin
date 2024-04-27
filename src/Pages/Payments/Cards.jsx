import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Label } from 'reactstrap';
import SocialWidget from '../../Components/Common/CommonWidgets/SocialWidget';
import { dashboardsData } from '../../store/dashboardSlice';


const Cards = () => {
    const dispatch = useDispatch();
    const dashboard = useSelector(state => state.dashboard);
    useEffect(() => {
        const today = new Date();
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const formattedOneMonthAgo = `/${oneMonthAgo.getFullYear()}-${(oneMonthAgo.getMonth() + 1).toString().padStart(2, '0')}-${oneMonthAgo.getDate().toString().padStart(2, '0')}`;
        const formattedToday = `/${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}/`;
        dispatch(dashboardsData(formattedOneMonthAgo + formattedToday));
    }, [])
    return (
        <div>
            {dashboard.dashboardData.paymentCounts && (
                <Row>
                    <Col md='3' sm='6' >
                        <SocialWidget data={dashboard.dashboardData.paymentCounts.completedTotal } title={'Completed'} />
                    </Col>
                    <Col md='3' sm='6' >
                        <SocialWidget data={dashboard.dashboardData.paymentCounts.pendingTotal } title={'Pending'} />
                    </Col>
                    <Col md='3' sm='6' >
                        <SocialWidget data={dashboard.dashboardData.paymentCounts.cancelledTotal } title={'Cancelled'} />
                    </Col>
                    <Col md='3' sm='6' >
                        <SocialWidget data={dashboard.dashboardData.paymentCounts.failedTotal } title={'Failed'} />
                    </Col>
                </Row>
            ) }

        </div>
    )
}

export default Cards
