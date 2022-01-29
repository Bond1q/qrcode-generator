import React, { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import Input from './Input';
import RangeSlider from './RangeSlider';
import TypeChoosing from './TypeChoosing';
import { getQrCode } from './../api/api';
import { saveAs } from 'file-saver'
import '../styles/container.scss'

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

	const [isActiveColorPicker, setIsActiveColorPicker] = useState(false)
	const [isActiveBgColorPicker, setIsActiveBgColorPicker] = useState(false)
	const closeColorPickers = () => {
		console.log('qq');
		if (isActiveColorPicker === true) {
			setIsActiveColorPicker(false)
		}
		if (isActiveBgColorPicker === true) {
			setIsActiveBgColorPicker(false)
		}
	}
	useEffect(() => {

		if (isReady == true) {
			const getQr = async () => {
				const res = await getQrCode(text, size, color, bgColor, indent, downloadType)
				setImgUrl(res)
			}
			getQr()
			setIsReady(false)
		}

	}, [isReady]);
	// const stopClosing = (e) => {
	// 	console.log('qq');
	// 	e.preventDefault()

	// 	e.stopPropagation()
	// }
	return (
		<div onClick={closeColorPickers} className="wrapper">
			<div className='container'>
				<div className="side">
					<Input text={text} setText={setText} />
					<ColorPicker
						text={'Color'} color={color} setColor={setColor}
						isActiveColorPicker={isActiveColorPicker} setIsActiveColorPicker={setIsActiveColorPicker}
					/>

					<ColorPicker
						text={'Background color'} color={bgColor} setColor={setBgColor}
						isActiveColorPicker={isActiveBgColorPicker} setIsActiveColorPicker={setIsActiveBgColorPicker}

					/>
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
				</div>

				<div className="side side2">
					<div className='qrCode'><img src={imgUrl ? imgUrl : '../qr.png'} alt="" /></div>
					<div className="generateBtn">
						<button onClick={() => setIsReady(true)}>Generate qr code</button>

					</div>
					{
						imgUrl && <Index imgUrl={imgUrl} downloadType={downloadType} />
					}
				</div>


			</div>
		</div>
	);
};

export default Container;


const Index = ({ imgUrl, downloadType }) => {
	console.log(imgUrl);
	const downloadImage = () => {
		saveAs(imgUrl, `qr${downloadType}`) // Put your image url here.
	}

	return <div className='downloadBtn'><button onClick={downloadImage}>Download <span>⭳</span></button></div>
}