import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Edit, Image, HardDrive, FileText, Film } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Dropzone from 'react-dropzone-uploader';
import { addFaqs, updateFaqs } from '../../store/faqsSlice';
import { getSettings, ModalToggle, isOpenModal, statusToggle, imageToggle, isOpenImageModal, isOpenStatusModal, addSettingsBanner1, addSettingsBanner2, statusUpdateSettings } from '../../store/settingsSlice';

const SettingsTable = () => {
  const storeVar = useSelector(state => state.settings)
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const imageModalToggle = () => dispatch(imageToggle());
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    settingId: null,
    settingStatus: 'ACTIVE',
    user_domain: '',
    admin_domain:'',
    mobile_domain:'',
    faqFor: 'HOME',
    settingIdURL: null,
    settingFile: null,
    settingIdImage: null,
    imageStatus: null,
  });

  useEffect(() => {
    dispatch(getSettings(formVar.limit, formVar.offset, formVar.status, formVar.keyword))
  }, []);


 

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(getSettings(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({ 
      ...prevFormVar,
      editState: true,
      
      user_domain: data.user_domain,
      admin_domain: data.admin_domain,
      mobile_domain: data.mobile_domain,
      settingId: data.id,
      settingStatus: data.status,
      modalTitle: 'Edit Settings'
    }))
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Settings',
    }))
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setStateStatus(data.status)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      settingId: data.id,
    }))
  }
  const imageToggleModal = (data, type) => {
    dispatch(isOpenImageModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      settingId: data.id,
      settingIdImage: data.image,
      imageStatus: type,
      settingIdURL: null,
    }))
  }
  const submitSettings = () => {
    if (formVar.editState) {
      if (answerValid()) {
        setSubmit(true)
        return null
      }
      setSubmit(false)
      dispatch(updateFaqs({ id: formVar.settingId, question: formVar.question, answer: formVar.answer, status: formVar.settingStatus, faqFor: formVar.faqFor }))
    } else {
      if (questionValid() || statusValid() || faqForValid()) {
        setSubmit(true)
        return null
      }
      setSubmit(false)
      dispatch(addFaqs({ question: formVar.question, answer: formVar.answer, status: formVar.settingStatus, faqFor: formVar.faqFor }))
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateSettings({ id: formVar.settingId, status: stateStatus }))
  }
  const submitImage = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.imageStatus === 1) {
      dispatch(addSettingsBanner1({ file: formVar.settingFile, id: formVar.settingId }))
    } else if (formVar.imageStatus === 2) {
      dispatch(addSettingsBanner2({ file: formVar.settingFile, id: formVar.settingId }))
    }
  }
  const handleChangeFileStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormVar((prevFormVar) => ({
          ...prevFormVar,
          settingIdURL: e.target.result,
        }))
      };
      reader.readAsDataURL(file);
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        settingFile: file,
      }))
    } else if (status === "removed") {
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        settingFile: null,
        settingIdURL: null,
      }))
    }
  };
  const filesValid = () => {
    if (!formVar.settingFile) {
      return "Files is required";
    }
  }

  const questionValid = () => {
    if (!formVar.question) {
      return "question name is required";
    }
  }
  const statusValid = () => {
    if (!formVar.status) {
      return "Status is required";
    }
  }
  const faqForValid = () => {
    if (!formVar.faqFor) {
      return "FAQ for is required";
    }
  }
  const answerValid = () => {
    if (!formVar.answer) {
      return "Answer is required";
    }
  }
  return (
    <Fragment>
      <Col sm='12'>
        <Card>

          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Banner 1</th>
                  <th scope='col'>User Domain</th>
                  <th scope='col'>Mobile Domain</th>
                  <th scope='col'>Admin Domain</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.settingsData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>
                      <div className="w-4-r cursor-pointer font-success action-icon">
                        {item.mainBanner ? (
                          <Film />
                        ) : (
                          <span>No video found</span>
                        )}
                      </div>
                    </td>


                    <td>{item.user_domain}</td>
                    <td>{item.mobile_domain}</td>
                    <td>{item.admin_domain}
                    </td>
                    <td>
                      <div className='w-7-r'>
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
                      </div>

                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Edit</div>
                        </div>
                        <div className='cursor-pointer bg-light-success font-success action-icon'>
                          <Image
                            onClick={(e) => imageToggleModal({ id: item.id, image: item.banner1 }, 1)}
                          />
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
            <Label className="col-form-label" for="recipient-name">User Domain</Label>
            <Input className="form-control" type="text" placeholder='Enter User Domain' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, question: e.target.value }))} value={formVar.user_domain} />
            <Label className="col-form-label" for="recipient-name">Mobile Domain</Label>
            <Input className="form-control" type="text" placeholder='Enter Mobile Domain' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, question: e.target.value }))} value={formVar.mobile_domain} />
            <Label className="col-form-label" for="recipient-name">Admin Domain</Label>
            <Input className="form-control" type="text" placeholder='Enter Admin Domain' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, question: e.target.value }))} value={formVar.admin_domain} />

            {submit && questionValid() ? <span className='d-block font-danger'>{questionValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitSettings }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>


      <CommonModal isOpen={storeVar.isImageOpenModal} title={'Image Upload'} toggler={imageModalToggle} >
        <Form>
          {
            formVar.settingIdURL || formVar.settingIdImage ? <>
              <div className='d-flex justify-content-center h-10-r bgLightBlack'>
                <img className=' h-100' src={formVar.settingIdURL ? formVar.settingIdURL : formVar.settingIdImage} alt="" />
              </div>
            </>
              : ""
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
          <Btn attrBtn={{ color: 'secondary', onClick: imageModalToggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitImage }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
    </Fragment>
  );
};

export default SettingsTable;
