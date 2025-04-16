import React from 'react';
import './FeatureCards.scss';
import FeatureCard from './FeatureCard/FeatureCard';

function FeatureCards() {
	return (
		<div className="featureCards">
			<div className="featureCard1">
				<FeatureCard
					img="/images/friend-icon.png"
					title="Find Study Partners"
					description="Match with students in your major or courses to study together."
				/>
			</div>

			<div className="featureCard2">
				<FeatureCard
					img="/images/calendar-icon.png"
					title="Create or Join Groups"
					description="Start your own study group or join one that fits your schedule."
				/>
			</div>
			<div className="featureCard3">
				<FeatureCard
					img="/images/chat-icon.png"
					title="Stay connected"
					description="Coordinate sessions and build a community with peers"
				/>
			</div>
		</div>
	);
}

export default FeatureCards;
