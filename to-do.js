import { updateCounter, updateLocalStorage, deleteToDo, completeTodo } from "./helpers.js"
import { createToDo } from "./createToDo.js"
import { renderToDo } from "./render-todo.js"

const root = document.getElementById('root')


// Create structure

const mainWrapper = document.createElement('div')
const deleteAllBtn = document.createElement('button')
const deleteLastBtn = document.createElement('button')
const addToDoBtn = document.createElement('button')
const showAllBtn = document.createElement('button')
const showComplBtn = document.createElement('button')
const toDoContainer = document.createElement('div')
const toDoInput = document.createElement('input')
const searchInput = document.createElement('input')
const headerMainWrapper = document.createElement('div')
const footerMainWrapper = document.createElement('div')
const allCounter = document.createElement('div')
const complCounter = document.createElement('div')

let completeTodos = document.getElementsByClassName('completed')
let filteredToDo = [];
let todos = JSON.parse(localStorage.getItem('todos')) || [];
updateCounter(complCounter, allCounter, completeTodos, todos);


root.classList.add('root')
mainWrapper.classList.add('main-wrapper')
deleteAllBtn.classList.add('delete-all-btn')
deleteLastBtn.classList.add('delete-last-btn')
addToDoBtn.classList.add('add-to-do-btn')
showAllBtn.classList.add('show-all-btn')
showComplBtn.classList.add('show-compl-btn')
allCounter.classList.add('all-counter')
complCounter.classList.add('compl-counter')
toDoInput.setAttribute('placeholder', 'Enter todo...')
searchInput.setAttribute('placeholder', 'Search...')
toDoInput.classList.add('to-do-input')
searchInput.classList.add('search-input')
headerMainWrapper.classList.add('header-main-wrapper')
footerMainWrapper.classList.add('footer-main-wrapper')
deleteAllBtn.innerText = 'Delete All'
deleteLastBtn.innerText = 'Delelte Last'
addToDoBtn.innerText = 'Add'
showAllBtn.innerText = 'Show All'
showComplBtn.innerText = 'Show Completed'

// Add ToDo Button Listeners

const toDoListeners = (wrap) => {
    wrap.addEventListener('click', (event) => {
        if (event.target.dataset.name === 'delete-btn') {
            event.currentTarget.remove();
            deleteToDo(wrap, todos)
            updateLocalStorage(todos);
            updateCounter(complCounter, allCounter, completeTodos, todos);
        }

        if (event.target.type === 'checkbox') {
            completeTodo(wrap, todos)
            updateLocalStorage(todos);
            updateCounter(complCounter, allCounter, completeTodos, todos);
        }
    })
}

// Creating and add todo

const handleToDo = () => {
    const todo = createToDo(toDoInput, todos);

    if (!todo) return null;

    const todoRender = renderToDo(todo, toDoContainer);
    toDoListeners(todoRender);
    updateLocalStorage(todos);
    updateCounter(complCounter, allCounter, completeTodos, todos);
}

//Filter Todos

const filterTodos = (value) => {
    filteredToDo = [...todos].filter(elem => {
        return elem.title.includes(value)
    })
}

const handleFilterTodos = (event) => {
    filterTodos(event.target.value)
    toDoContainer.innerHTML = ''

    for (const todo of filteredToDo) {
        const todoRender = renderToDo(todo, toDoContainer);
        toDoListeners(todoRender);
    }
}

// Drawing Todos

for (const todo of todos) {
    const todoRender = renderToDo(todo, toDoContainer);
    toDoListeners(todoRender);
}


// Show all, Show completed,Add toDo, Search,Delete last, Delete all buttons

showAllBtn.addEventListener('click', () => {
    toDoContainer.innerHTML = ''
    for (let todo of todos) {
        const todoRender = renderToDo(todo, toDoContainer);
        toDoListeners(todoRender);
    }
})

showComplBtn.addEventListener('click', () => {
    toDoContainer.innerHTML = ''
    for (let todo of todos) {
        if (todo.checked) {
            const todoRender = renderToDo(todo, toDoContainer);
            toDoListeners(todoRender);
            updateLocalStorage(todos);
            updateCounter(complCounter, allCounter, completeTodos, todos);
        }
    }
})

addToDoBtn.addEventListener('click', handleToDo);

searchInput.addEventListener('input', handleFilterTodos)

deleteLastBtn.addEventListener('click', () => {
    todos.pop()
    updateLocalStorage(todos);
    updateCounter(complCounter, allCounter, completeTodos, todos);
    toDoContainer.innerHTML = '';
    for (const todo of todos) {
        const todoRender = renderToDo(todo, toDoContainer);
        toDoListeners(todoRender);
    }
})

deleteAllBtn.addEventListener('click', () => {
    toDoContainer.innerHTML = '';
    todos = []
    updateLocalStorage(todos);
    updateCounter(complCounter, allCounter, completeTodos, todos);

})

// Structure build

footerMainWrapper.append(allCounter)
footerMainWrapper.append(complCounter)
footerMainWrapper.append(showAllBtn)
footerMainWrapper.append(showComplBtn)
footerMainWrapper.append(searchInput)

headerMainWrapper.append(deleteAllBtn)
headerMainWrapper.append(deleteLastBtn)
headerMainWrapper.append(toDoInput)
headerMainWrapper.append(addToDoBtn)

mainWrapper.append(headerMainWrapper)
mainWrapper.append(footerMainWrapper)

root.append(mainWrapper)
root.append(toDoContainer)

