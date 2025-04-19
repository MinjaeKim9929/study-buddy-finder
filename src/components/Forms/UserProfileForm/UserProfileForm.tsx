import React, { useState, FormEvent } from 'react';
import './UserProfileForm.scss';
import Button from '../../Button/Button';
import programsList from '../Programs';

interface TimeSlot {
	startTime: string;
	endTime: string;
}

interface AvailabilityDay {
	selected: boolean;
	timeSlots: TimeSlot[];
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type Availability = Record<DayOfWeek, AvailabilityDay>;

interface UserProfileFormProps {
	initialValues?: {
		firstName?: string;
		lastName?: string;
		age?: number;
		gender?: string;
		major?: string;
		coursesTaking?: string[];
		coursesTaken?: string[];
		availability?: Availability;
	};
	editMode?: boolean;
	onSubmit: (profile: {
		firstName: string;
		lastName: string;
		age: number;
		gender: string;
		major: string;
		coursesTaking: string[];
		coursesTaken: string[];
		availability: Availability;
	}) => void;
}

function UserProfileForm({ initialValues = {}, editMode = true, onSubmit }: UserProfileFormProps) {
	const [firstName, setFirstName] = useState(initialValues.firstName || '');
	const [lastName, setLastName] = useState(initialValues.lastName || '');
	const [age, setAge] = useState(initialValues.age || 1);
	const [gender, setGender] = useState(initialValues.gender || '');
	const [major, setMajor] = useState(initialValues.major || '');
	const [coursesTaking, setCoursesTaking] = useState<string[]>(initialValues.coursesTaking || ['']);
	const [coursesTaken, setCoursesTaken] = useState<string[]>(initialValues.coursesTaken || ['']);
	const [availability, setAvailability] = useState<Availability>(
		initialValues.availability || {
			Sunday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Monday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Tuesday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Wednesday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Thursday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Friday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
			Saturday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		}
	);

	const handleAddCourse = (type: 'taking' | 'taken') => {
		type === 'taking' ? setCoursesTaking([...coursesTaking, '']) : setCoursesTaken([...coursesTaken, '']);
	};

	const handleCourseChange = (index: number, value: string, type: 'taking' | 'taken') => {
		const update = type === 'taking' ? [...coursesTaking] : [...coursesTaken];
		update[index] = value;
		type === 'taking' ? setCoursesTaking(update) : setCoursesTaken(update);
	};

	const handleRemoveCourse = (index: number, type: 'taking' | 'taken') => {
		type === 'taking'
			? setCoursesTaking(coursesTaking.filter((_, i) => i !== index))
			: setCoursesTaken(coursesTaken.filter((_, i) => i !== index));
	};

	const handleAvailabilityChange = (
		day: DayOfWeek,
		field: 'selected' | 'startTime' | 'endTime',
		value: boolean | string,
		slotIndex?: number
	) => {
		setAvailability((prev) => {
			const updatedDay = { ...prev[day] };
			if (field === 'selected') {
				updatedDay.selected = value as boolean;
			} else if (slotIndex !== undefined) {
				const updatedTimeSlots = [...updatedDay.timeSlots];
				updatedTimeSlots[slotIndex] = {
					...updatedTimeSlots[slotIndex],
					[field]: value as string,
				};
				updatedDay.timeSlots = updatedTimeSlots;
			}
			return {
				...prev,
				[day]: updatedDay,
			};
		});
	};

	const handleAddTimeSlot = (day: DayOfWeek) => {
		setAvailability((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				timeSlots: [...prev[day].timeSlots, { startTime: '', endTime: '' }],
			},
		}));
	};

	const handleRemoveTimeSlot = (day: DayOfWeek, slotIndex: number) => {
		setAvailability((prev) => {
			const updatedTimeSlots = prev[day].timeSlots.filter((_, i) => i !== slotIndex);
			return {
				...prev,
				[day]: {
					...prev[day],
					timeSlots: updatedTimeSlots.length > 0 ? updatedTimeSlots : [{ startTime: '', endTime: '' }],
				},
			};
		});
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (!firstName || !lastName || !gender || !major) {
			alert('Please fill in all required fields');
			return;
		}
		if (age < 1 || age > 120) {
			alert('Please enter a valid age');
			return;
		}
		const validCoursesTaking = coursesTaking.filter((c) => c.trim());
		const validCoursesTaken = coursesTaken.filter((c) => c.trim());
		const hasAvailability = Object.values(availability).some(
			(day) => day.selected && day.timeSlots.some((s) => s.startTime && s.endTime)
		);
		if (!hasAvailability) {
			alert('Please select at least one available time slot');
			return;
		}
		onSubmit({
			firstName,
			lastName,
			age,
			gender,
			major,
			coursesTaking: validCoursesTaking,
			coursesTaken: validCoursesTaken,
			availability,
		});
	};

	return (
		<div className="userProfileForm">
			<div className="userProfileForm-content">
				<h1 className="userProfileForm-title">{editMode ? 'Complete Your Profile' : 'My Profile'}</h1>
			</div>
			<div className="userProfileForm-inputs">
				<form onSubmit={handleSubmit}>
					{/* FIRST NAME */}
					<div className="userProfileForm-field firstName">
						<label className="required">First Name</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							className="userProfileForm-input"
							required
							disabled={!editMode}
						/>
					</div>

					{/* LAST NAME */}
					<div className="userProfileForm-field lastName">
						<label className="required">Last Name</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className="userProfileForm-input"
							required
							disabled={!editMode}
						/>
					</div>

					{/* AGE */}
					<div className="userProfileForm-field age">
						<label className="required">Age</label>
						<input
							type="number"
							min="1"
							max="120"
							value={age}
							onChange={(e) => setAge(parseInt(e.target.value))}
							className="userProfileForm-input"
							required
							disabled={!editMode}
						/>
					</div>

					{/* GENDER */}
					<div className="userProfileForm-field gender">
						<label className="required">Gender</label>
						<select
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							className="userProfileForm-input"
							required
							disabled={!editMode}
						>
							<option value="">Select...</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="non-binary">Non-Binary</option>
							<option value="other">Other</option>
							<option value="prefer-not-to-answer">Prefer not to answer</option>
						</select>
					</div>

					{/* MAJOR */}
					<div className="userProfileForm-field major">
						<label className="required">Major</label>
						<select
							value={major}
							onChange={(e) => setMajor(e.target.value)}
							className="userProfileForm-input"
							required
							disabled={!editMode}
						>
							<option value="">Please select a program..</option>
							{programsList.map((program) => (
								<option key={program.code} value={program.code}>
									{program.code} - {program.name}
								</option>
							))}
						</select>
					</div>

					{/* COURSES TAKING */}
					<div className="userProfileForm-field courses-taking">
						<label className="courses-label">Courses Taking</label>
						<div className="courses-input-container">
							{coursesTaking.map((course, index) => (
								<div key={index} className="course-input-wrapper">
									<input
										type="text"
										value={course}
										onChange={(e) => handleCourseChange(index, e.target.value, 'taking')}
										className="userProfileForm-input course-input"
										disabled={!editMode}
									/>
									{editMode && coursesTaking.length > 1 && (
										<button
											type="button"
											className="remove-course-btn"
											onClick={() => handleRemoveCourse(index, 'taking')}
										>
											✕
										</button>
									)}
								</div>
							))}
							{editMode && (
								<button type="button" className="add-course-btn" onClick={() => handleAddCourse('taking')}>
									+
								</button>
							)}
						</div>
					</div>

					{/* COURSES TAKEN */}
					<div className="userProfileForm-field courses-taken">
						<label className="courses-label">Courses Taken</label>
						<div className="courses-input-container">
							{coursesTaken.map((course, index) => (
								<div key={index} className="course-input-wrapper">
									<input
										type="text"
										value={course}
										onChange={(e) => handleCourseChange(index, e.target.value, 'taken')}
										className="userProfileForm-input course-input"
										disabled={!editMode}
									/>
									{editMode && coursesTaken.length > 1 && (
										<button
											type="button"
											className="remove-course-btn"
											onClick={() => handleRemoveCourse(index, 'taken')}
										>
											✕
										</button>
									)}
								</div>
							))}
							{editMode && (
								<button type="button" className="add-course-btn" onClick={() => handleAddCourse('taken')}>
									+
								</button>
							)}
						</div>
					</div>

					{/* AVAILABILITY */}
					<div className="userProfileForm-field availability">
						<label className="availability-label">Availability</label>
						<div className="availability-input-container">
							{(Object.keys(availability) as DayOfWeek[]).map((day) => (
								<div key={day} className="availability-day-wrapper">
									<div className="availability-day-header">
										<input
											type="checkbox"
											checked={availability[day].selected}
											onChange={(e) => handleAvailabilityChange(day, 'selected', e.target.checked)}
											className="availability-checkbox"
											disabled={!editMode}
										/>
										<label className="availability-day">{day}</label>
									</div>
									{availability[day].selected && (
										<div className="availability-time-slots">
											{availability[day].timeSlots.map((slot, i) => (
												<div key={i} className="availability-row">
													<input
														type="time"
														value={slot.startTime}
														onChange={(e) => handleAvailabilityChange(day, 'startTime', e.target.value, i)}
														className="time-input"
														disabled={!editMode}
													/>
													<span className="time-separator">–</span>
													<input
														type="time"
														value={slot.endTime}
														onChange={(e) => handleAvailabilityChange(day, 'endTime', e.target.value, i)}
														className="time-input"
														disabled={!editMode}
													/>
													{editMode && availability[day].timeSlots.length > 1 && (
														<button
															type="button"
															className="remove-time-slot-btn"
															onClick={() => handleRemoveTimeSlot(day, i)}
														>
															✕
														</button>
													)}
												</div>
											))}
											{editMode && (
												<button type="button" className="add-time-slot-btn" onClick={() => handleAddTimeSlot(day)}>
													+
												</button>
											)}
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{editMode && (
						<Button type="submit" className="form-btn">
							Save Profile
						</Button>
					)}
				</form>
			</div>
		</div>
	);
}

export default UserProfileForm;
