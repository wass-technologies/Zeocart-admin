
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

};

export const productImagesSlice = createSlice({
  name: 'productImages',
  initialState,
  reducers: {
    setbrand(state, { payload }) { 
      state.brandData = payload;
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

export const { setbrand, updateBrandsData, DeleteBrandsData, isOpenModal, isImageOpenModal, ModalToggle, setFaqsSpecializationData, isOpenStatusModal, statusToggle, ImagestatusToggle } = productImagesSlice.actions;
export default productImagesSlice.reducer;

export function fetchProductImage(id, limit, keyword, offset, status) {
  return async function fetchProductImageThunk(dispatch, getState) {
    try {
      await service.productImageData(id, limit, keyword, offset, status).then(
        (response) => {
          console.log(response);
          dispatch(setbrand(response.data));
        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
}
export function addProductImage(id, file) {
  return async function addProductImageThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true))
      await service.addproductImageData(id, file).then(
        (response) => {
          console.log(response);
          dispatch(updateBrandsData(response.data)); 
          dispatch(isImageOpenModal())
          dispatch(setLoading(false))
          successHandler('Added Successfully')

        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
}


export function statusDeleteProduct(id, status) {
  return async function statusDeleteBrandsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.deleteProductImagesData(id, status).then(
        (response) => {
          dispatch(updateBrandsData(response.data)); 
          console.log(response.data);
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

