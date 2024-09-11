import React, { useState, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
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
	const postClass = post.media ? "" : "without-image";

	return (
		<div 
			style={{ borderRight: setViewedStyle(post.post_id) }} 
			className={`container post ${postClass} `}
			onClick={() => viewPost(post.post_id)}
		>
						<img className="media-post-img" src={`uploads/${post.media}`} />
			<div className='info-container'>
			<div className="row post-text">
			<div className="col">{post.email}</div>
				<div className="col title">{post.title}</div>
				<div className="col text">{post.content}</div>
			</div>
			<div className="row post-info" >
				<div className="col">{post.created_at.split('T')[0]}</div>
			</div>
			</div>
		</div>
	)
}

export default Post;