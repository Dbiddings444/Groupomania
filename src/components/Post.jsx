import React, { useState, useContext } from 'react';
import { AuthContext } from '../context';

const Post = ({ post, refresh }) => {
	const {state, dispatch} = useContext(AuthContext);

	const viewPost = async (post_id) => {
		let obj = { pid: post_id, uid: state.user.user_id };
		console.log(obj);

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(obj)
		};

		await fetch('/addView', options)
			.then(res => res.json())
			.then(data => { refresh() })
			.catch(err => { console.log(err) })
	}

	const wasViewed = (post_id) => {
    return state.views.some(view => {
    	return view.post_id === post_id && view.user_id === state.user.user_id
    });
  };

	const setViewedStyle = (post_id) => {
		return wasViewed(post_id) ? 'none' : '4px solid green';
	}

	return (
		<div 
			style={{ borderRight: setViewedStyle(post.post_id) }} 
			className="container post" 
			onClick={() => viewPost(post.post_id)}
		>
			<div className="row post-text">
				<div className="col">{post.content}</div>
			</div>
			<div className="row">
				<div className="col">{post.email}</div>
				<div className="col">{post.created_at.split('T')[0]}</div>
			</div>
		</div>
	)
}

export default Post;