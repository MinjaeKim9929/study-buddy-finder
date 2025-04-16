import React, { useState, FormEvent } from 'react';
import './UserProfileForm.scss';
import Button from '../../Button/Button';

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

type Availability = Record<DayOfWeek, AvailabilityDay>;

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

	const programs = [
		{ code: 'AAT2', name: 'Aviation Technician & Aircraft Maintenance' },
		{ code: 'AAT3', name: 'Aviation Technician & Avionics Maintenance' },
		{ code: 'ABU1', name: 'Academic Upgrading' },
		{ code: 'ADP2', name: 'Advanced Digital Photography (Unavailable for Applications)' },
		{ code: 'ADV1', name: 'Adventure Expeditions and Interpretive Leadership' },
		{ code: 'AET1', name: 'Agricultural Equipment Technician' },
		{ code: 'AET2', name: 'Agricultural Equipment Technician & John Deere Ag Tech' },
		{ code: 'AFM1', name: 'Applied Aerospace Manufacturing (Suspended)' },
		{ code: 'AFM2', name: 'Advanced Filmmaking' },
		{ code: 'AFL1', name: 'Acting for Screen and Stage' },
		{ code: 'ALD1', name: 'Advanced Live Digital Media Production' },
		{ code: 'AMH1', name: 'Addictions and Mental Health' },
		{ code: 'AMM1', name: 'Applied Mechanical Design' },
		{ code: 'ANA3', name: 'Anesthesia Assistant (Unavailable for Applications)' },
		{ code: 'ANI1', name: 'Animation' },
		{ code: 'AOP1', name: 'Aerospace Operations Management' },
		{ code: 'AOT1', name: 'Auto Body Repair Techniques' },
		{ code: 'APS1', name: 'Advanced Police Studies (Suspended)' },
		{ code: 'APT1', name: 'Automotive Service Technician Apprenticeship' },
		{ code: 'AST1', name: 'Automotive Service Technician' },
		{ code: 'AVF1', name: 'Aviation Technology & Aircraft Maintenance and Avionics (Advanced Diploma)' },
		{ code: 'AVT2', name: 'Aviation Technology & Aircraft Maintenance and Avionics (Co-op)' },
		{ code: 'BAA2', name: 'Business & Accounting' },
		{ code: 'BAE2', name: 'Business & Entrepreneurship and Management' },
		{ code: 'BAF2', name: 'Business & Finance' },
		{ code: 'BAH1', name: 'Business & Human Resources' },
		{ code: 'BAI2', name: 'Business & Insurance' },
		{ code: 'BAL2', name: 'Business & Logistics and Supply Chain Management' },
		{ code: 'BAM2', name: 'Business & Marketing' },
		{ code: 'BAS2', name: 'Business' },
		{ code: 'BBD4', name: 'Honours Bachelor of Applied Technology & Biotechnology' },
		{ code: 'BBM4', name: 'Honours Bachelor of Commerce (Accounting)' },
		{ code: 'BDM4', name: 'Honours Bachelor of Commerce (Digital Marketing)' },
		{ code: 'BHM4', name: 'Honours Bachelor of Commerce (Human Resources Management)' },
		{ code: 'BIA1', name: 'Business and Information Systems Architecture' },
		{ code: 'BIS1', name: 'Business & Insurance (Co-op)' },
		{ code: 'BLC1', name: 'Business & Logistics and Supply Chain Management (Co-op)' },
		{ code: 'BMG4', name: 'Honours Bachelor of Commerce (Management)' },
		{ code: 'BMK1', name: 'Business & Marketing (Co-op)' },
		{ code: 'BMS1', name: 'Business Management (London South Campus, Suspended)' },
		{ code: 'BRT1', name: 'Brewer Technician' },
		{ code: 'BRT3', name: 'Broadcasting & Television and Film Production' },
		{ code: 'BRR2', name: 'Broadcasting & Radio and Media Production (Suspended)' },
		{ code: 'CAS1', name: 'Cannabis Applied Science (Suspended)' },
		{ code: 'CIM1', name: 'CNC Industrial Machining' },
		{ code: 'CIM2', name: 'CNC Industrial Machining (Co-op)' },
		{ code: 'CJS2', name: 'Community Justice Services' },
		{ code: 'CNS1', name: 'Computer Systems Technician' },
		{ code: 'CNT2', name: 'Computer Systems Technology' },
		{ code: 'CPM1', name: 'Construction Project Management (Suspended)' },
		{ code: 'CUL1', name: 'Culinary Management' },
		{ code: 'CYA1', name: 'Cyber Security' },
		{ code: 'CYW3', name: 'Child and Youth Care' },
		{ code: 'DEN1', name: 'Dental Hygiene' },
		{ code: 'DSW1', name: 'Developmental Services Worker' },
		{ code: 'ECE1', name: 'Early Childhood Education' },
		{ code: 'ECM1', name: 'Electrician (Construction and Maintenance) Apprenticeship' },
		{ code: 'ELN2', name: 'Electronics and Embedded Systems Development' },
		{ code: 'ELT1', name: 'Electrical Techniques' },
		{ code: 'EMG2', name: 'Emergency Medical Services & Graduate Certificate (Unavailable for Applications)' },
		{ code: 'ESD2', name: 'Embedded Systems Development (Unavailable for Applications)' },
		{ code: 'FAA3', name: 'Fine Art (Suspended)' },
		{ code: 'FID1', name: 'Fashion Design' },
		{ code: 'FIM1', name: 'Fashion Marketing and Management' },
		{ code: 'FIR1', name: 'Fire Safety Systems' },
		{ code: 'FSM1', name: 'Food Service Management' },
		{ code: 'GCM1', name: 'General Carpenter Apprenticeship' },
		{ code: 'GDE3', name: 'Graphic Design' },
		{ code: 'GMT1', name: 'General Machinist Apprenticeship' },
		{ code: 'HCA1', name: 'Health Care Administration Management' },
		{ code: 'HMT1', name: 'Hospitality and Tourism Management' },
		{ code: 'IDP3', name: 'Interior Decorating' },
		{ code: 'IMS1', name: 'Information Security Management (Unavailable for Applications)' },
		{ code: 'INV1', name: 'Investment Management' },
		{ code: 'IWD2', name: 'Web Development and Internet Applications' },
		{ code: 'IWD3', name: 'Web Development and Internet Applications (Co-op)' },
		{ code: 'JTD1', name: 'Journalism & Television and Digital News (Suspended)' },
		{ code: 'LDC1', name: 'Landscape Design' },
		{ code: 'MAC1', name: 'Manufacturing Engineering Technician' },
		{ code: 'MAE4', name: 'Manufacturing Engineering Technology' },
		{ code: 'MGS1', name: 'Global Business Management' },
		{ code: 'MHT3W', name: 'Massage Therapy (Unavailable for Applications)' },
		{ code: 'MOT2', name: 'Motive Power Technician & Automotive' },
		{ code: 'MOT3', name: 'Motive Power Technician & Diesel' },
		{ code: 'MPR1', name: 'Music Industry Arts' },
		{ code: 'MQC1S', name: 'Quality Control and Assurance (Unavailable for Applications)' },
		{ code: 'MRI1', name: 'Magnetic Resonance Imaging (Unavailable for Applications)' },
		{ code: 'MRT1', name: 'Medical Radiation Technology (Unavailable for Applications)' },
		{ code: 'MTT1', name: 'Mechanical Technician & CNC' },
		{ code: 'MTT2', name: 'Mechanical Technician & CNC (Co-op)' },
		{ code: 'NUR1', name: 'Practical Nursing' },
		{ code: 'NUR4', name: 'Bachelor of Science in Nursing (Collaborative with Western University)' },
		{ code: 'OHS1', name: 'Occupational Health and Safety Management' },
		{ code: 'OPM2', name: 'Operations Management' },
		{ code: 'PAL1', name: 'Palliative Care' },
		{ code: 'PHS2', name: 'Pre-Health Sciences Pathway to Advanced Diplomas and Degrees' },
		{ code: 'PMI2', name: 'Project Management' },
		{ code: 'PRC1', name: 'Public Relations - Corporate Communications (Suspended)' },
		{ code: 'PRM1', name: 'Retirement Residence Management (Suspended)' },
		{ code: 'PSA1', name: 'Public Safety Administration' },
		{ code: 'PSA2', name: 'Public Safety Administration (Co-op)' },
		{ code: 'RAC1', name: 'Residential Air Conditioning Systems Mechanic Apprenticeship' },
		{ code: 'RAF1', name: 'Regulatory Affairs and Quality Operations' },
		{ code: 'RPN1', name: 'Registered Practical Nursing' },
		{ code: 'RRT1', name: 'Respiratory Therapy' },
		{ code: 'SCM2', name: 'Supply Chain Management & Logistics (Co-op)' },
		{ code: 'SDE1', name: 'Software Development' },
		{ code: 'SSW1', name: 'Social Service Worker' },
		{ code: 'SSW2', name: 'Social Service Worker (Fast Track)' },
		{ code: 'TAH1', name: 'Tourism and Hospitality' },
		{ code: 'THC1', name: 'Tourism and Hospitality (Co-op)' },
		{ code: 'THP1', name: 'Theatre Arts & Performance' },
		{ code: 'THT1', name: 'Theatre Arts & Technical Production' },
		{ code: 'TSM1', name: 'Truck and Coach Technician' },
		{ code: 'VGP1', name: 'Video Game Design and Production' },
		{ code: 'VGP2', name: 'Video Game Design and Production (Co-op)' },
		{ code: 'WFT1', name: 'Welding and Fabrication Technician' },
		{ code: 'WFT2', name: 'Welding and Fabrication Technician (Co-op)' },
	];

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
		onSubmit({
			firstName,
			lastName,
			age,
			gender,
			major,
			coursesTaking: coursesTaking.filter((course) => course.trim() !== ''),
			coursesTaken: coursesTaken.filter((course) => course.trim() !== ''),
			availability,
		});
	};

	return (
		<div className="userProfileForm">
			<div className="userProfileForm-content">
				<h1 className="userProfileForm-title">Set Up Your Profile</h1>
				<p className="userProfileForm-subtitle">Tell us a bit about yourself to get started.</p>
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
							{programs.map((program) => (
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
