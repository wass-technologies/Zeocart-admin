import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, Edit, Trash2, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../../Components/Modals/modal';
import { useNavigate } from "react-router-dom";
import { addFaqs, updateFaqs, isOpenStatusModal, statusToggle, statusUpdateFaqStatus, statusDeleteFaq } from '../../../store/faqsSlice';
import CustomizerContext from '../../../_helper/Customizer';
import Pagination from '../../../Components/Pagination/Pagination';
import SweetAlert from 'sweetalert2';
import { getproductKeyword, ModalToggle, isOpenModal, addproductKeyword, statusDeleteKeyword } from '../../../store/productKeywordSlice';

const ProductKeywordTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const storeVar = useSelector(state => state.productKeyword)
  const params = new URLSearchParams(location.search);
  const productId = params.get('id');
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [submit, setSubmit] = useState(false);
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [formVar, setFormVar] = useState({

    limit: 10,
    offset: 0,
    currentPage: 1,
    modalTitle: null,
    keyword: '',
  });

  useEffect(() => {
    dispatch(getproductKeyword(productId, formVar.limit, formVar.offset))
  }, []);



  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getproductKeyword(productId, formVar.limit, offset))
  };

  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Keywords',
      keyword: '',
    }))
  }


  const submitKeywords = () => {

    if (keywordValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(addproductKeyword(productId, formVar.keyword))

  }


  const keywordValid = () => {
    if (!formVar.keyword) {
      return "Keywords is required";
    }
  }

  const BannerDelete = (data) => {
    SweetAlert.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    })
      .then((result) => {
        if (result.value) {
          dispatch(statusDeleteKeyword(data.id, 'DELETED'))
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

              </Col>
              <Col md="4">

              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Keywords
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
                  <th scope='col'>KeyWord</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.productKeywordData?.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.keyword} </td>

                    <td>
                      <div className='d-flex gap-2'>
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
          storeVar.totalKeyword!=0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalKeyword}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            {!formVar.editState && <>
              <Label className="col-form-label" for="recipient-name">Keywords(For Multiple Seperate By , Comma)</Label>
              <Input className="form-control" type="text" placeholder='Keywords(For Multiple Seperate By , Comma)' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))} value={formVar.keyword} />
              {submit && keywordValid() ? <span className='d-block font-danger'>{keywordValid()}</span> : ""}
            </>}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitKeywords }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
    </Fragment>
  );
};

export default ProductKeywordTable;
