
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
  isOpenBulkModal: false,
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
      console.log(payload);
      const objIndex = state.brandData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        window.location.reload()
        // state.brandData[objIndex] = payload
        // console.log(state.brandData[objIndex]);
      }
    },
    updateProductStatusData(state, { payload }) {
      const objIndex = state.brandData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.brandData[objIndex].status = payload.status
      }
    },
    isOpenModal(state, { payload }) {
      state.isOpenModal = payload
    },
    isImageOpenModal(state, { payload }) {
      state.isImageOpenModal = payload
    },
    isOpenBulkModal(state, { payload }) {
      state.isOpenBulkModal = payload
    },
    ModalToggle(state, { payload }) {
      state.isOpenModal = !state.isOpenModal
    }, 
    BulkModalToggle(state, { payload }) {
      state.isOpenBulkModal = !state.isOpenBulkModal
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

export const { setbrand, updateProductData, DeleteBrandsData, updateProductStatusData, isOpenModal, isBulkOpenModal, isImageOpenModal, isOpenBulkModal, ModalToggle, BulkModalToggle, isOpenStatusModal, statusToggle, ImagestatusToggle } = productSlice.actions;
export default productSlice.reducer;

export function fetchProduct(limit, offset, status, categoryId, subCategoryId, keyword) {
  return async function fetchProductThunk(dispatch, getState) {
    try {
      await service.productData(limit, offset, status, categoryId, subCategoryId, keyword).then(
        (response) => {
          console.log("hiiii");
          dispatch(setbrand(response.data));
        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
} 
export function addProduct(payload) {
  return async function addProductThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.createProducts(payload).then(
        (response) => {
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
export function updateProductsData(id, payload, update) {

  return async function updateProductDataThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateProducts(id, payload).then(
        (response) => {
          payload['id']=id
          // dispatch(updateProductData(payload))
            dispatch(fetchProduct(update.limit, update.offset, update.status, update.categoryId, update.subCategoryId, update.keyword))
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


export function setproductsBulkUpload( file) {

  return async function setproductsBulkUploadThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      dispatch(isImageOpenModal())
      await service.productsBulkUpload(file).then(
        (response) => {
          
          // dispatch(updateProductData(response.data))
          dispatch(setLoading(false))
          successHandler('Uploaded Successfully')
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
          
          dispatch(updateProductStatusData(payload))
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

export function statusDeleteProductsStatus(id, status) {
  return async function statusDeleteProductsStatusThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateProducts(id, status).then(
        (response) => {
          
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

