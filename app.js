const addtodoBtn = document.getElementById("addTodoBtn");
const todoListUl = document.getElementById("todoList");
const inputTag = document.getElementById("todoInput");
const remaining = document.getElementById("remaining-count")
const clearCompletedBtn = document.getElementById("clearCompletedBtn") 
const btnActive = document.getElementById("btnActive")
const btnCompleted = document.getElementById("btnCompleted")
const btnAll = document.getElementById("btnAll")

let todos = []
let todoText; //this should get to do work when user clicked

let todosString = localStorage.getItem("todos") // if we have todos in the local Storage we are gonna save them
if (todosString) {
    todos = JSON.parse(todosString);
    remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;

}



const populateTodos = () => {
    let string = ""

    for (const todo of todos) {
        string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}"  >
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`

    }
    todoListUl.innerHTML = string;


    // Handles the Checkbox
    const todoCheckboxes = document.querySelectorAll(".todo-checkbox")

    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentNode.classList.add("completed");


                todos = todos.map(todo => {

                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true };
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
            else {
                element.parentNode.classList.remove("completed");
                todos = todos.map(todo => {

                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false };
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
        })
    })

    // Handle the Clear Completed Button
    clearCompletedBtn.addEventListener("click", ()=>{
        todos = todos.filter((todo)=> todo.isCompleted == false)
        populateTodos()
        localStorage.setItem("todos", JSON.stringify(todos))

    })

    // will give Completed Todos
    const getCompletedtodos = (list) =>{
        let string = ""
        for (const todo of list) {
            string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}"  >
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`
        }
        todoListUl.innerHTML = string;
    }
    btnCompleted.addEventListener("click", ()=>{
        let completedtodos = todos.filter(todo=> todo.isCompleted);
        getCompletedtodos(completedtodos);
        localStorage.setItem("todos", JSON.stringify(todos))
    })

    // Will Show the All Todos
    const showAlltodos = () =>{
        let string = ""

    for (const todo of todos) {
        string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}"  >
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`

    }
    todoListUl.innerHTML = string;
    }
    btnAll.addEventListener("click", ()=>{
        showAlltodos()
        localStorage.setItem("todos", JSON.stringify(todos))
    })
    
    
    //will give active todos 
    const getActivetodos = (list)=>{
        let string = ""
        for (const todo of list) {
            string += `<li id="${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}"  >
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`
        }
        todoListUl.innerHTML = string;
    };

    btnActive.addEventListener("click", ()=>{
        let activetodos = todos.filter(todo => !todo.isCompleted);
        getActivetodos(activetodos);
        localStorage.setItem("todos", JSON.stringify(todos))

    })

    // Handle The Delete Button
    let deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {

            const confirmation = confirm("Do you want to Delete this todo")
            if (confirmation) {


                console.log(e.target.parentNode.id)
                todos = todos.filter((todo) => {
                    return (todo.id) !== (e.target.parentNode.id)
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
                populateTodos()
            }

        })
    })

}


addtodoBtn.addEventListener("click", () => {
    todoText = inputTag.value
    if (todoText.trim().length < 4) {
        alert("Todo description is too short. Please enter a more detailed task.")
        return
    }
    inputTag.value = ""

    let todo = {
        id: "todo-" + Date.now(),
        title: todoText,
        isCompleted: false
    }
    todos.push(todo)

    remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos()
})
populateTodos()




