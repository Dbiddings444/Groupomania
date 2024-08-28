import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';

const PublishPost = ({ cancel }) => {
	const {state, dispatch} = useContext(AuthContext);
	const [text, setText] = useState('');

	const updateText = (event) => { setText(event.target.value); }

	const getPosts = async () => {
		let obj = { }

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(obj)
		};

		await fetch('/getPosts', options)
			.then(res => res.json())
			.then(data => { dispatch({ type: 'set posts', payload: data }) })
			.catch(err => { console.log(err) })
	};

	const publish = async () => {
		let obj = { user_id: state.user.user_id, content: text }

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(obj)
		};

		await fetch('/addPost', options)
			.then(res => res.json())
			.then(data => { getPosts() })
			.catch(err => { console.log(err) })
	}

	return (
		<div className="post-form">
			<textarea className="text-input" onChange={(e) => updateText(e)}></textarea>
			<button className="btn btn-primary post-btn" onClick={() => publish()}>Publish</button>
			<button className="btn btn-secondary post-btn" onClick={() => cancel()}>Cancel</button>
		</div>
	)
}

export default PublishPost;