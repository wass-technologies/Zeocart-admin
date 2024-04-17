import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Edit, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { getLanguages,isOpenModal, isOpenStatusModal, statusToggle,ModalToggle, updateLanguages, addLanguages, statusUpdateLanguages } from '../../store/languagesSlice';

const LanguagesTable = () => {
  const storeVar = useSelector(state => state.languages)
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    status: 'ACTIVE',
    modalTitle: null,
    editLanguages: false,
    languagesId: null,
    name:'',
  });

  useEffect(() => {
    dispatch(getLanguages(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);


  const searchLanguages = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getLanguages(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getLanguages(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editLanguages: true,
      languagesId: data.id,
      name:data.name,
      modalTitle: 'Edit Languages'
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editLanguages: false,
      languagesId: '',
      name:'',
      modalTitle: 'Add Languages',
    }))
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      languagesId: data.id,
      status:data.status,
    }))
  }

  const submitLanguages = () => {
    if (languagesValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editLanguages) {
      dispatch(updateLanguages({ id: formVar.languagesId, name: formVar.name }))
    } else {
      dispatch(addLanguages({ name: formVar.name }))
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateLanguages({ id: formVar.languagesId, status: formVar.status }))
  }
  const languagesValid = () => {
    if (!formVar.name) {
      return "Languages name is required";
    }
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="5">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchLanguages(e)}
                />
              </Col>
              <Col md="4">
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='ACTIVE'>Active</option>
                  <option value='DEACTIVE'>Deactive</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Languages
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
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.languagesData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
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
                          <FileText onClick={(e) => statusToggleModal(item)}/>
                          <div className="tooltipCustom">Status Update</div>
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
            <Label className="col-form-label" for="recipient-name">Name</Label>
            <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({
                  ...prevFormVar,name:e.target.value}))} value={formVar.name} />
            {submit && languagesValid() ? <span className='d-block font-danger'>{languagesValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitLanguages }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' name='radio1' checked={formVar.status === 'ACTIVE'} onChange={(e) => setFormVar((prevFormVar) => ({
                  ...prevFormVar,status:e.target.value}))} value={'ACTIVE'} />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>Active</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' type='radio' name='radio1' checked={formVar.status === 'DEACTIVE'} onChange={(e) => setFormVar((prevFormVar) => ({
                  ...prevFormVar,status:e.target.value}))} value={'DEACTIVE'} />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>Deactive</span>
              </Label>
            </div>
          </div>
        </Col>
        <ModalFooter className='d-flex justify-content-center '>
          <Btn attrBtn={{ color: 'secondary', onClick: statusModalToggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitStatus }}>Save</Btn>
        </ModalFooter>
      </CommonModal>
    </Fragment>
  );
};

export default LanguagesTable;
