import { createContext } from 'react';

export const AuthContext = createContext();

export const initialState = {
	user: null,
	dashboard: 'Profile',
	posts: [],
	views: [],
	media: [],
}

export function reducer(state, action) {
	switch (action.type) {
		case "set user":
			return {
				...state,
				user: action.payload
			}
			break;
		case "set posts":
			return {
				...state,
				posts: action.payload
			}
			break;
		case 'set dashboard':
			return {
				...state,
				dashboard: action.payload
			}
			break;
		case 'set views':
			return {
				...state,
				views: action.payload
			}
			break;
		case 'set user and dashboard':
			return {
				...state,
				user: action.payload[0],
				dashboard: action.payload[1]
			}
			break;
		case 'set media':
			return {
				...state,
				media: action.payload
			}
			break;
	}
}