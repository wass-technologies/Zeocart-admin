import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../../AbstractElements';
import { useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, Trash2, Edit, Image, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../../Components/Modals/modal';
import Dropzone from 'react-dropzone-uploader';
import NoImage from '../../../assets/images/noimage.png';

import { fetchProductImage, addProductImage, statusDeleteProduct, addBrand, updateBrand, statusToggle, statusUpdateBrandStatus, statusDeleteBrandStatus, isOpenModal, ModalToggle, isOpenStatusModal, isImageOpenModal, ImagestatusToggle, updateImageBrands, addProductImageUrl } from '../../../store/productImageSlice';
import SweetAlert from 'sweetalert2';

const AddProductBanners = () => {
  const storeVar = useSelector(state => state.productImage)
  console.log(storeVar);
  const dispatch = useDispatch();
  const location = useLocation();
  const toggle = () => dispatch(ModalToggle());
  const Imagetoggle = () => dispatch(ImagestatusToggle());
  const [url, setUrl] = useState("");
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [submit, setSubmit] = useState(false);
  
  const [productId, setProductId] = useState("")
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'ACTIVE',
    modalTitle: null,
    editState: false,
    cityId: null,
    brandId: null,
    keyword: '',
    brandName: '',
    bannerFile: null,
    bannerImageURL: null,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setProductId(searchParams.get('id'));
    dispatch(fetchProductImage(searchParams.get('id'), formVar.limit, formVar.offset, formVar.status, formVar.keyword,));
  }, [location.search, dispatch]);

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
          console.log(data);
          dispatch(statusDeleteProduct(data.id, 'DELETED'))

        }
      });
  }

  const ImageAddModal = (data) => {
    console.log(data);
    dispatch(isImageOpenModal(true))
  }

  const UrlAddModal = (data) => {
    console.log(data);
    dispatch(isOpenModal(true))
  }
  


  const submitImage = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }

    setSubmit(false)
    dispatch(addProductImage(productId, formVar.bannerFile))
  }
  const filesValid = () => {
    if (!formVar.bannerFile) {
      return "Files is required";
    }
  }



  const submitImageVieo = () => {
    if (urlValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    dispatch(addProductImageUrl(productId, url))
  }
  const urlValid = () => {
    if (!url) {
      return "Url is required";
    }
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
  return (
    <Fragment>
      <Col sm='12'>
        <Card>
          <CardHeader>
            <Row>
              <Col md="5">
              </Col>
              
              <Col md="4" className='d-flex justify-content-end align-items-center'>
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: UrlAddModal }}>
                    Add URL
                  </Btn>
                </div>
              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>
                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: ImageAddModal }}>
                    Add Images
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
                  <th scope='col'>URL</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar?.brandData?.productImage?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td className={`w-25 ${item.image ? 'with-image' : 'no-image'}`}>
                      {item.file && <img className='w-80 h-5-r' src={item.file} alt="" />}
                    </td>
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
          <div className='table-responsive'>
            <Table hover={true} className='table-border-horizontal table-light'>
              <thead>
                <tr>
                  <th scope='col'>Sl.No</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar?.brandData?.productImage?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td className={`w-25 ${item.image ? 'with-image' : 'no-image'}`}>
                      {item.file && <img className='w-80 h-5-r' src={item.file} alt="" />}
                    </td>
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
      </Col>
      <CommonModal isOpen={storeVar.isImageOpenModal} title={"Add Images"} toggler={Imagetoggle} >
        <Form>
          <FormGroup>
            {
              formVar.bannerImageURL && <>
                <div className='d-flex justify-content-center h-10-r'>
                  <img className=' h-100' src={formVar.bannerImageURL} alt="" />
                </div>
              </>
            }
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
          <Btn attrBtn={{ color: 'primary', onClick: submitImage }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isOpenModal} title={"Add Video URL"} toggler={toggle} >
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">URL</Label>
            <Input className="form-control" type="text" placeholder='Add Video Url' onChange={(e) => setUrl(e.target.value)} value={url} />
            {submit && urlValid() ? <span className='d-block font-danger'>{urlValid()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitImageVieo }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
    </Fragment>
  );
};

export default AddProductBanners;
