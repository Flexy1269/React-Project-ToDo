import { useState, useEffect } from "react";
import './ToDoList.css';

const ToDoList = () => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() === '') {
      alert('Please kindly enter your task.');
      return;
    }

    const newTask = {
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const toggleComplete = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div>
      <input
        id="taskInput"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            addTask();
          }
        }}
      />
      <button id="addTaskButton" onClick={addTask}>
        Add Task
      </button>
      <ul id="taskList">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <button onClick={() => toggleComplete(index)}>Complete</button>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button id="clearButton" onClick={clearTasks}>
        Clear
      </button>
    </div>
  );
};

export default ToDoList;