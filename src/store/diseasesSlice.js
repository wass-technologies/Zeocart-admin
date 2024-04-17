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
  diseasesData: [],
  totalDiseases: 0,
  isOpenModal: false,
  isStatusOpenModal:false,
  isImageOpenModal:false,
}

export const diseasesSlice = createSlice({
  name: "diseases",
  initialState,
  reducers: {
    setDiseasesData(state, { payload }) {
      state.diseasesData = payload.result
      state.totalDiseases=payload.total
    },
    updateDiseasesData(state, { payload }) {
      const objIndex = state.diseasesData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.diseasesData[objIndex]=payload
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

export const { setDiseasesData, updateDiseasesData, isOpenModal, ModalToggle,
  isOpenStatusModal,statusToggle,isOpenImageModal, imageToggle } = diseasesSlice.actions;

export default diseasesSlice.reducer;

export function getDiseases(limit, offset, status, keyword) {
  return async function getDiseasesThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getDiseases(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setDiseasesData(response.data))
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
export function addDiseases(payload) {
  return async function addDiseasesThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addDiseases(payload).then(
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
export function updateDiseases(payload) {
  return async function updateDiseasesThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateDiseases(payload.id,payload.name,payload.top).then(
        (response) => {
          dispatch(updateDiseasesData(response.data))
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
export function statusUpdateDiseases(payload) {
  return async function statusUpdateDiseasesThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateDiseases(payload.id,payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updateDiseasesData(response.data))
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
export function addDiseasesLogo(payload) {
  return async function addDiseasesLogoThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addDiseasesLogo(payload.id,payload).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(imageToggle())
          dispatch(updateDiseasesData(response.data)) 
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
export function addDiseasesTopLogo(payload) {
  return async function addDiseasesTopLogoThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addDiseasesTopLogo(payload.id,payload).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(imageToggle())
          dispatch(updateDiseasesData(response.data))
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