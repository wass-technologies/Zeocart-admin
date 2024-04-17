import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import SweetAlert from 'sweetalert2';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

const initialState = {
  loadingStatus: STATUS.IDLE,
  couponData: [],
  totalcoupon: 0,
  isOpenModal: false,
  isStatusOpenModal:false,
  isImageOpenModal: false,
}

export const CouponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCouponsData(state, { payload }) {
      payload.result.forEach(element => {
        if(element.status==='ACTIVE'){
          element.bgClass='font-success'
        }else if(element.status==='PENDING'){
          element.bgClass='font-warning'
        }else if(element.status==='DEACTIVE'){
          element.bgClass='font-danger'
        }
      });
      state.couponData = payload.result
      state.totalcoupon = payload.total
    },
    updateadvertisementData(state, { payload }) {
      const objIndex = state.couponData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        if(payload.status==='ACTIVE'){
          payload.bgClass='bg-light-success font-success'
        }else if(payload.status==='PENDING'){
          payload.bgClass='bg-light-warning font-warning'
        }else if(payload.status==='DEACTIVE'){
          payload.bgClass='bg-light-danger font-danger'
        }
        state.couponData[objIndex]=payload
      }
    },
    sliceAdvertisement(state,{payload}){
      const objIndex = state.couponData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.couponData.splice(objIndex,1)
      }
      SweetAlert.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    },
    pushAdvertisement (state,{payload}){
      state.couponData.push(payload)
    },

    isOpenModal(state, { payload }) {
      state.isOpenModal = payload
    },
    isImageOpenModal(state, { payload }) {
      state.isImageOpenModal = payload
    },
    ModalToggle(state, { payload }) {
      state.isOpenModal = !state.isOpenModal
    },
    isOpenStatusModal(state, { payload }) {
      state.isStatusOpenModal = payload
    },
    statusToggle(state, { payload }) {
      state.isStatusOpenModal = !state.isStatusOpenModal
    },
    ImagestatusToggle(state, { payload}) {
      state.isImageOpenModal = !state.isImageOpenModal
    }
  }
})

export const { setCouponsData, updateadvertisementData, pushAdvertisement, isOpenModal, isImageOpenModal,
  ModalToggle,setFaqsSpecializationData,isOpenStatusModal,statusToggle, ImagestatusToggle, sliceAdvertisement } = CouponSlice.actions;

export default CouponSlice.reducer;

export function getCouponData(limit, offset, status, usertype, type) {
  return async function getCouponDataThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getCouponsData(limit, offset, status, usertype, type).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(setCouponsData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function addCoupon(payload) {
  return async function addCouponThunk(dispatch) {
    console.log(payload);
    dispatch(setLoading(true))
    try {
      await service.addCouponData(payload).then(
        async (response) => {
          dispatch(setLoading(false))
          dispatch(ModalToggle())
          successHandler('Added Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {
    }
  }
} 


export function updateImageAdvertisement(id, file) {
  console.log(file);
  return async function updateImageAdvertisementThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      dispatch(ImagestatusToggle())
      await service.addAdvertisementImage(id, file).then( 
        async (response) => {
          dispatch(setLoading(false))
          successHandler('Image Updated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {
    }
  }
} 

export function DetailsUpdateAdvertisement(id, name, url,type, urltype,) {
 
  return async function detailsUpdateAdvertisementThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateAdvertisementDetails(id,name, url, type, urltype).then(
        (response) => {
          dispatch(updateadvertisementData(response.data))
          dispatch(ModalToggle())
          dispatch(setLoading(false))
          successHandler('Updated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }  
}



export function statusUpdateAdvertisement(payload) {
  return async function statusUpdateAdvertisementThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateAdvertisementStatus(payload.id,payload.status).then(
        (response) => {
          dispatch(updateadvertisementData(response.data))
          dispatch(statusToggle())
          dispatch(setLoading(false))
          successHandler('Updated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}


export function deleteAdvertisement(payload) {
  console.log(payload);
  return async function statusUpdateAdvertisementThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateAdvertisementStatus(payload.id,payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updateadvertisementData(response.data))
          dispatch(setLoading(false))
          successHandler('Deleted Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

