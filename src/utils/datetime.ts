import moment from "moment";

const dateTimeUtils = {
	/**
	 * Format DateTimeString
	 * @date 6/21/2023 - 4:52:45 PM
	 *
	 * @param {string} dateTimeString ex: 2023-06-21T03:36:33.409+00:00"
	 * @returns {string} ex: 21/06/2023 03:36:33
	 */
	format(dateTimeString: string): string {
		const formattedDateTime = moment(dateTimeString).format("DD/MM/yyyy HH:mm:ss");
		return formattedDateTime;
	}
}

export default dateTimeUtils;