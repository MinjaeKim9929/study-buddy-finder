import React from 'react';
import './LoginForm.scss';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';

function LoginForm() {
	return (
		<div className="loginForm">
			<div className="loginForm-content">
				<h1 className="loginForm-title">Sign In</h1>
				<p className="loginForm-signup">
					Don't have an account?
					<Link to="/sign-up" aria-label="Sign up new Study Buddy Finder account">
						Sign up
					</Link>
				</p>
			</div>
			<div className="loginForm-inputs">
				<label htmlFor="email">
					<input type="email" id="email" required placeholder="Email" className="loginForm-input" />
				</label>
				<label htmlFor="password">
					<input type="password" id="password" required placeholder="Password" className="loginForm-input" />
				</label>
				<Button className="form-btn">Sign In</Button>
			</div>
		</div>
	);
}

export default LoginForm;
