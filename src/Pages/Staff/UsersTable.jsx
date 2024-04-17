import React, { Fragment, useEffect, useState,useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Edit, FileText,Shield } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Pagination from '../../Components/Pagination/Pagination';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import { getStaff, statusToggle, ModalToggle, isOpenModal, isOpenStatusModal, addStaff, updateStaff, statusUpdateStaff } from '../../store/staffSlice';
import CustomizerContext from '../../_helper/Customizer';

const UsersTable = () => {
  const storeVar = useSelector(state => state.staff) 
  console.log(storeVar);
  const dispatch = useDispatch(); 
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [togglePassword, setTogglePassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    staffId: null,

    loginId: '',
    password: '',
    name: '',
    emailId: '',
    gender: 'MALE',
    dob: '',
    roles: 'STAFF',
    designation: '',
    panNo: '',
    aadharNo: '',
  });

  useEffect(() => {
    dispatch(getStaff(formVar.limit, formVar.offset, formVar.status, formVar.keyword, formVar.roles))
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getStaff(formVar.limit, offset, formVar.status, formVar.keyword, formVar.roles))
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getStaff(formVar.limit, formVar.offset, e.target.value, e.target.value, formVar.roles))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getStaff(formVar.limit, formVar.offset, e.target.value, formVar.keyword, formVar.roles))
  };
  const EditToggleModal = (data) => {

    formVar.modalTitle=  "Send Coupans";
    dispatch(isOpenModal(true))
    
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      loginId: '',
      password: '',
      name: '',
      emailId: '',
      gender: 'MALE',
      dob: '',
      roles: 'STAFF',
      designation: '',
      panNo: '',
      aadharNo: '',
      modalTitle: 'Add Staff',
    }))
  }
  const onValueChange = (event) => {
    setStateStatus(event.target.value)
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setStateStatus(data.status)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      staffId: data.id,
    }))
  }

  const submitDegree = () => {
    if (nameValid()) {
      setSubmit(true)
      return null
    }
    if (limitValid()) {
      setSubmit(true)
      return null
    }
    if (discountValid()) {
      setSubmit(true)
      return null
    }
    if (minimumValid()) {
      setSubmit(true)
      return null
    }
    if (issueValid()) {
      setSubmit(true)
      return null
    }
    if (expiryValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    console.log(formVar);
  }
  const nameValid = () => {

    if (!formVar.name) {
      return "Coupon Code is required";
    }
  }
  const limitValid = () => {
    if (!formVar.limit) {
      return "Limit is required";
    }
  }
  const discountValid = () => {
    if (!formVar.discount) {
      return "Discount is required";
    }
  }
  const minimumValid = () => {
    if (!formVar.minpurchase) {
      return "Minimum Value is required";
    }
  }
  const issueValid = () => {
    if (!formVar.issueDate) {
      return "Issue Date is required";
    }
  }
  const expiryValid = () => {
    if (!formVar.expirationDate) {
      return "Expiry Date is required";
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateStaff({ id: formVar.staffId, status: stateStatus }))
  }
  
  const loginIdValid = () => {
    if (!formVar.loginId) {
      return "Login Id is required";
    }
  }
  const passwordValid = () => {
    if (!formVar.password) {
      return "Password is required";
    }
  }
  const emailValid = () => {
    let emailValid = /^([a-z0-9.-]+)@([a-z]{4,12}).([a-z.]{2,20})$/
    if (!formVar.emailId) {
      return "Email is required";
    } else if (!emailValid.test(formVar.emailId)) {
      return "Please enter valid email!";
    }
  }
  const dobValid = () => {
    if (!formVar.dob) {
      return "Dob is required";
    }
  }
  const aadharNoValid = () => {
    // const aadharValid=/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/
    if (!formVar.aadharNo) {
      return "Number is required";
    }
    // else if(!aadharValid.test(formVar.aadharNo)){
    //   return "Enter Valid number";
    // }
  }
  const panNoValid = () => {
    // const panValid=/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    if (!formVar.panNo) {
      return "Number is required";
    }
    // else if(!panValid.test(formVar.aadharNo)){
    //   return "Enter Valid number";
    // }
  }
  const designationValid = () => {
    if (!formVar.designation) {
      return "Designation is required";
    }
  }
  const navigate = (id)=>{
    history(`${process.env.PUBLIC_URL}/staff/permission/`+layoutURL+'?id=' +id)
  }
  //   let curr = new Date();
  //   curr.setDate(curr.getDate());
  //   let date = curr.toISOString().substring(0, 10);
  // console.log({date,moment:moment().format("YYYY-MM-DD")});
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="6">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="4">
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='DEACTIVE'>DEACTIVE</option>
                  <option value='PENDING'>PENDING</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="2" className='d-flex justify-content-end align-items-center'>
                {/* <div className="text-end">
                    <Link className="btn btn-primary" style={{ color: 'white', }} to={`${process.env.PUBLIC_URL}/app/project/new-project`}> New Degree</Link>
                  </div> */}
                
              </Col>
            </Row>
            {/* <div className="text-end">
              <Btn attrBtn={{ color: 'info-gradien', size: 'sm', active: false, disabled: false, outline: false  }}>
                Add State
              </Btn>
            </div> */}

          </CardHeader>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Gender</th>
                
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.staffData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.phoneNumber}</td>
                    <td>{item?.userDetail ? item.userDetail?.firstName : ''}</td>
                    <td>{item.email}</td>
                    <td>{item?.userDetail ? item.userDetail?.gender : ''}</td>                    
                  
                    <td>
                      <div className='w-7-r'>
                      {
                        item.status === 'ACTIVE' && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'ACTIVE' && <CheckCircle />}
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
                        item.status === 'DEACTIVE' && <>
                          <span className={`font-danger w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'DEACTIVE' && <XCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                     </div>
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Send Coupan</div>
                        </div>
                        <div className='cursor-pointer action-icon'>
                          <FileText onClick={(e) => statusToggleModal(item)} />
                          <div className="tooltipCustom">View Order</div>
                        </div>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
        {
          storeVar.staffData.length > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalStaff}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <div className="login-main login-tab">
          <Form>
          <FormGroup>
            <Row>
              <Col md='6'>
                <Label className="col-form-label" for="recipient-name">COUPON CODE</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(" ", "").slice(0, 8)}
                  onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, name: e.target.value }))} value={formVar.name} />
              </Col>

              <Col md='6'>
                <Label className="col-form-label" for="recipient-name">LIMIT</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 3)}
                  onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, formlimit: e.target.value }))} value={formVar.formlimit} />
              </Col>
            </Row>
            <Row>
              <Col>
                {submit && nameValid() ? <span className='d-block font-danger'>{nameValid()}</span> : ""}
              </Col>
              <Col>
                {submit && limitValid() ? <span className='d-block font-danger'>{limitValid()}</span> : ""}
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <Label classlimit="col-form-label" for="recipient-name">DISCOUNT</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9 ]/g, "").replace(" ", "").slice(0, 5)}
                  onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, discount: e.target.value }))} value={formVar.discount} />
              </Col>
              <Col md='6'>
                <Label classdiscount="col-form-label" for="recipient-name">MIN PURCHASE</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9 ]/g, "").replace(" ", "").slice(0, 5)}
                  onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, minpurchase: e.target.value }))} value={formVar.minpurchase} />
              </Col>
            </Row>
            <Row>
              <Col>
                {submit && discountValid() ? <span className='d-block font-danger'>{discountValid()}</span> : ""}
              </Col>
              <Col>
                {submit && minimumValid() ? <span className='d-block font-danger'>{minimumValid()}</span> : ""}
              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <Label className="col-form-label" for="recipient-name">USER TYPE</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.userType} 
                  // onChange={handleuserTypeChange}
                  >
                  <option value='ALL'>ALL</option>
                  <option value='NEW'>NEW</option>
                  <option value='OLD'>OLD</option>
                </Input>
              </Col>
              <Col md='6'>
                <Label className="col-form-label" for="recipient-name">PRODUCT TYPE</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.type} 
                  // onChange={handleTypeChange}
                  >
                  <option value='ALL'>ALL</option>
                  <option value='PRODUCT'>PRODUCT</option>
                  <option value='CATEGORY'>CATEGORY</option>
                </Input>
              </Col>
            </Row>
            {!formVar.editState && <>
              <Row>
                <Col md='6'>
                  <Label className="col-form-label" for="recipient-name">ISSUE DATE</Label>
                  <Input className="form-control form-control-inverse btn-square" min={moment().format('YYYY-MM-DD')} name="select" type="DATE"
                    value={formVar.issueDate} 
                    // onChange={handleissueDateChange}
                    >

                  </Input>
                </Col>
                <Col md='6'>
                  <Label className="col-form-label" for="recipient-name">EXPIRY DATE</Label>
                  <Input className="form-control form-control-inverse btn-square" min={moment().format('YYYY-MM-DD')} name="select" type="DATE"
                    value={formVar.expirationDate} 
                    // onChange={handleDateChange}
                    >

                  </Input>
                </Col>
              </Row>
              <Row>
                <Col>
                  {submit && issueValid() ? <span className='d-block font-danger'>{issueValid()}</span> : ""}
                </Col>
                <Col>
                  {submit && expiryValid() ? <span className='d-block font-danger'>{expiryValid()}</span> : ""}
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  <Label className="col-form-label" for="recipient-name">STATUS</Label>
                  <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                    value={formVar.formstatus} 
                    
                    >
                    <option value='ACTIVE'>ACTIVE</option>
                    <option value='DEACTIVE'>DEACTIVE</option>
                    <option value='PENDING'>PENDING</option>
                  </Input>
                </Col>
              </Row>
            </>
            }

          </FormGroup>
        </Form>
         
        </div>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitDegree }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'View Orders of'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            {/* <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' className="radio_animated" name='radio1' checked={stateStatus === 'ACTIVE'} onChange={onValueChange} value='ACTIVE' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>ACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' type='radio' className="radio_animated" name='radio2' checked={stateStatus === 'DEACTIVE'} onChange={onValueChange} value='DEACTIVE' />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>DEACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline3' type='radio' className="radio_animated" name='radio3' checked={stateStatus === 'PENDING'} onChange={onValueChange} value='PENDING' />
              <Label className='mb-0' for='radioinline3'>
                <span className='digits'>PENDING</span>
              </Label>
            </div> */}
            No orders found
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

export default UsersTable;
