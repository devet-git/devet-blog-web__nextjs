const fileUtils = {
	convertBase64ToFileObject(base64String: string, fileName: string, type: string): File {
		const file = new File([new Blob([base64String])], fileName, { type })
		return file
	}
}
export default fileUtils