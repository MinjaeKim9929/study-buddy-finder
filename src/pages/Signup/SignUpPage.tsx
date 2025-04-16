import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import UserProfileForm from '../../components/Forms/UserProfileForm/UserProfileForm';
import { auth } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

function SignUpPage() {
	const [step, setStep] = useState<'register' | 'profile'>('register');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleRegistrationSubmit = async (formData: {
		email: string;
		confirmEmail: string;
		password: string;
		confirmPassword: string;
	}) => {
		setEmail(formData.email);
		setStep('profile');
	};

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
		try {
			const user = auth.currentUser;
			if (!user) {
				throw new Error('No user found');
			}

			// Create user profile in Firestore
			await setDoc(doc(db, 'users', user.uid), {
				email,
				...profile,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});

			// Redirect to dashboard
			navigate('/dashboard');
		} catch (error) {
			console.error('Error creating profile:', error);
			// Handle error appropriately
		}
	};
	return (
		<div className="signUpPage">
			{step === 'register' ? (
				<RegisterForm onSubmit={handleRegistrationSubmit} />
			) : (
				<UserProfileForm onSubmit={handleProfileSubmit} />
			)}
		</div>
	);
}

export default SignUpPage;
