import { createSlice } from '@reduxjs/toolkit'
import { service } from '../shared/_services/api_service'
import { setLoading } from './loader';

const STATUS = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error', 
    LOADING: 'loading'
  });

const initialState = {
    loadingStatus: STATUS.IDLE,
    error:"",
    paymentData: "", 
}

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers:{
        getpayment(state, {payload}) {
            state.paymentData = payload;
        },
    }
})

  
export const { getpayment, getpiepayment } = paymentSlice.actions;
export default paymentSlice.reducer;

/*Get payments Data */
export function paymentsData(paymentId) { 
    return async function paymentsDataThunk(dispatch, getState) { 
        dispatch(setLoading(true))
        try{
            await service.paymentList(paymentId).then(
              (response) => {
                if(response.data) {
                    dispatch(getpayment(response.data)) 
                    dispatch(setLoading(false))
                }
              }, (error) => {
              
              }
            );
        } catch(err){
            
        }
    }
  }
