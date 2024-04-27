import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Trash2, Edit, Download, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Dropzone from 'react-dropzone-uploader';


import { fetchorders, addBrand, updateBrand, statusToggle, statusUpdateBrandStatus, statusDeleteBrandStatus, isOpenModal, ModalToggle, isOpenStatusModal, isImageOpenModal, ImagestatusToggle, updateImageBrands, downloadInvoiceData } from '../../store/orderSlice';
import Pagination from '../../Components/Pagination/Pagination';
import SweetAlert from 'sweetalert2'; 

const Orders = () => {
  const storeVar = useSelector(state => state.orders)
  console.log(storeVar.orderCount);
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const Imagetoggle = () => dispatch(ImagestatusToggle());
  const statusModalToggle = () => dispatch(statusToggle());
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
    paymentStatus: 'PENDING',
    paymentMode: 'Phone Pe'
  });

  useEffect(() => {
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, formVar.keyword, formVar.paymentStatus, formVar.paymentMode));
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(fetchorders(formVar.limit, offset, formVar.status))
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, e.target.value, formVar.keyword, formVar.paymentStatus, formVar.paymentMode))
  };

  const handlePaymentChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, paymentStatus: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, formVar.keyword, e.target.value, formVar.paymentMode))
  };

  const handleDeliveryChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, paymentMode: e.target.value }))
    dispatch(fetchorders(formVar.limit, formVar.offset, formVar.status, formVar.keyword, formVar.paymentStatus, e.target.value))
  };

  const downloadInvoice = (id) => {
    dispatch(downloadInvoiceData(id));
  }

  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="3">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="3">
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
                          {/* <a href={downloadUrl+'/carts/invoice/ZC-1714124103023'} download>
                          <Download />
                          </a> */}
                          <Download onClick={(e) => downloadInvoice(item?.paymentHistory?.invoiceNumber)} />
                          <div className="tooltipCustom">Edit</div>
                        </div>
                        {/* <div className='cursor-pointer action-icon'>
                          <FileText onClick={(e) => statusToggleModal(item)} />
                          <div className="tooltipCustom">Status Update</div>
                        </div>
                        <div className='cursor-pointer font-danger action-icon'>
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
    </Fragment>
  );
};

export default Orders;
