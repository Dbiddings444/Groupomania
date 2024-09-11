import React from 'react';

const NewButtons = ({ addPost }) => {
	return (
		<div>
			<button className="btn btn-primary post-btn" onClick={() => addPost()}>+ New Post</button>
		</div>
	)
}

export default NewButtons;