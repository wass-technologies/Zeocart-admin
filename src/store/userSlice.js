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
  totalUser:0,
  isOpenModal: false,
  isStatusOpenModal: false,

  accountId: '',
  address: '',
  age: '',
  areaId: '',
  areaName: '',
  cityId: '',
  cityName: '',
  createdAt: '',
  dob: '',
  doctorDetailId: '',
  email: '',
  gender: '',
  id: '',
  name: '',
  phoneNumber: '',
  pid: '',
  pincode: '',
  stateId: '',
  stateName: '',
  updatedAt: '',
  updatedId: '',
}

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, { payload }) {
      state.userData = payload.result
      state.totalUser = payload.total
    },
    updateUserData(state, { payload }) {
      const objIndex = state.userData.findIndex((obj) => obj.id === payload.id);
      if (objIndex >= 0) {
        state.userData[objIndex] = payload
      }
    },
    setUserDetails(state, { payload }) {
      function decryptData(text,manager){
        try {
          const combined = CryptoJS.enc.Base64.parse(text);
      
          const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4));
          const encryptedText = CryptoJS.lib.WordArray.create(combined.words.slice(4));
      
          const key = CryptoJS.PBKDF2(manager, iv, {
            keySize: 256 / 32,
            iterations: 65536,
            hasher: CryptoJS.algo.SHA256,
          });
      
          const decrypted = CryptoJS.AES.decrypt(
            {
              ciphertext: encryptedText,
            },
            key,
            {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            }
          );
    
          const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
          return decryptedText.trim(); // Trim any leading or trailing spaces
        } catch (error) {
          console.error("Decryption error:", error);
          return ""; 
        }
      }
      console.log(payload);
      state.accountId = payload.accountId
      state.address =decryptData(payload.address,payload.accountId) 
      state.age = decryptData(payload.age,payload.accountId) 
      state.areaId = payload.areaId
      state.areaName = payload.areaName
      state.cityId = payload.cityId
      state.cityName = payload.cityName
      state.createdAt = payload.createdAt
      state.dob = payload.dob
      state.doctorDetailId = payload.doctorDetailId
      state.email = decryptData(payload.email,payload.accountId) 
      state.gender = payload.gender
      state.id = payload.id
      state.name =decryptData(payload.name,payload.accountId) 
      state.phoneNumber = decryptData(payload.phoneNumber,payload.accountId) 
      state.pid = payload.pid
      state.pincode = payload.pincode
      state.stateId = payload.stateId
      state.stateName = payload.stateName
      state.updatedAt = payload.updatedAt
      state.updatedId = payload.updatedId

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

export const { setUserData, updateUserData, isOpenModal, ModalToggle, isOpenStatusModal, statusToggle, setUserDetails } = userSlice.actions;

export default userSlice.reducer;

export function getUser(limit, offset, keyword, fromDate, toDate) {
  return async function getUserThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getUser(limit, offset, keyword, fromDate, toDate).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setUserData(response.data))
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
export function getUserById(id) {
  return async function getUserByIdThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getUserById(id).then(
        (response) => {
          dispatch(setLoading(false))
          dispatch(setUserDetails(response.data))
        }, (error) => {
          dispatch(setLoading(false))
          errorHandler(error.response)
        }
      );
    } catch (err) {

    }
  }
}
export function updateDegree(payload) {
  return async function updateDegreeThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateDegree(payload.id, payload.name).then(
        (response) => {
          dispatch(updateUserData(response.data))
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
export function statusUpdateDegree(payload) {
  return async function statusUpdateDegreeThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateDegree(payload.id, payload.status).then(
        (response) => {
          console.log(response.data);
          dispatch(updateUserData(response.data))
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
