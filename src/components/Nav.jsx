import React, { useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';

const Nav = () => {
	const {state, dispatch} = useContext(AuthContext);

	const changeView = (event) => {
		dispatch({ type: 'set dashboard', payload: event.target.textContent })
	}

	const activeProfile = () => {
		return {
			textDecoration: state.dashboard == 'Profile' ? 'overline' : 'none'
		}
	}	

	const activeFeed = () => {
		return {
			textDecoration: state.dashboard == 'Feed' ? 'overline' : 'none'
		}
	}

	return (
		<div className="nav">
			<h4 style={activeProfile()} onClick={(e) => changeView(e)}>Profile</h4>
			<h4 style={activeFeed()} onClick={(e) => changeView(e)}>Feed</h4>
		</div>
	)
}

export default Nav;