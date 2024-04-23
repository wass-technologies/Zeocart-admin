import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import SweetAlert from 'sweetalert2';
import moment from 'moment';
import { CheckCircle, XCircle, Trash2, FileText, Image, Edit } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone-uploader';
import CustomizerContext from '../../_helper/Customizer';
import { getCouponData, statusUpdateCoupons, addCoupon, DetailsUpdateAdvertisement, updateImageAdvertisement, deleteAdvertisement, isOpenStatusModal, statusToggle, ModalToggle, isOpenModal, ImagestatusToggle, isImageOpenModal } from '../../store/couponSlice';
import Pagination from '../../Components/Pagination/Pagination';
 
 

const Coupons = () => {
  const storeVar = useSelector(state => state.coupon)
  console.log(storeVar);


  const dispatch = useDispatch();
  const history = useNavigate();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const Imagetoggle = () => dispatch(ImagestatusToggle());

  const { layoutURL } = useContext(CustomizerContext);
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    id: null,
    url: '',
    name: '',
    limit: 10,
    formlimit: '',
    offset: 0,
    currentPage:1,
    discount: '',
    minpurchase: '',
    expirationDate: '',
    issueDate: '',
    status: 'ACTIVE',
    formstatus: 'PENDING',
    imageState: false,
    editState: false,
    type: 'ALL',
    userType: 'ALL',
    bannerFile: null,
    bannerImage: null,
    bannerImageURL: null,
  });

  useEffect(() => {
    dispatch(getCouponData(formVar.limit, formVar.offset, formVar.status, formVar.userType, formVar.type))
  }, []);


  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getCouponData(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }
  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getCouponData(formVar.limit, formVar.offset, formVar.status, formVar.userType, formVar.type))
  };

  const handleTypeChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, type: e.target.value }))
  };

  const handleDateChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, expirationDate: e.target.value }))
  }

  const handleissueDateChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, issueDate: e.target.value }))
  }
  const handleuserTypeChange
    = (e) => {
      setFormVar((prevFormVar) => ({ ...prevFormVar, userType: e.target.value }))
    };
  const handleFormStatusChange = (e) => {

    setFormVar((prevFormVar) => ({ ...prevFormVar, formstatus: e.target.value }))

  };

  const handletypeChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, userType: e.target.value }))
    dispatch(getCouponData(formVar.limit, formVar.offset, formVar.status, e.target.value, formVar.type))
  };
  const handleproductChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, type: e.target.value }))
    dispatch(getCouponData(formVar.limit, formVar.offset,formVar.status, formVar.userType, e.target.value))
  };
  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getCouponData(formVar.limit, formVar.offset, e.target.value, formVar.userType, formVar.type))
  };


  const statusToggleModal = (data) => {

    setFormVar((prevFormVar) => ({ ...prevFormVar, id: data.id }));

    dispatch(isOpenStatusModal(true))
  }
  const statusEditModal = (data) => {
    console.log(data);
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      id: data.id,
      name: data.name,
      url: data.url,
      editState: true,
      bannerImage: null,
      modalTitle: 'Edit Advertisement',
    }))

  }


  const ImageEditModal = (data) => {
    console.log(data);

    dispatch(isImageOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      imageState: true,
      bannerImage: null,
      id: data.id,
      modalTitle: 'Update Image',
    }))
  }

  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'AddCoupons',
    }))
  }

  const submitDetails = () => {
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
    dispatch(addCoupon({
      couponCode: formVar.name, discountAmount: formVar.discount, expirationDate: formVar.expirationDate, issuedDate: formVar.issueDate,
      usageLimit: formVar.formlimit, userRestrictions: formVar.userType, coupanFor: formVar.type, minPurchaseAmount: formVar.minpurchase, status: formVar.formstatus
    }))
  }
  const EditDetails = () => {
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
    dispatch(DetailsUpdateAdvertisement(formVar.id, formVar.name, formVar.url, formVar.type, formVar.urlType))
  }

  const BannerDelete = (data) => {
    SweetAlert.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'cancel',
      reverseButtons: true
    })
      .then((result) => {
        if (result.value) {
          console.log(data);
          dispatch(deleteAdvertisement({ id: data.id, status: 'DELETED' }))

        }
      });
  }
  const onValueChange = (event) => {

    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      formstatus: event.target.value,
    }))
  }


  const submitStatus = () => {
    dispatch(statusUpdateCoupons({ id: formVar.id, status: formVar.formstatus }))
  }
  // called every time a file's `status` changes
  

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
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.type} onChange={(e) => handleproductChange(e)}>
                  <option value='ALL'>ALL</option>
                  <option value='PRODUCT'>PRODUCT</option>
                  <option value='CATEGORY'>CATEGORY</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="3">
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={(e) => handleInputChange(e)}>
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='DEACTIVE'>DEACTIVE</option>
                  <option value='PENDING'>PENDING</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>

                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Coupons
                  </Btn>
                </div>
              </Col>
            </Row>


          </CardHeader>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Code</th>
                  <th scope='col'>Discount</th>
                  <th scope='col'>Min Purchase</th>
                  <th scope='col'>Limit</th>
                  <th scope='col'>User Type</th>
                  <th scope='col'>Expiry Date</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar?.couponData?.map((item, index) => (

                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>
                      {item.couponCode}
                    </td>
                    <td >
                      {item.discountAmount}
                    </td>
                    <td >
                      {item.minPurchaseAmount}
                    </td>
                    <td >
                      {item.usageLimit}
                    </td>
                    <td >
                      {item.coupanFor}
                    </td>
                    <td >
                      {item.expirationDate}
                    </td>
                    <td>
                      <span className={`${item.bgClass} `}>
                        &nbsp; {item.status}
                      </span>
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer font-primary action-icon'>
                          <Edit onClick={(e) => statusEditModal(item)} />
                          <div className="tooltipCustom">Edit</div>
                        </div>
                        <div className='cursor-pointer action-icon'>
                          <FileText onClick={(e) => statusToggleModal(item)} />
                          <div className="tooltipCustom">Status Update</div>
                        </div>
                        <div className='cursor-pointer font-danger action-icon'>
                          <Trash2 onClick={(e) => BannerDelete(item)} />
                          <div className="tooltipCustom">Delete</div>
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
          storeVar.totalcoupon>0 &&
        <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalcoupon}
          itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      {/* <CommonModal isOpen={storeVar.isImageOpenModal} title={formVar.modalTitle} toggler={Imagetoggle} >
        <Form>
          <FormGroup>
            {
              formVar.bannerImageURL && <>
                <div className='d-flex justify-content-center h-10-r'>
                  <img className=' h-100' src={formVar.bannerImageURL} alt="" />
                </div>
              </>
            }
            <Label className="col-form-label" for="recipient-name">Image</Label>
            <Dropzone
              className='dropzone dz-clickable'
              onChangeStatus={handleChangeStatus}
              maxFiles={1}
              multiple={false}
              // canCancel={false}
              accept="image/*"
              inputContent='Drop A File'
              styles={{
                dropzone: { width: '100%', height: 150 },
                dropzoneActive: { borderColor: 'green' },
              }}
            />
            {submit && filesValid() ? <span className='d-block font-danger'>{filesValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitImage }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal> */}
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
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
                  value={formVar.userType} onChange={handleuserTypeChange}>
                  <option value='ALL'>ALL</option>
                  <option value='NEW'>NEW</option>
                  <option value='OLD'>OLD</option>
                </Input>
              </Col>
              <Col md='6'>
                <Label className="col-form-label" for="recipient-name">PRODUCT TYPE</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.type} onChange={handleTypeChange}>
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
                    value={formVar.issueDate} onChange={handleissueDateChange}>

                  </Input>
                </Col>
                <Col md='6'>
                  <Label className="col-form-label" for="recipient-name">EXPIRY DATE</Label>
                  <Input className="form-control form-control-inverse btn-square" min={moment().format('YYYY-MM-DD')} name="select" type="DATE"
                    value={formVar.expirationDate} onChange={handleDateChange}>

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
                    value={formVar.formstatus} onChange={handleFormStatusChange}>
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
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          {formVar.editState && <>
            <Btn attrBtn={{ color: 'primary', onClick: EditDetails }}>Save Changes</Btn>
          </>
          }
          {!formVar.editState && <> 
            <Btn attrBtn={{ color: 'primary', onClick: submitDetails }}>Save Changes</Btn>
          </>
          }
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' name='radio1' checked={formVar.formstatus === 'ACTIVE'} onChange={onValueChange} value='ACTIVE' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>ACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' type='radio' name='radio2' checked={formVar.formstatus === 'DEACTIVE'} onChange={onValueChange} value='DEACTIVE' />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>DEACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline3' type='radio' name='radio3' checked={formVar.formstatus === 'PENDING'} onChange={onValueChange} value='PENDING' />
              <Label className='mb-0' for='radioinline3'>
                <span className='digits'>PENDING</span>
              </Label>
            </div>
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

export default Coupons;
