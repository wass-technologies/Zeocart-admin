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
  faqsData: [],
  faqSpecializationData: [],
  isOpenModal: false,
  isStatusOpenModal: false,
  totalFaq: 0,
}

export const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    setFaqsData(state, { payload }) {
      state.faqsData = payload.result
      state.totalFaq = payload.total
    },
    updateFaqsData(state, { payload }) {
      const objIndex = state.faqsData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.faqsData[objIndex] = payload
      }
    },
    pushFaqs(state, { payload }) {
      console.log(payload);
      state.faqsData.push(payload)
    },
    setFaqsSpecializationData(state, { payload }) {
      
      state.faqSpecializationData = payload.result
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
    },
  }
})

export const { setFaqsData, updateFaqsData, pushFaqs, isOpenModal, ModalToggle, setFaqsSpecializationData, isOpenStatusModal, statusToggle } = faqsSlice.actions;

export default faqsSlice.reducer;

export function getFaqs(limit, offset, status, keyword) {
  return async function getFaqsThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getFaqs(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setFaqsData(response.data))
          
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addFaqs(payload) {
  return async function addFaqsThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addFaqs(payload).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(pushFaqs(response.data))
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
export function updateFaqs(payload) {
  return async function updateFaqsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateFaqs(payload.id, payload).then(
        (response) => {
          dispatch(updateFaqsData(response.data))
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
export function statusUpdateFaqStatus(payload) {
  return async function statusUpdateFaqsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateFaqs(payload.id, payload.status).then(
        (response) => {
          
          dispatch(updateFaqsData(response.data))
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

export function statusDeleteFaq(id, status) {
  return async function statusDeleteFaqThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateFaqs(id, status).then(
        (response) => {
          
          dispatch(updateFaqsData(response.data))
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
export function getFaqsSpecialization(limit, offset, keyword, faqId) {
  return async function getFaqsSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getFaqsSpecialization(limit, offset, keyword, faqId).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setFaqsSpecializationData(response.data))
          
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
