import React, { useState } from 'react';
import './App.css'


// create component Todo
// dont forget {} for arguements in component  
// destructuring taking todo and index
// adding ompleteTodo, removeTodo 
function Todo( {todo, index, completeTodo, removeTodo} ) {
  return (
    <div style={{textDecoration: todo.isCompleted ? 'Line-through' : ''}} 
    className="todo">
      { todo.text }
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  )
}


// create TodoForm coponent
// dont forget {} for property in component 
function TodoForm( {addTodo} ) {
  const [value, setValue] = useState('');

  // every handleSubmit -> preventDefault() first
  // const handleSubmit = e => { e.preventDefault(); }
  const handleSubmit = e => {
    e.preventDefault();

    if(!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      className="input" 
      value={value}
      placeholder="Add Todo..."
      onChange={e => setValue(e.target.value)} 
      />
    </form>
  )
}



function App() {
  const [ todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Met friend for lunch',
      isCompleted: false
    },
    {
      text: 'Build todo app',
      isCompleted: false
    },
  ]);


  // add take in text, to original todos, and then setTodos to update input text
  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  }


  // create completeTodo function 
  // taking index to know exactly which one while mapping 
  // pass in Todo as a prop 
  const completeTodo = index => {
    const newTodos = [...todos];
    // set isCompleted to true 
    newTodos[index].isCompleted = true;
    // use setTodos to update state
    setTodos(newTodos);
  };


  // create removeTodo function
  const removeTodo = index => {
    const newTodos = [...todos];        // handle state 
    newTodos.splice(index, 1);          // action you need to do, add, delete 
    setTodos(newTodos);                 // setState 
  }



  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo 
            key={index} 
            index={index} 
            todo={todo} 
            completeTodo={completeTodo} 
            removeTodo={removeTodo}/>
        ))}
        <TodoForm addTodo={addTodo}/>
      </div>
    </div>
  )


}

export default App;
