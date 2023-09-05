export const renderToDo = (todo, toDoContainer) => {
    const wrapper = document.createElement('div')
    const checkbox = document.createElement('input')
    const toDoTitle = document.createElement('p')
    const detailsWrapper = document.createElement('div')
    const cross = document.createElement('div')
    const date = document.createElement('p')

    checkbox.classList.add('checkbox')
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.checked;

    if (todo.checked) {
        wrapper.classList.add('completed');
    }

    cross.innerText = 'X';
    cross.setAttribute('data-name', 'delete-btn')
    cross.classList.add('cross')

    toDoTitle.classList.add('to-do-Title')
    toDoTitle.innerText = todo.title;

    date.innerText = todo.date;
    detailsWrapper.append(cross, date)
    detailsWrapper.classList.add('details-Wrapper')

    wrapper.classList.add('to-do-Wrapper')
    wrapper.setAttribute('data-todoId', todo.id)

    wrapper.append(checkbox)
    wrapper.append(toDoTitle)
    wrapper.append(detailsWrapper)

    toDoContainer.append(wrapper)

    return wrapper
}