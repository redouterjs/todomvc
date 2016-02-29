import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';

const ViewPage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-view">
			<Todo {...props} />
			<LinkButton href="/">Back to list</LinkButton>
		</div>);
	}
});

export { ViewPage };