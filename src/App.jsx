import React, { useReducer, useEffect } from 'react';
import { initialState, reducer, AuthContext } from './context';
import Page from './components/Page';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// Initialize user from localStorage safely
	useEffect(() => {
		const storedUserId = localStorage.getItem('user_id');
		if (storedUserId) {
			// Ensure that the payload matches the structure expected by the reducer
			dispatch({ type: 'set user', payload: { user_id: storedUserId } });
		}
	}, []);

	return (
		<div className="app">
			<AuthContext.Provider value={{ state, dispatch }}>
				<Page />
			</AuthContext.Provider>
		</div>
	);
};

export default App;
