import React, { useState } from 'react';
import '../styles/input.scss'

const Input = ({ text, setText }) => {
	const [inputValue, setInputControl] = useState(text);
	const onInputChange = (e) => {
		setInputControl(e.target.value)
	}
	const onSetText = () => {
		if (inputValue != "") {
			setText(inputValue.trim())
		}
	}
	const keyPressHandler = (e) => {
		if (e.keyCode === 13 && inputValue != "") {
			e.preventDefault();
			setText(inputValue.trim())

		}
	}
	return (
		<div className='input'>
			<textarea placeholder='Write your text or url' type="url"
				value={inputValue} onChange={onInputChange}
				onBlur={onSetText}
				onKeyDown={keyPressHandler}
			/>
		</div>
	);
};
export default React.memo(Input);