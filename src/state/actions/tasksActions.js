import { LIST_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './types';
import axios from "axios";

export const getTasks = () => async dispatch => {
	await axios.get('http://localhost:4000/api/tasks')
	.then(response => {
		dispatch({
	        type: LIST_TASKS,
	        payload: response.data
	    });
	});
}

export const createTask = (task) => async dispatch => {
	await axios.post('http://localhost:4000/api/tasks', task)
	.then(response =>{
		dispatch({
	        type: CREATE_TASK,
	        payload: response.data.task
	    });
	});	
}

export const updateTask = (task) => async dispatch => {
	await axios.put(`http://localhost:4000/api/tasks/${task._id}`, task)
	.then(response => {
		if(response.status === 200) {
			dispatch({
		        type: UPDATE_TASK,
		        payload: task
		    });
		}
	});
}

export const deleteTask = (id) => async dispatch => {
	await axios.delete(`http://localhost:4000/api/tasks/${id}`)
	.then(() => {
		dispatch({
	        type: DELETE_TASK,
	        payload: id
	    });
	})
}