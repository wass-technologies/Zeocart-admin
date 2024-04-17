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
  faqSpecializationData:[],
  isOpenModal: false,
  isStatusOpenModal:false,
  totalFaqSpecialization:0,
}

export const faqsSpecializationSlice = createSlice({
  name: "faqsSpecialization",
  initialState,
  reducers: {
    pushFaqsSpecializationData (state,{payload}){
      payload.forEach(element => {
        const obj={
          id:element.id,
          specialization:{
            name:element.name
          }
        }
        state.faqSpecializationData.push(obj)
      });
    },
    setFaqsSpecializationData(state, { payload }){
      state.faqSpecializationData = payload.result
      state.totalFaqSpecialization = payload.total
    },
    setSpecializationData(state,{payload}){
      payload.result.forEach(element => {
        element.specializationId=element.id
      });
      state.specialization=payload.result
    },
    sliceFaqsSpecialization(state,{payload}){
      const objIndex = state.faqSpecializationData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.faqSpecializationData.splice(objIndex,1)
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

export const { setFaqsSpecializationData,setSpecializationData,pushFaqsSpecializationData,sliceFaqsSpecialization, isOpenModal, ModalToggle } = faqsSpecializationSlice.actions;

export default faqsSpecializationSlice.reducer;

export function getFaqsSpecialization(limit, offset, keyword, faqId) {
  return async function getFaqsSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getFaqsSpecialization(limit, offset, keyword, faqId).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setFaqsSpecializationData(response.data))
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
export function addFaqsSpecialization(faqId,specialization) {
  return async function addFaqsSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addFaqsSpecialization(faqId,specialization).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(pushFaqsSpecializationData(response.data))
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
export function deleteFaqsSpecialization(payload) {
  return async function deleteFaqsSpecializationThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteFaqsSpecialization(payload.id).then(
        (response) => {
          console.log(response.data);
          response.data['id']=payload.id
          dispatch(setLoading(false))
          dispatch(sliceFaqsSpecialization(response.data))
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
      await service.getSpecialization(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setSpecializationData(response.data))
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