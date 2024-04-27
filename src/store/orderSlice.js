
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

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setbrand(state, { payload }) {
      state.ordersData = payload.result;
      state.orderCount = payload.total;
    },
    updateBrandsData(state, { payload }) {
      const objIndex = state.ordersData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.ordersData[objIndex] = payload
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
    },
    downloadFile(state, { payload }) {
      // const link = document.createElement('a');
      // link.href = URL.createObjectURL(payload.pdfData);
      // link.download = payload.fileName;
      // document.body.append(link);
      // link.click();
      // link.remove();
      // setTimeout(() => URL.revokeObjectURL(link.href), 1000);

      if (
        window.navigator &&
        window.navigator.msSaveOrOpenBlob
      ) return window.navigator.msSaveOrOpenBlob(payload.pdfData);

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(payload.pdfData);

      const link = document.createElement('a');
      link.href = data;
      link.download = payload.fileName;

      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        })
      );

      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    },
  },
});

export const { setbrand, downloadFile, updateBrandsData, DeleteBrandsData, isOpenModal, isImageOpenModal, ModalToggle, setFaqsSpecializationData, isOpenStatusModal, statusToggle, ImagestatusToggle } = ordersSlice.actions;
export default ordersSlice.reducer;

export function fetchorders(limit, offset, status, keyword, paymentStatus, paymentMode) {
  return async function fetchordersThunk(dispatch, getState) {
    try {
      await service.ordersdata(limit, offset, status, keyword, paymentStatus, paymentMode).then(
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

export function downloadInvoiceData(id) {
  return async function downloadInvoiceDataThunk(dispatch, getState) {
    try {
      await service.downloadInvoicePdf(id).then(
        (response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", 'invoice.pdf');
          document.body.appendChild(link);
          link.click();
          // dispatch(downloadFile(response.data))

          // dispatch(setbrand(response.data.result));
        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
}




export function addBrand(payload) {
  console.log(payload);
  return async function addBrandsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.createBrands(payload).then(
        (response) => {
          console.log(response.data);
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
          console.log(response.data);
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
          console.log(response.data);
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
          console.log(response.data);
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
          console.log(response.data);
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

