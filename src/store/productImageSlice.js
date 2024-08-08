
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
  productImage: [],

};

export const productImagesSlice = createSlice({
  name: 'productImages',
  initialState,
  reducers: {
    setbrand(state, { payload }) {
      state.productImage = payload.productImage.filter(img => img.type === "IMAGE");
      state.productURL = payload.productImage.filter(img => img.type === "VIDEO");

    },
    updateImageData(state, { payload }) {
      const objIndex = state.brandData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.brandData[objIndex].id = payload.id
      }
    },
    pushImageData(state, { payload }) {
      state.productImage.push(payload)
    },
    sliceImageData(state, { payload }) {
      const objIndex = state.productImage.findIndex((obj) => obj.id === payload);
      if (objIndex >= 0) {
        state.productImage.splice(objIndex, 1)
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

export const { setbrand, updateImageData, DeleteBrandsData, sliceImageData, pushImageData, isOpenModal, isImageOpenModal, ModalToggle, setFaqsSpecializationData, isOpenStatusModal, statusToggle, ImagestatusToggle } = productImagesSlice.actions;
export default productImagesSlice.reducer;

export function fetchProductImage(id, limit, keyword, offset, status) {
  return async function fetchProductImageThunk(dispatch, getState) {
    try {
      await service.productImageData(id, limit, keyword, offset, status).then(
        (response) => {

          dispatch(setbrand(response.data));
        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
}
export function addProductImage(id, priority, file) {
  return async function addProductImageThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true))
      await service.addproductImageData(id, priority, file).then(
        (response) => {
          dispatch(isImageOpenModal())
          dispatch(setLoading(false))
          successHandler('Added Successfully')
          dispatch(pushImageData(response.data));

        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
}

export function addProductImageUrl(id, url) {
  return async function addProductImageThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true))
      await service.addproductURLData(id, url).then(
        (response) => {

          dispatch(ModalToggle())
          dispatch(setLoading(false))
          successHandler('Url Added Successfully')
          dispatch(updateImageData(response.data));

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
          dispatch(sliceImageData(id));

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

