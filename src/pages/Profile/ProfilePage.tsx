import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { useAuth } from '../../config/AuthContext';
import Button from '../../components/Button/Button';
import './ProfilePage.scss';

function ProfilePage() {
	const { currentUser } = useAuth();
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState<any>({
		coursesTaking: [''],
		coursesTaken: [''],
		availability: {
			Sunday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Monday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Tuesday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Wednesday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Thursday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Friday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Saturday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		},
	});

	useEffect(() => {
		const fetchProfile = async () => {
			if (!currentUser) return;
			const docRef = doc(db, 'users', currentUser.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				setProfile(data);
				setFormData({
					...data,
					coursesTaking: data.coursesTaking || [''],
					coursesTaken: data.coursesTaken || [''],
					availability: data.availability || formData.availability,
				});
			}
			setLoading(false);
		};
		fetchProfile();
	}, [currentUser]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCourseChange = (index: number, value: string, type: 'coursesTaking' | 'coursesTaken') => {
		const updated = [...formData[type]];
		updated[index] = value;
		setFormData({ ...formData, [type]: updated });
	};

	const handleAddCourse = (type: 'coursesTaking' | 'coursesTaken') => {
		setFormData({ ...formData, [type]: [...formData[type], ''] });
	};

	const handleRemoveCourse = (index: number, type: 'coursesTaking' | 'coursesTaken') => {
		setFormData({ ...formData, [type]: formData[type].filter((_: any, i: number) => i !== index) });
	};

	const handleAvailabilityChange = (
		day: string,
		field: 'selected' | 'startTime' | 'endTime',
		value: boolean | string,
		slotIndex?: number
	) => {
		setFormData((prev: any) => {
			const updatedDay = { ...prev.availability[day] };
			if (field === 'selected') {
				updatedDay.selected = value as boolean;
			} else if (slotIndex !== undefined) {
				const updatedSlots = [...updatedDay.timeSlots];
				updatedSlots[slotIndex] = { ...updatedSlots[slotIndex], [field]: value };
				updatedDay.timeSlots = updatedSlots;
			}
			return {
				...prev,
				availability: {
					...prev.availability,
					[day]: updatedDay,
				},
			};
		});
	};

	const handleAddTimeSlot = (day: string) => {
		setFormData((prev: any) => ({
			...prev,
			availability: {
				...prev.availability,
				[day]: {
					...prev.availability[day],
					timeSlots: [...prev.availability[day].timeSlots, { startTime: '', endTime: '' }],
				},
			},
		}));
	};

	const handleRemoveTimeSlot = (day: string, index: number) => {
		setFormData((prev: any) => {
			const filtered = prev.availability[day].timeSlots.filter((_: any, i: number) => i !== index);
			return {
				...prev,
				availability: {
					...prev.availability,
					[day]: {
						...prev.availability[day],
						timeSlots: filtered.length > 0 ? filtered : [{ startTime: '', endTime: '' }],
					},
				},
			};
		});
	};

	const handleSave = async () => {
		try {
			if (!currentUser) return;
			const userRef = doc(db, 'users', currentUser.uid);
			await updateDoc(userRef, {
				major: formData.major,
				coursesTaking: formData.coursesTaking,
				coursesTaken: formData.coursesTaken,
				availability: formData.availability,
			});
			setProfile({
				...profile,
				major: formData.major,
				coursesTaking: formData.coursesTaking,
				coursesTaken: formData.coursesTaken,
				availability: formData.availability,
			});
			alert('Profile updated!');
			setEditMode(false);
		} catch (err) {
			console.error(err);
			alert('Failed to update profile.');
		}
	};

	if (loading) return <p className="loading">Loading...</p>;
	if (!profile) return <p className="no-profile">No profile found.</p>;

	return (
		<div className="profile-page">
			<h2>My Profile</h2>
			<div className="profile-content">
				<div className="profile-field">
					<label>First Name: {profile.firstName}</label>
				</div>
				<div className="profile-field">
					<label>Last Name: {profile.lastName}</label>
				</div>
				<div className="profile-field">
					<label>Age: {profile.age}</label>
				</div>
				<div className="profile-field">
					<label>Gender: {profile.gender}</label>
				</div>

				<div className="profile-field">
					<label className="required">Major:</label>
					<input type="text" name="major" value={formData.major || ''} disabled={!editMode} onChange={handleChange} />
				</div>

				<div className="profile-field courses-taking">
					<label>Courses Taking:</label>
					{formData.coursesTaking.map((course: string, index: number) => (
						<div key={index} className="course-entry">
							<input
								type="text"
								value={course}
								disabled={!editMode}
								onChange={(e) => handleCourseChange(index, e.target.value, 'coursesTaking')}
							/>
							{editMode && formData.coursesTaking.length > 1 && (
								<Button className="remove-btn" onClick={() => handleRemoveCourse(index, 'coursesTaking')}>
									✕
								</Button>
							)}
						</div>
					))}
					{editMode && (
						<Button className="add-btn" onClick={() => handleAddCourse('coursesTaking')}>
							＋ Add
						</Button>
					)}
				</div>

				<div className="profile-field courses-taken">
					<label>Courses Taken:</label>
					{formData.coursesTaken.map((course: string, index: number) => (
						<div key={index} className="course-entry">
							<input
								type="text"
								value={course}
								disabled={!editMode}
								onChange={(e) => handleCourseChange(index, e.target.value, 'coursesTaken')}
							/>
							{editMode && formData.coursesTaken.length > 1 && (
								<Button className="remove-btn" onClick={() => handleRemoveCourse(index, 'coursesTaken')}>
									✕
								</Button>
							)}
						</div>
					))}
					{editMode && (
						<Button className="add-btn" onClick={() => handleAddCourse('coursesTaken')}>
							＋ Add
						</Button>
					)}
				</div>

				<div className="profile-field availability">
					<label>Availability:</label>
					{Object.keys(formData.availability).map((day) => (
						<div key={day} className="availability-day">
							<label>
								<input
									type="checkbox"
									checked={formData.availability[day].selected}
									disabled={!editMode}
									onChange={(e) => handleAvailabilityChange(day, 'selected', e.target.checked)}
								/>
								{day}
							</label>
							{formData.availability[day].selected && (
								<div className="time-slots">
									{formData.availability[day].timeSlots.map((slot: any, i: number) => (
										<div key={i} className="time-slot">
											<input
												type="time"
												value={slot.startTime}
												disabled={!editMode}
												onChange={(e) => handleAvailabilityChange(day, 'startTime', e.target.value, i)}
											/>
											<span> - </span>
											<input
												type="time"
												value={slot.endTime}
												disabled={!editMode}
												onChange={(e) => handleAvailabilityChange(day, 'endTime', e.target.value, i)}
											/>
											{editMode && formData.availability[day].timeSlots.length > 1 && (
												<Button className="remove-btn" onClick={() => handleRemoveTimeSlot(day, i)}>
													✕
												</Button>
											)}
										</div>
									))}
									{editMode && (
										<Button className="add-btn" onClick={() => handleAddTimeSlot(day)}>
											＋ Add Slot
										</Button>
									)}
								</div>
							)}
						</div>
					))}
				</div>

				{editMode ? (
					<Button className="action-btn" onClick={handleSave}>
						Save
					</Button>
				) : (
					<Button className="action-btn" onClick={() => setEditMode(true)}>
						Edit
					</Button>
				)}
			</div>
		</div>
	);
}

export default ProfilePage;
