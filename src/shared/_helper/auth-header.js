import { localService } from "../_session/local";

export async function authHeader(type) {
	const token = await localService.get("accessToken");
	if (token) {
		// if (type === "FormData") {
		// 	return {
		// 	  "Content-Type": "multipart/form-data",
		// 	  Authorization: "Bearer " + token,
		// 	};
		//   } else {
		// 	return { Authorization: "Bearer " + token };
		//   }

		if (type === "Blob") {
			return {
				responseType: "blob",
				Authorization: "Bearer " + token,
			};
		} else if (type === "FormData") {
			return {
				"Content-Type": "multipart/form-data",
				Authorization: "Bearer " + token,
			};
		} else if (type === "arraybuffer") {
			return {
				responseType: "arraybuffer",
			}

		}
		else {
			return { Authorization: "Bearer " + token };
		}

	} else {
		localService.clear();
	}


}