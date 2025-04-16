import React from 'react';
import './Register.scss';

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
				</form>
			</div>
		</div>
	);
}
