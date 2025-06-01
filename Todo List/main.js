const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');

let TodolistItems = JSON.parse(localStorage.getItem('todoListItems')) || [];

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    const todoItem = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    TodolistItems.push(todoItem);
    localStorage.setItem('todoListItems', JSON.stringify(TodolistItems));

    todoInput.value = '';
    renderTodoList();
})

function renderTodoList() {
    todoList.innerHTML = '';

    TodolistItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.text;
        li.className = item.completed ? 'completed' : '';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            removeTodoItem(item.id);
        });

        todoCount.textContent = `Total Todos: ${TodolistItems.length}`;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = item.completed ? 'Undo' : 'Complete';
        toggleBtn.addEventListener('click', () => {
            toggleTodoItem(item.id);
        });

        li.appendChild(deleteBtn);
        li.appendChild(toggleBtn);

        todoList.appendChild(li);
    });
}

function removeTodoItem(id) {
    TodolistItems = TodolistItems.filter(item => item.id !== id);

    todoCount.textContent = `Total Todos: ${TodolistItems.length}`;
    localStorage.setItem('todoListItems', JSON.stringify(TodolistItems));
    renderTodoList();
}


function toggleTodoItem(id) {
    const item = TodolistItems.find(item => item.id === id);
    if (item) {
        item.completed = !item.completed;
        localStorage.setItem('todoListItems', JSON.stringify(TodolistItems));
        renderTodoList();
    }
}

renderTodoList();