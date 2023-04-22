import React, { useState, useCallback } from "react";
import Title from "./Title";

export default function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");

  const handleTitleChange = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const handleAddTodo = useCallback(() => {
    if (title) {
      addTodo({
        title,
        completed: false,
      });
      setTitle("");
    }
  }, [addTodo, title]);
  console.count("TodoForm re-renders");
  return (
    <>
      <Title />
      <div className="todo-form">
        <input type="text" value={title} onChange={handleTitleChange} />
        <button className="add-todo" type="submit" onClick={handleAddTodo}>
          Add
        </button>
      </div>
    </>
  );
}
