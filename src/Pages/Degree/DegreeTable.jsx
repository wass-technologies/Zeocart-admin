import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn} from '../../AbstractElements';
import {  CheckCircle, XCircle, Edit, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { getDegree, statusToggle, ModalToggle, isOpenModal, isOpenStatusModal, addDegree, updateDegree, statusUpdateDegree } from '../../store/degreeSlice';
import Pagination from '../../Components/Pagination/Pagination';

const DegreeTable = () => {
  const storeVar = useSelector(state => state.degree)
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [degreeName, setDegreeName] = useState("");
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage:1,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    cityId: null,
    degreeId: null,
  });

  useEffect(() => {
    dispatch(getDegree(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getDegree(formVar.limit, offset, formVar.status, formVar.keyword))
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getDegree(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getDegree(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      degreeId: data.id,
      modalTitle: 'Edit Degree'
    }))
    setDegreeName(data.name)
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Degree',
    }))
    setDegreeName('')
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
    setSubmit(false)
    if (formVar.editState) {
      dispatch(updateDegree({ id: formVar.degreeId, name: degreeName }))
    } else {
      dispatch(addDegree({ name: degreeName }))
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateDegree({ id: formVar.degreeId, status: stateStatus }))
  }

  const degreeValid = () => {
    if (!degreeName) {
      return "Degree name is required";
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
              <Col md="3" className='d-flex justify-content-end align-items-center'>
                {/* <div className="text-end">
                    <Link className="btn btn-primary" style={{ color: 'white', }} to={`${process.env.PUBLIC_URL}/app/project/new-project`}> New Degree</Link>
                  </div> */}
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Degree
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
                  <th scope='col'>Name</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.degreeData?.map((item, index) => (
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
                          <FileText onClick={(e) => statusToggleModal(item)} />
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
        {
          storeVar.degreeData.length>0 &&
        <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalDegree}
          itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Name</Label>
            <Input className="form-control" type="text" placeholder='Enter Degree Name' onChange={(e) => setDegreeName(e.target.value)} value={degreeName} />
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
    </Fragment>
  );
};

export default DegreeTable;
