import { createSlice } from '@reduxjs/toolkit'

const STATUS = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

const initialState = {
  loadingStatus: STATUS.IDLE,
  loading: false,
}

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading=payload
    },
  }
})

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

/*LOGIN GET OTP*/
export function callSetLoading(status) {
  return async function loadingThunk(dispatch) {
    try {
      dispatch(setLoading(status))
    } catch (err) {

    }
  }
}



