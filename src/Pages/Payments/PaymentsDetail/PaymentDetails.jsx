import React, { Fragment, useEffect } from 'react';
import { Col, Card, Table, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { paymentsDataById } from '../../../store/paymentSlice';


const BrandTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const storeVar = useSelector(state => state.payment);
  const paymentId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    dispatch(paymentsDataById(paymentId))
  }, []);

  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Order Id</th>
                  <th scope='col'>Payment Id</th>
                  <th scope='col'>Invoice Number</th>
                  <th scope='col'>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{storeVar.paymentDetails.orderId}</td>
                  <td>{storeVar.paymentDetails.paymentId}</td>
                  <td>{storeVar.paymentDetails.invoiceNumber}</td>
                  <td>{storeVar.paymentDetails.status}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th scope='col'>Shipping Status</th>
                  <th scope='col'>AWB Number</th>
                  <th scope='col'>Order date</th>
                  <th scope='col'>Pickup Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{storeVar.paymentDetails.cart?.cartProduct[0]?.status}</td>
                  <td>{storeVar.paymentDetails.cart?.awbNumber}</td>
                  <td>{storeVar.paymentDetails.cart?.orderDate}</td>
                  <td>{storeVar.paymentDetails.cart?.pickupDate}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th scope='col'>Cancelled Date:</th>
                  <th scope='col'>Total Amount</th>
                  <th scope='col'>Discount</th>
                  <th scope='col'>Shipping Charge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{storeVar.paymentDetails.cart?.cancelDate}</td>
                  <td>{storeVar.paymentDetails.total}</td>
                  <td>{storeVar.paymentDetails.discount}</td>
                  <td>{storeVar.paymentDetails.shippingCharge}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th scope='col'>Gst</th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{storeVar.paymentDetails.gst}</td>
                  <td>{ }</td>
                  <td>{ }</td>
                  <td>{ }</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Sku Id</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Quantity</th>

                </tr>
              </thead>
              <tbody>
                {storeVar?.paymentDetails.cart?.cartProduct?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item?.cartProductVariant[0]?.productVariant.sku}</td>
                    <td>{item?.cartProductVariant[0]?.productVariant.product.title}</td>
                    <td>{item?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Row>
            {/* <Col md="4">
            {"Order Id:- " + storeVar.paymentDetails.orderId}
          </Col>
          <Col md="4">
            {"Payment Id:- " + storeVar.paymentDetails.paymentId}
          </Col>
          <Col md="4">
            {"Invoice Number:= " + storeVar.paymentDetails.invoiceNumber}
          </Col>
          <Col md="4">
            {"Payment Status:= " + storeVar.paymentDetails.status}
          </Col> */}
            {/* <Col md="4">
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
          </Col> */}
            {/* <Col md="4">
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
          </Col> */}
            {/* <Col md="4">
            {"Gst:= " + storeVar.paymentDetails.gst}
          </Col> */}
          </Row>
        </Card>
      </Col>

    </Fragment >
  );
};

export default BrandTable;
