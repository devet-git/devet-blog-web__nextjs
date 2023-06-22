import { enqueueSnackbar } from 'notistack';

function success(message: string = "Successfully") {
	return enqueueSnackbar(message, {
		variant: "success",
		persist: false,
	});
}
function info(message: string) {
	return enqueueSnackbar(message, {
		variant: "info",
		persist: false,
	});
}
function warning(message: string) {
	return enqueueSnackbar(message, {
		variant: "warning",
		persist: false,
	});
}
function error(message: string) {
	return enqueueSnackbar(message, {
		variant: "error",
		persist: false,
	});
}

const notify = { success, error, info, warning }
export default notify;