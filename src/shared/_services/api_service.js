import axios from "axios";
import { authHeader } from "../_helper/auth-header";

// const rootUrl = 'http://localhost:1312/api/v1/';
// const rootUrl = 'http://192.168.29.56:1312/api/v1/';
const rootUrl = 'https://service.zeocart.com/api/v1/';



const settingsId = "60c80e87-fd51-4860-b795-483be60de53f"

const authURL = rootUrl + 'auth';
const accountURL = rootUrl + 'account';
const dashboardURL = rootUrl + "dashboard";
const addvertiseURL = rootUrl + 'advertisements';
const categoryUrl = rootUrl + 'category/';
const subcategoryURL = rootUrl + 'sub-category';
const BrandUrl = rootUrl + 'brands';
const coupanUrl = rootUrl + 'coupans';
const blogsUrl = rootUrl + 'blogs/';
const productURL = rootUrl + 'product';
const ordersURL = rootUrl + 'carts';
const paymentHistoryURL = rootUrl + 'payment-history';
const faqsURL = rootUrl + 'faqs';
const bannerURL = rootUrl + 'banner';
const sliderURL = rootUrl + 'home-slider';
const sliderSpecializationURL = rootUrl + 'slider-specialization';
const settingsURL = rootUrl + 'settings';
const pagesURL = rootUrl + 'pages';
const deliveryURL = rootUrl + 'delivery-partners';

/***** Auth *****/
async function login(loginData) {
  return await axios.post(authURL + '/admin/login', loginData);
}

async function dashboard(data) {
  return await axios.get(dashboardURL + "/count" + data);
}
async function dashboardpie() {
  return await axios.get(dashboardURL + "/orderedProduct");
}

/**********Faq  **********/



async function getFaqs(limit, offset, status, keyword) {
  return await axios.get(faqsURL + '/all?limit=' + limit + '&offset=' + offset + '&status=' + status, {
    headers: await authHeader(),
  });
}
async function addFaqs(payload) {
  return await axios.post(faqsURL, payload, {
    headers: await authHeader(),
  });
}
async function updateFaqs(id, payload) {
  return await axios.patch(faqsURL + '/' + id, payload, {
    headers: await authHeader(),
  });
}
async function statusUpdateFaqs(id, status) {
  return await axios.put(faqsURL + '/' + id, { status }, {
    headers: await authHeader(),
  });
}

// Advertisement
async function getAdvertisement(limit, offset, status,) {
  return await axios.get(addvertiseURL + '/list/all?limit=' + limit + '&offset=' + offset + '&status=' + status, {
    headers: await authHeader(),
  });
}

async function updateAdvertisementStatus(data, status) {
  return await axios.put(addvertiseURL + '/status/' + data, { 'status': status }, {
    headers: await authHeader(),
  });
}
async function addAdvertisement(name, url, urlType, imageType) {
  return await axios.post(addvertiseURL, { name: name, url: url, urlType: urlType, imageType: imageType }, {
    headers: await authHeader(),
  });
}
async function addAdvertisementImage(id, file) {
  return await axios.put(addvertiseURL + '/' + id, { file }, {
    headers: await authHeader('FormData'),
  });
}
async function updateAdvertisementDetails(id, name, url, type, urlType) {
  return await axios.patch(addvertiseURL + '/' + id, { name: name, url: url, urlType: urlType, imageType: type }, {
    headers: await authHeader(),
  });
}
async function updateCouponsStatus(id, status) {
  return await axios.put(addvertiseURL + id, { status: status }, {
    headers: await authHeader(),
  })
}

// category

async function getCategory(limit, offset, status, keyword) {
  return await axios.get(categoryUrl + 'list/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader()
  })
}


async function addCategory(payload) {
  return await axios.post(categoryUrl, { name: payload }, {
    headers: await authHeader()
  })
}


async function updateCategory(id, name) {
  return await axios.patch(categoryUrl + id, { name }, {
    headers: await authHeader(),
  });
}

