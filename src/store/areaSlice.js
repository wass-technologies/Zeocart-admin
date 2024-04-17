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
  areaData: [],
  totalArea: 0,
  isOpenModal: false,
  isStatusOpenModal: false,
}

export const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    setAreaData(state, { payload }) {
      state.areaData = payload.result
      state.totalArea=payload.total
    },
    updateAreaData(state, { payload }) {
      console.log(payload);
      const objIndex = state.areaData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.areaData[objIndex] = payload
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

export const { setAreaData, updateAreaData, isOpenModal, ModalToggle, isOpenStatusModal, statusToggle } = areaSlice.actions;

export default areaSlice.reducer;

/*LOGIN GET OTP*/
export function getArea(limit, offset, status, keyword, id) {
  return async function getAreaThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getArea(limit, offset, status, keyword, id).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setAreaData(response.data))
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
export function addArea(payload) {
  return async function addAreaThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addArea(payload).then(
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
export function updateArea(payload) {
  return async function updateAreaThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateArea(payload.id, payload.name,payload.pincode,payload.cityId).then(
        (response) => {
          dispatch(updateAreaData(response.data))
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
export function statusUpdateArea(payload) {
  return async function statusUpdateAreaThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateArea(payload.id, payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updateAreaData(response.data))
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
