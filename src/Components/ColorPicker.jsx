import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import '../styles/colorPicker.scss'
const ColorPicker = ({ color, setColor, text }) => {
	const [activeColor, setActiveColor] = useState(color);
	const [isActiveColorPicker, setIsActiveColorPicker] = useState(false)
	const changeColorPicker = () => {
		if (isActiveColorPicker === true) {
			setColor(activeColor.slice(1, activeColor.length))
		}
		setIsActiveColorPicker(prevValue => !prevValue)
	}
	return (
		<div className='colorPicker'>
			<div className='colorsValue'>
				<div className="colorText">{text} {activeColor}</div>
				<div className='colorSquare' style={{ backgroundColor: activeColor }}
					onClick={changeColorPicker}>
				</div>
			</div>
			{isActiveColorPicker && <ChromePicker color={activeColor}
				disableAlpha={true}
				onChange={newColor => setActiveColor(newColor.hex)} />}

		</div>
	);
};

export default ColorPicker;