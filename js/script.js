const addBtn = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoBody = document.getElementById("todoBody");
const deleteAllBtn = document.getElementById("delete-all-btn");
const filterBtn = document.getElementById("filter-btn");
const errorText = document.getElementById("error-message");

// === Original logic (kept) ===
let taskDb = [];
function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskDate = document.getElementById('date-input');

  if (validateInput(taskInput.value, taskDate.value)) {
    const newTask = {
      task: taskInput.value,
      date: taskDate.value,
    };
    taskDb.push(newTask);
    renderTasks();
  }
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  if (!taskList) return;
  taskList.innerHTML = '';

  taskDb.forEach((taskObj, index) => {
    taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.date}</li>`;
  });
}

function deleteAllTask() {
  taskDb = [];
  renderTasks();
}

function filterTasks() {}

function validateInput(task, date) {
  if (task.trim() === '' || date.trim() === '') {
    alert('Please enter both task and due date.');
    return false;
  } else {
    return true;
  }
}

// === Functional logic for table ===
let todos = [];
let filterMode = "all";

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    errorText.textContent = "Please fill in both fields!";
    return;
  }

  errorText.textContent = "";
  const newTodo = { id: Date.now(), task, date, status: "Pending" };
  todos.push(newTodo);

  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
});

function renderTodos() {
  todoBody.innerHTML = "";

  let filtered = todos;
  if (filterMode === "today") {
    const today = new Date().toISOString().split("T")[0];
    filtered = todos.filter((t) => t.date === today);
  }

  if (filtered.length === 0) {
    todoBody.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  filtered.forEach((todo) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.status}</td>
      <td>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
      </td>
    `;
    todoBody.appendChild(row);
  });
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

deleteAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos();
});

filterBtn.addEventListener("click", () => {
  filterMode = filterMode === "all" ? "today" : "all";
  filterBtn.textContent = filterMode === "all" ? "FILTER" : "SHOW ALL";
  renderTodos();
});

// === Press Enter to add ===
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

dateInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});
