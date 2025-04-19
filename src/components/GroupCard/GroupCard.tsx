import React from 'react';
import { Link } from 'react-router-dom';
import './GroupCard.scss';

export interface GroupCardProps {
	id: string;
	groupName: string;
	description: string;
	courses: string[];
	ctaLabel?: string;
}

function GroupCard({ id, groupName, description, courses, ctaLabel = 'View Details' }: GroupCardProps) {
	return (
		<div className="group-card">
			<h3>{groupName}</h3>
			<p>{description}</p>
			<p>
				Courses: <strong>{courses.join(', ')}</strong>
			</p>
			<Link to={`/view-group/${id}`} className="group-link">
				{ctaLabel}
			</Link>
		</div>
	);
}

export default GroupCard;