async function updateStatusData(id, status) {
  return await axios.put(categoryUrl + 'status/' + id, { status }, {
    headers: await authHeader(),
  });
}


async function statusUpdateCategorys(id, status) {
  return await axios.put(categoryUrl + 'status/' + id, { status }, {
    headers: await authHeader(),
  });
}



async function getsubCategory(limit, offset, status, value, keyword) {
  return await axios.get(subcategoryURL + '/list/all?categoryId=' + value + '&limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword,
    {
      headers: await authHeader()
    })
}

async function addSubCategory(payload) {
  return await axios.post(subcategoryURL, payload,
    {
      headers: await authHeader()
    })
}
async function updatesubCategory(id, name, catId) {
  return await axios.patch(subcategoryURL + '/' + id, { name: name, categoryId: catId },
    {
      headers: await authHeader()
    })
}

async function statusUpdateSubCAtegory(id, status) {
  return await axios.put(subcategoryURL + '/status/' + id, { status: status },
    {
      headers: await authHeader()
    })
}
async function updateSubCategoryImage(id, file) {

  return await axios.put(subcategoryURL + '/' + id, { file }, {
    headers: await authHeader("FormData")
  })
}

// brands

async function brandData(limit, offset, status, keyword) {
  return await axios.get(BrandUrl + '/list/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader()
  })
}

async function createBrands(payload) {
  return await axios.post(BrandUrl, { name: payload }, {
    headers: await authHeader()
  })
}

async function updateBrands(id, payload) {
  return await axios.patch(BrandUrl + '/' + id, { name: payload }, {
    headers: await authHeader()
  })
}

async function updateBrandsImage(id, file) {
  return await axios.put(BrandUrl + '/' + id, { file }, {
    headers: await authHeader('FormData')
  })
}
async function statusUpdateBrands(id, status) {
  return await axios.put(BrandUrl + '/status/' + id, { status: status }, {
    headers: await authHeader()
  })
}

async function ordersdata(limit, offset, status, keyword, paymentStatus, paymentMode, toDate, fromDate) {
  return await axios.get(ordersURL + '/admin/list?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword + '&paymentStatus=' + paymentStatus + '&paymentMode=' + paymentMode + '&fromDate=' + fromDate + '&toDate=' + toDate, {
    headers: await authHeader()
  })
}

async function downloadInvoicePdf(id) {
  return await axios.get(ordersURL + '/invoice/' + id, {
    headers: await authHeader("Blob"),
    responseType: "blob",
  })
}

async function orderChangeStatus(id, status) {
  return await axios.put(ordersURL + '/admin/' + id, {status}, {
    headers: await authHeader(""),
  })
}

// settings
async function getSettings() {
  return await axios.get(settingsURL, {
    headers: await authHeader(),
  });
}
async function addSettingsBanner1(id, payload) {
  delete payload.id
  return await axios.put(settingsURL + '/banner1/' + id, payload, {
    headers: await authHeader("FormData"),
  });
}
async function addSettingsBanner2(id, payload) {
  delete payload.id
  return await axios.put(settingsURL + '/banner2/' + id, payload, {
    headers: await authHeader("FormData"),
  });
}
async function statusUpdateSettings(id, status) {
  return await axios.put(settingsURL + '/' + id, { status }, {
    headers: await authHeader(),
  });
}



// Coupons

async function getCouponsData(limit, offset, status, usertype, type) {
  return await axios.get(coupanUrl + '?limit=' + limit + '&offset=' + offset + '&status=' + status + '&userRestrictions=' + usertype + '&coupanFor=' + type + '&issueDate=ASC&expiryDate=ASC', {
    headers: await authHeader(),
  })
}

async function addCouponData(payload) {
  return await axios.post(coupanUrl + '/', payload, {
    headers: await authHeader(),
  })
}


