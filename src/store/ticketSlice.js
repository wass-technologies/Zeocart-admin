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
  ticketData: [],
  totalTicket: 0,
  isOpenModal: false,
  isStatusOpenModal:false,
}

export const stateSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketData(state, { payload }) {
      state.ticketData = payload.result
      state.totalTicket=payload.total
    },
    updateTicketData(state, { payload }) {
      const objIndex = state.ticketData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.ticketData[objIndex]=payload
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

export const { setTicketData, updateTicketData, isOpenModal, ModalToggle,isOpenStatusModal,statusToggle } = stateSlice.actions;

export default stateSlice.reducer;

/*LOGIN GET OTP*/
export function getTicket(limit, offset, status, keyword) {
  return async function getTicketThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getTicket(limit, offset, status, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setTicketData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function updateTicket(payload) {
  return async function updateTicketThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateTicket(payload.id,payload.name).then(
        (response) => {
          dispatch(updateTicketData(response.data))
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
          dispatch(updateTicketData(response.data))
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
