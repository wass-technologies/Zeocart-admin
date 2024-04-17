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
  diseaseQuestionsData: [],
  totalDiseaseQuestions: 0,
  isOpenModal: false,
  isStatusOpenModal:false,
  isNextOpenModal:false,
  questionId:null,
  optionId:null,
}

export const diseaseQuestionsSlice = createSlice({
  name: "diseaseQuestions",
  initialState,
  reducers: {
    setDiseaseQuestionsData(state, { payload }) {
      state.diseaseQuestionsData = payload.result
      state.totalDiseaseQuestions=payload.total
    },
    pushDiseaseQuestionsData(state, { payload }) {
        state.diseaseQuestionsData.push(payload)
        state.questionId=payload.id
        state.optionId=payload.optionId
    },
    updateDiseaseQuestionsData(state, { payload }) {
      const objIndex = state.diseaseQuestionsData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.diseaseQuestionsData[objIndex]=payload
      }
    },
    updateDiseaseQuestionsStatus(state, { payload }) {
      const objIndex = state.diseaseQuestionsData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.diseaseQuestionsData[objIndex].status=payload.status
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
    isOpenNextModal(state, { payload }) {
      state.isNextOpenModal = payload
    },
    nextToggle(state, { payload }) {
      state.isNextOpenModal = !state.isNextOpenModal
    }
  }
})

export const { setDiseaseQuestionsData, updateDiseaseQuestionsData, isOpenModal, ModalToggle,
  isOpenStatusModal,statusToggle,pushDiseaseQuestionsData,updateDiseaseQuestionsStatus,nextToggle,isOpenNextModal } = diseaseQuestionsSlice.actions;

export default diseaseQuestionsSlice.reducer;

/*LOGIN GET OTP*/
export function getDiseaseQuestions(limit, offset, status, keyword,gender,diseaseId,specializationId,questionId,optionId) {
  return async function getDiseaseQuestionsThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getDiseaseQuestions(limit, offset, status, keyword,gender,diseaseId,specializationId,questionId,optionId).then(
        (response) => {
          console.log(response.data);
          dispatch(setLoading(false))
          dispatch(setDiseaseQuestionsData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addDiseaseQuestions(payload) {
  return async function addDiseaseQuestionsThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addDiseaseQuestions(payload).then(
        (response) => {
          console.log(response.data);
          response.data['diseaseAnswer']=response.data.answers
          dispatch(pushDiseaseQuestionsData(response.data))
          dispatch(setLoading(false))
          dispatch(ModalToggle())
          dispatch(isOpenNextModal(true))
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
export function updateDiseaseQuestions(payload) {
  return async function updateDiseaseQuestionsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateDiseaseQuestions(payload.id,payload).then(
        (response) => {
          response.data['diseaseAnswer']=response.data.answers
          dispatch(updateDiseaseQuestionsData(response.data))
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
export function statusUpdateDiseaseQuestions(payload) {
  return async function statusUpdateDiseaseQuestionsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateDiseaseQuestions(payload.id,payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updateDiseaseQuestionsStatus(response.data))
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
