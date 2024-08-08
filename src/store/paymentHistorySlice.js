
import { createSlice } from '@reduxjs/toolkit';
import { service } from '../shared/_services/api_service';
import { setLoading } from './loader';

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

export const paymentHistorySlice = createSlice({
  name: 'paymentHistory',
  initialState,
  reducers: {

  },
});

export const { } = paymentHistorySlice.actions;
export default paymentHistorySlice.reducer;


export function downloadLabelData(id) {
  return async function downloadLabelDataThunk(dispatch) {
    try {
      dispatch(setLoading(true))
      await service.downloadLabelPdf(id).then(
        (response) => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${id}_label.pdf`; 
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);      
            dispatch(setLoading(false))
        }
      );
    } catch (err) {
    }
  }
}


