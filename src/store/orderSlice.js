
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
    setOrdersDAta(state, { payload }) {
      state.ordersData = payload.result;
      state.orderCount = payload.total;
    },
    updateOrdersDAta(state, { payload }) {
      const objIndex = state.ordersData.findIndex((obj) => obj.orderId === payload.id);
      if (objIndex >= 0) {
        state.ordersData[objIndex].status = payload.status
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
      
      if (
        window.navigator &&
        window.navigator.msSaveOrOpenBlob
      ) return window.navigator.msSaveOrOpenBlob(payload.pdfData);

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

export const { setOrdersDAta, downloadFile, updateOrdersDAta, DeleteBrandsData, isOpenModal, isImageOpenModal, ModalToggle, setFaqsSpecializationData, isOpenStatusModal, statusToggle, ImagestatusToggle } = ordersSlice.actions;
export default ordersSlice.reducer;

export function fetchorders(limit, offset, status, keyword, paymentStatus, paymentMode, toDate, fromDate) {
  return async function fetchordersThunk(dispatch, getState) {
    try {
      await service.ordersdata(limit, offset, status, keyword, paymentStatus, paymentMode,  toDate, fromDate).then(
        (response) => {
          
          dispatch(setOrdersDAta(response.data));
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
        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
}

export function orderStatusChange(id, status) {
  return async function orderStatusChangeThunk(dispatch, getState) {
    try {
      await service.orderChangeStatus(id, status).then(
        (response) => {
          dispatch(statusToggle());
          dispatch(updateOrdersDAta({id: id, status:status}));
          dispatch(successHandler("Order Updated Sucessfully"))

        }, (error) => {
          dispatch(statusToggle());

        }
      );

    } catch (err) {

    }
  }
}


