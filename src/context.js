import { createContext } from 'react';

export const AuthContext = createContext();

export const initialState = {
	user: null,
	dashboard: 'Profile',
	posts: [],
	views: [],
	media: [],
};

export function reducer(state, action) {
	switch (action.type) {
		case 'set user':
			return { ...state, user: action.payload };

		case 'set posts':
			return { ...state, posts: Array.isArray(action.payload) ? action.payload : [] };

		case 'set dashboard':
			return { ...state, dashboard: action.payload };

		case 'set views':
			return { ...state, views: action.payload };

		case 'set user and dashboard':
			return {
				...state,
				user: action.payload?.[0] ?? state.user,
				dashboard: action.payload?.[1] ?? state.dashboard,
			};

		case 'set media':
			return { ...state, media: action.payload };

		default:
			return state;
	}
}