import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import '../styles/rangeSlider.scss'
const RangeSlider = ({ minValue, maxValue, text, sliderValue, setSliderValue, type }) => {
	const [activeSliderValue, setActiveSliderValue] = useState(sliderValue)
	const onChangeSlider = (e) => {
		setActiveSliderValue(e.target.value)
		setSliderValue(e.target.value)

	}
	useEffect(() => {
		setActiveSliderValue(sliderValue)
	}, [sliderValue]);

	const inputOnBlurHandler = () => {
		// if (activeSliderValue >= minValue && activeSliderValue <= maxValue && Number.isInteger(+activeSliderValue)) {
		// 	setSliderValue(activeSliderValue)
		// } else {
		// 	setActiveSliderValue(sliderValue)
		// }
		console.log();
	}
	return (
		<div className='rangeSlider'>
			<div className="sliderInfo">
				<div className="text">{text}:</div>
				<div className={classNames('sliderValue',
					{ fourDecimals: activeSliderValue > 999 },
					{ threeDecimals: activeSliderValue > 99 && activeSliderValue < 1000 },
					{ twoDecimals: activeSliderValue < 100 },
					{ oneDecimal: activeSliderValue < 10 }
				)}>
					<input
						onBlur={(inputOnBlurHandler)}

						onChange={onChangeSlider} value={activeSliderValue} type="text" />
					<span >{type}</span>
				</div>
			</div>
			<div className="sliderBlock">
				<input onChange={onChangeSlider} type="range" min={minValue} max={maxValue}
					onBlur={() => setSliderValue(activeSliderValue)}
					value={activeSliderValue} className="slider" id="myRange" />
			</div>

		</div>
	);
};

export default React.memo(RangeSlider);