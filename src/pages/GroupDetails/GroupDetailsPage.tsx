import React from 'react';
import { useParams } from 'react-router-dom';

function GroupDetailsPage() {
	const { id } = useParams<{ id: string }>();

	return (
		<div>
			<div> GroupDetailsPage {id}</div>
		</div>
	);
}

export default GroupDetailsPage;
