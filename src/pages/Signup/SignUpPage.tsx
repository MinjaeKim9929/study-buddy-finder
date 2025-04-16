import React from 'react';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import UserProfileForm from '../../components/Forms/UserProfileForm/UserProfileForm';

function SignUpPage() {
	const handleProfileSubmit = async (profile: {
		firstName: string;
		lastName: string;
		age: number;
		gender: string;
		major: string;
		coursesTaking?: string[];
		coursesTaken?: string[];
		availability: Record<string, { selected: boolean; timeSlots: { startTime: string; endTime: string }[] }>;
	}) => {
		console.log(profile);
	};

	const handleRegistrationSubmit = async (formData: {
		email: string;
		confirmEmail: string;
		password: string;
		confirmPassword: string;
	}) => {
		console.log(formData);
	};

	return (
		<div className="signUpPage">
			<RegisterForm />
			<UserProfileForm onSubmit={handleProfileSubmit} />
		</div>
	);
}

export default SignUpPage;
