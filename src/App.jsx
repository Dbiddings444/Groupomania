import React, { useReducer, useEffect } from 'react';
import { initialState, reducer, AuthContext } from './context';
import Page from './components/page';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const raw = localStorage.getItem('user');
		if (raw) {
			try {
				const user = JSON.parse(raw);
				dispatch({ type: 'set user', payload: user });
			} catch (e) {
				// fallback to single id if necessary
				const id = localStorage.getItem('user_id');
				if (id) dispatch({ type: 'set user', payload: { user_id: id } });
			}
		}
	}, []);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			<Page />
		</AuthContext.Provider>
	);
};

export default App;
