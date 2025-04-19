import React, { useState } from 'react';
import './FilterBar.scss';
import programsList from '../../Forms/Programs';
import Button from '../../Button/Button';

interface Filter {
	course: string;
	program: string;
	availabilityDay: string;
}

interface FilterBarProps {
	filters: Filter;
	onFilterChange: (filters: Filter) => void;
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function FilterBar({ filters, onFilterChange }: FilterBarProps) {
	const [localFilters, setLocalFilters] = useState(filters);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = e.target;
		setLocalFilters((prev) => ({ ...prev, [name]: value }));
	};

	const handleApply = () => {
		onFilterChange(localFilters);
	};

	const handleReset = () => {
		const resetFilters = { course: '', program: '', availabilityDay: '' };
		setLocalFilters(resetFilters);
		onFilterChange(resetFilters);
	};

	return (
		<div className="filter-bar">
			<div className="filter-field">
				<label htmlFor="program">Filter by Program:</label>
				<select name="program" id="program" value={localFilters.program} onChange={handleChange}>
					<option value="">All</option>
					{programsList.map((program) => (
						<option key={program.code} value={program.code}>
							{program.code} - {program.name}
						</option>
					))}
				</select>
			</div>

			<div className="filter-field">
				<label htmlFor="course">Filter by Course:</label>
				<input
					type="text"
					id="course"
					name="course"
					placeholder="e.g. INFO-5144"
					value={localFilters.course}
					onChange={handleChange}
				/>
			</div>

			<div className="filter-field">
				<label htmlFor="availabilityDay">Filter by Availability:</label>
				<select
					id="availabilityDay"
					name="availabilityDay"
					value={localFilters.availabilityDay}
					onChange={handleChange}
				>
					<option value="">All</option>
					<option value="Sunday">Sunday</option>
					<option value="Monday">Monday</option>
					<option value="Tuesday">Tuesday</option>
					<option value="Wednesday">Wednesday</option>
					<option value="Thursday">Thursday</option>
					<option value="Friday">Friday</option>
					<option value="Saturday">Saturday</option>
				</select>
			</div>

			<div className="filter-actions">
				<Button className="filter-btn" type="button" onClick={handleApply}>
					Apply Filters
				</Button>
				<Button className="filter-btn reset" type="button" onClick={handleReset}>
					Reset Filters
				</Button>
			</div>
		</div>
	);
}

export default FilterBar;
