import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import { useAuth } from '../../config/AuthContext';
import './SignInPage.scss';

function SignInPage() {
	const [error, setError] = useState('');
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleFormSubmit = async (email: string, password: string) => {
		try {
			setError('');
			await login(email, password);
			navigate('/dashboard');
		} catch (err) {
			setError('Failed to sign in. Please check your credentials.');
		}
	};

	return (
		<div className="signInPage">
			<LoginForm onSubmit={handleFormSubmit} error={error} />
		</div>
	);
}

export default SignInPage;
