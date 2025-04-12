import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Header.scss';

function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<header>
			<nav className="navbar">
				<div className="navbar-left">
					<a href="/" className="logo">
						SBF
					</a>
				</div>
				<div className="navbar-right">
					{isLoggedIn ? (
						<>
							<Link to="/profile">
								<Button type="button" className="navbar-secondary-btn">
									Profile
								</Button>
							</Link>
							<Button type="button" className="navbar-primary-btn">
								Log Out
							</Button>
						</>
					) : (
						<>
							<Link to="sign-in">
								<Button type="button" className="navbar-secondary-btn">
									Sign In
								</Button>
							</Link>
							<Link to="sign-up">
								<Button type="button" className="navbar-primary-btn">
									Sign Up
								</Button>
							</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
