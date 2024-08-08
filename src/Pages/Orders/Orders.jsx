import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Trash2, Edit, Download, FileText, Airplay } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CustomizerContext from '../../_helper/Customizer';
import { fetchorders, statusToggle, statusUpdateBrandStatus,  isOpenModal, ModalToggle, isOpenStatusModal, isImageOpenModal, ImagestatusToggle, updateImageBrands, downloadInvoiceData, orderStatusChange } from '../../store/orderSlice';
import Pagination from '../../Components/Pagination/Pagination';
import SweetAlert from 'sweetalert2';
import { downloadLabelData } from '../../store/paymentHistorySlice';
import { errorHandler } from '../../shared/_helper/responseHelper';
import CommonModal from '../../Components/Modals/modal';

const Orders = () => {
  const storeVar = useSelector(state => state.orders)
  const history = useNavigate();
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const Imagetoggle = () => dispatch(ImagestatusToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const { layoutURL } = useContext(CustomizerContext);
  const [brandsName, setBrandsName] = useState("");
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'ORDERED',
    modalTitle: null,
    editState: false,
    cityId: null,
    brandId: null,
    keyword: '',
    brandName: '',
    bannerFile: null,
    bannerImageURL: null,
    paymentStatus: 'COMPLETED',
    paymentMode: 'Phone Pe',
    fromDate: moment().subtract(15, 'days').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    orderId: '',
    formstatus: '',
  });

  useEffect(() => {
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, formVar.keyword, formVar.paymentStatus, formVar.paymentMode, formVar.toDate, formVar.fromDate,));
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(fetchorders(formVar.limit, offset, formVar.status, formVar.keyword, formVar.paymentStatus, formVar.paymentMode, formVar.toDate, formVar.fromDate,));
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, e.target.value, formVar.paymentStatus, formVar.paymentMode, formVar.toDate, formVar.fromDate,));
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, e.target.value, formVar.keyword, formVar.paymentStatus, formVar.paymentMode, formVar.toDate, formVar.fromDate,));
  };

  const handlePaymentChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, paymentStatus: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, formVar.keyword, e.target.value, formVar.paymentMode, formVar.toDate, formVar.fromDate,));
  };

  const handleDeliveryChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, paymentMode: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, formVar.keyword, formVar.paymentStatus, e.target.value, formVar.toDate, formVar.fromDate,));
  };

  const downloadInvoice = (id) => {
    if (id) {
      dispatch(downloadInvoiceData(id));
    }
    else {
      dispatch(errorHandler("No Invoice Found"))
    }
  }
  const downloadLabel = (id) => {
    if (id) {
      dispatch(downloadLabelData(id));
    }
    else {
      dispatch(errorHandler("No Label Found"))
    }
  }
  const handleDateChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, fromDate: e.target.value }));
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, formVar.keyword, formVar.paymentStatus, formVar.paymentMode, formVar.toDate, e.target.value,));
  }
  const handleDateendChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, toDate: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, formVar.keyword, formVar.paymentStatus, formVar.paymentMode, e.target.value, formVar.fromDate,));
  }
  const navigate = (data) => {
    history(`/payments/paymentdetails/` + layoutURL + '?id=' + data.id)
  }

  const statusToggleModal = (data) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, 
      orderId: data.orderId      ,
      formstatus: data.status,
    }));

    dispatch(isOpenStatusModal(true))
  }

  const onValueChange = (event) => {

    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      formstatus: event.target.value,
    }))
  }
  const submitStatus = () => {
    dispatch(orderStatusChange(formVar.orderId, formVar.formstatus ))
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
                <Label className="col-form-label" htmlFor="recipient-name">Delivery Status</Label>
              </Col>
              <Col md="2">
                <Label className="col-form-label" htmlFor="recipient-name">Payment Status</Label>
              </Col>

            </Row>
            <Row>
              <Col md="3">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
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
              <Col md="2">
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='DELETED'>DELETED</option>
                  <option value='ORDERED'>ORDERED</option>
                  <option value='DELIVERED'>DELIVERED</option>
                  <option value='DISPATCH'>DISPATCH</option>
                  <option value='RETURN'>RETURN</option>
                  <option value='CANCELLED'>CANCELLED</option>
                </Input>
              </Col>
              <Col md="3">
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.paymentStatus} onChange={handlePaymentChange}>
                  <option value='PENDING'>PENDING</option>
                  <option value='COMPLETED'>COMPLETED</option>
                  <option value='CANCELLED'>CANCELLED</option>
                  <option value='FAILED'>FAILED</option>
                  <option value='REFUNDED'>REFUNDED</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col md="2">
                <Label className="col-form-label" htmlFor="recipient-name">Payment Type</Label>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.paymentMode} onChange={handleDeliveryChange}>
                  <option value='Phone Pe'>Phone Pe</option>
                  <option value='COD'>COD</option>
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
                  <th scope='col'>Invoice Number</th>
                  <th scope='col'>City</th>
                  <th scope='col'>Order Date</th>
                  {/* <th scope='col'>Order Id</th> */}
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar?.ordersData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item?.orderId}</td>
                    <td>{item?.paymentHistory?.invoiceNumber}</td>
                    <td>{item?.userAddress?.city}</td>
                    <td>{item?.orderDate}</td>
                    {/* <td>{item?.orderId}</td> */}

 
                    <td>
                      {
                        item.status === 'CART' && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'CART' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'ORDERED' && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'ORDERED' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'DELIVERED' && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'DELIVERED' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'DISPATCH' && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'DISPATCH' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'REPLACE' && <>
                          <span className={`font-warning rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'REPLACE' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'RETURN' && <>
                          <span className={`font-danger w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'RETURN' && <XCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === 'DELETED' && <>
                          <span className={`font-danger w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'DELETED' && <XCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                    </td>

                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Download onClick={(e) => downloadInvoice(item?.id)} />
                          <div className="tooltipCustom">Download Invoice</div>
                        </div>
                        <div className='cursor-pointer bg-light-primary font-secondary action-icon'>
                          <Download onClick={(e) => downloadLabel(item?.awbNumber)} />
                          <div className="tooltipCustom">Download Label</div>
                        </div>
                        <div className='d-flex gap-2'>
                          <div className='cursor-pointer  font-success action-icon'>
                            <Airplay onClick={(e) => navigate(item.paymentHistory)} />
                            <div className="tooltipCustom">More Details</div>
                          </div>
                        </div>
                         <div className='cursor-pointer action-icon'>
                          <FileText onClick={(e) => statusToggleModal(item)} />
                          <div className="tooltipCustom">Status Update</div>
                        </div>
                       {/* <div className='cursor-pointer font-danger action-icon'>
                          <Trash2 onClick={(e) => BannerDelete(item)} />
                          <div className="tooltipCustom">Delete</div>
                        </div> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
        {
          storeVar.totalDegree > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.orderCount}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>

      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' name='radio1' checked={formVar.formstatus === 'ORDERED'} onChange={onValueChange} value='ORDERED' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>ORDERED</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' type='radio' name='radio2' checked={formVar.formstatus === 'DISPATCH'} onChange={onValueChange} value='DISPATCH' />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>DISPATCH</span>
              </Label>
            </div>
            {/* <div className='radio radio-primary'>
              <Input id='radioinline3' type='radio' name='radio3' checked={formVar.formstatus === 'DELIVERED'} onChange={onValueChange} value='DELIVERED' />
              <Label className='mb-0' for='radioinline3'>
                <span className='digits'>DELIVERED</span>
              </Label>
            </div> */}
          </div>
        </Col>
        <ModalFooter className='justify-content-center'>
          <Btn attrBtn={{ color: 'secondary', onClick: statusModalToggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitStatus }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>

    </Fragment>
  );
};

export default Orders;
