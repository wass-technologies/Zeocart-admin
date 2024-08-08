import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { paymentsDataById } from '../../../store/paymentSlice';


const BrandTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const storeVar = useSelector(state => state.payment)
  const paymentId = new URLSearchParams(location.search).get('id');



  useEffect(() => {
    dispatch(paymentsDataById(paymentId))
  }, []);

  return (
    <Fragment>
      <Card>
        <Row>
          <Col md="4">
            {"Order Id:- " + storeVar.paymentDetails.orderId}
          </Col>
          <Col md="4">
            {"payment Id:- " + storeVar.paymentDetails.paymentId}
          </Col>
          <Col md="4">
            {"Invoice Number:= " + storeVar.paymentDetails.invoiceNumber}
          </Col>
          <Col md="4">
            {"Payment Status:= " + storeVar.paymentDetails.status}
          </Col>
          <Col md="4">
            {"Shipping Status:= " + storeVar.paymentDetails.cart?.cartProduct[0]?.status}
          </Col>
          <Col md="4">
            {"AWB Number:= " + storeVar.paymentDetails.cart?.awbNumber}
          </Col>
          <Col md="4">
            {"Order date:= " + storeVar.paymentDetails.cart?.orderDate}
          </Col>
          <Col md="4">
            {"Pickup Date:= " + storeVar.paymentDetails.cart?.pickupDate}
          </Col>
          <Col md="4">
            {"Cancelled Date:= " + storeVar.paymentDetails.cart?.cancelDate}
          </Col>
          <Col md="4">
            {"Total Amount:= " + storeVar.paymentDetails.total}
          </Col>
          <Col md="4">
            {"Discount:= " + storeVar.paymentDetails.discount}
          </Col>
          <Col md="4">
            {"Shipping Charge:= " + storeVar.paymentDetails.shippingCharge}
          </Col>
          <Col md="4">
            {"Gst:= " + storeVar.paymentDetails.gst}
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default BrandTable;
