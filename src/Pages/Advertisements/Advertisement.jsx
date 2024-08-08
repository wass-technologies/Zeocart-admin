import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import SweetAlert from 'sweetalert2';
import { CheckCircle, XCircle, Trash2, FileText, Image, Edit } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone-uploader';
import CustomizerContext from '../../_helper/Customizer';
import { getAdvertisement, statusUpdateAdvertisement, addAdvertisement, DetailsUpdateAdvertisement, updateImageAdvertisement, deleteAdvertisement, isOpenStatusModal, statusToggle, ModalToggle, isOpenModal, ImagestatusToggle, isImageOpenModal } from '../../store/addvertiseSlice';
import NoImage from '../../assets/images/noimage.png';
 
const Advertisement = () => {
  const storeVar = useSelector(state => state.advertisement)
  const dispatch = useDispatch();
  const history = useNavigate();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const Imagetoggle = () => dispatch(ImagestatusToggle());

  const { layoutURL } = useContext(CustomizerContext);
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    limit: 10,
    offset: 0,
    id: null,
    url: '',
    name: '',
    status: 'ACTIVE',
    formstatus: 'PENDING',
    imageState: false,
    editState: false,
    type: 'SQUARE',
    urlType: 'INTERNAL',
    bannerFile: null,
    bannerImage: null,
    bannerImageURL: null,
  });

  useEffect(() => {
    dispatch(getAdvertisement(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);


  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getAdvertisement(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }

  const handleTypeChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, type: e.target.value }))
  };
  const handleUrlTypeChange
    = (e) => {
      setFormVar((prevFormVar) => ({ ...prevFormVar, urlType: e.target.value }))
    };
  const handleFormStatusChange = (e) => {

    setFormVar((prevFormVar) => ({ ...prevFormVar, formstatus: e.target.value }))

  };

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getAdvertisement(formVar.limit, formVar.offset, e.target.value))
  };


  const statusToggleModal = (data) => {

    setFormVar((prevFormVar) => ({ ...prevFormVar, id: data.id }));

    dispatch(isOpenStatusModal(true))
  }
  const statusEditModal = (data) => {
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
      imageState: false,
      bannerImage: null,
      modalTitle: 'Add Advertisement',
    }))
  }

  const submitDetails = () => {
    if (detailsValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(addAdvertisement(formVar.name, formVar.url, formVar.urlType, formVar.type))
  }
  const EditDetails = () => {
    if (detailsValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(DetailsUpdateAdvertisement(formVar.id, formVar.name, formVar.url, formVar.type, formVar.urlType))
  }

  const submitImage = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }

    setSubmit(false)
    dispatch(updateImageAdvertisement(formVar.id, formVar.bannerFile))
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
    dispatch(statusUpdateAdvertisement({ id: formVar.id, status: formVar.formstatus }))
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

  const filesValid = () => {
    if (!formVar.bannerFile) {
      return "Files is required";
    }
  }
  const detailsValid = () => {

    if (!formVar.name) {
      return "Name is required";
    }
    if (!formVar.url) {
      return "Url is required";
    }
  }

  const navigate = (id) => {
    history(`${process.env.PUBLIC_URL}/banner-specialization/` + layoutURL + '?id=' + id)
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="5">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}

                />
              </Col>
              <Col md="4">
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
                    Add Advertisements
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
                  <th scope='col'>Image</th>
                  <th scope='col'>Redirection Link</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar?.advertisementData?.map((item, index) => (

                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td className='w-25'>
                      {item.image ? <img className='w-10-r h-5-r' src={item.image} alt="" /> : <img className='w-10-r h-5-r' src={NoImage} alt="" />}
                    </td>
                    <td className='w-5-r'>
                      <div className="w-15-r overflow-hidden h-2-5-r">
                        {item.url}
                      </div>
                    </td>
                    <td className='w-5-r'>
                      {item.imageType}
                    </td>
                    <td>
                      <span className={`${item.bgClass} w-50 rounded-1 p-1 me-2 d-flex align-items-center`}>
                        {item.status === 'ACTIVE' && <CheckCircle />}
                        {item.status === 'PENDING' && <CheckCircle />}
                        {item.status === 'DEACTIVE' && <XCircle />}
                        &nbsp; {item.status}
                      </span>
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer font-primary action-icon'>
                          <Edit onClick={(e) => statusEditModal(item)} />
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
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitImage }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>

            <Row>
              <Col md='12'>
                <Label className="col-form-label" for="recipient-name">NAME</Label>
                <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, name: e.target.value }))} value={formVar.name} />

              </Col>
            </Row>
            <Row>
              <Col md='6'>
                <Label className="col-form-label" for="recipient-name">URL TYPE</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.urlType} onChange={handleUrlTypeChange}>
                  <option value='INTERNAL'>INTERNAL</option>
                  <option value='EXTERNAL'>EXTERNAL</option>
                </Input>
              </Col>

              <Col md='6'>
                <Label className="col-form-label" for="recipient-name">TYPE</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.type} onChange={handleTypeChange}>
                  <option value='SQUARE'>SQUARE</option>
                  <option value='LANDSCAPE'>LANDSCAPE</option>
                </Input>
              </Col>
            </Row>
            {!formVar.editState && <>
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
            <Label className="col-form-label" for="recipient-name">URL</Label>
            <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, url: e.target.value }))} value={formVar.url} />
            {submit && detailsValid() ? <span className='d-block font-danger'>{detailsValid()}</span> : ""}
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

export default Advertisement;
