import { Routes, Route } from 'react-router-dom';

import EnvSpecificRouter from 'components/EnvSpecificRouter';

import { AuthUser } from 'globals/AuthUser';
import LoginPage from 'pages/Login';
import HomePage from 'pages/Index';
import RegistrationPage from 'pages/Registration';
import UsersPage from 'pages/Users';
import ProfilePage from 'pages/Profile';
function App() {
	return (
		<AuthUser>
			<EnvSpecificRouter>
				<Routes>
					<Route path={'/login'} element={<LoginPage />} />
					<Route path={'/registration'} element={<RegistrationPage />} />
					<Route path={'/'} element={<HomePage />} />
					<Route path={'/Home'} element={<HomePage />} />
					<Route path={'/users'} element={<UsersPage />} />
					<Route path={'/Profile'} element={<ProfilePage />} />
				</Routes>
			</EnvSpecificRouter>
		</AuthUser>
	);
}

export default App;
