export const updateLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))

}

export const updateCounter = (complCounter, allCounter, completeTodos, todos) => {
    complCounter.innerText = `Complete: ${completeTodos.length}`
    allCounter.innerText = `All: ${todos.length}`
}

export const deleteToDo = (todoNode, todos) => {
    const todoId = todoNode.dataset.todoid
    todos = [...todos].filter(todo => +todo.id !== +todoId)
}

export const completeTodo = (todoNode, todos) => {
    todoNode.classList.toggle('completed');
    const todoId = todoNode.dataset.todoid
    todos.forEach(todo => {
        if (+todo.id === +todoId) {
            todo.checked = !todo.checked
        }
    })
}