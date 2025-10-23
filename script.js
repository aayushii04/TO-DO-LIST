const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load tasks on startup
document.addEventListener('DOMContentLoaded', loadTasks);

// Add Task
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  createTaskElement(taskText);
  saveTask(taskText);
  taskInput.value = '';
}

// Create Task UI Element
function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    updateTaskStatus(taskText, checkbox.checked);
  });

  const span = document.createElement('span');
  span.textContent = taskText;
  span.addEventListener('click', () => {
    checkbox.checked = !checkbox.checked;
    li.classList.toggle('completed');
    updateTaskStatus(taskText, checkbox.checked);
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '🗑️';
  delBtn.classList.add('delete-btn');
  delBtn.addEventListener('click', () => {
    li.remove();
    deleteTask(taskText);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save to Local Storage
function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load from Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update task completion in storage
function updateTaskStatus(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task =>
    task.text === taskText ? { ...task, completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from storage
function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}