import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import Post from './Post';

const Posts = () => {
	const {state, dispatch} = useContext(AuthContext);

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

	const getViews = async () => {
		await fetch('/getViews')
			.then(res => res.json())
			.then(data => { dispatch({ type: 'set views', payload: data }) })
			.catch(err => { console.log(err) })
	}

	useEffect(() => { 
		getPosts(); 
		getViews();
	}, [])

	return (
		<div className="posts">
			{state.posts.map((post, idx) => {
				return <Post post={post} refresh={getViews} />
			})}
		</div>
	)
}

export default Posts;