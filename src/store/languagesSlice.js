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
  languagesData: [],
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setLanguagesData(state, { payload }) {
      state.languagesData = payload.result
    },
    pushManagerLanguagesData(state, { payload }) {
        state.languagesData.push(payload)
    },
    updateLanguagesData(state, { payload }) {
      const objIndex = state.languagesData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.languagesData[objIndex]=payload
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

export const { setLanguagesData, updateLanguagesData, isOpenModal, ModalToggle,
  isOpenStatusModal,statusToggle,pushManagerLanguagesData } = languagesSlice.actions;

export default languagesSlice.reducer;

/*LOGIN GET OTP*/
export function getLanguages(limit, offset, status, keyword) {
  return async function getLanguagesThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getLanguages(limit, offset, status, keyword).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(setLanguagesData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addLanguages(payload) {
  return async function addLanguagesThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addLanguages(payload).then(
        (response) => {
          console.log(response.data);
          response.data['name']=payload.name
          dispatch(pushManagerLanguagesData(response.data))
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
export function updateLanguages(payload) {
  return async function updateLanguagesThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateLanguages(payload.id,payload.name).then(
        (response) => {
          dispatch(updateLanguagesData(response.data))
          dispatch(setLoading(false))
          dispatch(ModalToggle())
          successHandler('updateed Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function statusUpdateLanguages(payload) {
  return async function statusUpdateLanguagesThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateLanguages(payload.id,payload.status).then(
        (response) => {
          dispatch(updateLanguagesData(response.data))
          dispatch(setLoading(false))
          dispatch(statusToggle())
          successHandler('updateed Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
