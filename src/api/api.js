import axios from "axios"

export const getQrCode = async (text, size, color, bgColor, qzone, downloadType) => {
	const url = `http://api.qrserver.com/v1/create-qr-code/?data=${text}&size=${size}x${size}&color=${color}&bgcolor=${bgColor}&qzone=${qzone}&format=${downloadType.slice(1, downloadType.length)}${downloadType}`
	console.log(url);

	try {
		const response = await axios.get(url)
		return response.config.url
	} catch (error) {
		console.log(error);
	}
}