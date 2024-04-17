
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
  totalProducts: '',
  isOpenModal: false,
  isStatusOpenModal: false,
  isImageOpenModal: false,

};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setbrand(state, { payload }) {
      state.brandData = payload.result;
      state.totalProducts = payload.total;
    },
    updateProductData(state, { payload }) {
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

export const { setbrand, updateProductData, DeleteBrandsData, isOpenModal, isImageOpenModal, ModalToggle, setFaqsSpecializationData, isOpenStatusModal, statusToggle, ImagestatusToggle } = productSlice.actions;
export default productSlice.reducer;

export function fetchProduct(limit, offset, status, categoryId, subCategoryId, keyword) {
  return async function fetchProductThunk(dispatch, getState) {
    try {
      await service.productData(limit, offset, status, categoryId, subCategoryId, keyword).then(
        (response) => {
          dispatch(setbrand(response.data));
        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
} 
export function addProduct(payload) {
  console.log(payload);
  return async function addProductThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.createProducts(payload).then(
        (response) => {
          console.log(response.data);
          dispatch(updateProductData(response.data))
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
          console.log(response.data);
          dispatch(updateProductData(response.data))
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
          console.log(response.data);
          dispatch(updateProductData(response.data))
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

export function UpdateProductStatus(payload) {
  return async function statusUpdateProductThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateProducts(payload.id, payload.status).then(
        (response) => { 
          console.log(response.data);
          dispatch(updateProductData(response.data))
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
          console.log(response.data);
          dispatch(updateProductData(response.data))
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

