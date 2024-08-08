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
  advertisementData: [],
  isOpenModal: false,
  isStatusOpenModal:false,
  isImageOpenModal: false,
}

export const AdvertisementSlice = createSlice({
  name: "advertisement",
  initialState,
  reducers: {
    setAdvertisementData(state, { payload }) {
      payload.result.forEach(element => {
        if(element.status==='ACTIVE'){
          element.bgClass='font-success'
        }else if(element.status==='PENDING'){
          element.bgClass='font-warning'
        }else if(element.status==='DEACTIVE'){
          element.bgClass='font-danger'
        }
      });
      state.advertisementData = payload.result
    },
    updateadvertisementData(state, { payload }) {
      const objIndex = state.advertisementData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        if(payload.status==='ACTIVE'){
          payload.bgClass='bg-light-success font-success'
        }else if(payload.status==='PENDING'){
          payload.bgClass='bg-light-warning font-warning'
        }else if(payload.status==='DEACTIVE'){
          payload.bgClass='bg-light-danger font-danger'
        }
        state.advertisementData[objIndex]=payload
      }
    },
    sliceAdvertisement(state,{payload}){
      const objIndex = state.advertisementData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.advertisementData.splice(objIndex,1)
      }
      SweetAlert.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    },
    pushAdvertisement (state,{payload}){
      state.advertisementData.push(payload)
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

export const { setAdvertisementData, updateadvertisementData, pushAdvertisement, isOpenModal, isImageOpenModal,
  ModalToggle,setFaqsSpecializationData,isOpenStatusModal,statusToggle, ImagestatusToggle, sliceAdvertisement } = AdvertisementSlice.actions;

export default AdvertisementSlice.reducer;

export function getAdvertisement(limit, offset, status) {
  return async function getAdvertisementThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getAdvertisement(limit, offset, status).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setAdvertisementData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function addAdvertisement(name,url,urType, imageType, file) {
  return async function addAdvertisementThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addAdvertisement(name,url,urType, imageType).then(
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
  return async function statusUpdateAdvertisementThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateAdvertisementStatus(payload.id,payload.status).then(
        (response) => {
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

