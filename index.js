
const todoInput = document.querySelector(".input");
const addTodoButton = document.querySelector(".button");
const showTodos = document.querySelector(".todos-container");
const themeToggle = document.getElementById("theme-toggle");
let todo;

let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        themeToggle.textContent =
          document.body.classList.contains("dark") ? "☀️" : "🌙"
    );
});


// Creating function to get unique id
function uuid() {
    return "xxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxxxxxx".replace(/[xy]/g, function(param) {
        let number = Math.random() * 16 | 0;
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    })
}


addTodoButton.addEventListener("click", (e) => {
    e.preventDefault();
    todo = todoInput.value.trim();
    if(todo.length > 0) {
        todoList.push({id: uuid(), todo: todo, isCompleted: false});
    }
    sync();
});

function toggleTodo(id) {
  todoList = todoList.map(todo =>
    todo.id === id
      ? { ...todo, isCompleted: !todo.isCompleted }
      : todo
  );
  sync();
}

function deleteTodo(id) {
  todoList = todoList.filter(todo => todo.id !== id);
  sync();
}

function sync() {
  renderTodoList(todoList);
  localStorage.setItem("todo", JSON.stringify(todoList));
}

showTodos.addEventListener("click", (e) => {
  const toggleKey = e.target.dataset.key;
  const deleteKey = e.target.dataset.todokey;

  if (toggleKey) toggleTodo(toggleKey);
  if (deleteKey) deleteTodo(deleteKey);
});



function renderTodoList(todoList) {
    showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) => `<div class="todo-item"><input id="item-${id}" type="checkbox" data-key=${id} ${isCompleted ? 'checked' : ''} /> <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? 'checked-todo' : ''}" data-key=${id}>${todo}</label> <button class="button cursor" data-todokey=${id}>Delete</button></div>`).join("");
    console.log(showTodos.innerHTML);
}

renderTodoList(todoList);