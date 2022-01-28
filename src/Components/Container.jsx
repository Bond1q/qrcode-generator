import React, { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import Input from './Input';
import RangeSlider from './RangeSlider';
import TypeChoosing from './TypeChoosing';
import { getQrCode } from './../api/api';
import { saveAs } from 'file-saver'

const Container = () => {
	const qrDownloadTypes = [".png", ".jpg", ".svg"]
	const sizeTypes = ['cm', 'px']
	const [text, setText] = useState('Test');
	const [color, setColor] = useState('#ff542f');
	const [bgColor, setBgColor] = useState('#116a68')
	const [downloadType, setDownloadType] = useState(".png")
	const [sizeType, setSizeType] = useState('px')
	const [size, setSize] = useState(250);
	const [indent, setIndent] = useState(0);
	const [imgUrl, setImgUrl] = useState('')
	const [isReady, setIsReady] = useState(false)
	useEffect(() => {
		console.log(isReady);

		if (isReady == true) {
			const getQr = async () => {
				const res = await getQrCode(text, size, color, bgColor, indent, downloadType)
				setImgUrl(res)
			}
			getQr()
			setIsReady(false)
		}

	}, [isReady]);

	return (
		<div>
			<Input text={text} setText={setText} />
			<ColorPicker text={'Color'} color={color} setColor={setColor} />
			<ColorPicker text={'Background color'} color={bgColor} setColor={setBgColor} />
			<TypeChoosing text={'Types of download'} types={qrDownloadTypes}
				activeType={downloadType} setActiveType={setDownloadType} />

			<TypeChoosing text={'Measurement system'} types={sizeTypes}
				activeType={sizeType} setActiveType={setSizeType} />

			<RangeSlider text={'Size'} minValue={sizeType === 'px' ? 38 : 1}
				maxValue={sizeType === 'px' ? 1000 : 26} sliderValue={sizeType === 'px' ? 250 : 10}
				setSliderValue={setSize} type={sizeType === 'px' ? 'px' : 'cm'}
			/>
			<RangeSlider text={'Indent'} minValue={0}
				maxValue={19}
				sliderValue={1}
				setSliderValue={setIndent} type={''}
			/>
			<button onClick={() => setIsReady(true)}>GET QR CODE</button>
			<div><img src={imgUrl} alt="" /></div>
			{
				imgUrl && <Index imgUrl={imgUrl} downloadType={downloadType} />
			}

		</div>
	);
};

export default Container;


const Index = ({ imgUrl, downloadType }) => {
	console.log(imgUrl);
	const downloadImage = () => {
		saveAs(imgUrl, `qr${downloadType}`) // Put your image url here.
	}

	return <button onClick={downloadImage}>Download!</button>
}