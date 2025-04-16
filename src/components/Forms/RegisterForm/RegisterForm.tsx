import React, { useState, FormEvent } from 'react';
import './RegisterForm.scss';
import Button from '../../Button/Button';
import { Link } from 'react-router-dom';
import { auth } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface RegisterFormProps {
	onSubmit: (formData: { email: string; confirmEmail: string; password: string; confirmPassword: string }) => void;
}

function RegisterForm({ onSubmit }: RegisterFormProps) {
	const [email, setEmail] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = () => {
		if (!email || !confirmEmail || !password || !confirmPassword) {
			setErrorMsg('All fields are required');
			return false;
		}

		if (email !== confirmEmail) {
			setErrorMsg('Emails do not match');
			return false;
		}

		if (password !== confirmPassword) {
			setErrorMsg('Passwords do not match');
			return false;
		}

		if (password.length < 6) {
			setErrorMsg('Password must be at least 6 characters long');
			return false;
		}

		return true;
	};

	const handleRegistrationSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setErrorMsg('');

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		try {
			const credential = await createUserWithEmailAndPassword(auth, email, password);
			const user = credential.user;
			onSubmit({ email, confirmEmail, password, confirmPassword });
		} catch (err: any) {
			let errorMessage = 'An error occurred during registration';
			if (err.code === 'auth/email-already-in-use') {
				errorMessage = 'This email is already registered';
			} else if (err.code === 'auth/invalid-email') {
				errorMessage = 'Invalid email address';
			} else if (err.code === 'auth/weak-password') {
				errorMessage = 'Password is too weak';
			}
			setErrorMsg(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="registerForm">
			<div className="registerForm-content">
				<h1 className="registerForm-title">Sign Up</h1>
				<p className="registerForm-signin">
					Already have an account?
					<Link to="/sign-in" aria-label="Sign in to your Study Buddy Finder account">
						Sign in
					</Link>
				</p>
			</div>
			<div className="registerForm-inputs">
				{errorMsg && <div className="error-message">{errorMsg}</div>}
				<form onSubmit={handleRegistrationSubmit}>
					<label htmlFor="email">
						<input
							type="email"
							id="email"
							required
							placeholder="Email"
							className="registerForm-input"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setErrorMsg('');
							}}
						/>
					</label>
					<label htmlFor="confirmEmail">
						<input
							type="email"
							id="confirmEmail"
							required
							placeholder="Confirm Email"
							className="registerForm-input"
							value={confirmEmail}
							onChange={(e) => {
								setConfirmEmail(e.target.value);
								setErrorMsg('');
							}}
						/>
					</label>
					<label htmlFor="password">
						<input
							type="password"
							id="password"
							required
							placeholder="Password"
							className="registerForm-input"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setErrorMsg('');
							}}
						/>
					</label>
					<label htmlFor="confirmPassword">
						<input
							type="password"
							id="confirmPassword"
							required
							placeholder="Confirm Password"
							className="registerForm-input"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setErrorMsg('');
							}}
						/>
					</label>
					<Button type="submit" className="form-btn" disabled={isLoading}>
						{isLoading ? 'Signing Up...' : 'Sign Up'}
					</Button>
				</form>
			</div>
		</div>
	);
}

export default RegisterForm;
