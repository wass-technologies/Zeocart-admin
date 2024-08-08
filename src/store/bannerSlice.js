import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import SweetAlert from 'sweetalert2';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

const initialState = {
  loadingStatus: STATUS.IDLE, 
  bannerData: [],
  bannerDataCopy: [],
  isOpenModal: false,
  isStatusOpenModal:false,
  isImageOpenModal: false,

}

export const BannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBannerData(state, { payload }) {
      state.bannerData = payload.result
    },
    setBannerCopyData(state, { payload }) {
      console.log(payload);
      
      state.bannerDataCopy = payload.result
    },
    updatebannerData(state, { payload }) {
      const objIndex = state.bannerData.findIndex((obj) => obj.id === payload.id);
        state.bannerData[objIndex]=payload
    },
    updatebannerCopyData(state, { payload }) {
      const objIndex = state.bannerData.findIndex((obj) => obj.id === payload.id);
        state.bannerData[objIndex]=payload
    },
    isOpenModal(state, { payload }) {
      state.isOpenModal = payload
    },
    ModalToggle(state, { payload }) {
      state.isOpenModal = !state.isOpenModal
    },
    isImageOpenModal(state, { payload }) {
      state.isImageOpenModal = payload
    },
    ImagestatusToggle(state, { payload }) {
      state.isImageOpenModal = !state.isImageOpenModal
    }
  }
})

export const { setBannerData, setBannerCopyData, updatebannerData, updatebannerCopyData, isOpenModal, ModalToggle,isImageOpenModal, ImagestatusToggle } = BannerSlice.actions;

export default BannerSlice.reducer;

export function getBanner(limit, offset, status, keyword, id) {
  return async function getBannerThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getBanner(limit, offset, status, keyword, id).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setBannerData(response.data))
        
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function getBannerCopy(limit, offset, status, keyword, id) {
  return async function getBannerCopyThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getBanner(limit, offset, status, keyword, id).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setBannerCopyData(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}

export function updateBannerUrl(bannerId, redirectId) {
  return async function updateBannerUrlThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.updateBannerUrl(bannerId, redirectId).then(
        (response) => {
          dispatch(updatebannerData(response.data));
          dispatch(ModalToggle())
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







export function updateBanner(id, file) {
  return async function updateBannerThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.updateBannerImage(id, file).then(
        (response) => {
          dispatch(updatebannerData(response.data));
          dispatch(updatebannerCopyData(response.data))
          dispatch(ImagestatusToggle())
          dispatch(setLoading(false))
          successHandler('Updated Successfully')
        }, (error) => {
          dispatch(setLoading(false))
          // console.log(error);
          errorHandler(error.response)
        }
      );
    } catch (err) {
      // console.log(err);
      // errorHandler()

    }
  }
}
