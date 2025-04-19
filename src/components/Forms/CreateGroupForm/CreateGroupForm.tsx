import React, { useState } from 'react';
import './CreateGroupForm.scss';
import programsList from '../Programs';
import type { Availability } from '../UserProfileForm/UserProfileForm';
import Button from '../../Button/Button';

interface CreateGroupFormProps {
	onSubmit: (groupData: {
		groupName: string;
		programs: string[];
		courses: string[];
		description: string;
		maxMembers: number;
		location: string;
		time: Availability;
	}) => void;
}

function CreateGroupForm({ onSubmit }: CreateGroupFormProps) {
	const [groupName, setGroupName] = useState('');
	const [programs, setPrograms] = useState<string[]>(['']);
	const [courses, setCourses] = useState<string[]>(['']);
	const [description, setDescription] = useState('');
	const [maxMembers, setMaxMembers] = useState(2);
	const [location, setLocation] = useState('');
	const [availability, setAvailability] = useState<Availability>({
		Sunday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Monday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Tuesday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Wednesday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Thursday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Friday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
		Saturday: { selected: false, timeSlots: [{ startTime: '', endTime: '' }] },
	});

	const handleAvailabilityChange = (day: keyof Availability) => {
		setAvailability((prev) => ({
			...prev,
			[day]: { ...prev[day], selected: !prev[day].selected },
		}));
	};

	const handleAddTimeSlot = (day: keyof Availability) => {
		setAvailability((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				timeSlots: [...prev[day].timeSlots, { startTime: '', endTime: '' }],
			},
		}));
	};

	const handleRemoveTimeSlot = (day: keyof Availability, index: number) => {
		setAvailability((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				timeSlots: prev[day].timeSlots.filter((_, i) => i !== index),
			},
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			groupName,
			programs,
			courses: courses.filter(Boolean),
			description,
			maxMembers,
			location,
			time: availability,
		});
	};

	return (
		<div className="createGroupForm">
			<h1>Create a New Study Group</h1>
			<div className="createGroupForm-inputs">
				<form onSubmit={handleSubmit}>
					<label>Group Name</label>
					<input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />

					<label>Description</label>
					<input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

					<label>Programs</label>
					<select value={programs[0]} onChange={(e) => setPrograms([e.target.value])} required>
						<option value="">Please select a program..</option>
						{programsList.map((program) => (
							<option key={program.code} value={program.code}>
								{program.code} - {program.name}
							</option>
						))}
					</select>

					<label>Courses</label>
					<div className="courses-input-container">
						{courses.map((course, index) => (
							<div key={index} className="course-input-wrapper">
								<input
									type="text"
									value={course}
									onChange={(e) => {
										const updated = [...courses];
										updated[index] = e.target.value;
										setCourses(updated);
									}}
									required
								/>
								{courses.length > 1 && (
									<Button
										type="button"
										onClick={() => setCourses(courses.filter((_, i) => i !== index))}
										className="remove-course-btn"
									>
										✕
									</Button>
								)}
							</div>
						))}
						<Button type="button" onClick={() => setCourses([...courses, ''])} className="add-course-btn">
							＋ Add Course
						</Button>
					</div>

					<label>Max Members</label>
					<input
						type="number"
						min={2}
						value={maxMembers}
						onChange={(e) => setMaxMembers(parseInt(e.target.value))}
						required
					/>

					<label>Location</label>
					<input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

					<label>Time</label>
					{(Object.keys(availability) as Array<keyof Availability>).map((day) => (
						<div key={day} className="availability-day">
							<label>
								<input
									type="checkbox"
									checked={availability[day].selected}
									onChange={() => handleAvailabilityChange(day)}
								/>
								{day}
							</label>
							{availability[day].selected && (
								<div className="time-slots">
									{availability[day].timeSlots.map((slot, index) => (
										<div key={index} className="time-slot">
											<input
												type="time"
												value={slot.startTime}
												onChange={(e) => {
													const updated = [...availability[day].timeSlots];
													updated[index].startTime = e.target.value;
													setAvailability((prev) => ({
														...prev,
														[day]: { ...prev[day], timeSlots: updated },
													}));
												}}
											/>
											{' - '}
											<input
												type="time"
												value={slot.endTime}
												onChange={(e) => {
													const updated = [...availability[day].timeSlots];
													updated[index].endTime = e.target.value;
													setAvailability((prev) => ({
														...prev,
														[day]: { ...prev[day], timeSlots: updated },
													}));
												}}
											/>
											{availability[day].timeSlots.length > 1 && (
												<Button
													type="button"
													onClick={() => handleRemoveTimeSlot(day, index)}
													className="remove-slot-btn"
												>
													✕
												</Button>
											)}
										</div>
									))}
									<Button type="button" onClick={() => handleAddTimeSlot(day)} className="add-slot-btn">
										＋ Add Time Slot
									</Button>
								</div>
							)}
						</div>
					))}

					<Button type="submit" className="createGroupForm-button">
						Create Group
					</Button>
				</form>
			</div>
		</div>
	);
}

export default CreateGroupForm;
