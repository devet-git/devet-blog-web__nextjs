import { enqueueSnackbar } from 'notistack';
import axios from 'axios';
import notify from '@/configs/notify';


const apiErrorHandler = (error: any) => {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			// Handle API response error
			console.log(error.response.data);
			notify.error(error.response.data.errors)
			return;
			// throw new Error(error.response.data.message);
		} else {
			// Handle network error
			// console.log('Network error');
			notify.error("The API is temporarily down. Please try again later.")
			return;
			// throw new Error('Network error');
		}
	} else {
		// Handle generic error
		// console.log('Something went wrong');
		enqueueSnackbar("Something went wrong");
		throw new Error('Something went wrong');
	}
}
export default apiErrorHandler