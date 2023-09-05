export const createToDo = (toDoInput, todos) => {
    const title = toDoInput.value;
    toDoInput.value = '';

    const dateValue = new Date();

    if (!title) return

    const todo = {
        title,
        date: dateValue.toLocaleDateString(),
        checked: false,
        id: Date.now()
    }
    todos.push(todo)
    return todo
}