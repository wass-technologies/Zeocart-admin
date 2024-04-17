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
  degreeData: [],
  totalDegree:0,
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const degreeSlice = createSlice({
  name: "degree",
  initialState,
  reducers: {
    setDegreeData(state, { payload }) {
      state.degreeData = payload.result
      state.totalDegree=payload.total
    },
    updateDegreeData(state, { payload }) {
      const objIndex = state.degreeData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.degreeData[objIndex]=payload
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

export const { setDegreeData, updateDegreeData, isOpenModal, ModalToggle,isOpenStatusModal,statusToggle } = degreeSlice.actions;

export default degreeSlice.reducer;

export function getDegree(limit, offset, status, keyword) {
  return async function getDegreeThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getDegree(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setDegreeData(response.data))
          console.log(response.data);
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addDegree(payload) {
  return async function addDegreeThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addDegree(payload).then(
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
export function updateDegree(payload) {
  return async function updateDegreeThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateDegree(payload.id,payload.name).then(
        (response) => {
          dispatch(updateDegreeData(response.data))
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
export function statusUpdateDegree(payload) {
  return async function statusUpdateDegreeThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateDegree(payload.id,payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updateDegreeData(response.data))
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
