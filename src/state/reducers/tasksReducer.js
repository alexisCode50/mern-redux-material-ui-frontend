import { LIST_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '../actions/types';

const initialState = {
    tasks: []
}

const tasksReducer = (state = initialState, action) => {
	switch(action.type){
		case LIST_TASKS:
			return {
				...state,
				tasks: action.payload
			}

		case CREATE_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.payload]
			}

		case UPDATE_TASK:
			return {
				...state,
				tasks: state.tasks.map(task => {
						if(task._id == action.payload._id){
							return action.payload;
						} else {
							return task;
						}
					}
				)
			}

		case DELETE_TASK: 
			return {
				...state,
				tasks: state.tasks.filter(task => task._id !== action.payload)
			}

		default: return state
	}
}

export default tasksReducer;