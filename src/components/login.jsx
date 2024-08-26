import React, { useState, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';

const Form = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLogin, setIsLogin] = useState(true);
	const [error, setError] = useState('');

	const {state, dispatch} = useContext(AuthContext);

	const updateEmail = (event) => { setEmail(event.target.value); }	
	const updatePassword = (event) => { setPassword(event.target.value); }
	const updateForm = () => { setIsLogin(!isLogin) };

	const formText = () => { return isLogin ? 'Log in' : 'Sign up'; }

	const submit = async () => {
		let obj = { email: email, password: password }

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(obj)
		};

		let endpoint = isLogin ? '/login' : '/register';

		await fetch(endpoint, options)
			.then(res => res.json())
			.then(data => {
				if (endpoint == '/login') {
					if (data.token) {					
						const { token, user } = data;
						console.log(user);
						localStorage.setItem('token', token);
						dispatch({ type: 'set user and dashboard', payload: [user, 'Profile']})
					} else {
						setError(data.error);
					}
				} else {
					if (data.error) {
						setError(data.error);
					}
				}
			})
			.catch(err => { console.log(err) })
	};

	return (
<div className="login-page">
<div className="login-container">
<div className="login-box"> </div>
</div>
</div>
	)
}

export default Form;