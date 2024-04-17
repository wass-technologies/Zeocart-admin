import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Col, Card, CardHeader, Table, Form, FormGroup, Label, Input, ModalFooter, Row } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { CheckCircle, XCircle, Trash2, Edit, Image, FileText, AlignJustify } from "react-feather"
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../../Components/Modals/modal';
import Dropzone from 'react-dropzone-uploader';
import { getCategory } from '../../store/categorySlice';
import { getsubCategory } from '../../store/subCategorySlice';
import { fetchProduct, addProduct, updateBrand, statusToggle, UpdateProductStatus, statusDeleteBrandStatus, isOpenModal, ModalToggle, isOpenStatusModal, isImageOpenModal, ImagestatusToggle, updateImageBrands } from '../../store/productSlice';
import { fetchbrand } from '../../store/brandsSlice';
import CustomizerContext from '../../_helper/Customizer';
import Pagination from '../../Components/Pagination/Pagination';
import SweetAlert from 'sweetalert2';
import noimagefound from '../../assets/images/noimageavailable.jpg'
import { useNavigate } from "react-router-dom";


const ProductTable = () => {
  const storeVar = useSelector(state => state.products)
  const catVar = useSelector(state => state.category)
  const subcatVar = useSelector(state => state.subcategory)
  const brandsVar = useSelector(state => state.brands)
  const dispatch = useDispatch();
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);
  const toggle = () => dispatch(ModalToggle());
  const Imagetoggle = () => dispatch(ImagestatusToggle());
  const statusModalToggle = () => dispatch(statusToggle());
  const [selectedBrandOption, setselectedBrandOption] = useState("");
  const [selectedCatOption, setselectedCatOption] = useState("");
  const [selectedsubCatOption, setselectedsubCatOption] = useState("");
  const [returnAvailable, setReturnAvailable] = useState(false);
  const [stateStatus, setStateStatus] = useState('ACTIVE');
  const [submit, setSubmit] = useState(false);
  const [formVar, setFormVar] = useState({
    keyword: '',
    limit: 10,
    offset: 0,
    currentPage: 1,
    status: 'APPROVED',
    catstatus: '',
    subcatstatus: '',
    modalTitle: null,
    editState: false,
    cityId: null,
    brandId: null,
    brandName: '',
    bannerFile: null,
    catId: '',
    subCatId: '',
    title: '',
    warrentydays: 0,
    warrentymonth: 'Day',
    returnday: 0,
    gstbill: 'false',
    freeShipping: 'false',
    bestSeller: 'false',
    length: '',
    breadth: '',
    height: '',
    actualWeight: '',
    volumetricWeight: '',
    shortDesc: '',
    desc: '',
    price: '',
    discountedPrice: '',
    discountedPercentage: '',
    selectedColor: '#000000',
    availability: '',
    skuid: '',



  });

  useEffect(() => {
    dispatch(fetchProduct(formVar.limit, formVar.offset, formVar.status, formVar.catstatus, formVar.subcatstatus, formVar.keyword,));
    dispatch(getCategory('100', '0', 'ACTIVE', '', ''));
    dispatch(getsubCategory('100', '0', 'ACTIVE', '', ''))
  }, []);

  const pageChange = (page) => {
    const offset = formVar.limit * (page - 1)
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      currentPage: page,
      offset: offset
    }))
    let catId = formVar.catstatus ? ['"' + formVar.catstatus + '"'] : [];
    let subCatId = formVar.subcatstatus ? ['"' + formVar.subcatstatus + '"'] : [];
    dispatch(fetchProduct(formVar.limit, offset, formVar.status, catId, subCatId, formVar.keyword));
  };
  const searchState = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, keyword: e.target.value }))
    let catId = formVar.catstatus ? ['"' + formVar.catstatus + '"'] : [];
    let subCatId = formVar.subcatstatus ? ['"' + formVar.subcatstatus + '"'] : [];
    dispatch(fetchProduct(formVar.limit, formVar.offset, formVar.status, catId, subCatId, e.target.value));


  }

  const handleaddbrandSelectChange = (event) => {
    setselectedBrandOption(event.target.value);
    setFormVar((prevFormVar) => ({ ...prevFormVar, brandId: event.target.value }))
  };
  const handleSelectCatChange = (event) => {
    setselectedCatOption(event.target.value);
    setFormVar((prevFormVar) => ({ ...prevFormVar, catId: event.target.value }))
    dispatch(getsubCategory('100', '0', 'ACTIVE', event.target.value, ''))
  };
  const handleaSelectSubCatChange = (event) => {
    setselectedsubCatOption(event.target.value);
    setFormVar((prevFormVar) => ({ ...prevFormVar, subCatId: event.target.value }))
  };


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

          dispatch(statusDeleteBrandStatus(data.id, 'DELETED'))

        }
      });
  }
  const ImageEditModal = (data) => {

    dispatch(isImageOpenModal(true))
    setFormVar((prevFormVar) => ({
      id: data.id,
      modalTitle: 'Update Image',
    }))
  }

  const handleInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, status: e.target.value }))
    let catId = formVar.catstatus ? ['"' + formVar.catstatus + '"'] : [];
    let subCatId = formVar.subcatstatus ? ['"' + formVar.subcatstatus + '"'] : [];
    dispatch(fetchProduct(formVar.limit, formVar.offset, e.target.value, catId, subCatId, formVar.keyword));
  };

  const handleInputCatChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, catstatus: e.target.value, subcatstatus: '' }))
    let catId = e.target.value ? ['"' + e.target.value + '"'] : [];
    dispatch(fetchProduct(formVar.limit, formVar.offset, formVar.status, catId, '', formVar.keyword,));
    dispatch(getsubCategory('100', '0', 'ACTIVE', e.target.value, ''))
  }

  const handleInputSubCatChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, subcatstatus: e.target.value }))

    let catId = formVar.catstatus ? ['"' + formVar.catstatus + '"'] : [];
    let subCatId = e.target.value ? ['"' + e.target.value + '"'] : [];
    dispatch(fetchProduct(formVar.limit, formVar.offset, formVar.status, catId, subCatId, formVar.keyword,));
  }

  const handlewarrentyInputChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, warrentydays: e.target.value }))
  };
  const handledayChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, warrentymonth: e.target.value }))
  };
  const handleReturnDayChange = (e) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, returnday: e.target.value }))
    if (e.target.value > 0) {
      setReturnAvailable(true);
    }
    else
      setReturnAvailable(false);
  };
  const handleaSelectGSTChange = (event) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, gstbill: event.target.value }))
  };
  const handleaSelectShippingChange = (event) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, freeShipping: event.target.value }))
  };
  const handleBestSellerChange = (event) => {
    setFormVar((prevFormVar) => ({ ...prevFormVar, bestSeller: event.target.value }))
  };
  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    const hexValue = selectedColor.toUpperCase();
    setFormVar((prevFormVar) => ({ ...prevFormVar, selectedColor: hexValue }));
  };

  const handleDiscountedPriceChange = (e) => {
    const discountedPrice = e.target.value;
    setFormVar((prevFormVar) => ({ ...prevFormVar, discountedPrice }));

    if (formVar.price && discountedPrice) {
      const price = parseFloat(formVar.price);
      const discountedPriceValue = parseFloat(discountedPrice);
      const discountPercentage = ((price - discountedPriceValue) / price) * 100;
      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        discountedPercentage: discountPercentage.toFixed(2),
      }));
    }
  }; const handleDiscountedPercentageChange = (e) => {
    const discountedPercentage = e.target.value;
    setFormVar((prevFormVar) => ({ ...prevFormVar, discountedPercentage }));

    if (formVar.price && discountedPercentage) {
      const price = parseFloat(formVar.price);
      const discountPercentageValue = parseFloat(discountedPercentage);
      const discountedAmount = (price * discountPercentageValue) / 100;

      setFormVar((prevFormVar) => ({
        ...prevFormVar,
        discountedPrice: (price - discountedAmount).toFixed(2),
      }));
    }
  };



  const EditToggleModal = (data) => {
    dispatch(isOpenModal(true))
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: true,
      brandId: data.id,
      modalTitle: 'Edit Products'
    }))

  }
  const AddToggleModal = () => {
    dispatch(isOpenModal(true))
    dispatch(fetchbrand(100, 0, 'ACTIVE', '',));
    setFormVar((prevFormVar) => ({
      ...prevFormVar,
      editState: false,
      modalTitle: 'Add Products',
    }))
  } 
  const navigate = (id) => {
    history(`${process.env.PUBLIC_URL}/product-image/` + layoutURL + '?id=' + id)
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
  const submitImage = () => {
    if (filesValid()) {
      setSubmit(true)
      return null
    }


    setSubmit(false)
    dispatch(updateImageBrands(formVar.id, formVar.bannerFile))
  }
  const filesValid = () => {
    if (!formVar.bannerFile) {
      return "Files is required";
    }
  }
  const submitStatus = () => {
    dispatch(UpdateProductStatus({ id: formVar.brandId, status: stateStatus }))
  }



  const submitBrands = () => {

    if (TitleValid()) {
      setSubmit(true)
      return null
    }
    if (BrandIdValid()) {
      setSubmit(true)
      return null
    }
    if (CategoryValid()) {
      setSubmit(true)
      return null
    }

    if (shortDescValid()) {
      setSubmit(true)
      return null
    }
    if (DescValid()) {
      setSubmit(true)
      return null
    }
    if (priceValid()) {
      setSubmit(true)
      return null
    }
    if (discountedPriceValid()) {
      setSubmit(true)
      return null
    }
    if (discountPercentValid()) {
      setSubmit(true)
      return null
    }
    if (colorValid()) {
      setSubmit(true)
      return null
    }
    if (actualWeightValid()) {
      setSubmit(true)
      return null
    }
    if (volumetricWeightValid()) {
      setSubmit(true)
      return null
    }
    if (lengthValid()) {
      setSubmit(true)
      return null
    }
    if (breadthValid()) {
      setSubmit(true)
      return null
    }
    if (heightValid()) {
      setSubmit(true)
      return null
    }
    if (availabilityValid()) {
      setSubmit(true)
      return null
    }
    if (skuidValid()) {
      setSubmit(true)
      return null
    }
    setSubmit(false)
    if (formVar.editState) {
      console.log(formVar);
      // dispatch(updateBrand({ id: formVar.brandId, name: brandsName }))
    } else {
      const data = {
        "title": formVar.title,
        "brandId": formVar.brandId,
        "shortDesc": formVar.shortDesc,
        "desc": formVar.desc,
        "coupan": "",
        "warranty": formVar.warrentydays,
        "warrantyIn": formVar.warrentymonth,
        "returnInDays": formVar.returnday,
        "returnAvailable": returnAvailable,
        "freeShipping": formVar.freeShipping,
        "minFreeShipping": 0,
        "gstBillAvailable": formVar.gstbill,
        "bestSeller": formVar.gstbill,
        "ACTUAL_WEIGHT": formVar.actualWeight,
        "VOLUMETRIC_WEIGHT": formVar.volumetricWeight,
        "LENGTH": formVar.length,
        "BREADTH": formVar.breadth,
        "HEIGHT": formVar.height,
        "category": [
          {
            "categoryId": selectedCatOption
          }
        ],
        "productVariant": [
          {
            "name": formVar.selectedColor,
            "price": formVar.price,
            "discount": formVar.discountedPercentage,
            "discountedPrice": formVar.discountedPrice,
            "availability": formVar.availability,
            "sku": formVar.skuid,
          }
        ]
        , "subCategory": [
          {
            "subCategoryId": selectedsubCatOption
          }

        ]
      }
      console.log(data);

      dispatch(addProduct(data))
    }
  }
 

  const TitleValid = () => {
    if (!formVar.title) {
      return "Title is required";
    }
  }

  const BrandIdValid = () => {
    if (!formVar.brandId) {
      return "Brands is required";
    }
  }
  const CategoryValid = () => {
    if (!formVar.catId) {
      return "Category is required";
    }
  }
  // const SubCategoryValid = () => {
  //   if (!formVar.subCatId) {
  //     return "Sub Category is required";
  //   }
  // }
  const shortDescValid = () => {
    if (!formVar.shortDesc) {
      return "Short Description is required";
    }
  }
  const DescValid = () => {
    if (!formVar.desc) {
      return "Description is required";
    }
  }
  const priceValid = () => {
    if (!formVar.price) {
      return "Price is required";
    }
  }
  const discountedPriceValid = () => {
    if (!formVar.discountedPrice) {
      return "Discounted Price is required";
    }
  }
  const discountPercentValid = () => {
    if (!formVar.discountedPercentage) {
      return "Discount Percentage is required";
    }
  }
  const colorValid = () => {
    if (!formVar.selectedColor) {
      return "Color is required";
    }
  }

  const actualWeightValid = () => {
    if (!formVar.actualWeight) {
      return "Actual Weight is required";
    }
  }
  const volumetricWeightValid = () => {
    if (!formVar.volumetricWeight) {
      return "Volumetric Weight is required";
    }
  }
  const lengthValid = () => {
    if (!formVar.length) {
      return "Length is required";
    }
  }
  const breadthValid = () => {
    if (!formVar.breadth) {
      return "Breadth is required";
    }
  }
  const heightValid = () => {
    if (!formVar.height) {
      return "Height is required";
    }
  }
  const availabilityValid = () => {
    if (!formVar.height) {
      return "Availibility is required";
    }
  }
  const skuidValid = () => {
    if (!formVar.height) {
      return "Sku Id is required";
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
              <Col md="3">
                <Input className="form-control" placeholder='Serch..' type="text" id="yourInputId"
                  value={formVar.keyword} onChange={(e) => searchState(e)}
                />
              </Col>
              <Col md="2">
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.catstatus} onChange={handleInputCatChange}>
                  <option value="">ALL</option>
                  {catVar?.categoryData.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="2">
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.subcatstatus} onChange={handleInputSubCatChange}>
                  <option value=''>ALL</option>

                  {subcatVar?.subCategoryData.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="2">
                {/* <Nav tabs className="border-tab"> */}
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.status} onChange={handleInputChange}>
                  <option value='APPROVED'>APPROVED</option>
                  <option value='DEACTIVE'>DEACTIVE</option>
                  <option value='PENDING'>PENDING</option>
                  <option value='OUT OF STOCK'>OUT OF STOCK</option>
                </Input>
                {/* </Nav> */}
              </Col>
              <Col md="3" className='d-flex justify-content-end align-items-center'>

                <div className="text-end border-2">
                  <Btn attrBtn={{ color: 'info-gradien', size: 'sm', onClick: AddToggleModal }}>
                    Add Products
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
                  <th scope='col'>Name</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>In Stock</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {storeVar?.brandData?.length > 0 ? (
                  storeVar?.brandData?.map((item, index) => (
                    <tr key={item.id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item.title}</td>
                      <td className='w-25'>
                        <img className='w-80 h-5-r'
                          src={item.productImage && item.productImage.length > 0 ? item.productImage[0]?.file : noimagefound}
                          alt="" />
                      </td>
                      <td>{item?.productVariant && item.productVariant[0]?.onHand}</td>
                      <td>
                        {
                          item.status === 'APPROVED' && <>
                            <span className={`font-success rounded-1 p-1 me-2 d-flex align-items-center`}>
                              {item.status === 'APPROVED' && <CheckCircle />}
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
                          {/* <div className='cursor-pointer font-success action-icon'>
                            <Image onClick={(e) => ImageEditModal(item)} />
                            <div className="tooltipCustom">Update Images</div>
                          </div> */}
                          <div className='cursor-pointer bg-light-info font-info action-icon' onClick={(e) => navigate(item.id)}>
                            <AlignJustify />
                            <div className="tooltipCustom">Image List</div>
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
                  ))

                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td>No products found</td>
                    <td></td>
                    <td></td>
                    <td></td>

                  </tr>
                  // <p>h</p>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
        {
          storeVar.totalProducts > 0 &&
          <Pagination currentPage={formVar.currentPage} totalItem={storeVar.totalProducts}
            itemsPerPage={formVar.limit} showEllipsisAfter={true} visiblePageCount={3} onPageChange={pageChange} />
        }
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
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitImage }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isOpenModal} title={formVar.modalTitle} toggler={toggle} >
        <Form>
          <FormGroup>
            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Title</Label>
                <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, title: e.target.value }))} value={formVar.title} />

              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">Brand</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={selectedBrandOption} onChange={handleaddbrandSelectChange}>
                  <option value="">Select Brand</option>
                  {brandsVar?.brandData?.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                {submit && TitleValid() ? <span className='d-block font-danger'>{TitleValid()}</span> : ""}
              </Col>
              <Col>
                {submit && BrandIdValid() ? <span className='d-block font-danger'>{BrandIdValid()}</span> : ""}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Category</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={selectedCatOption} onChange={handleSelectCatChange}>
                  <option value="">Select Category</option>
                  {catVar?.categoryData?.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">SubCategory</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={selectedsubCatOption} onChange={handleaSelectSubCatChange}>
                  <option value="">Select Sub Category</option>
                  {subcatVar?.subCategoryData?.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                {submit && CategoryValid() ? <span className='d-block font-danger'>{CategoryValid()}</span> : ""}
              </Col>
              <Col>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Price</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 6)} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, price: e.target.value }))} value={formVar.price} />
              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">Discounted Price</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 6)} onChange={handleDiscountedPriceChange} value={formVar.discountedPrice} />
              </Col>
            </Row>
            <Row>
              <Col>
                {submit && priceValid() ? <span className='d-block font-danger'>{priceValid()}</span> : ""}
              </Col>
              <Col>
                {submit && discountedPriceValid() ? <span className='d-block font-danger'>{discountedPriceValid()}</span> : ""}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Discount Percentage</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9.]/g, "").replace(" ", "").slice(0, 4)} onChange={handleDiscountedPercentageChange} value={formVar.discountedPercentage} />
              </Col>
              <Col>
                <Label className="col-form-label" for="color-picker">Select Color</Label>
                <Input
                  type="color"
                  id="color-picker"
                  className="form-control"
                  onChange={(e) => handleColorChange(e)}
                  value={formVar.selectedColor}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {submit && discountPercentValid() ? <span className='d-block font-danger'>{discountPercentValid()}</span> : ""}
              </Col>
              <Col>
                {submit && colorValid() ? <span className='d-block font-danger'>{colorValid()}</span> : ""}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Availability</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 4)} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, availability: e.target.value }))} value={formVar.availability} />
              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">SKU(Stock Keeping Unit)</Label>
                <Input className="form-control" type="text" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 10)} onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, skuid: e.target.value }))} value={formVar.skuid} />
              </Col>
            </Row>
            <Row>
              <Col>
                {submit && availabilityValid() ? <span className='d-block font-danger'>{availabilityValid()}</span> : ""}
              </Col>
              <Col>
                {submit && skuidValid() ? <span className='d-block font-danger'>{skuidValid()}</span> : ""}
              </Col>
            </Row>

            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Warranty</Label>
                <Row>
                  <Col>
                    <Input
                      className="form-control form-control-inverse btn-square"
                      name="select"
                      type="select"
                      value={formVar.warrentydays}
                      onChange={handlewarrentyInputChange}
                    >
                      {[...Array(31)].map((_, index) => (
                        <option key={index} value={index}>
                          {index}
                        </option>
                      ))}
                    </Input>

                  </Col>
                  <Col>
                    <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                      value={formVar.warrentymonth} onChange={handledayChange}>
                      <option value='Day'>DAYS</option>
                      <option value='Month'>MONTHS</option>
                      <option value='Year'>YEARS</option>

                    </Input>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">Return In Days</Label>
                <Col>
                  <Input
                    className="form-control form-control-inverse btn-square"
                    name="select"
                    type="select"
                    value={formVar.returnday}
                    onChange={handleReturnDayChange}
                  >
                    {[...Array(31)].map((_, index) => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Col>

            </Row>

            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Gst Bill</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.gstbill} onChange={handleaSelectGSTChange}>
                  <option value="true">AVAILABLE</option>
                  <option value="false">NOT AVAILABLE</option>
                </Input>
              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">Free Shipping</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.freeShipping} onChange={handleaSelectShippingChange}>
                  <option value="true">AVAILABLE</option>
                  <option value="false">NOT AVAILABLE</option>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Best Seller</Label>
                <Input className="form-control form-control-inverse btn-square" name="select" type="select"
                  value={formVar.bestSeller} onChange={handleBestSellerChange}>
                  <option value="true">TRUE</option>
                  <option value="false">FALSE</option>
                </Input>
              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">Actual Weight in Grams</Label>
                <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, actualWeight: e.target.value }))} onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 6)} value={formVar.actualWeight} />

              </Col>
            </Row>
            <Row>
              <Col>
              </Col>
              <Col>
                {submit && actualWeightValid() ? <span className='d-block font-danger'>{actualWeightValid()}</span> : ""}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Volumetric Weight in Grams</Label>
                <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, volumetricWeight: e.target.value }))} onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 6)} value={formVar.volumetricWeight} />

              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">Length in Centi Meters</Label>
                <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, length: e.target.value }))} onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 6)} value={formVar.length} />

              </Col>
            </Row>
            <Row>
              <Col>
                {submit && volumetricWeightValid() ? <span className='d-block font-danger'>{volumetricWeightValid()}</span> : ""}
              </Col>
              <Col>
                {submit && lengthValid() ? <span className='d-block font-danger'>{lengthValid()}</span> : ""}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label className="col-form-label" for="recipient-name">Breadth in Centi Meters</Label>
                <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, breadth: e.target.value }))} onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 6)} value={formVar.breadth} />

              </Col>
              <Col>
                <Label className="col-form-label" for="recipient-name">Height in Centi Meters</Label>
                <Input className="form-control" type="text" onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, height: e.target.value }))} onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(" ", "").slice(0, 6)} value={formVar.height} />

              </Col>
            </Row>
            <Row>
              <Col>
                {submit && breadthValid() ? <span className='d-block font-danger'>{breadthValid()}</span> : ""}
              </Col>
              <Col>
                {submit && heightValid() ? <span className='d-block font-danger'>{heightValid()}</span> : ""}
              </Col>
            </Row>
            <Label className="col-form-label" for="recipient-name">Short Description</Label>
            <textarea className='form-control' name='description' rows='2' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, shortDesc: e.target.value }))} value={formVar.answer} />
            {submit && shortDescValid() ? <span className='d-block font-danger'>{shortDescValid()}</span> : ""}

            <Label className="col-form-label" for="recipient-name">Description</Label>
            <textarea className='form-control' name='description' rows='3' onChange={(e) => setFormVar((prevFormVar) => ({ ...prevFormVar, desc: e.target.value }))} value={formVar.answer} />
            {submit && DescValid() ? <span className='d-block font-danger'>{DescValid()}</span> : ""}


          </FormGroup>
        </Form>
        <ModalFooter>
          <Btn attrBtn={{ color: 'secondary', onClick: toggle }} >Close</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: submitBrands }}>Save Changes</Btn>
        </ModalFooter>
      </CommonModal>
      <CommonModal isOpen={storeVar.isStatusOpenModal} title={'Status'} toggler={statusModalToggle} >
        <Col>
          <div className='d-flex m-15 m-checkbox-inline justify-content-center custom-radio-ml'>
            <div className='radio radio-primary'>
              <Input id='radioinline1' type='radio' className="radio_animated" name='radio1' checked={stateStatus === 'APPROVED'} onChange={onValueChange} value='APPROVED' />
              <Label className='mb-0' for='radioinline1'>
                <span className='digits'>APPROVED</span>
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
            <div className='radio radio-primary'>
              <Input id='radioinline4' type='radio' className="radio_animated" name='radio4' checked={stateStatus === 'DELETED'} onChange={onValueChange} value='DELETED' />
              <Label className='mb-0' for='radioinline4'>
                <span className='digits'>DELETED</span>
              </Label>
            </div>
            <div className='radio radio-primary'>
              <Input id='radioinline5' type='radio' className="radio_animated" name='radio5' checked={stateStatus === 'OUT OF STOCK'} onChange={onValueChange} value='OUT OF STOCK' />
              <Label className='mb-0' for='radioinline5'>
                <span className='digits'>OUT OF STOCK</span>
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

export default ProductTable;
