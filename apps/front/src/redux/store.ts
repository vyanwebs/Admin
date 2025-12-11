import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import userReducer from "./Slice/useSliceForAdmin/userSlice";
import activeStatusReducer from "./Slice/activeStatus/activeStatusSlice";
import subscriptionPlansReducer from "./Slice/SubscriptionPlansSlice/subscriptionPlansSlice";
import certificateReducer from "./Slice/Uploadcertificate/certificateSlice";
import offerReducer from "./Slice/specialOffer/offerSlice";
import packageReducer from "./Slice/package/packageSlice";
import productPackagesReducer from "./Slice/productPackage/productPackageSlice";
import productReducer from "./Slice/product/productSlice";
import youtubeReducer from "./Slice/Youtube/youtube.slice"; 
import aboutSalonReducer from "./Slice/AboutOurSaloon/aboutSalonSlice";
import aboutUsReducer  from "./Slice/documents/aboutUsSlice";
import privacyPolicyReducer from "./Slice/documents/privacyPolicySlice";
import termsConditionReducer from "./Slice/documents/termsConditionSlice";
//import ourServiceReducer from "./Slice/OurService/ourService.slice"
import commonServiceReducer from "./Slice/OurService/commonServiceSlice";
import homeServicesReducer from "./Slice/homeservice/homeServiceSlice";
import ordersReducer from "./Slice/Orders/orderSlice"
import appointmentsReducer from "./Slice/appointment/appointmentSlice";




export const store = configureStore({
  reducer: {
    youtube: youtubeReducer,
    auth: authReducer,
    users: userReducer,
    activeStatus: activeStatusReducer,
    subscriptionPlans: subscriptionPlansReducer,
    certificates: certificateReducer, 
    offers: offerReducer,
    packages:packageReducer,
    productPackages: productPackagesReducer ,
    products: productReducer,
    youtubeVideos: youtubeReducer, 
    aboutSalons: aboutSalonReducer, 
    aboutUs: aboutUsReducer,
    privacyPolicy: privacyPolicyReducer,
    termsCondition: termsConditionReducer, 
    commonService: commonServiceReducer,
    homeServices: homeServicesReducer,
    orders: ordersReducer,
    appointments: appointmentsReducer,

   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
