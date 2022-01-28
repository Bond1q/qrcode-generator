import React from 'react';
import '../styles/typeChoosing.scss'

const TypeChoosing = ({ types, activeType, setActiveType, text }) => {

	return (
		<div className='typeChoosing'>
			<div className="whichType">{text}</div>
			<div className="allTypes">		{types.map((type) =>
				<TypeElem type={type} key={type} activeType={activeType} setActiveType={setActiveType} />
			)}</div>
		</div>
	);
};

const TypeElem = ({ type, activeType, setActiveType }) => {
	return (
		<div className='typeElem'>
			<div onClick={() => setActiveType(type)}
				className={activeType === type ? "typeName activeType" : "typeName"}>{type}</div>
		</div>
	)
}

export default TypeChoosing;