import React, { useContext } from 'react';
import { AuthContext } from '../context';
import '../App.css';
import logo from '../../public/logos/icon-left-font-monochrome-black.svg'
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
			<div className='nav-img-container'>
			<img src={logo}/>
			</div>
			<div className='tabs-container'>
			<h4  style={activeProfile()} onClick={(e) => changeView(e)}>Profile</h4>
			<h4 style={activeFeed()} id='last' onClick={(e) => changeView(e)}>Feed</h4>
			</div>
		</div>
	)
}

export default Nav;