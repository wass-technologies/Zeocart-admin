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
    error: "",
    paymentData: [],
    paymentCount: null,
    paymentDetails: {},
}

export const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        getpayment(state, { payload }) {
            state.paymentData = payload.result;
            state.paymentCount = payload.total;
        },
        getpaymentDetails(state, { payload }) {
            state.paymentDetails = payload;
          
        },
    }
})


export const { getpayment, getpaymentDetails } = paymentSlice.actions;
export default paymentSlice.reducer;

/*Get payments Data */
export function paymentsData(keyword, limit, offset, fromDate, toDate, status, payType) {
    return async function paymentsDataThunk(dispatch, getState) {
        dispatch(setLoading(true))
        try {
            await service.paymentList(keyword, limit, offset, fromDate, toDate, status, payType).then(
                (response) => {
                    if (response.data) {
                        console.log(response);
                        dispatch(getpayment(response.data))
                        dispatch(setLoading(false))
                    }
                }, (error) => {

                }
            );
        } catch (err) {

        }
    }
}


export function paymentsDataById(id) {
    return async function paymentsDataThunk(dispatch, getState) {
        dispatch(setLoading(true))
        try {
            await service.paymentDetails(id).then(
                (response) => {
                    if (response.data) {
                        console.log(response);
                        dispatch(getpaymentDetails(response.data))
                        dispatch(setLoading(false))
                    }
                }, (error) => {

                }
            );
        } catch (err) {

        }
    }
}