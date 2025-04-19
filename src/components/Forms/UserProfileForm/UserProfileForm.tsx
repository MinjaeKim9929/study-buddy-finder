import React, { useState, FormEvent } from 'react';
import './UserProfileForm.scss';
import Button from '../../Button/Button';
import programsList from '../Programs';

interface UserProfileFormProps {
	onSubmit: (profile: {
		firstName: string;
		lastName: string;
		age: number;
		gender: string;
		major: string;
		coursesTaking: string[];
		coursesTaken: string[];
		availability: Record<string, { selected: boolean; timeSlots: { startTime: string; endTime: string }[] }>;
	}) => void;
}

interface TimeSlot {
	startTime: string;
	endTime: string;
}

interface AvailabilityDay {
	selected: boolean;
	timeSlots: TimeSlot[];
}

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Availability = Record<DayOfWeek, AvailabilityDay>;

function UserProfileForm({ onSubmit }: UserProfileFormProps) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState(1);
	const [gender, setGender] = useState('');
	const [major, setMajor] = useState('');
	const [coursesTaking, setCoursesTaking] = useState<string[]>(['']);
	const [coursesTaken, setCoursesTaken] = useState<string[]>(['']);
	const [availability, setAvailability] = useState<Availability>({
		Sunday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Monday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Tuesday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Wednesday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Thursday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Friday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Saturday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
	});

	const handleAddCourse = (type: 'taking' | 'taken') => {
		if (type === 'taking') {
			setCoursesTaking([...coursesTaking, '']);
		} else {
			setCoursesTaken([...coursesTaken, '']);
		}
	};

	const handleCourseChange = (index: number, value: string, type: 'taking' | 'taken') => {
		if (type === 'taking') {
			const updatedCourses = [...coursesTaking];
			updatedCourses[index] = value;
			setCoursesTaking(updatedCourses);
		} else {
			const updatedCourses = [...coursesTaken];
			updatedCourses[index] = value;
			setCoursesTaken(updatedCourses);
		}
	};

	const handleRemoveCourse = (index: number, type: 'taking' | 'taken') => {
		if (type === 'taking') {
			setCoursesTaking(coursesTaking.filter((_, i) => i !== index));
		} else {
			setCoursesTaken(coursesTaken.filter((_, i) => i !== index));
		}
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

		// Validate required fields
		if (!firstName || !lastName || !gender || !major) {
			alert('Please fill in all required fields');
			return;
		}

		// Validate age
		if (age < 1 || age > 120) {
			alert('Please enter a valid age');
			return;
		}

		// Validate courses
		const validCoursesTaking = coursesTaking.filter((course) => course.trim() !== '');
		const validCoursesTaken = coursesTaken.filter((course) => course.trim() !== '');

		// Validate availability
		const hasAvailability = Object.values(availability).some(
			(day) => day.selected && day.timeSlots.some((slot) => slot.startTime && slot.endTime)
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
				<h1 className="userProfileForm-title">Complete Your Profile</h1>
				<p className="userProfileForm-description">
					Tell us more about yourself to help us find the perfect study buddies for you.
				</p>
			</div>
			<div className="userProfileForm-inputs">
				<form onSubmit={handleSubmit}>
					<div className="userProfileForm-field firstName">
						<label htmlFor="firstName" className="required">
							First Name
						</label>
						<input
							type="text"
							required
							id="firstName"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							className="userProfileForm-input"
						/>
					</div>
					<div className="userProfileForm-field lastName">
						<label htmlFor="lastName" className="required">
							Last Name
						</label>
						<input
							type="text"
							required
							id="lastName"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className="userProfileForm-input"
						/>
					</div>
					<div className="userProfileForm-field age">
						<label htmlFor="age" className="required">
							Age
						</label>
						<input
							type="number"
							id="age"
							min="1"
							max="100"
							value={age !== null ? age : ''}
							onChange={(e) => setAge(parseInt(e.target.value))}
							required
							className="userProfileForm-input"
						/>
					</div>
					<div className="userProfileForm-field gender">
						<label htmlFor="gender" className="required">
							Gender
						</label>
						<select
							id="gender"
							required
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							className="userProfileForm-input"
						>
							<option value="">Please select one...</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="non-binary">Non-Binary</option>
							<option value="other">Other</option>
							<option value="prefer-not-to-answer">Prefer not to answer</option>
						</select>
					</div>
					<div className="userProfileForm-field major">
						<label htmlFor="major" className="required">
							Major
						</label>
						<select
							id="major"
							required
							value={major}
							onChange={(e) => {
								setMajor(e.target.value);
							}}
							className="userProfileForm-input"
						>
							<option value="">Please select a program..</option>
							{programsList.map((program) => (
								<option key={program.code} value={program.code}>
									{program.code} - {program.name}
								</option>
							))}
						</select>
					</div>
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
										placeholder={`Course ${index + 1} (ABCD-1234)`}
									/>
									{coursesTaking.length > 1 && (
										<button
											type="button"
											className="remove-course-btn"
											onClick={() => handleRemoveCourse(index, 'taking')}
											aria-label={`Remove course ${index + 1}`}
										>
											✕
										</button>
									)}
								</div>
							))}
							<button
								type="button"
								className="add-course-btn"
								onClick={() => handleAddCourse('taking')}
								aria-label="Add another course taking"
							>
								+
							</button>
						</div>
					</div>
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
										placeholder={`Course ${index + 1} (ABCD-1234)`}
									/>
									{coursesTaken.length > 1 && (
										<button
											type="button"
											className="remove-course-btn"
											onClick={() => handleRemoveCourse(index, 'taken')}
											aria-label={`Remove course ${index + 1}`}
										>
											✕
										</button>
									)}
								</div>
							))}
							<button
								type="button"
								className="add-course-btn"
								onClick={() => handleAddCourse('taken')}
								aria-label="Add another course taken"
							>
								+
							</button>
						</div>
					</div>
					<div className="userProfileForm-field availability">
						<label className="availability-label">Availability</label>
						<div className="availability-input-container">
							{Object.keys(availability).map((day) => (
								<div key={day} className="availability-day-wrapper">
									<div className="availability-day-header">
										<input
											type="checkbox"
											id={`availability-${day}`}
											checked={availability[day as DayOfWeek].selected}
											onChange={(e) => handleAvailabilityChange(day as DayOfWeek, 'selected', e.target.checked)}
											className="availability-checkbox"
										/>
										<label htmlFor={`availability-${day}`} className="availability-day">
											{day}
										</label>
									</div>
									{availability[day as DayOfWeek].selected && (
										<div className="availability-time-slots">
											{availability[day as DayOfWeek].timeSlots.map((slot, slotIndex) => (
												<div key={slotIndex} className="availability-row">
													<input
														type="time"
														value={slot.startTime}
														onChange={(e) =>
															handleAvailabilityChange(day as DayOfWeek, 'startTime', e.target.value, slotIndex)
														}
														className="userProfileForm-input time-input"
													/>
													<span className="time-separator">–</span>
													<input
														type="time"
														value={slot.endTime}
														onChange={(e) =>
															handleAvailabilityChange(day as DayOfWeek, 'endTime', e.target.value, slotIndex)
														}
														className="userProfileForm-input time-input"
													/>
													{availability[day as DayOfWeek].timeSlots.length > 1 && (
														<button
															type="button"
															className="remove-time-slot-btn"
															onClick={() => handleRemoveTimeSlot(day as DayOfWeek, slotIndex)}
															aria-label={`Remove time slot ${slotIndex + 1} for ${day}`}
														>
															✕
														</button>
													)}
												</div>
											))}
											<button
												type="button"
												className="add-time-slot-btn"
												onClick={() => handleAddTimeSlot(day as DayOfWeek)}
												aria-label={`Add another time slot for ${day}`}
											>
												+
											</button>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					<Button type="submit" className="form-btn">
						Save Profile
					</Button>
				</form>
			</div>
		</div>
	);
}

export default UserProfileForm;
