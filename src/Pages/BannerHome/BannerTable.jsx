import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Edit, Image } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone-uploader';
import { updateBanner, getBanner, isImageOpenModal, ModalToggle, isOpenModal, updateBannerUrl, getBannerCopy } from '../../store/bannerSlice';
import { watchCategoryId } from '../../shared/_helper/category-id';
import { headphoneCategoryId } from '../../shared/_helper/category-id';


const BannerTable = () => {
  const storeVar = useSelector(state => state.banner)
  const dispatch = useDispatch();
  const history = useNavigate();
  const toggle = () => dispatch(ModalToggle());
  const Imagetoggle = () => dispatch(isImageOpenModal());
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    bannerId: null,
    bannerStatus: 'ACTIVE',
    bannerFile: null,
    bannerImageURL: null,
    redirectId: '',
  });

  useEffect(() => {
    dispatch(getBanner(formVar.limit, formVar.offset, formVar.status, formVar.keyword, watchCategoryId))
    dispatch(getBannerCopy(formVar.limit, formVar.offset, formVar.status, formVar.keyword, headphoneCategoryId))
  }, []);


  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      bannerId: data.id,
      redirectId: data.redirectId,
      modalTitle: 'Update Banner URL'
    }))
  }

  const ImageEditBannerModal = (data) => {
    dispatch(isImageOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      bannerId: data.id,
      modalTitle: 'Update Banner',
      bannerFile: null,
      bannerImageURL: null,
    }))
  }

  const submitDegree = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(updateBanner(formVar.bannerId, formVar.bannerFile))
  }


  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormVar((prevFormVar) => ({
          ...prevFormVar,
          bannerImageURL: e.target.result,
        }))
      };
      reader.readAsDataURL(file);
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        bannerFile: file,
      }))
    } else if (status === "removed") {
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        bannerFile: null,
        bannerImageURL: null,
      }))
    }
  };

  const filesValid = () => {
    if (!formVar.bannerFile) {
      return "Files is required";
    }
  }
  const submitUrl = () => {
    dispatch(updateBannerUrl(formVar.bannerId, formVar.redirectId))
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
                  <th scope='col'>Image</th>
                  <th scope='col'>Link</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar.bannerData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td className='w-25'>
                      <img className='w-80 h-5-r' src={item.image} alt="" />
                    </td>
                    <th scope='row'>{item.redirectId}</th>
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
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Update Banner Url</div>
                        </div>
                        <div className='cursor-pointer font-success action-icon'>
                          <Image onClick={(e) => ImageEditBannerModal(item)} />
                          <div className="tooltipCustom">Update Image</div>
                        </div>

                      </div>
                    </td>
                  </tr>
                ))}
                {storeVar.bannerDataCopy?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 2}</th>
                    <td className='w-25'>
                      <img className='w-80 h-5-r' src={item.image} alt="" />
                    </td>
                    <th scope='row'>{item.redirectId}</th>
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
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Update Banner Url</div>
                        </div>
                        <div className='cursor-pointer font-success action-icon'>
                          <Image onClick={(e) => ImageEditBannerModal(item)} />
                          <div className="tooltipCustom">Update Image</div>
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
      <CommonModal isOpen={storeVar.isImageOpenModal} title={formVar.modalTitle} toggler={Imagetoggle} >
        <Form>
          {
            formVar.bannerImageURL && <>
              <div className='d-flex justify-content-center h-10-r'>
                <img className=' h-100' src={formVar.bannerImageURL} alt="" />
              </div>
            </>
          }

          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Image</Label>
            <Dropzone
              className='dropzone dz-clickable'
              onChangeStatus={handleChangeStatus}
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
          <Btn attrBtn={{ color: 'secondary', onClick: Imagetoggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitDegree }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Title</Label>
            <Input className="form-control" type="text" placeholder='Enter Banner URL' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, redirectId: e.target.value }))} value={formVar.redirectId} />
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitUrl }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>

    </Fragment>
  );
};

export default BannerTable;
