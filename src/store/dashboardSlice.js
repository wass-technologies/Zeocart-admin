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
    dashboardData: "", 
    dashboardpieData: "", 
}

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers:{
        getdashboard(state, {payload}) {
            state.dashboardData = payload;
        },
        getpiedashboard(state, {payload}) {
            state.dashboardpieData = payload;
        },
    }
})

  
export const { getdashboard, getpiedashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;

/*Get dashboards Data */
export function dashboardsData(dashboardId) { 
    return async function dashboardsDataThunk(dispatch, getState) { 
        dispatch(setLoading(true))
        try{
            await service.dashboard(dashboardId).then(
              (response) => {
                if(response.data) {
                    dispatch(getdashboard(response.data)) 
                    dispatch(setLoading(false))
                }
              }, (error) => {
              
              }
            );
        } catch(err){
            
        }
    }
  }
  export function dashboardpie(dashboardId) { 
    return async function dashboardpieThunk(dispatch, getState) { 
        dispatch(setLoading(true))
        try{
            await service.dashboardpie(dashboardId).then(
              (response) => {
                if(response.data) {
                    dispatch(getpiedashboard(response.data)) 
                    dispatch(setLoading(false))
                }
              }, (error) => {
              
              }
            );
        } catch(err){
            
        }
    }
  }