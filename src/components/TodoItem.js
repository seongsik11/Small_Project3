import React from "react";
import "./TodoItem.css";

const TodoItem = ({text, checked, id, onToggle, onRemove}) => {
    const handleToggle = () => {
        onToggle(id);
    };

    const handleRemove = (e) => {
        e.stopPropagation(); // onToggle 이 실행되지 않도록 함
        onRemove(id);
    };

    return (
        <div className="todo-item" onClick={handleToggle}>
            <div className="remove" onClick={handleRemove}>&times;</div>
            <div className={`todo-text ${checked && 'checked'}`}>
                <div>{text}</div>
            </div>
            {checked && (<div className="check-mark">✓</div>)}
        </div>
    );
};

export default TodoItem;
