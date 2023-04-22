import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

export default function Todo() {
   const [todos, setTodos] = useState([]);

   useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem("todos"));
      if (storedTodos) {
         setTodos(storedTodos);
      }
   }, []);

   useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
   }, [todos]);

   const addTodo = (newTodo) => {
      setTodos([...todos, newTodo]);
   };

   const deleteTodo = (index) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
   };

   const deleteCompleted = () => {
      const newTodos = todos.filter((todo) => !todo.completed);
      setTodos(newTodos);
   };

   const toggleCompleted = (index) => {
      const newTodos = [...todos];
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
   };
   console.count("Todo re-renders");
   return (
      <div>
         <TodoForm addTodo={addTodo} />
         <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            deleteCompleted={deleteCompleted}
            setTodos={setTodos}
            toggleCompleted={toggleCompleted}
         />
      </div>
   );
}
