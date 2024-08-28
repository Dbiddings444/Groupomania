import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';

const Profile = () => {
	const {state, dispatch} = useContext(AuthContext);

	const logout = () => {
		localStorage.removeItem('token');
		dispatch({ type: 'set user', payload: null })
	}

	const deleteAccount = async () => {
		let obj = { email: state.user.email };

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(obj)
		};

		await fetch('/delete', options)
			.then(res => res.json())
			.then(data => { logout() })
			.catch(err => { console.log(err) })
	};

	return (
		<div className="profile">
			<div className="info-group">
				<p>Email: {state.user.email}</p>
			</div>
			<button className="btn btn-secondary" onClick={() => logout()}>Logout</button>
			<button className="btn btn-delete" onClick={() => deleteAccount()}>Delete Profile</button>
		</div>
	)
}

export default Profile;