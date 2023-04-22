import React, { useCallback, useState } from "react";

export default function TodoList({
   todos,
   deleteTodo,
   deleteCompleted,
   toggleCompleted,
   setTodos
}) {
   const [isDragging, setIsDragging] = useState(false);
   const [draggingIndex, setDraggingIndex] = useState(null);


   const handleDeleteTodo = useCallback(
      (index) => {
         deleteTodo(index);
      },
      [deleteTodo]
   );

   const handleDeleteCompleted = useCallback(() => {
      deleteCompleted();
   }, [deleteCompleted]);

   const handleToggleCompleted = useCallback(
      (index) => {
         toggleCompleted(index);
      },
      [toggleCompleted]
   );

   const handleDragStart = (event, index) => {
      setIsDragging(true);
      setDraggingIndex(index);
   };

   const handleDragOver = (event, index) => {
      event.preventDefault();
      if (draggingIndex !== null && index !== draggingIndex) {
         const fromIndex = draggingIndex;
         const newTodos = [...todos];
         const [removed] = newTodos.splice(fromIndex, 1);
         newTodos.splice(index, 0, removed);
         setTodos(newTodos); // изменение состояния todos через setTodos
         setDraggingIndex(index);
      }
   };

   const handleDragEnd = () => {
      setIsDragging(false);
      setDraggingIndex(null);
   };
   const handleDeleteDraggedTodo = (event) => {
      event.preventDefault();
      if (draggingIndex !== null) {
         const newTodos = [...todos];
         newTodos.splice(draggingIndex, 1);
         setTodos(newTodos);
         setDraggingIndex(null);
      }
   };
   return (
      <>
         <div>
            <ul className="todo-list">
               {todos.map((todo, index) => (
                  <li
                     key={index}
                     draggable // добавлен атрибут draggable
                     onDragStart={(event) => handleDragStart(event, index)}
                     onDragOver={(event) => handleDragOver(event, index)}
                     onDragEnd={handleDragEnd}
                     className={isDragging && index === draggingIndex ? "dragging" : ""}
                  >
                     <input
                        type="checkbox"
                        className="complete-todo"
                        checked={todo.completed}
                        onChange={() => handleToggleCompleted(index)}
                     />
                     <span
                        style={{
                           textDecoration: todo.completed ? "line-through" : "none",
                        }}
                     >
                        {todo.title}
                     </span>
                     <div className="buttons">
                        <button
                           className="delete-todo"
                           onClick={() => handleDeleteTodo(index)}
                        >
                           Delete
                        </button>
                     </div>
                  </li>
               ))}
            </ul>

            <div className="delete-div">
               <button className="delete-selected" onClick={handleDeleteCompleted}>
                  Delete Completed
               </button>
               <div
                  className="delete-container"
                  onDrop={handleDeleteDraggedTodo}
                  onDragOver={(event) => event.preventDefault()}
               >
                  <img
                     className="delete-icon"
                     src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                     alt="Delete icon"
                  />
               </div>
            </div>
         </div>
      </>
   );
}