// blogs
async function getBlogs(limit, offset, status, keyword) {
  return await axios.get(blogsUrl + 'all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  })
}
async function createBlogs(title, shortDesc, desc1) {

  return await axios.post(blogsUrl, { title: title, shortDesc: shortDesc, desc1: desc1 }, {
    headers: await authHeader(),
  })
}
async function updateBlogsdata(id, title, shortDesc, desc1) {
  return await axios.patch(blogsUrl + id, { title: title, shortDesc: shortDesc, desc1: desc1 }, {
    headers: await authHeader(),
  })
}
async function statusUpdateBlogs(id, status) {
  return await axios.put(blogsUrl + id, { status: status }, {
    headers: await authHeader(),
  })
}

async function updateBlogsImage(id, file, type) {

  return await axios.put(blogsUrl + type + '/' + id, { file }, {
    headers: await authHeader("FormData")
  })
}








async function productData(limit, offset, status, categoryId, subCategoryId, keyword) {
  return await axios.get(productURL + 's/admin/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword + '&categoryId=' + categoryId + '&subCategoryId=' + subCategoryId, {
    headers: await authHeader(),
  })
}

async function createProducts(data) {
  return axios.post(productURL + 's', data, {
    headers: await authHeader(),
  })
}
async function updateProducts(id, data) {
  return axios.patch(productURL + 's/' + id, data, {
    headers: await authHeader(),
  })
}


async function statusUpdateProducts(id, status) {
  return axios.put(productURL + 's/status/' + id, { status }, {
    headers: await authHeader(),
  })
}

async function productsBulkUpload(file) {
  return axios.put(productURL + '/csv' , {file}, {
    headers: await authHeader('FormData'),
  })
}

async function productImageData(id) {
  return await axios.get(productURL + 's/image/' + id, {
    headers: await authHeader(),
  })
}


async function addproductImageData(id, priority, file) {
  return await axios.post(productURL + '-images/' + id + '/'+priority+ '/IMAGE/' + null, { file }, {
    headers: await authHeader('FormData'),
  })
}

async function addproductURLData(id, url) {
  return await axios.post(productURL + '-images/' + id + '/VIDEO/' + url, { null: null }, {
    headers: await authHeader('FormData'),
  })
}

async function deleteProductImagesData(id) {
  return await axios.delete(productURL + '-images/' + id, {
    headers: await authHeader(''),
  })
}

async function fetchproductKeyword(id, limit, offset) {
  return axios.get(productURL + '-keywords/' + id + '?limit=' + limit + '&offset=' + offset, {
    headers: await authHeader(),
  })
}

async function addproductKeyword(id, keyword) {
  return axios.post(productURL + '-keywords/' + id, { keyword }, {
    headers: await authHeader(),
  })
}
async function statusUpdateproductKeyword(id) {
  return axios.delete(productURL + '-keywords/' + id, {
    headers: await authHeader(),
  })
}

// Slider 

async function getSlider(limit, offset, status, keyword) {

  return await axios.get(sliderURL + '/list/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&role=ADMIN', {
    headers: await authHeader(),
  });
}
async function addSlider(payload) {
  return await axios.post(sliderURL, payload, {
    headers: await authHeader("FormData"),
  });
}
async function deleteSlider(id) {
  return await axios.put(sliderURL + '/' + id, { "status": "DELETED" }, {
    headers: await authHeader(),
  });
}
async function statusUpdateSlider(id, data) {
  return await axios.put(sliderURL + '/' + id, data, {
    headers: await authHeader(),
  });
}





//banner
async function getBanner(limit, offset, status, keyword, id) {

  return await axios.get(bannerURL + '/list/all/' + id + '?limit=10&offset=0&status=ACTIVE', {
    headers: await authHeader(),
  });
}
async function updateBannerUrl(bannerId, redirectId) {
  return await axios.put(bannerURL + '/' + bannerId, { redirectId: redirectId }, {
    headers: await authHeader(),
  });
}
async function updateBannerImage(id, file) {
  return await axios.patch(bannerURL + '/' + id, { file }, {
    headers: await authHeader('FormData'),
  });
}





