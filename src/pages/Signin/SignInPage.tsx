import React from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import './SignInPage.scss';

function SignInPage() {
	const handleFormSubmit = (email: string, password: string) => {
		console.log('User Input: ', { email, password });
	};

	return (
		<div className="signInPage">
			<LoginForm onSubmit={handleFormSubmit} />
		</div>
	);
}

export default SignInPage;
