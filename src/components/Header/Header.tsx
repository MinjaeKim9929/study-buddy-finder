import React from 'react';

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
							<a href="/profile">Profile</a>
							<a href="/logout">Log Out</a>
						</>
					) : (
						<>
							<a href="/sign-in">Sign In</a>
							<a href="/sign-up">Sign Up</a>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