async function getSliderSpecialization(limit, offset, keyword, sliderId) {

  return await axios.get(sliderSpecializationURL + '/' + sliderId + '?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addSliderSpecialization(sliderId, specialization) {

  return await axios.post(sliderSpecializationURL + '/' + sliderId + '/' + settingsId, specialization, {
    headers: await authHeader(),
  });
}
async function deleteSliderSpecialization(id) {
  return await axios.delete(sliderSpecializationURL + '/' + id, {
    headers: await authHeader(),
  });
}

async function getPage() {
  return await axios.get(pagesURL, {
    headers: await authHeader(),
  });
}
async function pagesData(id) {
  return await axios.get(pagesURL + '/' + id, {
    headers: await authHeader(),
  });
}
async function updatePage(id, title, desc) {

  return await axios.patch(pagesURL + '/' + id, { title, desc }, {
    headers: await authHeader(),
  });
}


async function getUser(limit, offset, keyword) {
  return await axios.get(accountURL + '/users?keyword=' + keyword + '&limit=' + limit + '&offset=' + offset + '&status=ACTIVE&role=USER',
    {
      headers: await authHeader(),
    })
}
async function getUserById(id) {
  return await axios.get(accountURL + '' + id, {
    headers: await authHeader(),
  })
}
async function paymentList(keyword, limit, offset, fromDate, toDate, status, payType) {
  return await axios.get(paymentHistoryURL + '/all/list?limit=' + limit + '&offset=' + offset + '&fromDate=' + fromDate + '&toDate=' + toDate + '&status=' + status + '&type=' + payType + '&keyword=' + keyword, {
    headers: await authHeader(),
  })
}

async function paymentDetails(id) {
  return await axios.get(paymentHistoryURL + '/' + id, {
    headers: await authHeader(),
  })
}

async function downloadLabelPdf(id) {

  const formData = new FormData();
  formData.append('username', 'JIOREMOBILEPRIVATELIMITED-EXSPLUS714743');
  formData.append('password', 'QRaCN9wyDd');
  formData.append('awb', id);

  return await axios.post('https://shipment.ecomexpress.in/services/expp/shipping_label', formData,
    {
      headers: await authHeader("arraybuffer"),
				responseType: "blob",

    })
}


export const service = {
  login,
  dashboard,
  dashboardpie,

  getFaqs,
  addFaqs,
  updateFaqs,
  statusUpdateFaqs,


  getAdvertisement,
  updateAdvertisementStatus,
  addAdvertisement,
  addAdvertisementImage,
  updateAdvertisementDetails,
  updateCouponsStatus,


  getSettings,
  addSettingsBanner1,
  addSettingsBanner2,
  statusUpdateSettings,


  getCouponsData,
  addCouponData,


  getBlogs,
  createBlogs,
  updateBlogsdata,
  statusUpdateBlogs,
  updateBlogsImage,



  getPage,
  pagesData,
  updatePage,


  getCategory,
  addCategory,
  updateCategory,
  updateStatusData,
  statusUpdateCategorys,



  getsubCategory,
  addSubCategory,
  updatesubCategory,
  statusUpdateSubCAtegory,
  updateSubCategoryImage,

  brandData,
  createBrands,
  updateBrands,
  updateBrandsImage,
  statusUpdateBrands,

  ordersdata,
  downloadInvoicePdf,
  orderChangeStatus,


  productData,
  createProducts,
  updateProducts,
  statusUpdateProducts,
  productsBulkUpload,

  productImageData,
  addproductImageData,
  addproductURLData,
  deleteProductImagesData,

  fetchproductKeyword,
  addproductKeyword,
  statusUpdateproductKeyword,


  getBanner,
  updateBannerUrl,
  updateBannerImage,

  getSlider,
  addSlider,
  deleteSlider,
  statusUpdateSlider,

  getSliderSpecialization,
  addSliderSpecialization,
  deleteSliderSpecialization,



  getUser,
  getUserById,

  paymentList, paymentDetails, downloadLabelPdf,
}

