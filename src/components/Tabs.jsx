import React, { useState, useEffect, useContext } from 'react';

const Tabs = ({ contentView, changeView }) => {

	return (
		<div className="feed-tabs">
			<h1 className="content-btn" onClick={(e) => changeView(e)}>
				Posts
			</h1>
		</div>
	)
}

export default Tabs;