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
  stateData: [],
  totalState: 0,
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setStateData(state, { payload }) {
      state.stateData = payload.result
      state.totalState=payload.total
    },
    updateStateData(state, { payload }) {
      const objIndex = state.stateData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.stateData[objIndex]=payload
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

export const { setStateData, updateStateData, isOpenModal, ModalToggle,isOpenStatusModal,statusToggle } = stateSlice.actions;

export default stateSlice.reducer;

/*LOGIN GET OTP*/
export function getState(limit, offset, status, keyword) {
  return async function getStateThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getState(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setStateData(response.data))
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
          dispatch(updateStateData(response.data))
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
export function statusUpdateState(payload) {
  return async function statusUpdateStateThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateState(payload.id,payload.status).then(
        (response) => {
          dispatch(updateStateData(response.data))
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
