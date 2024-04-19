import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Edit, Trash2, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { useNavigate } from "react-router-dom";
import { addFaqs, getFaqs, updateFaqs, ModalToggle, isOpenModal, isOpenStatusModal, statusToggle, statusUpdateFaqStatus, statusDeleteFaq } from '../../store/faqsSlice';
import CustomizerContext from '../../_helper/Customizer';
import Pagination from '../../Components/Pagination/Pagination';
import SweetAlert from 'sweetalert2';


const FaqsTable = () => {
  const storeVar = useSelector(state => state.faqs)
  const dispatch = useDispatch();
  const history = useNavigate();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const { layoutURL } = useContext(CustomizerContext);
  const [submit, setSubmit] = useState(false);
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [formVar, setFormVar] = useState({

    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    faqsId: null,
    faqStatus: 'ACTIVE',
    question: '',
    answer: '',
    faqFor: 'HOME',
  });

  useEffect(() => {
    dispatch(getFaqs(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);


  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(getFaqs(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }
  const pageChange = (page) => {
    console.log(page);
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getFaqs(formVar.limit, offset, formVar.status, formVar.keyword))
  };
  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getFaqs(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {

    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      faqsId: data.id,
      faqStatus: data.status,
      question: data.question,
      answer: data.answer,
      faqFor: data.faqFor,
      modalTitle: 'Edit FAQ'
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add FAQ',
      question: '',
      answer: '',
    }))
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setStateStatus(data.status)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      faqsId: data.id,
    }))
  }
  const onValueChange = (event) => {
    setStateStatus(event.target.value)
  }
  const submitStatus = () => {
    dispatch(statusUpdateFaqStatus({ id: formVar.faqsId, status: stateStatus }))
  }

  const submitDegree = () => {
    if (formVar.editState) {
      if (answerValid()) {
        setSubmit(true)
        return null
      }
      setSubmit(false)
      dispatch(updateFaqs({ id: formVar.faqsId, answer: formVar.answer }))
    } else {
      if (questionValid()) {
        setSubmit(true)
        return null
      }
      setSubmit(false)
      dispatch(addFaqs({ question: formVar.question }))
    }
  }


  const questionValid = () => {
    if (!formVar.question) {
      return "question name is required";
    }
  }

  const answerValid = () => {
    if (!formVar.answer) {
      return "Answer is required";
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
          dispatch(statusDeleteFaq(data.id, 'DELETED'))
        }
      });
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
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add FAQ
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
                  <th scope='col'>Question</th>
                  <th scope='col'>Answer</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.faqsData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.question} </td>
                    <td>{item.answer}</td>
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
          storeVar.faqsData.length > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalFaq}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            {!formVar.editState && <>
              <Label className="col-form-label" for="recipient-name">Question</Label>
              <Input className="form-control" type="text" placeholder='Enter Question' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, question: e.target.value }))} value={formVar.question} />
              {submit && questionValid() ? <span className='d-block font-danger'>{questionValid()}</span> : ""}
            </>}
            {formVar.editState && <>
              <Label className="col-form-label" for="recipient-name">Answer</Label>
              <textarea className='form-control' name='description' rows='3' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, answer: e.target.value }))} value={formVar.answer} />
              {submit && answerValid() ? <span className='d-block font-danger'>{answerValid()}</span> : ""}
            </>}
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

export default FaqsTable;
