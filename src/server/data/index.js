// WARNING: SIDE EFFECTS GALORE
// acts as a simple data storage mechanism
import uuid from 'uuid';
import { find, findIndex, cloneDeep } from 'lodash';

const DONE = 'DONE';
const PENDING = 'PENDING';

function generateId() {
	return uuid.v4();
}

function validStatus(status) {
	return [DONE, PENDING].includes(status);
}

const todos = [
	{ 
		id: 'apple',
		text: 'Buy apples',
		status: DONE
	},
	{
		id: 'banana',
		text: 'Pay the rent',
		status: PENDING
	}
];

const get = id => {
	const todo = find(todos, {id});
	if (todo) {
		return todo;
	} else {
		console.warn(`Could not find todo with id ${id}`);
	}
}

const update = (id, { text, status }) => {
	const todo = get(id);
	if (todo) {
		todo.text = text;
		if (validStatus(status)) {
			todo.status = status;
		} else {
			console.warn(`Attempted to set invalid status ${status} on ${id}`);
		}
	} else {
		console.warn(`Could not find a todo with id ${id}`);
	}
	return todo;
}

const add = ({ text }) => {
	const id = generateId();
	todos.push({ id, text, status: PENDING });
	return id;
}

const list = () => cloneDeep(todos);

const remove = id => {
	const index = findIndex(todos, {id});
	let deleted;
	if (index) {
		deleted = todos.splice(index, 1);
	} else {
		console.warn(`Tried to delete a TODO that doesn't exist: ${id}`);
	}
	return deleted;
};

export { add, get, list, update, remove };