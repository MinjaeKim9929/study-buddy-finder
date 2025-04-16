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
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './config/AuthContext';

import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<AuthProvider>
			<div className="App">
				<Header />
				<div>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/sign-in" element={<SignInPage />} />
						<Route path="/sign-up" element={<SignUpPage />} />
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<DashboardPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<ProfilePage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/create-group"
							element={
								<ProtectedRoute>
									<CreateGroupPage />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/view-group/:id"
							element={
								<ProtectedRoute>
									<GroupDetailsPage />
								</ProtectedRoute>
							}
						/>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</AuthProvider>
	);
}

export default App;
