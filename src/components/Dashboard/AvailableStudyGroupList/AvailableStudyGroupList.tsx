import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { useAuth } from '../../../config/AuthContext';
import GroupCard from '../../GroupCard/GroupCard';
import './AvailableStudyGroupList.scss';

interface Filter {
	course: string;
	program: string;
	availabilityDay: string;
}

interface AvailabilitySlot {
	startTime: string;
	endTime: string;
}

interface AvailabilityDay {
	selected: boolean;
	timeSlots: AvailabilitySlot[];
}

interface Group {
	id: string;
	groupName: string;
	description: string;
	courses: string[];
	programs: string[];
	members: string[];
	time: Record<string, AvailabilityDay>;
}

function AvailableStudyGroupList({ filters }: { filters: Filter }) {
	const { currentUser } = useAuth();
	const [groups, setGroups] = useState<Group[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGroups = async () => {
			const groupsRef = collection(db, 'groups');
			const querySnapshot = await getDocs(groupsRef);
			let fetchedGroups = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Group[];

			if (filters.course) {
				fetchedGroups = fetchedGroups.filter((g) =>
					g.courses.some((c) => c.toLowerCase().includes(filters.course.toLowerCase()))
				);
			}

			if (filters.program) {
				fetchedGroups = fetchedGroups.filter((g) =>
					g.programs.some((p) => p.toLowerCase().includes(filters.program.toLowerCase()))
				);
			}

			if (filters.availabilityDay) {
				fetchedGroups = fetchedGroups.filter((g) => {
					const day = filters.availabilityDay;
					return g.time?.[day]?.selected;
				});
			}

			if (currentUser) {
				fetchedGroups = fetchedGroups.filter((g) => !g.members.includes(currentUser.uid));
			}

			setGroups(fetchedGroups);
			setLoading(false);
		};
		fetchGroups();
	}, [filters, currentUser]);

	if (loading) return <p>Loading available study groups...</p>;
	if (groups.length === 0) return <p>No study groups found matching your criteria.</p>;

	return (
		<div className="available-study-group-list">
			{groups.map((group) => (
				<GroupCard
					key={group.id}
					id={group.id}
					groupName={group.groupName}
					description={group.description}
					courses={group.courses}
					ctaLabel="Join Group"
				/>
			))}
		</div>
	);
}

export default AvailableStudyGroupList;
