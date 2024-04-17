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
  sliderSpecializationData:[],
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const sliderSpecializationSlice = createSlice({
  name: "sliderSpecialization",
  initialState,
  reducers: {
    pushSliderSpecializationData (state,{payload}){
      payload.forEach(element => {
        const obj={
          id:element.id,
          specialization:{
            name:element.name
          }
        }
        state.sliderSpecializationData.push(obj)
      });
    },
    setsliderSpecializationData(state, { payload }){
      state.sliderSpecializationData = payload.result
    },
    setSpecializationData(state,{payload}){
      // payload.result.forEach(element => {
      //   element.specializationId=element.id
      // });
      state.specialization=payload.result
    },
    sliceSliderSpecialization(state,{payload}){
      const objIndex = state.sliderSpecializationData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.sliderSpecializationData.splice(objIndex,1)
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

export const { setsliderSpecializationData,setSpecializationData,pushSliderSpecializationData,sliceSliderSpecialization, isOpenModal, ModalToggle } = sliderSpecializationSlice.actions;

export default sliderSpecializationSlice.reducer;

export function getSliderSpecialization(limit, offset, keyword, bannerId) {
  return async function getSliderSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getSliderSpecialization(limit, offset, keyword, bannerId).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setsliderSpecializationData(response.data))
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
export function addSliderSpecialization(bannerId,specialization) {
  return async function addSliderSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addSliderSpecialization(bannerId,specialization).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(pushSliderSpecializationData(response.data))
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
export function deleteSliderSpecialization(payload) {
  return async function deleteSliderSpecializationThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteSliderSpecialization(payload.id).then(
        (response) => {
          console.log(response.data);
          response.data['id']=payload.id
          dispatch(setLoading(false))
          dispatch(sliceSliderSpecialization(response.data))
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