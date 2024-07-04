import { Component } from 'react';
import { v4 } from 'uuid';
import './index.css';
import TaskList from '../TaskList';

class TaskInput extends Component {
  state = { todosList: [], text: '', editId: null, editText: '' };

  componentDidMount() {
    const savedTodos = JSON.parse(localStorage.getItem('todosList'));
    if (savedTodos) {
      this.setState({ todosList: savedTodos });
    }
  }

  onChangeTextinput = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  onEditTodo = (id) => {
    const { todosList } = this.state;
    const todoToEdit = todosList.find((todo) => todo.id === id);
    if (todoToEdit) {
      this.setState({
        editId: id,
        editText: todoToEdit.text,
      });
    }
  };

  onSaveEdit = () => {
    const { todosList, editId, editText } = this.state;
    const updatedTodoList = todosList.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editText };
      }
      return todo;
    });
    this.setState({
      todosList: updatedTodoList,
      editId: null,
      editText: '',
    });
  };

  onDeleteItem = (id) => {
    this.setState((prevState) => ({
      todosList: prevState.todosList.filter((todo) => todo.id !== id),
    }));
  };

  handleToggle = (id) => {
    this.setState((prevState) => ({
      todosList: prevState.todosList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  addTodoItem = () => {
    const { text } = this.state;
    const newTodo = {
      id: v4(),
      text,
      completed: false,
    };
    this.setState({
      todosList: [...this.state.todosList, newTodo],
      text: '',
    });
  };

  handleEditChange = (event) => {
    this.setState({
      editText: event.target.value,
    });
  };

  saveTodos = () => {
    const { todosList } = this.state;
    localStorage.setItem('todosList', JSON.stringify(todosList));
    alert('Todos saved successfully!');
  };

  render() {
    const { todosList, editId, editText } = this.state;
    return (
      <div className="bg-container">
        <h1 className="todos-heading">Todos</h1>
        <h1 className="create-task-heading">
          Create <span className="create-task-heading-subpart">Task</span>
        </h1>
        <input
          type="text"
          id="todoUserInput"
          className="todo-user-input"
          placeholder="What needs to be done?"
          value={this.state.text}
          onChange={this.onChangeTextinput}
        />
        <button className="button" onClick={this.addTodoItem}>
          Add
        </button>
        <h1 className="todo-items-heading">
          My <span className="todo-items-heading-subpart">Tasks</span>
        </h1>
        <ul className="todo-list">
          {todosList.map((eachItem) => (
            <TaskList
              key={eachItem.id}
              taskItem={eachItem}
              onDeleteItem={this.onDeleteItem}
              onEditTodo={this.onEditTodo}
              onSaveEdit={this.onSaveEdit}
              editId={editId}
              editText={editText}
              handleEditChange={this.handleEditChange}
              handleToggle={this.handleToggle}
            />
          ))}
        </ul>
        <button className="button save-button" onClick={this.saveTodos}>
          Save Todos
        </button>
      </div>
    );
  }
}

export default TaskInput;
