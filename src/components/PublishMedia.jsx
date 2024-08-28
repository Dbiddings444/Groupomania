import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';

const PublishMedia = ({ cancel }) => {
	const {state, dispatch} = useContext(AuthContext);
	const [content, setContent] = useState('');
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		console.log(state.user.email);
		setContent(event.target.files[0].name)
		setFile(event.target.files[0]);
	}

	const upload = async () => {
		const formData = new FormData();
		formData.append('user_id', state.user.user_id);
		formData.append('content', content);
		formData.append('media', file);

		const options = { method: 'POST', body: formData };
		
		await fetch('/addMedia', options)
			.then(res => res.json())
			.then(data => { console.log(data) })
			.catch(err => { console.log(err) })
	}

	return (
		<div className="upload-group">
			<input className="file-input" type="file" onChange={(e) => { handleFileChange(e) }} />
			<button className="btn btn-primary post-btn" onClick={() => upload()}>Upload</button>
			<button className="btn btn-secondary post-btn" onClick={() => cancel()}>Cancel</button>
		</div>
	)
}

export default PublishMedia;