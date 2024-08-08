
import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';
import { setLoading } from './loader';
import SweetAlert from 'sweetalert2';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  loadingStatus: STATUS.IDLE,
  error: '',
  isOpenModal: false,
  isStatusOpenModal: false,
  isImageOpenModal: false,
  brandData: [],
  totalBrands: '',

};

export const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    setbrand(state, { payload }) { 
      state.brandData = payload.result;
      state.totalBrands = payload.total;
    },
    updateBrandsData(state, { payload }) {
      const objIndex = state.brandData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.brandData[objIndex] = payload
      }
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
    ImagestatusToggle(state, { payload }) {
      state.isImageOpenModal = !state.isImageOpenModal
    }
  },
});

export const { setbrand, updateBrandsData, DeleteBrandsData, isOpenModal, isImageOpenModal, ModalToggle, setFaqsSpecializationData, isOpenStatusModal, statusToggle, ImagestatusToggle } = brandsSlice.actions;
export default brandsSlice.reducer;

export function fetchbrand(limit, offset, keyword, status) {
  return async function fetchbrandThunk(dispatch, getState) {
    try {
      await service.brandData(limit, offset, keyword, status).then(
        (response) => {
          
          dispatch(setbrand(response.data));
        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
}
export function addBrand(payload) {
  
  return async function addBrandsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.createBrands(payload).then(
        (response) => {
          
          dispatch(updateBrandsData(response.data))
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
export function updateBrand(payload) {

  return async function updateBrandsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateBrands(payload.id, payload.name).then(
        (response) => {
          
          dispatch(updateBrandsData(response.data))
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

export function updateImageBrands(id, file) {

  return async function updateBrandsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      dispatch(isImageOpenModal())
      await service.updateBrandsImage(id, file).then(
        (response) => {
          
          dispatch(updateBrandsData(response.data))
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

export function statusUpdateBrandStatus(payload) {
  return async function statusUpdateBrandsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateBrands(payload.id, payload.status).then(
        (response) => {
          
          dispatch(updateBrandsData(response.data))
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

export function statusDeleteBrandStatus(id, status) {
  return async function statusDeleteBrandsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateBrands(id, status).then(
        (response) => {
          
          dispatch(updateBrandsData(response.data))
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

