import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Label, Input, Row } from 'reactstrap';
import { CheckCircle, XCircle, Edit, FileText, Trash2, Airplay } from "react-feather"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../Components/Pagination/Pagination';
import moment from 'moment';
import { paymentsData } from '../../store/paymentSlice';
import CustomizerContext from '../../_helper/Customizer';


const PaymentsTable = () => {
  const storeVar = useSelector(state => state.payment)
  console.log(storeVar);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const [typingTimer, setTypingTimer] = useState(null);
  const typingDelay = 800;
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'COMPLETED',
    fromDate: moment().subtract(15, 'days').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    payType: "All",

  });

  useEffect(() => {
    dispatch(paymentsData(formVar.keyword, formVar.limit, formVar.offset, formVar.fromDate, formVar.toDate, formVar.status, formVar.payType))
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))

    dispatch(paymentsData(formVar.keyword, formVar.limit, offset, formVar.fromDate, formVar.toDate, formVar.status, formVar.payType))
  };

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(paymentsData(formVar.keyword, formVar.limit, formVar.offset, formVar.fromDate, formVar.toDate, e.target.value, formVar.payType))
  };
  const handleTypeChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, payType: e.target.value }))
    dispatch(paymentsData(formVar.keyword, formVar.limit, formVar.offset, formVar.fromDate, formVar.toDate, formVar.status, e.target.value))
  };

  const handleDateChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, fromDate: e.target.value }));
    dispatch(paymentsData(formVar.keyword, formVar.limit, formVar.offset, e.target.value, formVar.toDate, formVar.status, formVar.payType))

  }
  const handleDateendChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, toDate: e.target.value }))
    dispatch(paymentsData(formVar.keyword, formVar.limit, formVar.offset, formVar.fromDate, e.target.value, formVar.status, formVar.payType))

  }

  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    searchWithDelay(e.target.value)
  }
  const searchWithDelay = (keyword) => {
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      dispatch(paymentsData(keyword, formVar.limit, formVar.offset, formVar.fromDate, formVar.toDate, formVar.status, formVar.payType))
    }, typingDelay);
    setTypingTimer(timer);
  };
  const navigate = (data) => {
    console.log(data);
    history(`/payments/paymentdetails/` + layoutURL + '?id=' + data.id)
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="3">
                <Label className="col-form-label" htmlFor="recipient-name">Search</Label>
              </Col>
              <Col md="2">
                <Label className="col-form-label" htmlFor="recipient-name">From</Label>
              </Col>
              <Col md="2">
                <Label className="col-form-label" htmlFor="recipient-name">To</Label>
              </Col>
              <Col md="2">
                <Label className="col-form-label" htmlFor="recipient-name">Payment Status</Label>
              </Col>
              <Col md="2">
                <Label className="col-form-label" htmlFor="recipient-name">Payment Type</Label>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <Input className="form-control" placeholder='Search..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="2">
                <Input className="form-control form-control-inverse btn-square" max={moment().format('YYYY-MM-DD')} name="select" type="DATE"
                  value={formVar.fromDate} onChange={handleDateChange}>
                </Input>
              </Col>
              <Col md="2">
                <Input className="form-control form-control-inverse btn-square" max={moment().format('YYYY-MM-DD')} name="select" type="DATE"
                  value={formVar.toDate} onChange={handleDateendChange}>
                </Input>
              </Col>
              <Col md="2" className='d-flex justify-content-end align-items-center'>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='PENDING'>PENDING</option>
                  <option value='COMPLETED'>COMPLETED</option>
                  <option value='CANCELLED'>CANCELLED</option>
                  <option value='FAILED'>FAILED</option>
                  <option value='REFUNDED'>REFUNDED</option>
                </Input>
              </Col>
              <Col md="2" className='d-flex justify-content-end align-items-center'>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.payType} onChange={handleTypeChange}>
                  <option value='All'>ALL</option>
                  <option value='COD'>COD</option>
                  <option value='Phone Pe'>PHONE PAY</option>
                </Input>
              </Col>
            </Row>


          </CardHeader>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Order Id</th>
                  <th scope='col'>Invoice Id</th>
                  <th scope='col'>Total</th>
                  <th scope='col'>Wallet</th>
                  <th scope='col'>Shipping Charges</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>

                {storeVar?.paymentData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.orderId}</td>
                    <td>{item.invoiceNumber}</td>
                    <td>{item.total}</td>
                    <td>{item.wallet}</td>
                    <td>{item.shippingCharge}</td>
                    <td>
                      {
                        item.status === 'COMPLETED' && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'COMPLETED' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'PENDING' && <>
                          <span className={`font-warning rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'PENDING' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'REFUNDED' && <>
                          <span className={`font-warning rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'REFUNDED' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'FAILED' && <>
                          <span className={`font-danger w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'FAILED' && <XCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'CANCELLED' && <>
                          <span className={`font-danger w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'CANCELLED' && <XCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                    </td>
                    <td>
                    <div className='d-flex gap-2'>
                      <div className='cursor-pointer  font-success action-icon'>
                        <Airplay onClick={(e) => navigate(item)} />
                        <div className="tooltipCustom">More Details</div>
                      </div>
                      </div>
                    </td>
                  </tr>
                ))}


              </tbody>
            </Table>
          </div>
          {storeVar?.paymentData?.length <= 0 && (
            <div className="col-form-label" >&nbsp;&nbsp;&nbsp;No Payments found</div>
          )}

        </Card>
        {
          storeVar.totalDegree > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.paymentCount}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
    </Fragment>
  );
};

export default PaymentsTable;
