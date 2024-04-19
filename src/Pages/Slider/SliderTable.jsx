import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import SweetAlert from 'sweetalert2';
import { CheckCircle, XCircle, Trash2, FileText, AlignJustify } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone-uploader';
import CustomizerContext from '../../_helper/Customizer';
import { addSlider, deleteSlider, getSlider, statusUpdateSlider, isOpenStatusModal, statusToggle, ModalToggle, isOpenModal } from '../../store/sliderSlice';

const SliderTable = () => {
  const storeVar = useSelector(state => state.slider)
  const dispatch = useDispatch();
  const history = useNavigate();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const { layoutURL } = useContext(CustomizerContext);
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    bannerId: null,
    bannerStatus: 'ACTIVE',
    question: '',
    answer: '',
    faqFor: 'HOME',
    bannerFile: null,
    bannerImage: null,
    bannerImageURL: null,
  });

  useEffect(() => {
    dispatch(getSlider(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);


  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getSlider(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getSlider(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };

  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      bannerId: data.id,
      bannerStatus: data.status
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      bannerImage: null,
      modalTitle: 'Add Slider',
    }))
  }

  const submitSlider = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(addSlider({ file: formVar.bannerFile }))
  }
  const SliderDelete = (data) => {
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
          dispatch(deleteSlider({ id: data.id }))
        }
      });
  }
  const onValueChange = (event) => {
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      bannerStatus: event.target.value,
    }))
  }
  const submitStatus = () => {
    dispatch(statusUpdateSlider({ id: formVar.bannerId, status: formVar.bannerStatus }))
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

  const navigate = (id) => {
    history(`${process.env.PUBLIC_URL}/slider-specialization/` + layoutURL + '?id=' + id)
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
            
              {/* <Col md="5">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col> */}
              <Col md="5 ">
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='DEACTIVE'>DEACTIVE</option>
                  <option value='PENDING'>PENDING</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="4">
              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>

                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Slider
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
                  <th scope='col'>Type</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.sliderData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td className='w-25'>
                      <img className='w-8-r h-5-r' src={item.image} alt="" />
                    </td>
                    <td>{item.type}</td>
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
                        <div className='cursor-pointer action-icon'>
                          <FileText onClick={(e) => statusToggleModal(item)} />
                          <div className="tooltipCustom">Status Update</div>
                        </div>
                        <div className='cursor-pointer bg-light-danger font-danger action-icon'>
                          <Trash2 onClick={(e) => SliderDelete(item)} />
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
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          {
            formVar.bannerImageURL && <>
              <div className='d-flex justify-content-center h-10-r'>
                <img className=' h-100' src={formVar.bannerImageURL} alt="" />
              </div>
            </>
          }

          <FormGroup>
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
          <Btn attrBtn={{ color: 'primary', onClick: submitSlider }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' className="radio_animated" name='radio1' checked={formVar.bannerStatus === 'ACTIVE'} onChange={onValueChange} value='ACTIVE' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>ACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' type='radio' className="radio_animated" name='radio2' checked={formVar.bannerStatus === 'DEACTIVE'} onChange={onValueChange} value='DEACTIVE' />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>DEACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline3' type='radio' className="radio_animated" name='radio3' checked={formVar.bannerStatus === 'PENDING'} onChange={onValueChange} value='PENDING' />
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

export default SliderTable;
