import React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

function NotFoundPage() {
	return (
		<div className="not-found-page">
			<h1>404</h1>
			<p>Oops! The page you're looking for doesn't exist.</p>
			<Link to="/">
				<Button className="form-btn">Go Home</Button>
			</Link>
		</div>
	);
}

export default NotFoundPage;
