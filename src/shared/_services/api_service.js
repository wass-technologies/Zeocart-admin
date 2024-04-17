import axios from "axios";
import { authHeader } from "../_helper/auth-header";

const rootUrl = 'http://localhost:1312/api/v1/';
// const rootUrl = 'http://192.168.29.56:1312/api/v1/';
// const rootUrl = 'https://service.zeocart.com/api/v1/';



const settingsId = "60c80e87-fd51-4860-b795-483be60de53f"

const authURL = rootUrl + 'auth';
const accountURL = rootUrl + 'account';
const dashboardURL = rootUrl + "dashboard";
const addvertiseURL = rootUrl + 'advertisements';
const categoryUrl = rootUrl + 'category/';
const subcategoryURL = rootUrl +'sub-category';
const BrandUrl = rootUrl + 'brands';
const coupanUrl = rootUrl + 'coupans';
const userUrl = rootUrl + 'account/users?';
const blogsUrl = rootUrl + 'blogs/';
const productURL = rootUrl + 'product';
const ordersURL = rootUrl + 'carts/admin';







const stateURL = rootUrl + 'state';
const cityURL = rootUrl + 'city';
const areaURL = rootUrl + 'area';
const degreeURL = rootUrl + 'degree';
const faqsURL = rootUrl + 'faqs';
const faqSpecializationURL = rootUrl + 'faq-specialization'
const specializationURL = rootUrl + 'specialization'
const bannerURL = rootUrl + 'banner'
const bannerSpecializationURL = rootUrl + 'banner-specialization'
const sliderURL = rootUrl + 'slider'
const sliderSpecializationURL = rootUrl + 'slider-specialization'
const settingsURL = rootUrl + 'settings'
const pagesURL = rootUrl + 'pages'
const diseasesURL = rootUrl + 'diseases'
const languagesURL = rootUrl + 'languages'
const diseaseQuestionsURL = rootUrl + 'disease-questions'
const patientDetailsURL = rootUrl + 'patient-details'
const staffDetailsURL = rootUrl + 'staff-details'
const userPermissionsURL = rootUrl + 'user-permissions'


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
  return await axios.put(faqsURL + '/' + id, {status}, {
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
  return await axios.put(addvertiseURL+'/' +id, { file }, {
    headers: await authHeader('FormData'),
  });
}
async function updateAdvertisementDetails(id, name, url, type, urlType) {
  return await axios.patch(addvertiseURL+'/'+ id, { name: name, url: url, urlType: urlType, imageType:type }, {
    headers: await authHeader(),
  });
}

// category

async function getCategory(limit, offset, status, keyword) {
  return await axios.get(categoryUrl + 'list/all?limit=' + limit + '&offset=' + offset + '&status=' + status+ '&keyword=' + keyword, {
    headers: await authHeader()
  })
}


async function addCategory(payload){
  return await axios.post(categoryUrl,{name:payload},{
    headers: await authHeader()
  })
}


async function updateCategory(id, name) {
  return await axios.patch(categoryUrl + id, { name }, {
    headers: await authHeader(),
  });
}

async function updateStatusData(id, status) {
  return await axios.put(categoryUrl +'status/'+ id, { status }, {
    headers: await authHeader(),
  });
}


async function statusUpdateCategorys(id, status) {
  return await axios.put(categoryUrl +'status/'+ id, { status }, {
    headers: await authHeader(),
  });
}



async function getsubCategory(limit, offset, status, value, keyword) {
  return await axios.get(subcategoryURL+ '/list/all?categoryId='+value+'&limit='+limit+'&offset='+offset+'&status='+status+'&keyword='+keyword,
  {
    headers: await authHeader()
  })
}

async function addSubCategory(payload) {
  return await axios.post(subcategoryURL, payload ,
  {
    headers: await authHeader()
  })
}
async function updatesubCategory(id,name,catId) {
  return await axios.patch(subcategoryURL+ '/' + id,{name:name,categoryId:catId},
  {
    headers: await authHeader()
  })
}

async function statusUpdateSubCAtegory(id, status) {
  return await axios.put(subcategoryURL+ '/status/'+id,{status:status},
  {
    headers: await authHeader()
  })
}

// brands

async function brandData(limit, offset, status, keyword) {
  return await axios.get(BrandUrl + '/list/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader()
  })
}

