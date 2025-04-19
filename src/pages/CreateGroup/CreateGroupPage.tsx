import React from 'react';
import CreateGroupForm from '../../components/Forms/CreateGroupForm/CreateGroupForm';
import { db } from '../../config/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../config/AuthContext';

function CreateGroupPage() {
	const { currentUser } = useAuth();

	const handleCreateGroup = async (groupData: any) => {
		try {
			await addDoc(collection(db, 'groups'), {
				...groupData,
				creator: currentUser?.uid,
				members: [currentUser?.uid],
				createdAt: Timestamp.now(),
			});
			alert('Group created successfully!');
		} catch (err) {
			console.error('Failed to create group:', err);
			alert('Error creating group. Try again.');
		}
	};
	return <CreateGroupForm onSubmit={handleCreateGroup} />;
}

export default CreateGroupPage;
