import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import loadingReducer from './loader';
import dashboardReducer from './dashboardSlice';
import ordersReducer from './orderSlice';
import stateReducer from './stateSlice';
import cityReducer from './citySlice';
import areaReducer from './areaSlice';
import degreeReducer from './degreeSlice';
import faqsReducer from './faqsSlice';
import faqsSpecializationReducer from './faqsSpecializationSlice';
import bannerReducer from './bannerSlice';
import bannerSpecializationReducer from './bannerSpecializationSlice';
import sliderReducer from './sliderSlice';
import sliderSpecializationReducer from './sliderSpecializationSlice';
import settingsReducer from './settingsSlice';
import specializationReducer from './specializationSlice';
import pagesReducer from './pagesSlice';
import diseasesReducer from './diseasesSlice';
import languagesReducer from './languagesSlice';
import diseaseQuestionsReducer from './diseaseQuestionsSlice';
import userReducer from './userSlice';
import staffReducer from './staffSlice';
import advertisementReducer from './addvertiseSlice';
import categoryReducer from'./categorySlice';
import subcategoryReducer from './subCategorySlice';
import brandReducer from './brandsSlice';
import couponReducer from './couponSlice';
import blogReducer from './blogSlice';
import productReducer from './productSlice';
import productImageReducer from './productImageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    advertisement: advertisementReducer,
    category: categoryReducer,
    brands: brandReducer,
    faqs:faqsReducer,
    loader: loadingReducer,
    coupon: couponReducer,
    banner:bannerReducer,
    page: pagesReducer,
    blog : blogReducer,
    products: productReducer,
    subcategory : subcategoryReducer,
    orders: ordersReducer,
    productImage: productImageReducer,

    

    states:stateReducer,
    city:cityReducer,
    area:areaReducer,
    degree:degreeReducer,
    faqsSpecialization:faqsSpecializationReducer,
    bannerSpecialization:bannerSpecializationReducer,
    slider:sliderReducer,
    sliderSpecialization:sliderSpecializationReducer,
    
    users:userReducer,
    staff:staffReducer,
  },
})

export default store;