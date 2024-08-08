import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';


const initialState = {
  staffData: [],
  totalStaff: 0,
  permissionData:[],
  staffDetails:null,
}

export const staffSlice = createSlice({
  name: "staff", 
  initialState,
  reducers: {
    setStaffData(state, { payload }) {
      state.staffData = payload.result
      state.totalStaff = payload.total
    },
    updateStateData(state, { payload }) {
      const objIndex = state.staffData.findIndex((obj) => obj.id === payload.id);
      if(objIndex>=0){
        state.staffData[objIndex].status=payload.status
      }
    },
    pushData(state, { payload }) {
      state.staffData.push(payload)
    },
    updateStaffDetails(state, { payload }) {
      const objIndex = state.staffData.findIndex((obj) => obj.id === payload.accountId);
      if(objIndex>=0){
        state.staffData[objIndex].staffDetail[0]=payload
      }
    },
    setStaffIdData(state,{payload}){
      state.permissionData=payload.perms
      state.staffDetails=payload.user
      
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

export const { setStaffData,isOpenModal,
  ModalToggle,
  isOpenStatusModal,pushData,
  statusToggle,updateStateData,updateStaffDetails,setStaffIdData } = staffSlice.actions;

export default staffSlice.reducer;

/*LOGIN GET OTP*/
export function getStaff(limit, offset, status, keyword,role) {
  return async function getStaffThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getStaff(limit, offset, status, keyword,role).then(
        (response) => {
          
          if (response.data) {
            dispatch(setStaffData(response.data));
            dispatch(setLoading(false))
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
export function getStaffById(id) {
  return async function getStaffByIdThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.getStaffById(id).then(
        (response) => {
          
          if (response.data) {
            dispatch(setStaffIdData(response.data));
            dispatch(setLoading(false))
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
export function addStaff(body) {
  return async function addStaffThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.addStaff(body).then(
        (response) => {
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(isOpenModal(false))
            dispatch(pushData(response.data))
            successHandler('Added Successfully')
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
export function updateStaff(body) {
  return async function updateStaffThunk(dispatch) {
    dispatch(setLoading(true))
    try {
      await service.updateStaff(body.id,body).then(
        (response) => {
          
          if (response.data) {
            dispatch(setLoading(false))
            dispatch(updateStaffDetails(response.data))
            dispatch(isOpenModal(false))
            successHandler('Update Successfully')
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
export function statusUpdateStaff(payload) {
  return async function statusUpdateStaffThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.statusUpdateStaff(payload.id,payload.status).then(
        (response) => {
          dispatch(updateStateData(response.data))
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

export function updateStaffPermission(payload) {
  return async function updateStaffPermissionThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.updateStaffPermission(payload.id,payload.menu).then(
        (response) => {
          dispatch(setLoading(false))
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