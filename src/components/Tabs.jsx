import React, { useState, useEffect, useContext } from 'react';

const Tabs = ({ contentView, changeView }) => {
	const activePosts = () => {
		return {
			textDecoration: contentView == 'Posts' ? 'underline' : 'none'
		}
	}	

	const activeMedia = () => {
		return {
			textDecoration: contentView == 'Media' ? 'underline' : 'none'
		}
	}

	return (
		<div className="feed-tabs">
			<button style={activePosts()} className="content-btn" onClick={(e) => changeView(e)}>
				Posts
			</button>
			<button style={activeMedia()} className="content-btn" onClick={(e) => changeView(e)}>
				Media
			</button>
		</div>
	)
}

export default Tabs;