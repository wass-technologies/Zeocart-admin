import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Trash2, Edit, Image, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Dropzone from 'react-dropzone-uploader';
import NoImage from '../../assets/images/noimage.png';

import { fetchbrand, addBrand, updateBrand, statusToggle, statusUpdateBrandStatus, statusDeleteBrandStatus, isOpenModal, ModalToggle, isOpenStatusModal, isImageOpenModal, ImagestatusToggle, updateImageBrands } from '../../store/brandsSlice';
import Pagination from '../../Components/Pagination/Pagination';
import SweetAlert from 'sweetalert2'; 

const BrandTable = () => {
  const storeVar = useSelector(state => state.brands)
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
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    cityId: null,
    brandId: null,
    keyword: '',
    brandName: '',
    bannerFile: null,
    bannerImageURL: null,
  });

  useEffect(() => {
    dispatch(fetchbrand(formVar.limit, formVar.offset, formVar.status, formVar.keyword,));
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(fetchbrand(formVar.limit, offset, formVar.status))
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(fetchbrand(formVar.limit, formVar.offset, formVar.status, e.target.value))
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
          dispatch(statusDeleteBrandStatus(data.id, 'DELETED'))

        }
      });
  }
  const ImageEditModal = (data) => {
    console.log(data);
    dispatch(isImageOpenModal(true))
    setFormVar((prevFormVar) => ({
      id: data.id,
      modalTitle: 'Update Image',
    }))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(fetchbrand(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      brandId: data.id,
      modalTitle: 'Edit Brand'
    }))
    setBrandsName(data.name)
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Brand',
    }))
    setBrandsName('')
  }
  const onValueChange = (event) => {
    setStateStatus(event.target.value)
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setStateStatus(data.status)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      brandId: data.id,
    }))
  }
  const submitImage = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }
    console.log(formVar);

    setSubmit(false)
    dispatch(updateImageBrands(formVar.id, formVar.bannerFile))
  }
  const filesValid = () => {
    if (!formVar.bannerFile) {
      return "Files is required";
    }
  }
  const submitBrands = () => {
    if (BrandsValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editState) {
      dispatch(updateBrand({ id: formVar.brandId, name: brandsName }))
    } else {

      dispatch(addBrand(brandsName))
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateBrandStatus({ id: formVar.brandId, status: stateStatus }))
  }

  const BrandsValid = () => {
    if (!brandsName) {
      return "Brand name is required";
    }
  }
   // called every time a file's `status` changes
   const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormVar((prevFormVar) => ({
          ...prevFormVar,
          bannerImageURL: e.target.result,
        }))
      };
      reader.readAsDataURL(file);
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        bannerFile: file,
      }))
    } else if (status === "removed") {
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        bannerFile: null,
        bannerImageURL: null,
      }))
    }
  };
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="5">
                <Input className="form-control" placeholder='Search..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="4">
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='DELETED'>DELETED</option>
                  <option value='PENDING'>PENDING</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>

                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Brands
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
                  <th scope='col'>Name</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar?.brandData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    
                    <td className={`w-25 ${item.image ? 'with-image' : 'no-image'}`}>
                      {item.image && <img className='w-80 h-5-r' src={item.image} alt="" />}
                      {!item.image && <img className='w-75 h-5-r' src={NoImage} alt="" />}
                    </td>
                    <td>
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
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Edit</div>
                        </div>
                        <div className='cursor-pointer font-success action-icon'>
                          <Image onClick={(e) => ImageEditModal(item)} />
                          <div className="tooltipCustom">Update Image</div>
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
        {/* {
          storeVar.totalDegree > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalDegree}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        } */}
      </Col>
      <CommonModal isOpen={storeVar.isImageOpenModal} title={formVar.modalTitle} toggler={Imagetoggle} >
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
          <Btn attrBtn={{ color: 'secondary', onClick: Imagetoggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitImage }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Name</Label>
            <Input className="form-control" type="text" placeholder='Enter Brand Name' onChange={(e) => setBrandsName(e.target.value)} value={brandsName} />
            {submit && BrandsValid() ? <span className='d-block font-danger'>{BrandsValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitBrands }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            <div className='radio radio-primary'>
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

export default BrandTable;
