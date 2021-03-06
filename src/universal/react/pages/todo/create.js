import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';
import Form from '../../components/form';

const CreatePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-create">
			<Form className="todo-form" method="post" action="/">
				<Todo {...props} editable={true} />
				<div className="action-buttons">
					<input type="submit" value="Create"/>
					<LinkButton to="/">Cancel</LinkButton>
				</div>
			</Form>
		</div>);
	}
});

export { CreatePage };