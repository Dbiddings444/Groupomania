import React, { useReducer } from 'react';
import { initialState, reducer, AuthContext } from './context';
import Page from './components/Page';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="app">
			<AuthContext.Provider value={{state, dispatch}}>
				<Page />
			</AuthContext.Provider>
		</div>
	)
}

export default App;
