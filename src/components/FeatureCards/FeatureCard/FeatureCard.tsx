import React from 'react';
import './FeatureCard.scss';

function FeatureCard({
	img,
	title,
	description,
	className = '',
}: {
	img: string;
	title: string;
	description: string;
	className?: string;
}) {
	return (
		<div className={`featureCard ${className}`}>
			<div className="featureCard-image">
				<img src={img} alt="Feature card" />
			</div>
			<div className="featureCard-text">
				<div className="featureCard-title">{title}</div>
				<div className="featureCard-description">{description}</div>
			</div>
		</div>
	);
}

export default FeatureCard;
