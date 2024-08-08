import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { toast } from "react-toastify";
import { setLoading } from './loader';
import { errorHandler, successHandler } from '../shared/_helper/responseHelper';

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
}); 

const initialState = {
  loadingStatus: STATUS.IDLE,
  error:"",
  token:"",
  isAuthenticated: localStorage.getItem('accessToken')? true: false,  
}

export const authSlice = createSlice({
  name: "auth",
    initialState,
    reducers:{
      loginSucces(state, {payload}) {
       localStorage.setItem("accessToken", payload.token);
       localStorage.setItem("login", true);
       localStorage.setItem("authenticated", true);
       localStorage.setItem("Name", payload.result.phoneNumber);
       localStorage.setItem("roles", payload.result.roles);
       successHandler("Successfully logged in!..")
       },
       loginFailed(state, {payload}) {
          let result = Array.isArray(payload.message);
          if (result) {
            toast.error(payload.message[0]);
            return;
          } else {
            toast.error(payload.message);
            return;
          }
        
       },
    }
  })

  export const { loginSucces, loginFailed} = authSlice.actions;

  export default authSlice.reducer;

 /*LOGIN GET OTP*/
  export function loginUser(body) {
    return async function loginUserThunk(dispatch) {
      dispatch(setLoading(true))
        try{
            await service.login({loginId:body.loginId, password:body.password}).then(
              (response) => {
                if(response.data) {
                  body.history(`${process.env.PUBLIC_URL}/dashboard/social/${body.layoutURL}`);
                  dispatch(loginSucces(response.data));
                  dispatch(setLoading(false))
                }
              }, (error) => {
                dispatch(setLoading(false))
                errorHandler(error.response)
              }
            );
        } catch(err){
          
        }
    }
  }


  
  