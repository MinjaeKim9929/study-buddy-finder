import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeatureCards from '../../components/FeatureCards/FeatureCards';
import './HomePage.scss';

function HomePage() {
	return (
		<div className="homepage">
			<HeroSection />
			<FeatureCards />
		</div>
	);
}

export default HomePage;
