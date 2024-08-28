import React from 'react';

const NewButtons = ({ addPost, addMedia }) => {
	return (
		<div>
			<button className="btn btn-primary post-btn" onClick={() => addPost()}>+ New Post</button>
			<button className="btn btn-primary post-btn" onClick={() => addMedia()}>+ New Media</button>
		</div>
	)
}

export default NewButtons;