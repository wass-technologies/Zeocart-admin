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
  error: "",
  pageOneData: {},
  pageDesc: '',
  pageTitle:'',
  pageData: [],
}

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setOnePageData(state, { payload }) {
      state.pageOneData = payload
      state.pageDesc = payload.desc
      state.pageTitle = payload.title
    },
    setPageData(state, { payload }) {
      state.pageData = payload
    },
  }
})


export const { setOnePageData, setPageData } = pageSlice.actions;
export default pageSlice.reducer;


export function getPage() {
  return async function getPageThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true))
      await service.getPage().then(
        (response) => {
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(setPageData(response.data))
          }
        }, (error) => {
          dispatch(setLoading(false))
        }
      );
    } catch (err) {

    }
  }
}
/*Get Pages Data */
export function pagesData(pageId) {
  return async function pagesDataThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true))
      await service.pagesData(pageId).then(
        (response) => {
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(setOnePageData(response.data))
          }
        }, (error) => {
          dispatch(setLoading(false))
        }
      );
    } catch (err) {

    }
  }
}

export function updatePage(payload) {
  return async function updatePageThunk(dispatch, getState) {
    try {
      dispatch(setLoading(true))
      await service.updatePage(payload.pageId,payload.title,payload.desc).then(
        (response) => {
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(setOnePageData(response.data))
            successHandler('Updated Successfully')
          }
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}