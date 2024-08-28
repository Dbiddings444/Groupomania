import React, { useState, useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import Posts from './Posts';
import Media from './Media';
import PublishPost from './PublishPost';
import PublishMedia from './PublishMedia';
import NewButtons from './NewButtons';
import Tabs from './Tabs';

const Feed = () => {
	const {state, dispatch} = useContext(AuthContext);
	const [posting, setPosting] = useState(false);
	const [postingType, setPostingType] = useState('text');
	const [contentView, setContentView] = useState('Posts');

	const addPost = () => { 
		setPosting(!posting);
		setPostingType('text') 
	}

	const addMedia = () => { 
		setPosting(!posting);
		setPostingType('media')
	}

	const changeView = (event) => { setContentView(event.target.textContent); }
	const cancelPost = () => { setPosting(false); }

	const returnGroup = () => {
		return postingType == 'text' 
			? <PublishPost cancel={cancelPost} /> 
			: <PublishMedia cancel={cancelPost} />;
	}

	return (
		<div className="feed">
			{!posting ? <NewButtons addPost={addPost} addMedia={addMedia} /> : ''}
			{posting && returnGroup()}
			<Tabs contentView={contentView} changeView={changeView} />
			{contentView == 'Posts' ? <Posts /> : <Media />}
		</div>
	)
}

export default Feed;