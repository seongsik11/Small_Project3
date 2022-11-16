import React, {Component} from "react";
import TodoItem from "./TodoItem";

class TodoItemList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {
        const {todos, onToggle, onRemove} = this.props;

        const todoList = todos&&todos.map(
            ({id, text, checked}) => (
                <TodoItem
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id}
                />
            )
        );

        return (
            <div style={{color:"#f1f1f1"}}>
                {todoList}
            </div>
        );
    }

}

export default TodoItemList