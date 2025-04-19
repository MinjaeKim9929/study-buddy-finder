import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useAuth } from '../../config/AuthContext';
import Button from '../../components/Button/Button';
import './GroupDetailsPage.scss';

interface GroupData {
	groupName: string;
	description: string;
	courses: string[];
	programs: string[];
	maxMembers: number;
	location: string;
	time: Record<string, { selected: boolean; timeSlots: { startTime: string; endTime: string }[] }>;
	creator: string;
	members: string[];
}

function GroupDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const { currentUser } = useAuth();
	const [group, setGroup] = useState<GroupData | null>(null);
	const [loading, setLoading] = useState(true);
	const [creatorName, setCreatorName] = useState('');
	const [memberNames, setMemberNames] = useState<string[]>([]);

	useEffect(() => {
		const fetchGroup = async () => {
			if (!id) return;
			const docRef = doc(db, 'groups', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const groupData = docSnap.data() as GroupData;
				setGroup(groupData);
				fetchUserDetails(groupData.creator, groupData.members);
			}
			setLoading(false);
		};

		const fetchUserDetails = async (creatorId: string, memberIds: string[]) => {
			const creatorRef = doc(db, 'users', creatorId);
			const creatorSnap = await getDoc(creatorRef);
			if (creatorSnap.exists()) {
				const creator = creatorSnap.data();
				setCreatorName(`${creator.firstName} ${creator.lastName}`);
			}

			const names: string[] = [];
			for (const uid of memberIds) {
				const userRef = doc(db, 'users', uid);
				const userSnap = await getDoc(userRef);
				if (userSnap.exists()) {
					const data = userSnap.data();
					names.push(`${data.firstName} ${data.lastName}`);
				}
			}
			setMemberNames(names);
		};

		fetchGroup();
	}, [id]);

	const handleJoinGroup = async () => {
		if (!currentUser || !group || !id) return;
		if (group.members.includes(currentUser.uid)) return;

		const groupRef = doc(db, 'groups', id);
		await updateDoc(groupRef, {
			members: [...group.members, currentUser.uid],
		});
		setGroup({ ...group, members: [...group.members, currentUser.uid] });
		alert('You have joined the group!');
	};

	if (loading) return <p className="loading">Loading group details...</p>;
	if (!group) return <p className="not-found">Group not found.</p>;

	const handleQuitGroup = async () => {
		if (!currentUser || !group || !id) return;

		const updatedMembers = group.members.filter((uid) => uid !== currentUser.uid);
		const groupRef = doc(db, 'groups', id);

		if (updatedMembers.length === 0) {
			await updateDoc(groupRef, { members: [] });
			await deleteDoc(groupRef);
			alert('You have left the group. Since you were the last member, the group has been deleted.');
			window.location.href = '/dashboard';
			return;
		}

		await updateDoc(groupRef, {
			members: updatedMembers,
		});
		setGroup({ ...group, members: updatedMembers });
		alert('You have left the group.');
	};

	return (
		<div className="group-details">
			<h1>{group.groupName}</h1>
			<p>
				<strong>Description:</strong> {group.description}
			</p>
			<p>
				<strong>Programs:</strong> {group.programs.join(', ')}
			</p>
			<p>
				<strong>Courses:</strong> {group.courses.join(', ')}
			</p>
			<p>
				<strong>Max Members:</strong> {group.maxMembers}
			</p>
			<p>
				<strong>Location:</strong> {group.location}
			</p>
			<p>
				<strong>Time:</strong>{' '}
				{Object.entries(group.time)
					.filter(([_, day]) => day.selected)
					.flatMap(([day, { timeSlots }]) => timeSlots.map((slot) => `${day}: ${slot.startTime} - ${slot.endTime}`))
					.join('; ')}
			</p>
			<p>
				<strong>Creator:</strong> {creatorName}
			</p>
			<p>
				<strong>Members:</strong> {memberNames.length > 0 ? memberNames.join(', ') : 'No members yet.'}
			</p>

			{group.members.includes(currentUser?.uid || '') ? (
				<Button className="quit-btn" onClick={handleQuitGroup}>
					Quit Group
				</Button>
			) : (
				<Button className="join-btn" onClick={handleJoinGroup} disabled={group.members.length >= group.maxMembers}>
					{group.members.length >= group.maxMembers ? 'Group Full' : 'Join Group'}
				</Button>
			)}
		</div>
	);
}

export default GroupDetailsPage;
