import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import '../styles/colorPicker.scss'
const ColorPicker = ({ color, setColor, text, isActiveColorPicker, setIsActiveColorPicker }) => {
	const [activeColor, setActiveColor] = useState(color);

	const changeColorPicker = (e) => {
		e.preventDefault()
		if (isActiveColorPicker === true) {
			setColor(activeColor.slice(1, activeColor.length))
		}
		setIsActiveColorPicker(prevValue => !prevValue)
	}

	const stopClosing = (e) => {


		e.stopPropagation()
	}
	return (
		<div className='colorPicker'>
			<div className='colorsValue'>
				<div className="colorText">{text}: <span>{activeColor}</span></div>
				<div className='colorSquare' style={{ backgroundColor: activeColor }}
					onClick={changeColorPicker}>
				</div>
			</div>
			{isActiveColorPicker &&
				<div className='colorPanel' onClick={stopClosing}>
					<ChromePicker color={activeColor}
						disableAlpha={true}

						onChange={newColor => setActiveColor(newColor.hex)} /></div>
			}

		</div>
	);
};

export default ColorPicker;