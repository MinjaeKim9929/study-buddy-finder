import React from 'react';
import './RegisterForm.scss';
import Button from '../../Button/Button';
import { Link } from 'react-router-dom';

function RegisterForm() {
	return (
		<div className="registerForm">
			<div className="registerForm-inputs">
				<form>
					<label htmlFor="email">
						<input type="email" id="email" required placeholder="Email" className="registerForm-input" />
					</label>
					<label htmlFor="confirmEmail">
						<input type="email" id="confirmEmail" required placeholder="Confirm Email" className="registerForm-input" />
					</label>
					<label htmlFor="password">
						<input type="password" id="password" required placeholder="Password" className="registerForm-input" />
					</label>
					<label htmlFor="confirmPassword">
						<input
							type="email"
							id="confirmPassword"
							required
							placeholder="Confirm Password"
							className="registerForm-input"
						/>
					</label>
					<Button type="submit" className="form-btn ">
						Sign Up
					</Button>
				</form>
			</div>
			<div className="registerForm-content">
				<h1 className="registerForm-title">Sign Up</h1>
				<p className="registerForm-signin">
					Already have an account?
					<Link to="sign-in" aria-label="Sign in to your Study Buddy Finder account">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterForm;
