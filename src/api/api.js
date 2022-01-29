import axios from "axios"

export const getQrCode = async (text, size, color, bgColor, qzone, downloadType) => {
	const correctColor = color.slice(1, color.length)
	const correctBgColor = bgColor.slice(1, bgColor.length)
	const correctDownloadType = downloadType.slice(1, downloadType.length)
	const url = `http://api.qrserver.com/v1/create-qr-code/?data=${text}&size=${size}x${size}
	&color=${correctColor}&bgcolor=${correctBgColor}&qzone=${qzone}&format=${correctDownloadType}${downloadType}`
	console.log(url);

	try {
		const response = await axios.get(url)
		return response.config.url
	} catch (error) {
		console.log(error);
	}
}