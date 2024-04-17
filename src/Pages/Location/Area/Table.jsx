import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn} from '../../../AbstractElements';
import { CheckCircle, XCircle, Edit, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../../Components/Modals/modal';
import { useLocation } from "react-router-dom";
import { addArea, getArea, statusUpdateArea, updateArea,statusToggle,ModalToggle, isOpenModal, isOpenStatusModal } from '../../../store/areaSlice';
import Pagination from '../../../Components/Pagination/Pagination';

const StateTable = () => {
  const storeVar = useSelector(state => state.area)
  const dispatch = useDispatch();
  const location = useLocation();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [areaName, setAreaName] = useState("");
  const [pincode, setPincode] = useState("");
  const [stateStatus, setStateStatus] = useState('Active');
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage:1,
    status: true,
    modalTitle: null,
    editState: false,
    cityId: null,
    areaId:null,
  });

  useEffect(() => {
    const cityId = new URLSearchParams(location.search).get('id');
    if(cityId){
      setFormVar((prevFormVar) => ({ ...prevFormVar, cityId: cityId }))
      dispatch(getArea(formVar.limit, formVar.offset, formVar.status, formVar.keyword,cityId))
    }
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getArea(formVar.limit, formVar.offset, formVar.status, formVar.keyword,formVar.cityId))
  };

  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getArea(formVar.limit, formVar.offset, formVar.status, e.target.value,formVar.cityId))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getArea(formVar.limit, formVar.offset, e.target.value, formVar.keyword,formVar.cityId))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      areaId: data.id,
      modalTitle: 'Edit Area'
    }))
    setAreaName(data.name)
    setPincode(data.pincode)
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Area',
    }))
    setAreaName('')
    setPincode('')
  }
  const onValueChange = (event) => {
    setStateStatus(event.target.value)
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    if (data.status) {
      setStateStatus('Active')
    } else {
      setStateStatus('Deactive')
    }
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      areaId: data.id,
    }))
  }

  const submitState = () => {
    if (stateValid() || pincodeValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editState) {
      dispatch(updateArea({ id: formVar.areaId, name: areaName,pincode, cityId:formVar.cityId }))
    } else {
      dispatch(addArea({ name: areaName,pincode,cityId:formVar.cityId }))
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateArea({ id: formVar.areaId, status: stateStatus === 'Active' ? true : false }))
  }

  const stateValid = () => {
    if (!areaName) {
      return "Area name is required";
    }
  }
  const pincodeValid = () => {
    if (!pincode) {
      return "Pincode name is required";
    }else if (pincode.length !==6){
      return 'Please enter valid pincode'
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
                  <option value={true}>Active</option>
                  <option value={false}>Deactive</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Area
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
                  <th scope='col'>Pincode</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.areaData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.pincode}</td>
                    <td>
                      {
                        item.status === true && <>
                          <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                            {item.status === 'ACTIVE' && <CheckCircle />}
                            &nbsp; {item.status}
                          </span>
                        </>
                      }
                      {
                        item.status === false && <>
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
        {
          storeVar.areaData.length>0 &&
        <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalArea}
          itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Name</Label>
            <Input className="form-control" type="text" placeholder='Enter Area Name' onChange={(e) => setAreaName(e.target.value)} value={areaName} />
            {submit && stateValid() ? <span className='d-block font-danger'>{stateValid()}</span> : ""}

            <Label className="col-form-label" for="recipient-name">Pincode</Label>
            <Input className="form-control" type="text" placeholder='Enter Pincode' onChange={(e) => setPincode(e.target.value)} value={pincode} 
            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9 ]/g, "").replace(" ","").slice(0, 6)}/>
            {submit && pincodeValid() ? <span className='d-block font-danger'>{pincodeValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitState }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline custom-radio-ml'>
            <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' name='radio1' checked={stateStatus === 'Active'} onChange={onValueChange} value='Active' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>Active</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline2' type='radio' name='radio1' checked={stateStatus === 'Deactive'} onChange={onValueChange} value='Deactive' />
              <Label className='mb-0' for='radioinline2'>
                <span className='digits'>Deactive</span>
              </Label>
            </div>
          </div>
        </Col>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: statusModalToggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitStatus }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
    </Fragment>
  );
};

export default StateTable;
