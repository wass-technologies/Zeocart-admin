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
  sliderData: [],
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setSliderData(state, { payload }) {
      payload.result.forEach(element => { 
        if(element.status==='ACTIVE'){
          element.bgClass='font-success'
        }else if(element.status==='PENDING'){
          element.bgClass='font-warning'
        }else if(element.status==='DEACTIVE'){
          element.bgClass='font-danger'
        }
      });
      state.sliderData = payload.result
    },
    updateSliderData(state, { payload }) {
      const objIndex = state.sliderData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        if(payload.status==='ACTIVE'){
          payload.bgClass='font-success'
        }else if(payload.status==='PENDING'){
          payload.bgClass='font-warning'
        }else if(payload.status==='DEACTIVE'){
          payload.bgClass='font-danger'
        }
        state.sliderData[objIndex]=payload
      }
    },
    sliceSlider(state,{payload}){
      console.log(payload);
      const objIndex = state.sliderData.findIndex((obj) => obj.id === payload.id);
      console.log({objIndex,data:state.sliderData[objIndex]});
      if(objIndex>=0){
        state.sliderData.splice(objIndex,1)
      }
      SweetAlert.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      );
    },
    pushSlider (state,{payload}){
      state.sliderData.push(payload)
    },

    isOpenModal(state, { payload }) {
      state.isOpenModal = payload
    },
    ModalToggle(state, { payload }) {
      state.isOpenModal = !state.isOpenModal
    },
    isOpenStatusModal(state, { payload }) {
      state.isStatusOpenModal = payload
    },
    statusToggle(state, { payload }) {
      state.isStatusOpenModal = !state.isStatusOpenModal
    }
  }
})

export const { setSliderData, updateSliderData,pushSlider, isOpenModal, 
  ModalToggle,setFaqsSpecializationData,isOpenStatusModal,statusToggle,sliceSlider } = sliderSlice.actions;

export default sliderSlice.reducer;

export function getSlider(limit, offset, status, keyword) {
  return async function getSliderThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getSlider(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setSliderData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addSlider(payload) {
  return async function addSliderThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addSlider(payload).then(
        (response) => {
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
export function deleteSlider(payload) {
  return async function deleteSliderThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteSlider(payload.id).then(
        (response) => {
          dispatch(sliceSlider(payload))
          dispatch(setLoading(false))
          successHandler('Deleted  Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function statusUpdateSlider(payload) {
  return async function statusUpdateSliderThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateSlider(payload.id,payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updateSliderData(response.data))
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

