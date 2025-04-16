import React from 'react';
import './HeroSection.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

function HeroSection() {
	return (
		<section className="hero">
			<div className="hero-content">
				<h2 className="hero-subtitle">Study Smarter, Together!</h2>
				<h1 className="hero-title">Find Your Perfect Study Buddy</h1>
				<p className="hero-text">
					Connect with peers in your courses, form study groups, and make learning collaborative and fun.
				</p>
				<div className="hero-buttons">
					<Link to="/sign-up">
						<Button type="button" className="cta-btn">
							Get Started
						</Button>
					</Link>
					<p className="hero-signin">
						Already have an account?
						<Link to="/sign-in" aria-label="Sign in to your Study Buddy Finder account">
							Sign in
						</Link>
					</p>
				</div>
			</div>

			<div className="hero-image">
				<img src="/images/hero-image.png" alt="A student holding a pen" />
			</div>
		</section>
	);
}

export default HeroSection;
