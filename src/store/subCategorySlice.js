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
  subCategoryData: [],
  Count:0,
  isOpenModal: false,
  isStatusOpenModal:false,
  isImageOpenModal: false,
}

export const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setsubCategoryData(state, { payload }) {
      state.subCategoryData = payload.result
      state.Count=payload.count 
    },
    updatesubCategoryData(state, { payload }) {
      const objIndex = state.subCategoryData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.subCategoryData[objIndex]=payload
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
    isImageOpenModal(state, { payload }) {
      state.isImageOpenModal = payload
    },
    statusToggle(state, { payload }) {
      state.isStatusOpenModal = !state.isStatusOpenModal
    },
    ImagestatusToggle(state, { payload }) {
      state.isImageOpenModal = !state.isImageOpenModal
    },
  }
})

export const { setsubCategoryData, isOpenModal, ModalToggle, isOpenStatusModal,statusToggle, updatesubCategoryData, isImageOpenModal } = subCategorySlice.actions;

export default subCategorySlice.reducer;

export function getsubCategory(limit, offset, status, value, keyword) {
  
  return async function getDegreeThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getsubCategory(limit, offset, status, value, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setsubCategoryData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addSubCategory(payload) {
  return async function addSubCategoryThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addSubCategory(payload).then(
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

export function deleteSubCategoryStatus(id, status) {
  return async function updateSubCategoryStatusThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateSubCAtegory(id, status).then(
        (response) => {
          console.log(response.data);
          dispatch(updatesubCategoryData(response.data))
          dispatch(setLoading(false))
          successHandler('Deactivated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function statusSubCatDegree(id, status) {
  return async function updateSubCategoryStatusThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateSubCAtegory(id, status).then(
        (response) => {
          console.log(response.data);
          dispatch(updatesubCategoryData(response.data))
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
export function updatesubCategory(payload) {
  return async function updatesubcategoryThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updatesubCategory(payload.id,payload.name, payload.categoryId).then(
        (response) => {
          dispatch(updatesubCategoryData(response.data))
          dispatch(setLoading(false))
          dispatch(ModalToggle())
          successHandler('updateed Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          // errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function updateImageSubCategory(id, file) {
  return async function updateImageSubCategoryThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      dispatch(isImageOpenModal())
      await service.updateSubCategoryImage(id, file).then(
        (response) => {
          dispatch(updatesubCategoryData(response.data))
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