import React from 'react';
import './Footer.scss';

function Footer() {
	return (
		<footer>
			<div className="footer-top">
				<div className="footer-left">Study Buddy Finder</div>
				<div className="footer-right">
					<a href="/" className="footer-link">
						Home
					</a>
					<a href="/" className="footer-link">
						About Us
					</a>
					<a href="/" className="footer-link">
						Contact
					</a>
				</div>
			</div>

			<hr className="footer-divider" />

			<div className="footer-bottom">
				<div className="copyright">&copy; 2025 Study Buddy Finder. All rights reserved.</div>
				<div className="footer-policies">
					<a href="/">Privacy Policy</a>
					<span className="dot">•</span>
					<a href="/">Terms & Conditions</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
