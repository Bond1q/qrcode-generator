import React, { useState, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import Input from './Input';
import RangeSlider from './RangeSlider';
import TypeChoosing from './TypeChoosing';
import { getQrCode } from './../api/api';
import { saveAs } from 'file-saver'
import '../styles/container.scss'
import classNames from 'classnames';

const Container = () => {
	const qrDownloadTypes = [".png", ".jpg", ".svg", ".gif", ".jpeg"]
	const sizeTypes = ['cm', 'px']
	const [text, setText] = useState('');
	const [color, setColor] = useState('#000000');
	const [bgColor, setBgColor] = useState('#ffffff')
	const [downloadType, setDownloadType] = useState(".png")
	const [sizeType, setSizeType] = useState('px')
	const [size, setSize] = useState(250);
	const [indent, setIndent] = useState(0);
	const [imgUrl, setImgUrl] = useState('')
	const [isReady, setIsReady] = useState(false)
	const [isChanged, setIsChanged] = useState(false)

	const [isActiveColorPicker, setIsActiveColorPicker] = useState(false)
	const [isActiveBgColorPicker, setIsActiveBgColorPicker] = useState(false)
	const closeColorPickers = () => {
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
				if (sizeType === 'cm') {
					const newSize = Math.round(size * 38)
					const res = await getQrCode(text, newSize, color, bgColor, indent, downloadType)
					setImgUrl(res)

				} else {

					const res = await getQrCode(text, size, color, bgColor, indent, downloadType)
					setImgUrl(res)

				}
			}
			getQr()
			setIsReady(false)
			setIsChanged(false)

		}

	}, [isReady]);


	useEffect(() => {
		if (text != '') {
			setIsChanged(true)
		}
	}, [text, size, color, bgColor, indent, downloadType]);



	return (
		<div onClick={closeColorPickers} className="wrapper">
			<div className='container'>
				<div className="side side1">
					<Input text={text} setText={setText} />
					<ColorPicker
						text={'Color'} color={color} setColor={setColor}
						isActiveColorPicker={isActiveColorPicker} setIsActiveColorPicker={setIsActiveColorPicker}
					/>

					<ColorPicker
						text={'Background color'} color={bgColor} setColor={setBgColor}
						isActiveColorPicker={isActiveBgColorPicker} setIsActiveColorPicker={setIsActiveBgColorPicker}

					/>
					<TypeChoosing text={'Type of download:'} types={qrDownloadTypes}
						activeType={downloadType} setActiveType={setDownloadType} />

					<TypeChoosing text={'Measurement system:'} types={sizeTypes}
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
					<div className="btns">
						<div className={classNames('generateBtn', { disableBtn: !isChanged })} >
							<button disabled={!isChanged} onClick={() => setIsReady(true)}>Create QR code</button>

						</div>
						<Index imgUrl={imgUrl} downloadType={downloadType} />

					</div>

				</div>


			</div>
		</div>
	);
};

export default Container;


const Index = ({ imgUrl, downloadType }) => {
	const downloadImage = () => {
		saveAs(imgUrl, `QR${downloadType}`) // Put your image url here.
	}

	return <div className={classNames('downloadBtn', { disableBtn: imgUrl === '' })} >
		<button disabled={imgUrl === ''} onClick={downloadImage}>Download <span>⭳</span></button>

	</div>
}