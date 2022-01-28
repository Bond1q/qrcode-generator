import React, { useState } from 'react';

const Input = ({ text, setText }) => {
	const [inputValue, setInputControl] = useState(text);
	const onInputChange = (e) => {
		setInputControl(e.target.value.trim())
	}
	const onSetText = () => {
		if (inputValue != "") {
			setText(inputValue)
		}
	}
	return (
		<div className='input'>
			<input placeholder='Write your text or url' type="url"
				value={inputValue} onChange={onInputChange}
				onBlur={onSetText}
			/>
		</div>
	);
};
export default Input;