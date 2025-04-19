import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { useAuth } from '../../../config/AuthContext';
import GroupCard from '../../GroupCard/GroupCard';
import './InvolvedStudyGroupList.scss';

interface Group {
	id: string;
	groupName: string;
	description: string;
	courses: string[];
}

function InvolvedStudyGroupList() {
	const { currentUser } = useAuth();
	const [groups, setGroups] = useState<Group[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGroups = async () => {
			if (!currentUser) return;
			const q = query(collection(db, 'groups'), where('members', 'array-contains', currentUser.uid));
			const querySnapshot = await getDocs(q);
			const groupList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Group[];
			setGroups(groupList);
			setLoading(false);
		};
		fetchGroups();
	}, [currentUser]);

	if (loading) return <p>Loading your study groups...</p>;
	if (groups.length === 0) return <p>You are not currently in any study groups.</p>;

	return (
		<div className="involved-study-group-list">
			{groups.map((group) => (
				<GroupCard
					key={group.id}
					id={group.id}
					groupName={group.groupName}
					description={group.description}
					courses={group.courses}
					ctaLabel="View Details"
				/>
			))}
		</div>
	);
}

export default InvolvedStudyGroupList;
