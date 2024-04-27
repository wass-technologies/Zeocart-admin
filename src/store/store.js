import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import loadingReducer from './loader';
import dashboardReducer from './dashboardSlice';
import ordersReducer from './orderSlice';
import faqsReducer from './faqsSlice';
import bannerReducer from './bannerSlice';
import sliderReducer from './sliderSlice';
import pagesReducer from './pagesSlice';
import userReducer from './userSlice';
import staffReducer from './staffSlice';
import advertisementReducer from './addvertiseSlice';
import categoryReducer from'./categorySlice';
import subcategoryReducer from './subCategorySlice';
import brandReducer from './brandsSlice';
import couponReducer from './couponSlice';
import blogReducer from './blogSlice';
import productReducer from './productSlice';
import productImageReducer from './productImageSlice';
import paymentReducer from './paymentSlice';


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
    slider:sliderReducer,
    users:userReducer,
    staff:staffReducer,
    payment: paymentReducer,
  },
})

export default store;