import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';
import CryptoJS from "crypto-js";

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

const initialState = {
  loadingStatus: STATUS.IDLE,
  userData: [],
  totalUser: 0,
  isOpenModal: false,
  isStatusOpenModal: false,
}

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, { payload }) {
      state.userData = payload.result
      state.totalUser = payload.total
    },
  }
})

export const { setUserData, } = userSlice.actions;

export default userSlice.reducer;

export function getUser(limit, offset, keyword) {
  return async function getUserThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getUser(limit, offset, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setUserData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {
    }
  }
}
