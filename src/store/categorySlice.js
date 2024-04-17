import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

const initialState = {
  loadingStatus: STATUS.IDLE,
  categoryData: [],
  totalDegree:0,
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setcategoryData(state, { payload }) {
      state.categoryData = payload.result
      state.totalDegree=payload.total
    },
    updatecategorysData(state, { payload }) {
      const objIndex = state.categoryData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.categoryData[objIndex]=payload
      }
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

export const { setcategoryData, updatecategorysData, isOpenModal, ModalToggle,isOpenStatusModal,statusToggle } = categorySlice.actions;

export default categorySlice.reducer;

export function getCategory(limit, offset, status, keyword) {
  return async function getDegreeThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getCategory(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setcategoryData  (response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addCategoryData(payload) {
  return async function addDegreeThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addCategory(payload).then(
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
export function updatecategoryData(payload) {
  return async function updateCategoryThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateCategory(payload.id,payload.name).then(
        (response) => {
          console.log(response);
          dispatch(updatecategorysData(response.data))
          dispatch(setLoading(false))
          dispatch(ModalToggle())
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
export function statusUpdateCategory(payload) {
  console.log(payload);
  return async function statusUpdateCategoryThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateStatusData(payload.id,payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updatecategorysData(response.data))
          dispatch(setLoading(false))
          dispatch(statusToggle())
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

export function statusDeleteCategoryStatus(id, status) {
  return async function statusDeleteCategorysThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateCategorys(id, status).then(
        (response) => {
          console.log(response.data);
          dispatch(updatecategorysData(response.data))
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

