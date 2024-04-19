import React, { Fragment, useEffect, useState,useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Edit, FileText,Shield } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Pagination from '../../Components/Pagination/Pagination';

import { statusToggle, ModalToggle, isOpenModal, isOpenStatusModal, addStaff, updateStaff, statusUpdateStaff } from '../../store/staffSlice';
import { getUser } from '../../store/userSlice';
import CustomizerContext from '../../_helper/Customizer';

const UsersTable = () => {
  const storeVar = useSelector(state => state.users) 
  console.log(storeVar);
  const dispatch = useDispatch(); 
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [typingTimer, setTypingTimer] = useState(null);
  const typingDelay = 800;
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'ACTIVE',
    modalTitle: null,
    staffId: null,
  });

  useEffect(() => {
    dispatch(getUser(formVar.limit, formVar.offset, formVar.keyword ))
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    dispatch(getUser(formVar.limit, offset, formVar.status, formVar.keyword))
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    searchWithDelay(e.target.value)
  }
  const searchWithDelay = (keyword) => {
    clearTimeout(typingTimer);
    const timer = setTimeout(() => {
      dispatch(getUser(formVar.limit, formVar.offset, keyword))

    }, typingDelay);
    setTypingTimer(timer);
  };
  const EditToggleModal = (data) => {

    formVar.modalTitle=  "Send Coupans";
    dispatch(isOpenModal(true))
    
  }
 
  const orderToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setStateStatus(data.status)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      staffId: data.id,
    }))
  }

  const submitStatus = () => {
    dispatch(statusUpdateStaff({ id: formVar.staffId, status: stateStatus }))
  }
  
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="6">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="2" className='d-flex justify-content-end align-items-center'>
              </Col>
            </Row>
           
          </CardHeader>
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>Email</th>                
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.userData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.phoneNumber}</td>
                    <td>{item?.userDetail ? item.userDetail?.firstName : ''}</td>
                    <td>{item.email}</td>
                  
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Send Coupan</div>
                        </div>
                        <div className='cursor-pointer action-icon'>
                          <FileText onClick={(e) => orderToggleModal(item)} />
                          <div className="tooltipCustom">View Order</div>
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
          storeVar.totalUser > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalUser}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
      </Col>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'View Orders of'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            No orders found
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

export default UsersTable;
