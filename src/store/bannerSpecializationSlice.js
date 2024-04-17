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
  specialization: [],
  BannerSpecializationData:[],
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const bannerSpecializationSlice = createSlice({
  name: "bannerSpecialization",
  initialState,
  reducers: {
    pushBannerSpecializationData (state,{payload}){
      payload.forEach(element => {
        const obj={
          id:element.id,
          specialization:{
            name:element.name
          }
        }
        state.BannerSpecializationData.push(obj)
      });
    },
    setBannerSpecializationData(state, { payload }){
      state.BannerSpecializationData = payload.result
    },
    setSpecializationData(state,{payload}){
      // payload.result.forEach(element => {
      //   element.specializationId=element.id
      // });
      state.specialization=payload.result
    },
    sliceBannerSpecialization(state,{payload}){
      const objIndex = state.BannerSpecializationData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.BannerSpecializationData.splice(objIndex,1)
      }
      SweetAlert.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    },
    isOpenModal(state, { payload }) {
      state.isOpenModal = payload
    },
    ModalToggle(state, { payload }) {
      state.isOpenModal = !state.isOpenModal
    },
  }
})

export const { setBannerSpecializationData,setSpecializationData,pushBannerSpecializationData,sliceBannerSpecialization, isOpenModal, ModalToggle } = bannerSpecializationSlice.actions;

export default bannerSpecializationSlice.reducer;

export function getBannerSpecialization(limit, offset, keyword, bannerId) {
  return async function getBannerSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getBannerSpecialization(limit, offset, keyword, bannerId).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setBannerSpecializationData(response.data))
          console.log(response.data);
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addBannerSpecialization(bannerId,specialization) {
  return async function addBannerSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addBannerSpecialization(bannerId,specialization).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(pushBannerSpecializationData(response.data))
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
export function deleteBannerSpecialization(payload) {
  return async function deleteBannerSpecializationThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteBannerSpecialization(payload.id).then(
        (response) => {
          console.log(response.data);
          response.data['id']=payload.id
          dispatch(setLoading(false))
          dispatch(sliceBannerSpecialization(response.data))
          successHandler('Delete Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function getSpecialization(limit, offset, status, keyword) {
  return async function getSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      console.log({limit, offset, status, keyword});
      await service.getSpecialization(limit, offset, status, keyword).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(setSpecializationData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}