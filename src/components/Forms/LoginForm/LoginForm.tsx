import React, { useState, FormEvent } from 'react';
import './LoginForm.scss';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';

interface LoginFormProps {
	onSubmit: (email: string, password: string) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(email, password);
		setEmail('');
		setPassword('');
	};

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
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">
						<input
							type="email"
							id="email"
							required
							placeholder="Email"
							className="loginForm-input"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
					<label htmlFor="password">
						<input
							type="password"
							id="password"
							required
							placeholder="Password"
							className="loginForm-input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
					<Button type="submit" className="form-btn">
						Sign In
					</Button>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
