import api from "@/configs/api";
import endpoints from "@/constants/endpoints";
import apiErrorHandler from "@/handlers/apiError";

const fileService = {
	async upload(file: File) {
		try {
			let requestFormData = new FormData();
			requestFormData.append("files", file);
			const res = await api.post(endpoints.file.UPLOAD, requestFormData, {
				headers: { "Content-Type": "multipart/form-data" }
			})

			if (res.data) {
				return res.data;
			}

		} catch (error) {
			apiErrorHandler(error);
		}
	},
	async uploadMulti(files: File[]) {
		try {
			let requestFormData = new FormData();
			files.forEach((file: File) => requestFormData.append("files", file))
			const res = await api.post(endpoints.file.UPLOAD, requestFormData, {
				headers: { "Content-Type": "multipart/form-data" }
			})
			return res.data || null
		} catch (error) {
			apiErrorHandler(error);
		}
	},
	async deleteById(imgId: string) {
		try {
			const res = await api.delete(endpoints.file.DELETE_BY_ID(imgId))
			return res.data || null
		} catch (error) {
			apiErrorHandler(error)
		}
	}
}

export default fileService;