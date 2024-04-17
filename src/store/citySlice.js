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
  cityData: [],
  totalCity:0,
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCityData(state, { payload }) {
      state.cityData = payload.result
      state.totalCity=payload.total
    },
    updatecityData(state, { payload }) {
      const objIndex = state.cityData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.cityData[objIndex]=payload
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

export const { setCityData, updatecityData, isOpenModal, ModalToggle,isOpenStatusModal,statusToggle } = citySlice.actions;

export default citySlice.reducer;

/*LOGIN GET OTP*/
export function getCity(limit, offset, status, keyword,id) {
  return async function getCityThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getCity(limit, offset, status, keyword,id).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setCityData(response.data))
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
export function addCity(payload) {
  return async function addCityThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addCity(payload).then(
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
export function updateCity(payload) {
  return async function updateCityThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateCity(payload.id,payload.name,payload.stateId).then(
        (response) => {
          dispatch(updatecityData(response.data))
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
export function statusUpdateCity(payload) {
  return async function statusUpdateCityThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateCity(payload.id,payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updatecityData(response.data))
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
