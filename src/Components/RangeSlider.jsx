import React, { useEffect, useState } from 'react';
// import '../styles/rangeSlider.scss'
const RangeSlider = ({ minValue, maxValue, text, sliderValue, setSliderValue, type }) => {
	const [activeSliderValue, setActiveSliderValue] = useState(sliderValue)
	const onChangeSlider = (e) => {
		setActiveSliderValue(e.target.value)
	}
	useEffect(() => {
		setActiveSliderValue(sliderValue)
	}, [sliderValue]);

	return (
		<div>
			<div className="sliderInfo">
				<div className="text">{text}:</div>
				<div className="sliderValue">{activeSliderValue}{type}</div>
			</div>
			<div className="slider">
				<input onChange={onChangeSlider} type="range" min={minValue} max={maxValue}
					onBlur={() => setSliderValue(activeSliderValue)}
					value={activeSliderValue} className="slider" id="myRange" />
			</div>

		</div>
	);
};

export default RangeSlider;