import React, {useState, useEffect} from "react";
import './App.css';
//importando componentes
import Form from "./components/Form";
import TodoList from "./components/TodoList";


function App() {
    // states, tipo models... ou states do vuex
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //created do vue +- isso
  useEffect(() => {
    getLocalTodos();
  }, []);

  //useEffect é tipo o wacth do Vue :|
  useEffect(() => {

    filterHandler();

    saveLocalStorage();

  }, [todos, status]);

  //funções
  const filterHandler = () => {
    switch (status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos)
    }

  }

  const saveLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Apenas um ToDoList</h1>
      </header>
      
      <Form 
        todos={todos} 
        setTodos={setTodos} 
        inputText={inputText} 
        setInputText={setInputText} 
        setStatus={setStatus}
      />
      <TodoList 
        setTodos={setTodos} 
        todos={todos}
        filteredTodos={filteredTodos}
      />
    
    </div>
  );
}

export default App;
