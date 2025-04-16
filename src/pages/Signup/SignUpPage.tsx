import React from 'react';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import UserProfileForm from '../../components/Forms/UserProfileForm/UserProfileForm';

function SignUpPage() {
	return (
		<div className="signUpPage">
			<RegisterForm />
			<UserProfileForm />
		</div>
	);
}

export default SignUpPage;
