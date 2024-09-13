import React, { useState, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
const Post = ({ post, refresh }) => {
	const {state, dispatch} = useContext(AuthContext);
	
	const user_id = state.user?.user_id;
	if (!user_id) {
	  console.error("User ID not found!");
	  return;
	}
  
	const viewPost = async (post_id) => {
		let obj = { pid: post_id, uid: state.user.user_id };
		const token = localStorage.getItem('token');
		console.log(obj);

		const options = {
			method: 'POST',
			headers: {'Content-Type': 'application/json',  'Authorization': `Bearer ${token}`},
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
	const read = (post_id) => {
		return wasViewed(post_id) ? 'You have read this post' : 'You have not read this post';
	}

	const postClass = post.media ? "" : "without-image";

	return (
		<div 
			style={{ borderRight: setViewedStyle(post.post_id) }} 
			className={`container post ${postClass} `}
			onClick={() => viewPost(post.post_id)}
			aria-label={`Post by ${post.email}, titled ${post.title}  ${read(post.post_id)}  `}
			role="button"
		>
						<img className="media-post-img" src={`uploads/${post.media}`} alt={`Post media: ${post.title}`}/>
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