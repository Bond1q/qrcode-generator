import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import '../styles/colorPicker.scss'
const ColorPicker = ({ color, setColor, text, isActiveColorPicker, setIsActiveColorPicker }) => {

	const changeColorPicker = (e) => {
		e.preventDefault()

		setIsActiveColorPicker(prevValue => !prevValue)
	}

	const stopClosing = (e) => {
		e.stopPropagation()
	}


	return (
		<div className='colorPicker'>
			<div className='colorsValue'>
				<div className="colorText">{text}: <span>{color}</span></div>
				<div className='colorSquare' style={{ backgroundColor: color }}
					onClick={changeColorPicker}>
				</div>
			</div>
			{isActiveColorPicker &&
				<div className='colorPanel' onClick={stopClosing}>
					<ChromePicker color={color}
						disableAlpha={true}

						onChange={newColor => setColor(newColor.hex)} /></div>
			}

		</div>
	);
};

export default React.memo(ColorPicker);