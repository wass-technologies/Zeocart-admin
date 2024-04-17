import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import SweetAlert from 'sweetalert2';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Btn } from '../../../AbstractElements';
import { Trash2 } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import CommonModal from '../../../Components/Modals/modal';
import { addSliderSpecialization, deleteSliderSpecialization, getSliderSpecialization,getSpecialization,ModalToggle, isOpenModal } from '../../../store/sliderSpecializationSlice';

const SliderSpecializationTable = () => {
  const storeVar = useSelector(state => state.sliderSpecialization)
  const dispatch = useDispatch();
  const location = useLocation();
  const toggle = () => dispatch(ModalToggle());
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    status: 'PENDING',
    specializationStatus: 'ACTIVE',
    selectedSpecialization:[],
    modalTitle: null,
    editState: false,
    bannerId: null,
  });

  useEffect(() => {
    const bannerId = new URLSearchParams(location.search).get('id');
    if (bannerId) {
      setFormVar((prevFormVar) => ({ ...prevFormVar, bannerId: bannerId }))
      dispatch(getSliderSpecialization(formVar.limit, formVar.offset, formVar.keyword, bannerId))
    }
  }, []);


  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getSliderSpecialization(formVar.limit, formVar.offset, formVar.keyword, formVar.bannerId))
  }

  const deleteSpecialization = (data) => {
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
        console.log(result);
        if (result.value) {
          dispatch(deleteSliderSpecialization({id:data.id}))
        }
      });
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    dispatch(getSpecialization(formVar.limit, formVar.offset, formVar.specializationStatus, formVar.keyword))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Specialization',
    }))
  }

  const submitDegree = () => {
    if (specializationValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(addSliderSpecialization(formVar.bannerId,formVar.selectedSpecialization))
  }
  const handleSelect = (e) => {
    let select=[]
    e.forEach(element => {
      select.push({
        specializationId:element.specializationId,
        name:element.name
      })
    });
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      selectedSpecialization:select
    }))
  }
  const specializationValid = () => {
    if (formVar.selectedSpecialization.length<=0) {
      return "Specialization name is required";
    }
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="8">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="4" className='d-flex justify-content-end align-items-center'>
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
                  <th scope='col'>Specialization Name</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.sliderSpecializationData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.specialization?.name}</td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-danger font-danger action-icon'>
                          <Trash2 onClick={(e) => deleteSpecialization(item)} />
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
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Name</Label>
            <div>
              <Typeahead
                id="multiple-typeahead"
                clearButton
                // defaultSelected={storeVar.specialization.slice(0, 5)}
                labelKey={'name'}
                multiple
                options={storeVar.specialization}
                onChange={(e) => handleSelect(e)}
                placeholder="Choose a specialization..."
              />
            </div>
            {submit && specializationValid() ? <span className='d-block font-danger'>{specializationValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitDegree }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
    </Fragment>
  );
};

export default SliderSpecializationTable;
