// TodoItemList 컴포넌트에서 전체 토글과 전체 삭제를 추가
import TodoItem from "./TodoItem";
import {Component} from "react";

class TodoItemList extends Component {

    render() {
        const { todos, onToggle, onRemove } = this.props;

        return (
            <div>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        text={todo.text}
                        checked={todo.checked}
                        id={todo.id}
                        onToggle={onToggle}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        );
    }
}

export default TodoItemList;
