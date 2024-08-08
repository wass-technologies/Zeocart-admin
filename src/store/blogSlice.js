
import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';
import { setLoading } from './loader';
import SweetAlert from 'sweetalert2';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  loadingStatus: STATUS.IDLE,
  error: '',
  isOpenModal: false,
  isStatusOpenModal: false,
  isImageOpenModal: false,

};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setblogs(state, { payload }) {
        state.blogData = payload;
      },
    setbrand(state, { payload }) {
      state.brandData = payload;
    },
    updateBlogsData(state, { payload }) {
      const objIndex = state.blogData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.blogData[objIndex] = payload
      }
    },
    isOpenModal(state, { payload }) {
      state.isOpenModal = payload
    },
    isImageOpenModal(state, { payload }) {
      state.isImageOpenModal = payload
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
    ImagestatusToggle(state, { payload }) {
      state.isImageOpenModal = !state.isImageOpenModal
    }
  },
});

export const { setblogs, setbrand, updateBlogsData, DeleteBrandsData, isOpenModal, isImageOpenModal, ModalToggle, setFaqsSpecializationData, isOpenStatusModal, statusToggle, ImagestatusToggle } = blogSlice.actions;
export default blogSlice.reducer;

export function fetchblogs(limit, offset, status, keyword) {
  return async function fetchblogsThunk(dispatch, getState) {
    try {
      await service.getBlogs(limit, offset, status,  keyword).then(
        (response) => {
          
          dispatch(setblogs(response.data.result));
        }, (error) => {
        }
      );

    } catch (err) {

    }
  }
}
export function addBlogs(title,shortDesc, Desc1) {
  
  return async function addBlogssThunk(dispatch) {
    try { 
      dispatch(setLoading(true))
      await service.createBlogs(title,shortDesc, Desc1).then(
        (response) => {
          
          dispatch(updateBlogsData(response.data))
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
export function updateBlogs(payload) {

  return async function updateBlogsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateBlogsdata(payload.id, payload.title, payload.shortDesc, payload.desc1).then(
        (response) => {
          
          dispatch(updateBlogsData(response.data))
          dispatch(setLoading(false))
          dispatch(ModalToggle())
          successHandler('Updated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function updateImageBlogs(id, file, type) {

  return async function updateBlogsImageThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      dispatch(isImageOpenModal())
      await service.updateBlogsImage(id, file, type).then(
        (response) => {
          
          dispatch(setLoading(false))
          successHandler('Updated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}


export function statusUpdateBlogStatus(payload) {
  
  return async function statusUpdateBlogsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateBlogs(payload.id, payload.status).then(
        (response) => {
          
          dispatch(updateBlogsData(response.data))
          dispatch(setLoading(false))
          dispatch(statusToggle())
          successHandler('Updated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function statusDeleteBlogsStatus(id, status) {
  return async function statusDeleteBlogsThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateBlogs(id, status).then(
        (response) => {
          
          dispatch(updateBlogsData(response.data))
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

