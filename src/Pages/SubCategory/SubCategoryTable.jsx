import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Edit, FileText, Trash2, Image } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { getCategory } from '../../store/categorySlice';
import { getsubCategory, isOpenModal, ModalToggle, statusToggle, isOpenStatusModal, addSubCategory, updatesubCategory, deleteSubCategoryStatus, statusSubCatDegree, isImageOpenModal, updateImageSubCategory } from '../../store/subCategorySlice';
import Pagination from '../../Components/Pagination/Pagination';
import SweetAlert from 'sweetalert2';
import NoImage from '../../assets/images/noimage.png';
import Dropzone from 'react-dropzone-uploader';


const SubCategoryTable = () => {
  const catVar = useSelector(state => state.category)
  const storeVar = useSelector(state => state.subcategory)
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const Imagetoggle = () => dispatch(isImageOpenModal());
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [submit, setSubmit] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedCatOption, setSelectedCatOption] = useState('');
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    cityId: null,
    addCatId: '',
    id: '',
    name: '',
    bannerFile: '',
    bannerImageURL: '',
  });

  useEffect(() => {
    dispatch(getsubCategory(formVar.limit, formVar.offset, formVar.status, formVar.addCatId, formVar.keyword))
    dispatch(getCategory(50, formVar.offset, formVar.status, formVar.keyword))
  }, []);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    dispatch(getsubCategory(formVar.limit, formVar.offset, formVar.status, value, formVar.keyword));
  };
  const handleaddSelectChange = (event) => {
    setSelectedCatOption(event.target.value);
    setFormVar((prevFormVar) => ({ ...prevFormVar, addCatId: event.target.value }))
  };

  const pageChange = (page) => {

    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))

    dispatch(getsubCategory(formVar.limit, offset, formVar.status, formVar.addCatId, formVar.keyword))
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getsubCategory(formVar.limit, formVar.offset, formVar.status, selectedOption, e.target.value))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getsubCategory(formVar.limit, formVar.offset, e.target.value, selectedOption, formVar.keyword))
  };
  const EditToggleModal = (data) => {

    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      modalTitle: 'Edit Category',
      addCatId: data.categoryId,
      id: data.id,
      name: data.name,
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Sub Category',
      addCatId: '',
      id: '',
      name: '',
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
      degreeId: data.id,
    }))
  }

  const submitDegree = () => {
    if (degreeValid()) {
      setSubmit(true)
      return null
    }
    if (catValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)

    if (formVar.editState) {
      dispatch(updatesubCategory({ id: formVar.id, name: formVar.name, categoryId: formVar.addCatId }))
    } else {
      dispatch(addSubCategory({ name: formVar.name, categoryId: formVar.addCatId }))
    }
  }
  const submitStatus = () => {
    dispatch(statusSubCatDegree(formVar.degreeId, stateStatus))
  }

  const degreeValid = () => {
    if (!formVar.name) {
      return "Sub Category name is required";
    }
  }
  const catValid = () => {
    if (!formVar.addCatId) {
      return "Please select a category";
    }
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
          dispatch(deleteSubCategoryStatus(data.id, 'DEACTIVE'))

        }
      });
  }
  const ImageEditBannerModal = (data) => {

    dispatch(isImageOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      id: data.id,
      modalTitle: 'Update Logo',
    }))
  }

  const submitImage = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }


    setSubmit(false)
    dispatch(updateImageSubCategory(formVar.id, formVar.bannerFile))
  }

  const filesValid = () => {
    if (!formVar.bannerFile) {
      return "Files is required";
    }
  }

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
              <Col md="3">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="3">
                <div>
                  <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                    value={selectedOption} onChange={handleSelectChange}>
                    <option value="">ALL</option>

                    {catVar?.categoryData.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </Col>
              <Col md="3">
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='DEACTIVE'>DEACTIVE</option>
                  <option value='PENDING'>PENDING</option>
                </Input>

              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>

                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Sub Category
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
                  <th scope='col'>Logo</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.subCategoryData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td className={`w-25 ${item.image ? 'with-image' : 'no-image'}`}>
                      {item.image && <img className='w-10-r h-5-r' src={item.image} alt="" />}
                      {!item.image && <img className='w-10-r h-5-r' src={NoImage} alt="" />}
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
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Edit</div>
                        </div>
                        <div className='cursor-pointer font-success action-icon'>
                          <Image onClick={(e) => ImageEditBannerModal(item)} />
                          <div className="tooltipCustom">Update Logo</div>
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
          storeVar.Count > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.Count}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Category</Label>
            <Col md="12">
              <div>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.addCatId} onChange={handleaddSelectChange}>
                  {formVar.addCatId ? (
                    <option value={formVar.addCatId}>
                      {catVar?.categoryData.find(item => item.id === formVar.addCatId)?.name}
                    </option>
                  ) : (
                    <option value="">Select</option>
                  )}
                  {catVar?.categoryData.map((item, index) => {
                    if (item.id !== formVar.addCatId) {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    }
                    return null;
                  })}
                </Input>
                {submit && catValid() ? <span className='d-block font-danger'>{catValid()}</span> : ""}
              </div>
            </Col>
            <Label className="col-form-label" for="recipient-name">Sub Category Name</Label>
            <Input className="form-control" type="text" placeholder='Enter Sub Category Name' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, name: e.target.value }))} value={formVar.name} />
            {submit && degreeValid() ? <span className='d-block font-danger'>{degreeValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitDegree }}>Save Changes</Btn>
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
            <Label className="col-form-label" for="recipient-name">Update Logo</Label>
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
    </Fragment>
  );
};

export default SubCategoryTable;
