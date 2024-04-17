// dashbaord
import Social from "../Components/Dashboard/Social";

import State from "../Pages/Location/State";
import City from "../Pages/Location/City";
import Area from "../Pages/Location/Area";
import Degree from "../Pages/Degree";
import Faqs from "../Pages/Faqs";
import FaqsSpecialization from "../Pages/Faqs/FaqSpecialization";
import BannerHome from "../Pages/BannerHome";
import BannerGlass from "../Pages/BannerGlass";
import BannerCover from "../Pages/BannerCover";
import Slider from "../Pages/Slider";
import SliderSpecialization from "../Pages/Slider/SliderSpecialization";
import Settings from "../Pages/Settings";
import Page from "../Pages/Page";
import PageEdit from "../Pages/PageEdit";
import Category from "../Pages/Category/";
import SubCategory from "../Pages/SubCategory";
import Brand from "../Pages/Brands/";
import Orders from "../Pages/Orders";
import ErrorPage4 from '../Components/Pages/ErrorPages/ErrorPage404';
import Coupons from "../Pages/Coupons";
import UsersEdit from "../Pages/Users/UsersEdit";
import Staff from "../Pages/Staff";
import Permissions from "../Pages/Staff/Permissions";
import Advertisement from "../Pages/Advertisements/Advertisement";
import Blogs from "../Pages/Blogs/Blogs";
import Products from "../Pages/Products/Products";
import ProductBanner from "../Pages/Products/ProductBanners/AddProductBanners";

export const routes = [
  { path: `${process.env.PUBLIC_URL}/dashboard/social/:layout`, Component: <Social /> },
  // //Tables

  // //Applicatiion

  // User
  
  { path: `${process.env.PUBLIC_URL}/products/:layout`, Component: <Products /> },
  { path: `${process.env.PUBLIC_URL}/product-image/:layout`, Component: <ProductBanner /> },
  
  { path: `${process.env.PUBLIC_URL}/coupons/:layout`, Component: <Coupons /> },
  { path: `${process.env.PUBLIC_URL}/user_list/users/edit/:layout`, Component: <UsersEdit /> },
  
  // //Staff
  { path: `${process.env.PUBLIC_URL}/users/:layout`, Component: <Staff /> },
  { path: `${process.env.PUBLIC_URL}/staff/permission/:layout`, Component: <Permissions /> },


  //location
  { path: `${process.env.PUBLIC_URL}/location/state/:layout`, Component: <State /> },
  { path: `${process.env.PUBLIC_URL}/location/city/:layout`, Component: <City /> },
  { path: `${process.env.PUBLIC_URL}/location/area/:layout`, Component: <Area /> },

 
  // Degree
  { path: `${process.env.PUBLIC_URL}/degree/:layout`, Component: <Degree /> },
   // Brands
   { path: `${process.env.PUBLIC_URL}/brands/:layout`, Component: <Brand /> },
   
   // Category
   { path: `${process.env.PUBLIC_URL}/category/:layout`, Component: <Category /> },
   { path: `${process.env.PUBLIC_URL}/subcategory/:layout`, Component: <SubCategory /> },
   { path: `${process.env.PUBLIC_URL}/orders/:layout`, Component: <Orders /> },
   
   // Faq
  { path: `${process.env.PUBLIC_URL}/faqs/:layout`, Component: <Faqs /> },
  { path: `${process.env.PUBLIC_URL}/faq-specialization/:layout`, Component: <FaqsSpecialization /> },

  //Banner
  { path: `${process.env.PUBLIC_URL}/banner-home/:layout`, Component: <BannerHome /> },
  { path: `${process.env.PUBLIC_URL}/banner-cover/:layout`, Component: <BannerCover /> },
  { path: `${process.env.PUBLIC_URL}/banner-glass/:layout`, Component: <BannerGlass /> },

   //Advertisement
   { path: `${process.env.PUBLIC_URL}/advertisement/:layout`, Component: <Advertisement /> },
   { path: `${process.env.PUBLIC_URL}/blogs/:layout`, Component: <Blogs /> },


  //Slider 

  { path: `${process.env.PUBLIC_URL}/slider/:layout`, Component: <Slider /> },
  { path: `${process.env.PUBLIC_URL}/slider-specialization/:layout`, Component: <SliderSpecialization /> },

  //settings
  { path: `${process.env.PUBLIC_URL}/settings/:layout`, Component: <Settings /> },

  { path: `${process.env.PUBLIC_URL}/pages/:layout`, Component: <Page /> },
  { path: `${process.env.PUBLIC_URL}/edit-page/:layout`, Component: <PageEdit /> },

  //Error
  { path: `*`, Component: <ErrorPage4 /> },

];
