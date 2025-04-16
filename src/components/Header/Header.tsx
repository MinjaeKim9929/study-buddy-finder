import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import './Header.scss';
import { useAuth } from '../../config/AuthContext';

function Header() {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
		} catch (error) {
			console.error('Failed to log out:', error);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

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
							<div className="dropdown-container" ref={dropdownRef}>
								<Button
									type="button"
									className={`navbar-secondary-btn ${isDropdownOpen ? 'active' : ''}`}
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								>
									<span>Menu</span>
									<svg
										className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}
										width="12"
										height="12"
										viewBox="0 0 12 12"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M2 4L6 8L10 4"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</Button>
								{isDropdownOpen && (
									<div className="dropdown-menu">
										<Link to="/dashboard" onClick={() => setIsDropdownOpen(false)}>
											<div className="dropdown-item">Dashboard</div>
										</Link>
										<Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
											<div className="dropdown-item">My Profile</div>
										</Link>
										<Link to="/create-group" onClick={() => setIsDropdownOpen(false)}>
											<div className="dropdown-item">Create Group</div>
										</Link>
									</div>
								)}
							</div>
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
