import React, { useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import Profile from './Profile';
import Feed from './Feed';
import Nav from './Nav';

const Dashboard = ({ user }) => {
	const {state, dispatch} = useContext(AuthContext);

	return (
		<div className="dashboard">
			<Nav />
			{state.dashboard == 'Profile' ? <Profile /> : <Feed />}
		</div>
	)
}

export default Dashboard;
