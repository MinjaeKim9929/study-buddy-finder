import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import HomePage from './pages/Home/HomePage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import SignInPage from './pages/Signin/SignInPage';
import SignUpPage from './pages/Signup/SignUpPage';
import ProfilePage from './pages/Profile/Profile';
import CreateGroupPage from './pages/CreateGroup/CreateGroupPage';
import GroupDetailsPage from './pages/GroupDetails/GroupDetailsPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import Footer from './components/Footer/Footer';

import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Header isLoggedIn={false} />
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/create-group" element={<CreateGroupPage />} />
					<Route path="/view-group/:id" element={<GroupDetailsPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
