import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import Post from './Post';

const Posts = () => {
	const {state, dispatch} = useContext(AuthContext);
	const token = localStorage.getItem('token');
	const getPosts = async () => {
		let obj = { }

		const options = {
			method: 'post',
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
			body: JSON.stringify(obj)
		};
		await fetch('/getPosts', options)
			.then(res => res.json())
			.then(data => { dispatch({ type: 'set posts', payload: data.posts }) })
			.catch(err => { console.log(err) })
	};

	const getViews = async () => {
		let obj = { }
		const options = {
			method: 'post',
			headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
			body: JSON.stringify(obj)
		};
		await fetch('/getViews', options)
			.then(res => res.json())
			.then(data => { dispatch({ type: 'set views', payload: data.views }) })
			.catch(err => { console.log(err) })
	}

	useEffect(() => { 
		getPosts(); 
		getViews();
	}, [])

	return (
		<div className="posts">
		{Array.isArray(state.posts) && state.posts.map((post, idx) => (
		  <Post key={idx} post={post} refresh={getViews} />
		))}
	  </div>
	)
}

export default Posts;