async function createBrands(payload) {
  return await axios.post(BrandUrl, {name: payload}, {
    headers: await authHeader()
  })
}

async function updateBrands(id, payload) {
  return await axios.patch(BrandUrl +'/'+id, {name: payload}, {
    headers: await authHeader()
  })
}

async function updateBrandsImage(id, file) {
  return await axios.put(BrandUrl+'/'+id,{file},{
    headers: await authHeader('FormData')
  })
}
async function statusUpdateBrands(id, status) {
  return await axios.put(BrandUrl + '/status/' + id, {status:status}, {
    headers: await authHeader()
  })
}

async function ordersdata(limit, offset, status, keyword) {
  return await axios.get(ordersURL+ '/list?limit='+limit+'&offset='+offset+'&status='+status, {
    headers: await authHeader()
  })
}

// settings
async function getSettings() {
  return await axios.get(settingsURL , {
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
  console.log(payload);
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

async function getCouponsData(limit, offset, status, usertype, type){
  return await axios.get(coupanUrl+ '?limit='+limit+'&offset='+offset+'&status='+status+ '&userRestrictions='+usertype+'&coupanFor='+type+'&issueDate=ASC&expiryDate=ASC',{
    headers: await authHeader(),
  })
}

async function addCouponData(payload){
  return await axios.post(coupanUrl + '/',payload,{
    headers: await authHeader(),
  })
}


// blogs
async function getBlogs(limit, offset, status, keyword){
  return await axios.get(blogsUrl+'all?limit='+limit+'&offset='+offset+'&status='+status+ '&keyword=' +keyword,{
    headers: await authHeader(),
  })
}
async function createBlogs(title,shortDesc, Desc1){
  console.log(title,shortDesc, Desc1);
  return await axios.post(blogsUrl, {title: title, shortDesc: shortDesc, desc1: Desc1},{
    headers: await authHeader(),
  })
}
async function updateBlogsdata(id,title, shortDesc, desc1){
  return await axios.patch(blogsUrl+id,{title: title, shortDesc: shortDesc, desc1: desc1},{
    headers: await authHeader(),
  })
}
async function statusUpdateBlogs(id,status){

  return await axios.put(blogsUrl+id,{status: status},{
    headers :await authHeader(),
  })}

  async function updateBlogsImage(id, file, type){
 
    return await axios.put(blogsUrl + type+'/'+id,{file},{
    headers :await authHeader("FormData")
  })}





 


async function productData(limit, offset, status, categoryId, subCategoryId, keyword){
  return await axios.get(productURL+ 's/admin/all?limit='+limit+'&offset='+offset+'&status='+status+'&keyword='+keyword+'&categoryId=['+categoryId+']&subCategoryId=['+subCategoryId+']',{
    headers: await authHeader(),
  })
}

async function createProducts(data){
  return axios.post(productURL +'s',data,{
    headers:await authHeader(),
  })
}
async function statusUpdateProducts(id,status){
  return axios.put(productURL+ 's/status/'+id,{status},{
    headers:await authHeader(),
  })
}


async function productImageData(id){
  return await axios.get(productURL+ 's/image/'+id,{
    headers: await authHeader(),
  })
} 
 

async function addproductImageData(id, file){
  return await axios.post(productURL+ '-images/'+id,{ file} ,{
    headers: await authHeader('FormData'),
  })
} 

async function deleteProductImagesData(id, file){
  return await axios.delete(productURL+'-images/'+id ,{
    headers: await authHeader('FormData'),
  })
} 
// Slider 

async function getSlider(limit, offset, status, keyword) {
  console.log({ limit, offset, status, keyword });
  return await axios.get(sliderURL + '/list/all?limit=' + limit + '&offset=' + offset + '&status=' + status+ '&role=ADMIN', {
    headers: await authHeader(),
  });
}
async function addSlider(payload) {
  return await axios.post(sliderURL + '/' + settingsId, payload, {
    headers: await authHeader("FormData"),
  });
}
async function deleteSlider(id) {
  return await axios.put(sliderURL + '/' + id, {"status": "DELETED"},{ 
    headers: await authHeader(),
  });
}
async function statusUpdateSlider(id, status) {
  return await axios.put(sliderURL + '/' + id, { status }, {
    headers: await authHeader(),
  });
}


































async function getStaff(limit, offset, status, keyword, role) {
  return await axios.get(userUrl+ 'keyword&limit=10&offset=0&status=ACTIVE&role=USER', {
    headers: await authHeader(),
  });
}
async function addStaff(payload) {
  return await axios.post(accountURL, payload, {
    headers: await authHeader(),
  });
}
async function updateStaffPermission(id, menu) {
  console.log({ id, menu });
  return await axios.put(userPermissionsURL + '/' + id, { menu }, {
    headers: await authHeader(),
  });
}
async function statusUpdateStaff(id, status) {
  return await axios.put(accountURL + '/' + id, { status }, {
    headers: await authHeader(),
  });
}
async function updateStaff(id, payload) {
  delete payload.id
  return await axios.patch(staffDetailsURL + '/profile/' + id, payload, {
    headers: await authHeader(),
  });
}
async function getStaffById(id) {
  return await axios.get(staffDetailsURL + '/' + id, {
    headers: await authHeader(),
  });
}
async function getState(limit, offset, status, keyword) {
  return await axios.get(stateURL + '/list/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addState(payload) {
  return await axios.post(stateURL, payload, {
    headers: await authHeader(),
  });
}
async function updateState(id, name) {
  return await axios.patch(stateURL + '/' + id, { name }, {
    headers: await authHeader(),
  });
}
async function statusUpdateState(id, status) {
  return await axios.put(stateURL + '/status/' + id, { status }, {
    headers: await authHeader(),
  });
}

async function getCity(limit, offset, status, keyword, id) {
  return await axios.get(cityURL + '/list/all/' + id + '?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addCity(payload) {
  return await axios.post(cityURL, payload, {
    headers: await authHeader(),
  });
}
async function updateCity(id, name, stateId) {
  return await axios.patch(cityURL + '/' + id, { name, stateId }, {
    headers: await authHeader(),
  });
}
async function statusUpdateCity(id, status) {
  return await axios.put(cityURL + '/status/' + id, { status }, {
    headers: await authHeader(),
  });
}

async function getArea(limit, offset, status, keyword, id) {
  return await axios.get(areaURL + '/list/all/' + id + '?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addArea(payload) {
  return await axios.post(areaURL, payload, {
    headers: await authHeader(),
  });
}
async function updateArea(id, name, pincode, cityId) {
  return await axios.patch(areaURL + '/' + id, { name, pincode, cityId }, {
    headers: await authHeader(),
  });
}
async function statusUpdateArea(id, status) {
  return await axios.put(areaURL + '/status/' + id, { status }, {
    headers: await authHeader(),
  });
}

async function getDegree(limit, offset, status, keyword) {
  return await axios.get(degreeURL + '?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addDegree(payload) {
  return await axios.post(degreeURL + '/add', payload, {
    headers: await authHeader(),
  });
}
async function updateDegree(id, name) {
  return await axios.patch(degreeURL + '/' + id, { name }, {
    headers: await authHeader(),
  });
}
async function statusUpdateDegree(id, status) {
  return await axios.put(degreeURL + '/' + id, { status }, {
    headers: await authHeader(),
  });
}


async function getSpecialization(limit, offset, status, keyword) {
  return await axios.get(specializationURL + '/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addSpecialization(payload) {
  return await axios.post(specializationURL, payload, {
    headers: await authHeader(),
  });
}
async function updateSpecialization(id, payload) {
  delete payload.id
  return await axios.patch(specializationURL + '/' + id, payload, {
    headers: await authHeader(),
  });
}
async function statusUpdateSpecialization(id, status) {
  return await axios.put(specializationURL + '/' + id, { status }, {
    headers: await authHeader(),
  });
}
async function addSpecializationBanner(id, payload) {
  delete payload.id
  console.log(payload);
  return await axios.put(specializationURL + '/image/' + id, payload, {
    headers: await authHeader("FormData"),
  });
}
// Faq

async function getFaqsSpecialization(limit, offset, keyword, faqId) {
  console.log({ limit, offset, keyword, faqId });
  return await axios.get(faqSpecializationURL + '/' + faqId + '?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addFaqsSpecialization(faqId, specialization) {
  console.log({ faqId, specialization });
  return await axios.post(faqSpecializationURL + '/' + faqId, specialization, {
    headers: await authHeader(),
  });
}
async function deleteFaqsSpecialization(id) {
  return await axios.delete(faqSpecializationURL + '/' + id, {
    headers: await authHeader(),
  });
}

//banner
async function getBanner(limit, offset, status, keyword, id) {
  console.log({ limit, offset, status, keyword });
  return await axios.get(bannerURL + '/list/all/'+id+'?limit=10&offset=0&status=ACTIVE', {
    headers: await authHeader(),
  });
}
async function updateBannerUrl(bannerId, redirectId) {
  return await axios.put(bannerURL+'/'+bannerId, {redirectId : redirectId},{
    headers: await authHeader(),
  });
}
async function updateBannerImage(id, file) {
  return await axios.patch(bannerURL + '/' + id, { file }, {
    headers: await authHeader('FormData'),
  });
}


async function getBannerSpecialization(limit, offset, keyword, bannerId) {
  console.log({ limit, offset, keyword, bannerId });
  return await axios.get(bannerSpecializationURL + '/' + bannerId + '?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addBannerSpecialization(bannerId, specialization) {
  console.log({ bannerId, specialization });
  return await axios.post(bannerSpecializationURL + '/' + bannerId + '/' + settingsId, specialization, {
    headers: await authHeader(),
  });
}
async function deleteBannerSpecialization(id) {
  return await axios.delete(bannerSpecializationURL + '/' + id, {
    headers: await authHeader(),
  });
}




async function getSliderSpecialization(limit, offset, keyword, sliderId) {
  console.log({ limit, offset, keyword, sliderId });
  return await axios.get(sliderSpecializationURL + '/' + sliderId + '?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword, {
    headers: await authHeader(),
  });
}
async function addSliderSpecialization(sliderId, specialization) {
  console.log({ sliderId, specialization });
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
  console.log({ id, title, desc });
  return await axios.patch(pagesURL + '/' + id, { title, desc }, {
    headers: await authHeader(),
  });
}
async function getDiseases(limit, offset, status, keyword) {
  return await axios.get(diseasesURL + '/list/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  })
}
async function addDiseases(payload) {
  console.log({ payload });
  return await axios.post(diseasesURL + '/' + settingsId, payload, {
    headers: await authHeader(),
  });
}
async function updateDiseases(id, name, top) {
  console.log({ id, name, top });
  return await axios.patch(diseasesURL + '/' + id, { name, top }, {
    headers: await authHeader(),
  });
}
async function statusUpdateDiseases(id, status) {
  return await axios.put(diseasesURL + '/status/' + id, { status }, {
    headers: await authHeader(),
  });
}
async function addDiseasesLogo(id, payload) {
  delete payload.id
  console.log(payload);
  return await axios.put(diseasesURL + '/' + id, payload, {
    headers: await authHeader("FormData"),
  });
}
async function addDiseasesTopLogo(id, payload) {
  delete payload.id
  console.log(payload);
  return await axios.put(diseasesURL + '/most/' + id, payload, {
    headers: await authHeader("FormData"),
  });
}

async function getLanguages(limit, offset, status, keyword) {
  return await axios.get(languagesURL + '/all?limit=' + limit + '&offset=' + offset + '&status=' + status + '&keyword=' + keyword, {
    headers: await authHeader(),
  })
}
async function addLanguages(payload) {
  console.log({ payload });
  return await axios.post(languagesURL, payload, {
    headers: await authHeader(),
  });
}
async function updateLanguages(id, name) {
  console.log({ id, name });
  return await axios.patch(languagesURL + '/' + id, { name }, {
    headers: await authHeader(),
  });
}
async function statusUpdateLanguages(id, status) {
  return await axios.put(languagesURL + '/' + id, { status }, {
    headers: await authHeader(),
  });
}

async function getDiseaseQuestions(limit, offset, status, keyword, gender, diseaseId, specializationId, questionId, optionId) {
  console.log({ limit, offset, status, keyword, gender, diseaseId, specializationId, questionId, optionId });
  return await axios.get(diseaseQuestionsURL + '/all?limit=' + limit + '&offset=' + offset + '&status=' +
    status + '&keyword=' + keyword + '&gender=' + gender + '&diseaseId=' + diseaseId + '&specializationId=' + specializationId + '&questionId=' + questionId +
    '&optionId=' + optionId, {
    headers: await authHeader(),
  })
}
async function addDiseaseQuestions(payload) {
  console.log({ payload });
  return await axios.post(diseaseQuestionsURL, payload, {
    headers: await authHeader(),
  });
}
async function statusUpdateDiseaseQuestions(id, status) {
  return await axios.put(diseaseQuestionsURL + '/' + id, { status }, {
    headers: await authHeader(),
  });
}

async function updateDiseaseQuestions(id, payload) {
  delete payload.id
  return await axios.patch(diseaseQuestionsURL + '/' + id, payload, {
    headers: await authHeader(),
  });
}
async function getUser(limit, offset, keyword, fromDate, toDate) {
  return await axios.get(patientDetailsURL + '?limit=' + limit + '&offset=' + offset + '&keyword=' + keyword
    + '&fromDate=' + fromDate + '&toDate=' + toDate, {
    headers: await authHeader(),
  })
}
async function getUserById(id) {
  return await axios.get(patientDetailsURL + '/' + id, {
    headers: await authHeader(),
  })
}

export const service = {
  login,
  dashboard,
  dashboardpie,


 
  statusUpdateDegree,

  getFaqs,
  addFaqs,
  updateFaqs,
  statusUpdateFaqs,


  getAdvertisement,
  updateAdvertisementStatus,
  addAdvertisement,
  addAdvertisementImage,
  updateAdvertisementDetails,

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
  

  brandData,
  createBrands,
  updateBrands,
  updateBrandsImage,
  statusUpdateBrands,

  ordersdata,


  productData,
  createProducts,
  statusUpdateProducts,

  productImageData,
  addproductImageData,
  deleteProductImagesData,



  getStaff,
  getStaffById,
  addStaff,
  updateStaff,
  statusUpdateStaff,
  updateStaffPermission,

  getState,
  addState,
  updateState,
  statusUpdateState,
  getCity,
  addCity,
  updateCity,
  statusUpdateCity,

  getArea,
  addArea,
  updateArea,
  statusUpdateArea,
  getDegree,
  addDegree,
  updateDegree,


  getFaqsSpecialization,
  addFaqsSpecialization,
  deleteFaqsSpecialization,

  getSpecialization,
  addSpecialization,
  statusUpdateSpecialization,
  updateSpecialization,
  addSpecializationBanner,

  getBanner,
  updateBannerUrl,
  updateBannerImage,

  getBannerSpecialization,
  addBannerSpecialization,
  deleteBannerSpecialization,

  getSlider,
  addSlider,
  deleteSlider,
  statusUpdateSlider,

  getSliderSpecialization,
  addSliderSpecialization,
  deleteSliderSpecialization,

 
  getDiseases,
  addDiseases,
  updateDiseases,
  statusUpdateDiseases,
  addDiseasesLogo,
  addDiseasesTopLogo,

  getLanguages,
  addLanguages,
  updateLanguages,
  statusUpdateLanguages,

  getDiseaseQuestions,
  addDiseaseQuestions,
  statusUpdateDiseaseQuestions,
  updateDiseaseQuestions,

  getUser,
  getUserById,
}
