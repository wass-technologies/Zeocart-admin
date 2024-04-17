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
  settingsData: [],
  isOpenModal: false,
  isStatusOpenModal:false,
  isImageOpenModal:false,
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettingsData(state, { payload }) {
      state.settingsData.push(payload)
    },
    updateSettingsData(state, { payload }) {
      const objIndex = state.settingsData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.settingsData[objIndex]=payload
      }
    },
    updateSettingsStatus(state,{payload}){
      const objIndex = state.settingsData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.settingsData[objIndex].status=payload.status
      }
    },
    updateSettingsBanner(state, { payload }) {
      const objIndex = state.settingsData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.settingsData[objIndex].banner1=payload.banner1?payload.banner1:state.settingsData[objIndex].banner1
        state.settingsData[objIndex].banner2=payload.banner2?payload.banner2:state.settingsData[objIndex].banner2
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
    },
    isOpenImageModal(state, { payload }) {
      state.isImageOpenModal = payload
    },
    imageToggle(state, { payload }) {
      state.isImageOpenModal = !state.isImageOpenModal
    }
  }
})

export const { setSettingsData, updateSettingsData, isOpenModal, ModalToggle,isOpenStatusModal,
  statusToggle,isOpenImageModal,imageToggle,updateSettingsBanner,updateSettingsStatus } = settingsSlice.actions;

export default settingsSlice.reducer;

/*LOGIN GET OTP*/
export function getSettings(limit, offset, status, keyword) {
  return async function getSettingsThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getSettings(limit, offset, status, keyword).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(setSettingsData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function addState(payload) {
  return async function addStateThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addState(payload).then(
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
export function updateState(payload) {
  return async function updateStateThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateState(payload.id,payload.name).then(
        (response) => {
          dispatch(updateSettingsData(response.data))
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
export function statusUpdateSettings(payload) {
  return async function statusUpdateSettingsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateSettings(payload.id,payload.status).then(
        (response) => {
          dispatch(updateSettingsStatus(response.data))
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

export function addSettingsBanner1(payload) {
  return async function addSettingsBanner1Thunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addSettingsBanner1(payload.id,payload).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(imageToggle())
          dispatch(updateSettingsBanner(response.data))
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
export function addSettingsBanner2(payload) {
  return async function addSettingsBanner2Thunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addSettingsBanner2(payload.id,payload).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(imageToggle())
          dispatch(updateSettingsBanner(response.data))
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
