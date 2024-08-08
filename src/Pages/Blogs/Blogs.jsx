import React, { Fragment, useEffect, useState } from 'react';
import { Col, Card, CardHeader, Table, Form, CardBody, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Trash2, Edit, Image, FileText } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Dropzone from 'react-dropzone-uploader';
import NoImage from '../../assets/images/noimage.png';
import { fetchblogs, isOpenModal, isOpenStatusModal, statusToggle, statusUpdateBlogStatus, ModalToggle, updateBlogs, addBlogs, isImageOpenModal, updateImageBlogs, statusDeleteBlogsStatus } from '../../store/blogSlice';
import Pagination from '../../Components/Pagination/Pagination';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SweetAlert from 'sweetalert2';

const Blogs = () => {
  const storeVar = useSelector(state => state.blog)
  const dispatch = useDispatch();
  const toggle = () => dispatch(ModalToggle());
  const Imagetoggle = () => dispatch(isImageOpenModal());
  const statusModalToggle = () => dispatch(statusToggle());
  const [brandsName, setBrandsName] = useState("");
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
    brandId: null,
    keyword: '',
    brandName: '',
    blogsTitle: '',
    desc1: '',
    shortDesc: '',
    bannerFile: null,
    shortDescData: '',
    desc1Data: '',
    bannerImageURL: null,
  });

  useEffect(() => {
    dispatch(fetchblogs(formVar.limit, formVar.offset, formVar.status, formVar.keyword,));
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    // dispatch(fetchbrand(formVar.limit, offset, formVar.status))
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    dispatch(fetchblogs(formVar.limit, formVar.offset, formVar.status, e.target.value))
  }
  const onChangetop = (editor) => {
    const evt = editor.getData()
    setFormVar((prevFormVar) => ({ ...prevFormVar, shortDescData: evt }))
  };
  const onChangedesc = (editor) => {
    const evt = editor.getData()
    setFormVar((prevFormVar) => ({ ...prevFormVar, desc1Data: evt }))
  };
  const onFocus = (editor) => {
    const evt = editor.getData()
    setFormVar((prevFormVar) => ({ ...prevFormVar, editerData: evt }))
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
          dispatch(statusDeleteBlogsStatus(data.id, 'DELETED'))
        }
      });
  }
  const ImageEditBannerModal = (data) => {
    dispatch(isImageOpenModal(true))
    setFormVar((prevFormVar) => ({
      id: data.id,
      modalTitle: 'Update Banner',
    }))
  }
  const ImageEditMiddleModal = (data) => {
    dispatch(isImageOpenModal(true))
    setFormVar((prevFormVar) => ({
      id: data.id,
      modalTitle: 'Update Middle Image',
    }))
  }
  const ImageEditTopModal = (data) => {
    dispatch(isImageOpenModal(true))
    setFormVar((prevFormVar) => ({
      id: data.id,
      modalTitle: 'Update Bottom Image',
    }))
  }


  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    dispatch(fetchblogs(formVar.limit, formVar.offset, e.target.value, formVar.keyword))
  };
  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      brandId: data.id,
      blogsTitle: data.title,
      desc1: data.desc1,
      shortDesc: data.shortDesc,
      modalTitle: 'Edit Blogs'
    }))
    setBrandsName(data.name)
  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Blogs',
      blogsTitle: '',
      desc1: '',
      shortDesc: '',

    }))
    setBrandsName('')
  }
  const onValueChange = (event) => {
    setStateStatus(event.target.value)
  }
  const statusToggleModal = (data) => {
    dispatch(isOpenStatusModal(true))
    setStateStatus(data.status)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      brandId: data.id,
    }))
  }
  const submitImageTop = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }

    setSubmit(false)
    dispatch(updateImageBlogs(formVar.id, formVar.bannerFile, "image1"))
  }
  const submitImageMiddle = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }

    setSubmit(false)
    dispatch(updateImageBlogs(formVar.id, formVar.bannerFile, "image2"))
  }
  const submitImageBottom = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }

    setSubmit(false)
    dispatch(updateImageBlogs(formVar.id, formVar.bannerFile, "image3"))
  }
  const filesValid = () => {
    if (!formVar.bannerFile) {
      return "Files is required";
    }
  }
  const submitBlogs = () => {
    if (titleValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editState) {
      dispatch(updateBlogs({ id: formVar.brandId, title: formVar.blogsTitle, shortDesc: formVar.shortDescData, desc1: formVar.desc1Data }))
    } else {
      dispatch(addBlogs(formVar.blogsTitle, formVar.shortDescData, formVar.desc1Data))
    }
  }
  const submitStatus = () => {
    dispatch(statusUpdateBlogStatus({ id: formVar.brandId, status: stateStatus }))
  }
  const titleValid = () => {

    if (!formVar.blogsTitle) {
      return "Title is required";
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
                    Add Blogs
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
                  <th scope='col'>Title</th>
                  <th scope='col'>Top Desc</th>
                  <th scope='col'>Bottom Desc</th>
                  <th scope='col'>Banner</th>
                  <th scope='col'>Image </th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar?.blogData?.map((item, index) => (
                  <tr key={item.id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.title}</td>
                    <td dangerouslySetInnerHTML={{ __html: item.shortDesc?.substring(0, 30) }}></td>
                    <td dangerouslySetInnerHTML={{ __html: item.desc1?.substring(0, 30) }}></td>
                    <td className='w-25'>
                      {item.desc1Img ? <img className='w-10-r h-5-r' src={item.desc1Img} alt="" /> : <img className='w-10-r h-5-r' src={NoImage} alt="" />}

                    </td>
                    <td className='w-25'>
                      {item.desc2Img ? <img className='w-10-r h-5-r' src={item.desc2Img} alt="" /> : <img className='w-10-r h-5-r' src={NoImage} alt="" />}

                    </td>
                    <td className={`w-25 ${item.desc3Img ? 'with-image' : 'no-image'}`}>
                      {item.desc3Img ? <img className='w-10-r h-5-r' src={item.desc3Img} alt="" /> : <img className='w-10-r h-5-r' src={NoImage} alt="" />}

                    </td>

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
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <div className='cursor-pointer bg-light-primary font-primary action-icon'>
                          <Edit onClick={(e) => EditToggleModal(item)} />
                          <div className="tooltipCustom">Edit</div>
                        </div>
                        <div className='cursor-pointer font-success action-icon'>
                          <Image onClick={(e) => ImageEditBannerModal(item)} />
                          <div className="tooltipCustom">Update Banner</div>
                        </div>
                        <div className='cursor-pointer font-success action-icon'>
                          <Image onClick={(e) => ImageEditMiddleModal(item)} />
                          <div className="tooltipCustom">Update Middle Image</div>
                        </div>
                        <div className='cursor-pointer font-success action-icon'>
                          <Image onClick={(e) => ImageEditTopModal(item)} />
                          <div className="tooltipCustom">Update Bottom Image</div>
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
        {/* {
          storeVar.totalDegree > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalDegree}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        } */}
      </Col>
      <CommonModal isOpen={storeVar.isImageOpenModal} title={formVar.modalTitle} toggler={Imagetoggle} >
        <Form>
          <FormGroup>
            {
              formVar.bannerImageURL && <>
                <div className='d-flex justify-content-center h-10-r'>
                  <img className=' h-100' src={formVar.bannerImageURL} alt="" />
                </div>
              </>
            }
            <Label className="col-form-label" for="recipient-name">Update Image</Label>
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
          {formVar.modalTitle === 'Update Banner' ? (
            <Btn attrBtn={{ color: 'primary', onClick: submitImageTop }}>Save Changes</Btn>
          ) : formVar.modalTitle === 'Update Middle Image' ? (
            <Btn attrBtn={{ color: 'primary', onClick: submitImageMiddle }}>Save Changes</Btn>
          ) : formVar.modalTitle === 'Update Bottom Image' ? (
            <Btn attrBtn={{ color: 'primary', onClick: submitImageBottom }}>Save Changes</Btn>
          ) : null}

        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} size={"xl"}>
        <Form>
          <FormGroup>
            <Label className="col-form-label" for="recipient-name">Title</Label>
            <Input className="form-control" type="text" placeholder='Enter Blogs Title' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, blogsTitle: e.target.value }))} value={formVar.blogsTitle} />
            <Label className="col-form-label" for="recipient-name">Top Description</Label>
            <CardBody>
              <CKEditor
                editor={ClassicEditor}
                data={formVar.shortDesc}
                onReady={editor => {
                  onFocus(editor)
                }}
                onChange={(event, editor) => {
                  onChangetop(editor);
                }}
                // onChange={(event, editor) => {
                //   const data = editor.getData();
                //   if (data.length > 5000) {
                //     editor.setData(data.substring(0, 5000)); // Only set data if it exceeds the max length
                //   } else {
                //     onChangedesc(editor); // Call your function only if content is within limits
                //   }
                // }}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {
                  onFocus(editor)
                }}
              />
            </CardBody>
            <Label className="col-form-label" for="recipient-name">Bottom Description</Label>
            <CardBody>
              <CKEditor
                editor={ClassicEditor}
                data={formVar.desc1}
                onReady={editor => {
                  onFocus(editor)
                }}
                onChange={(event, editor) => {
                  onChangedesc(editor);
                }}
                // onChange={(event, editor) => {
                //   const data = editor.getData();
                //   if (data.length > 5000) {
                //     editor.setData(data.substring(0, 5000)); // Only set data if it exceeds the max length
                //   } else {
                //     onChangedesc(editor); // Call your function only if content is within limits
                //   }
                // }}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {
                  onFocus(editor)
                }}
              />
            </CardBody>
            {submit && submitBlogs() ? <span className='d-block font-danger'>{submitBlogs()}</span> : ""}
          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitBlogs }}>Save Changes</Btn>
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

export default Blogs;
