import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import Form from './Form';
import Dashboard from './Dashboard';
import loginIcon from '../../public/logos/icon-above-font.png'

const Page = () => {
	const {state, dispatch} = useContext(AuthContext);

	const fetchProtected = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			let options = { 
				method: 'POST',
				headers: { 
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: ''
			}

			await fetch('/protected', options)
				.then(res => res.json())
				.then(data => { 
					if (data.error == 'Invalid token') {
						dispatch({ type: 'set user', payload: null })
						return;
					}
					dispatch({ type: 'set user and dashboard', payload: [data, 'Profile']})
				})
				.catch(err => { localStorage.removeItem('token') });
		}
	}

	useEffect(() => { fetchProtected() }, [])

	return (
		<div className="page">
			<div className='test'>
			<img className='logo' alt='company logo for login'src={loginIcon}></img>
			</div>
			{ state.user != undefined ? <Dashboard /> : <Form /> }
		</div>
	)
}

export default Page;