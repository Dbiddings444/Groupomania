import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context';

const Media = () => {
	const {state, dispatch} = useContext(AuthContext);

	const getMedia = async () => {
		const obj = {};

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(obj)
		}

		if (state.media.length == 0) {
			await fetch('/getMedia', options)
				.then(res => res.json())
				.then(data => { dispatch({ type: 'set media', payload: data }) })
				.catch(err => { console.log(err) })
		}
	}

	useEffect(() => { getMedia() }, [])
	
	return (
		<div className="media-posts">
			{state.media.map((img, idx) => {
				return (
					<div>
						<img className="media-post-img" src={`uploads/${img.content}`} />
						<p className="media-post-user">{img.email}</p>
						<p className="media-post-time">{img.created_at}</p>
					</div>
				)
			})}
		</div>
	)
}

export default Media;