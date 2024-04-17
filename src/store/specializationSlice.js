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
  specializData: [],
  degreeData:[],
  isOpenModal: false,
  isStatusOpenModal:false,
  isImageOpenModal:false,
}

export const specializationSlice = createSlice({
  name: "specialization",
  initialState,
  reducers: {
    setSpecializationData(state, { payload }) {
      console.log({payload});
      state.specializData = payload.result
    },
    updateSpecializationData(state, { payload }) {
      const objIndex = state.specializData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.specializData[objIndex]=payload
      }
    },
    setDegreeData(state, { payload }) {
      state.degreeData = payload.result
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

export const { setSpecializationData, updateSpecializationData, isOpenModal, 
  ModalToggle,isOpenStatusModal,statusToggle,setDegreeData,isOpenImageModal,imageToggle } = specializationSlice.actions;

export default specializationSlice.reducer;

export function getSpecialization(limit, offset, status, keyword) {
  return async function getSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getSpecialization(limit, offset, status, keyword).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(setSpecializationData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addSpecialization(payload) {
  return async function addSpecializationThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addSpecialization(payload).then(
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
export function updateSpecialization(payload) {
  return async function updateSpecializationThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateSpecialization(payload.id,payload).then(
        (response) => {
          dispatch(updateSpecializationData(response.data))
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
export function statusUpdateSpecialization(payload) {
  return async function statusUpdateSpecializationThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateSpecialization(payload.id,payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updateSpecializationData(response.data))
          dispatch(setLoading(false))
          dispatch(statusToggle())
          successHandler('Updateed Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

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
export function addSpecializationBanner(payload) {
  return async function addSpecializationBannerThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addSpecializationBanner(payload.id,payload).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(imageToggle())
          dispatch(updateSpecializationData(response.data))
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