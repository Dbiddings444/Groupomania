import React, { useReducer } from 'react';
import { initialState, reducer, AuthContext } from './context';
import Page from './components/Page';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostPage from './pages/postPage';
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
