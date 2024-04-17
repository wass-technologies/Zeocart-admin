// import { sessionService } from '../_session';
import { toast } from "react-toastify";
import { ReturnLogin } from './ReturnLogin';

export const errorHandler = (res) => {
	if (res.status === 401) {
		toast.error(res.data.message);
		localStorage.removeItem("accessToken");
		localStorage.setItem("authenticated", false);
		localStorage.setItem("login", false);
		ReturnLogin()
	}
	let result = Array.isArray(res.data.message);
	if (result) {
		toast.error(res.data.message[0]);
		return;
	} else {
		toast.error(res.data.message);
		return;
	}

}

export const successHandler = (msg) => {
	toast.success(msg);
}
