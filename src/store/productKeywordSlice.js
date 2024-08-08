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
  productKeywordData: [],
  isOpenModal: false,
  totalKeyword: 0,
}

export const productKeywordSlice = createSlice({
  name: "productKeyword",
  initialState,
  reducers: {
    setproductKeywordData(state, { payload }) {
      state.productKeywordData = payload.result
      state.totalKeyword = payload.count
    },
    pushproductKeyword(state, { payload }) {
      state.productKeywordData = [...state.productKeywordData, ...payload]
      state.totalKeyword += payload.length
    },
    sliceproductKeyword(state, { payload }) {
      const objIndex = state.productKeywordData.findIndex((obj) => obj.keyword === payload.keyword);
      state.productKeywordData.splice(objIndex, 1);


    },
    isOpenModal(state, { payload }) {
      state.isOpenModal = payload
    },
    ModalToggle(state, { payload }) {
      state.isOpenModal = !state.isOpenModal
    },
  }
})

export const { setproductKeywordData, pushproductKeyword, sliceproductKeyword, isOpenModal, ModalToggle } = productKeywordSlice.actions;

export default productKeywordSlice.reducer;

export function getproductKeyword(id, limit, offset) {
  return async function getproductKeywordThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.fetchproductKeyword(id, limit, offset).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setproductKeywordData(response.data))

        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function addproductKeyword(id, keyword) {
  return async function addproductKeywordThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addproductKeyword(id, keyword).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(pushproductKeyword(response.data))
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
export function statusDeleteKeyword(id, status) {
  return async function statusDeleteKeywordThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateproductKeyword(id, status).then(
        (response) => {
          dispatch(sliceproductKeyword(response.data))
          dispatch(setLoading(false))
          successHandler('Deleted Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

