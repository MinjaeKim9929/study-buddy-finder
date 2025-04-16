import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import './Header.scss';
import { useAuth } from '../../config/AuthContext';

function Header() {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
		} catch (error) {
			console.error('Failed to log out:', error);
		}
	};

	return (
		<header>
			<nav className="navbar">
				<div className="navbar-left">
					<a href="/" className="logo">
						Study Buddy Finder
					</a>
				</div>
				<div className="navbar-right">
					{currentUser ? (
						<>
							<Link to="/profile">
								<Button type="button" className="navbar-secondary-btn">
									Profile
								</Button>
							</Link>
							<Link to="/dashboard">
								<Button type="button" className="navbar-secondary-btn">
									Dashboard
								</Button>
							</Link>
							<Button type="button" className="navbar-primary-btn" onClick={handleLogout}>
								Log Out
							</Button>
						</>
					) : (
						<>
							<Link to="/sign-in">
								<Button type="button" className="navbar-secondary-btn">
									Sign In
								</Button>
							</Link>
							<Link to="/sign-up">
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
