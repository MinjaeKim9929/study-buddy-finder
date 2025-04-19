import React, { useState } from 'react';
import InvolvedStudyGroupList from '../../components/Dashboard/InvolvedStudyGroupList/InvolvedStudyGroupList';
import FilterBar from '../../components/Dashboard/FilterBar/FilterBar';
import AvailableStudyGroupList from '../../components/Dashboard/AvailableStudyGroupList/AvailableStudyGroupList';
import './DashboardPage.scss';

export interface Filter {
	course: string;
	program: string;
	availabilityDay: string;
}

function DashboardPage() {
	const [filters, setFilters] = useState<Filter>({
		course: '',
		program: '',
		availabilityDay: '',
	});

	const handleFilterChange = (newFilters: Filter) => {
		setFilters(newFilters);
	};

	return (
		<div className="dashboard-page">
			<main className="dashboard-main">
				<h1>Welcome to Your Dashboard</h1>

				<section className="involved-section">
					<h2>Your Study Groups</h2>
					<InvolvedStudyGroupList />
				</section>

				<section className="filter-section">
					<FilterBar filters={filters} onFilterChange={handleFilterChange} />
				</section>

				<section className="available-section">
					<h2>Available Study Groups</h2>
					<AvailableStudyGroupList filters={filters} />
				</section>
			</main>
		</div>
	);
}

export default DashboardPage;
