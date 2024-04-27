// dashbaord
import Social from "../Components/Dashboard/Social";
import Faqs from "../Pages/Faqs";
import BannerHome from "../Pages/BannerHome";
import BannerGlass from "../Pages/BannerGlass";
import BannerCover from "../Pages/BannerCover";
import Slider from "../Pages/Slider";
import Page from "../Pages/Page";
import PageEdit from "../Pages/PageEdit";
import Category from "../Pages/Category/";
import SubCategory from "../Pages/SubCategory";
import Brand from "../Pages/Brands/";
import Orders from "../Pages/Orders";
import ErrorPage4 from '../Components/Pages/ErrorPages/ErrorPage404';
import Coupons from "../Pages/Coupons";
import Staff from "../Pages/Staff";
import Advertisement from "../Pages/Advertisements";
import Blogs from "../Pages/Blogs/Blogs";
import Products from "../Pages/Products/Products";
import ProductBanner from "../Pages/Products/ProductBanners/AddProductBanners";
import Payments from "../Pages/Payments";
import PaymentDetails from '../Pages/Payments/PaymentsDetail';

export const routes = [
  { path: `${process.env.PUBLIC_URL}/dashboard/social/:layout`, Component: <Social /> },
  // //Tables

  // //Applicatiion

  // User
  
  { path: `${process.env.PUBLIC_URL}/products/:layout`, Component: <Products /> },
  { path: `${process.env.PUBLIC_URL}/product-image/:layout`, Component: <ProductBanner /> },
  
  { path: `${process.env.PUBLIC_URL}/coupons/:layout`, Component: <Coupons /> },
  
  // //Staff
  { path: `${process.env.PUBLIC_URL}/users/:layout`, Component: <Staff /> },



   // Brands
   { path: `${process.env.PUBLIC_URL}/brands/:layout`, Component: <Brand /> },
   
   // Category
   { path: `${process.env.PUBLIC_URL}/category/:layout`, Component: <Category /> },
   { path: `${process.env.PUBLIC_URL}/subcategories/:layout`, Component: <SubCategory /> },
   { path: `${process.env.PUBLIC_URL}/orders/:layout`, Component: <Orders /> },
   { path: `${process.env.PUBLIC_URL}/payments/:layout`, Component: <Payments /> },
   { path: `${process.env.PUBLIC_URL}/payments/paymentdetails/:layout`, Component: <PaymentDetails /> },
   
   // Faq
  { path: `${process.env.PUBLIC_URL}/faqs/:layout`, Component: <Faqs /> },

  //Banner
  { path: `${process.env.PUBLIC_URL}/homepage/:layout`, Component: <BannerHome /> },
  { path: `${process.env.PUBLIC_URL}/phonecover/:layout`, Component: <BannerCover /> },
  { path: `${process.env.PUBLIC_URL}/phoneglass/:layout`, Component: <BannerGlass /> },

   //Advertisement
   { path: `${process.env.PUBLIC_URL}/advertisement/:layout`, Component: <Advertisement /> },
   { path: `${process.env.PUBLIC_URL}/blogs/:layout`, Component: <Blogs /> },


  //Slider 

  { path: `${process.env.PUBLIC_URL}/slider/:layout`, Component: <Slider /> },


  { path: `${process.env.PUBLIC_URL}/pages/:layout`, Component: <Page /> },
  { path: `${process.env.PUBLIC_URL}/edit-page/:layout`, Component: <PageEdit /> },

  //Error
  { path: `*`, Component: <ErrorPage4 /> },

];
