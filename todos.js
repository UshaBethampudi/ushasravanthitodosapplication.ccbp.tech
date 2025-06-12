let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

// Retrieve todo list from localStorage
function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

// Save todo list to localStorage
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    alert("Todos saved successfully!");
};

// Function to add a new todo item
function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value.trim(); // Avoid leading/trailing spaces

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount += 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = ""; // Clear input
}

addTodoButton.onclick = function() {
    onAddTodo();
};

// Function to handle todo status change (checkbox click)
function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
}

// Function to delete a todo item
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    // Remove the deleted todo from the array
    todoList = todoList.filter((eachTodo) => {
        return "todo" + eachTodo.uniqueNo !== todoId;
    });
}

// Function to create and append a new todo element to the list
function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    // Create list item element
    let todoElement = document.createElement("li");
    todoElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    todoElement.id = todoId;

    // Create checkbox
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("mr-3");

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId);
    };

    todoElement.appendChild(inputElement);

    // Create label for the task
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;

    todoElement.appendChild(labelElement);

    // Create delete button
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "ml-3");
    deleteIcon.style.cursor = "pointer";

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    todoElement.appendChild(deleteIcon);

    todoItemsContainer.appendChild(todoElement);
}

// Initial rendering of saved todos
for (let todo of todoList) {
    createAndAppendTodo(todo);
}
