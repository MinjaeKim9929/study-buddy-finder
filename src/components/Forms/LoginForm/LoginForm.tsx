import React from 'react';
import './LoginForm.scss';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';

function LoginForm() {
	return (
		<div className="loginForm">
			<div>
				<h1 className="loginForm-title">Sign In</h1>
				<p>Connect with peers in your courses, form study groups, and make learning collaborative and fun.</p>
				<p>
					Don't have an account?
					<Link to="/sign-up" aria-label="Sign up new Study Buddy Finder account">
						Sign up
					</Link>
				</p>
			</div>
			<div>
				<label htmlFor="email">
					<input type="email" id="email" required placeholder="Email" />
				</label>
				<label htmlFor="password">
					<input type="password" id="password" required placeholder="Password" />
				</label>
				<Button>Sign In</Button>
			</div>
		</div>
	);
}

export default LoginForm;
