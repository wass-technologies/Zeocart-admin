import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { Typeahead } from 'react-bootstrap-typeahead';
import { CheckCircle, XCircle, Edit, FileText, Image } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Dropzone from 'react-dropzone-uploader';
import { getSpecialization, statusToggle, ModalToggle, isOpenModal, isOpenStatusModal, updateSpecialization, addSpecialization, statusUpdateSpecialization, getDegree, isOpenImageModal, imageToggle, addSpecializationBanner, } from '../../store/specializationSlice';

const SpecializationTable = () => {
  const storeVar = useSelector(state => state.specialization)
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const imageModalToggle = () => dispatch(imageToggle());
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    specializationId: null,
    specializationStatus: 'ACTIVE',
    name: '',
    degreeId: null,
    desc: '',
    specializationURL: null,
    specializationFile: null,
    specializationImage:null,
  });

  useEffect(() => {
    dispatch(getSpecialization(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);


  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getSpecialization(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getSpecialization(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(getDegree(100, formVar.offset, formVar.status, formVar.keyword))
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      specializationId: data.id,
      name: data.name,
      degreeId: data.degreeId,
      desc: data.desc ? data.desc : '',
      modalTitle: 'Edit Specialization'
    }))
  }
  const AddToggleModal = () => {
    dispatch(getDegree(100, formVar.offset, formVar.status, formVar.keyword))
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      name: '',
      degreeId: null,
      desc: '',
      modalTitle: 'Add Specialization',
    }))
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      specializationId: data.id,
      specializationStatus: data.status
    }))
  }
  const imageToggleModal = (data) => {
    dispatch(isOpenImageModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      specializationId: data.id,
      specializationImage: data.image,
      specializationURL: null,
    }))
  }
  const submitDegree = () => {
    if (specializationValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editState) {
      dispatch(updateSpecialization({ id: formVar.specializationId, name: formVar.name, degreeId: formVar.degreeId, desc: formVar.desc }))
    } else {
      dispatch(addSpecialization({ name: formVar.name, degreeId: formVar.degreeId, desc: formVar.desc }))
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateSpecialization({ id: formVar.specializationId, status: formVar.specializationStatus }))
  }
  const handleSelect = (e) => {
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      degreeId: e[0]?.id
    }))
  }
  const submitImage = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
      dispatch(addSpecializationBanner({ file: formVar.specializationFile,id:formVar.specializationId }))
  }
  const handleChangeFileStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormVar((prevFormVar) => ({
          ...prevFormVar,
          specializationURL: e.target.result,
        }))
      };
      reader.readAsDataURL(file);
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        specializationFile: file,
      }))
    } else if (status === "removed") {
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        specializationFile: null,
        specializationURL: null,
      }))
    }
  };
  const filesValid = () => {
    if (!formVar.specializationFile) {
      return "Files is required";
    }
  }
  const specializationValid = () => {
    if (!formVar.name) {
      return "Specialization name is required";
    }
  }
  const degreeValid = () => {
    if (!formVar.degreeId) {
      return "Degree is required";
    }
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="5" className='pb-2'>
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="4" className='pb-2'>
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='DEACTIVE'>DEACTIVE</option>
                  <option value='PENDING'>PENDING</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>
                {/* <div className="text-end">
                    <Link className="btn btn-primary" style={{ color: 'white', }} to={`${process.env.PUBLIC_URL}/app/project/new-project`}> New Degree</Link>
                  </div> */}
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Specialization
                  </Btn>
                </div>
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
                  <th scope='col'>Image</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.specializData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td className='w-2-r'>
                      {/* <div className="w-25"> */}
                      <img className='w-100 ' src={item.image} alt="img" />
                      {/* </div> */}
                    </td>
                    <td>{item.name}</td>
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
                        <div className='cursor-pointer action-icon'>
                          <FileText onClick={(e) => statusToggleModal(item)} />
                          <div className="tooltipCustom">Status Update</div>
                        </div>
                        <div className='cursor-pointer bg-light-success font-success action-icon'>
                          <Image onClick={(e) => imageToggleModal(item)} />
                          <div className="tooltipCustom">Image Upload</div>
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
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Degree</Label>
            <Typeahead
              id="basic-typeahead"
              labelKey="name"
              multiple={false}
              options={storeVar.degreeData}
              value={formVar.name}
              onChange={(e) => handleSelect(e)}
              placeholder="Choose a degree..."
            />
            {submit && degreeValid() ? <span className='d-block font-danger'>{degreeValid()}</span> : ""}
            <Label className="col-form-label" for="recipient-name">Name</Label>
            <Input className="form-control" type="text" placeholder='Enter Specialization Name' onChange={(e) => setFormVar((prevFormVar) => ({
              ...prevFormVar,
              name: e.target.value
            }))} value={formVar.name} />
            {submit && specializationValid() ? <span className='d-block font-danger'>{specializationValid()}</span> : ""}
            <Label className="col-form-label" for="recipient-name">Description</Label>
            <textarea className='form-control' name='description' rows='3' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, desc: e.target.value }))} value={formVar.desc} />
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
              <Input id='radioinline1' className="radio_animated" type='radio' name='radio1' checked={formVar.specializationStatus === 'ACTIVE'} onChange={(e) => setFormVar((prevFormVar) => ({
                ...prevFormVar,
                specializationStatus: e.target.value
              }))} value='ACTIVE' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>ACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' className="radio_animated" type='radio' name='radio2' checked={formVar.specializationStatus === 'DEACTIVE'} onChange={(e) => setFormVar((prevFormVar) => ({
                ...prevFormVar,
                specializationStatus: e.target.value
              }))} value='DEACTIVE' />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>DEACTIVE</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline3' className="radio_animated" type='radio' name='radio3' checked={formVar.specializationStatus === 'PENDING'} onChange={(e) => setFormVar((prevFormVar) => ({
                ...prevFormVar,
                specializationStatus: e.target.value
              }))} value='PENDING' />
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

      <CommonModal isOpen={storeVar.isImageOpenModal} title={'Image Upload'} toggler={imageModalToggle} >
        <Form>
          {
            formVar.specializationURL || formVar.specializationImage ?<>
              <div className='d-flex justify-content-center h-10-r'>
                <img className=' h-100' src={formVar.specializationURL?formVar.specializationURL:formVar.specializationImage} alt="" />
              </div>
            </>
            :""
          }

          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Image</Label>
            <Dropzone
              className='dropzone dz-clickable'
              onChangeStatus={handleChangeFileStatus}
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
    </Fragment>
  );
};

export default SpecializationTable;
