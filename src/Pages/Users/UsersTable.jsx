import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { Edit } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CryptoJS from "crypto-js";
import { statusToggle, ModalToggle, addDegree, updateDegree, statusUpdateDegree } from '../../store/degreeSlice';
import { getUser } from '../../store/userSlice';
import CustomizerContext from '../../_helper/Customizer';
import Pagination from '../../Components/Pagination/Pagination';

const UsersTable = () => {
  const storeVar = useSelector(state => state.users)
  const dispatch = useDispatch();
  const history = useNavigate()
  const { layoutURL } = useContext(CustomizerContext);
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  // const [currentPage, setCurrentPage] = useState(1);
  const [degreeName, setDegreeName] = useState("");
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '', 
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    cityId: null,
    degreeId: null,
    fromDate: moment().subtract(2, 'days').format('YYYY-MM-DD'),
    toDate: moment().add(30, 'days').format('YYYY-MM-DD'),
  });

  useEffect(() => {
    dispatch(getUser(formVar.limit, formVar.offset, formVar.keyword, formVar.fromDate, formVar.toDate))
  }, []);

  const searchState = () => {
    dispatch(getUser(formVar.limit, formVar.offset, formVar.keyword, formVar.fromDate, formVar.toDate))
  }
  const pageChange = (page) => {
    console.log(page);
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    console.log({ offset });
    storeVar.storeVar.userData=[]
    dispatch(getUser(formVar.limit, offset, formVar.keyword, formVar.fromDate, formVar.toDate))
  };
  const EditToggleModal = (data) => {
    history(`${process.env.PUBLIC_URL}/user_list/users/edit/` + layoutURL + '?id=' + data.id)
  }
  const onValueChange = (event) => {
    setStateStatus(event.target.value)
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
  function decryptData(text, manager) {
    try {
      const combined = CryptoJS.enc.Base64.parse(text);

      const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4));
      const encryptedText = CryptoJS.lib.WordArray.create(combined.words.slice(4));

      const key = CryptoJS.PBKDF2(manager, iv, {
        keySize: 256 / 32,
        iterations: 65536,
        hasher: CryptoJS.algo.SHA256,
      });

      const decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: encryptedText,
        },
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      return decryptedText.trim();
    } catch (error) {
      console.error("Decryption error:", error);
      return "";
    }
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="4">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="3">
                <Input className="form-control form-control-inverse btn-square" name="date" type="date"
                  value={formVar.fromDate} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, fromDate: e.target.value }))}></Input>
              </Col>
              <Col md="3">
                <Input className="form-control form-control-inverse btn-square" name="date" type="date"
                  value={formVar.toDate} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, toDate: e.target.value }))}></Input>
              </Col>
              <Col md="2" className='d-flex justify-content-end align-items-center'>
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: searchState }}>
                    Submit
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
                  <th scope='col'>Email</th>
                  <th scope='col'>Phone Number</th>
                  <th scope='col'>Gender</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.userData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>
                      {(item.name, item.accountId)}
                    </td>
                    <td>
                      {decryptData(item.email, item.accountId)}
                    </td>
                    <td>
                      {decryptData(item.phoneNumber, item.accountId)}
                    </td>
                    <td>
                      {item.gender}
                    </td>
                    <td>
                      {decryptData(item.address, item.accountId)}
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Edit</div>
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
          storeVar.userData?.length > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalUser}
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

export default UsersTable;
