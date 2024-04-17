import React, { Fragment, useEffect, useState,useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn} from '../../../AbstractElements';
import { CheckCircle, XCircle, Edit, FileText, AlignJustify } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../../Components/Modals/modal';
import { useNavigate, useLocation } from "react-router-dom";
import CustomizerContext from "../../../_helper/Customizer";
import { ModalToggle, addCity, getCity, isOpenModal, isOpenStatusModal, statusToggle, statusUpdateCity, updateCity } from '../../../store/citySlice';
import Pagination from '../../../Components/Pagination/Pagination';

const StateTable = () => {
  const storeVar = useSelector(state => state.city)
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const { layoutURL } = useContext(CustomizerContext);
  const [cityName, setCityName] = useState("");
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
    stateId: null,
    cityId:null,
  });

  useEffect(() => {
    const stateId = new URLSearchParams(location.search).get('id');
    if(stateId){
      setFormVar((prevFormVar) => ({ ...prevFormVar, stateId: stateId }))
      dispatch(getCity(formVar.limit, formVar.offset, formVar.status, formVar.keyword,stateId))
    }
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getCity(formVar.limit, formVar.offset, formVar.status, formVar.keyword,formVar.stateId))
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getCity(formVar.limit, formVar.offset, formVar.status, e.target.value,formVar.stateId))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getCity(formVar.limit, formVar.offset, e.target.value, formVar.keyword,formVar.stateId))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      cityId: data.id,
      modalTitle: 'Edit City'
    }))
    setCityName(data.name)
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add City',
    }))
    setCityName('')
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
      cityId: data.id,
    }))
  }

  const submitState = () => {
    if (stateValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editState) {
      dispatch(updateCity({ id: formVar.cityId, name: cityName, stateId:formVar.stateId }))
    } else {
      dispatch(addCity({ name: cityName, stateId:formVar.stateId }))
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateCity({ id: formVar.cityId, status: stateStatus === 'Active' ? true : false }))
  }
  const navigate = (id)=>{
    history(`${process.env.PUBLIC_URL}/location/area/`+layoutURL+'?id=' +id)
  }
  const stateValid = () => {
    if (!cityName) {
      return "State name is required";
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
                    Add City
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
                {storeVar.cityData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.name}</td>
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
                        <div className='cursor-pointer bg-light-info font-info action-icon' onClick={(e)=>navigate(item.id)}>
                          <AlignJustify />
                          <div className="tooltipCustom">Area List</div>
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
          storeVar.cityData.length>0 &&
        <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalCity}
          itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Name</Label>
            <Input className="form-control" type="text" onChange={(e) => setCityName(e.target.value)} value={cityName} />
            {submit && stateValid() ? <span className='d-block font-danger'>{stateValid()}</span> : ""}
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
