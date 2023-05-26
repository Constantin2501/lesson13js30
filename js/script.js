const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

const toDoData = []
const storageDataJson = localStorage.getItem('storageList')
const storageData = JSON.parse(storageDataJson)


const storageRender = function () {
    storageData.forEach(function(item) {
        toDoData.push(item)
        render()
    })
}

const render = function () {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    toDoData.forEach(function(item) {
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>'

        if(item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function() {
            item.completed = !item.completed
            render()
            localStorage.removeItem('storageList', JSON.stringify(toDoData))
            localStorage.setItem('storageList', JSON.stringify(toDoData))
            
        })

        li.querySelector('.todo-remove').addEventListener('click', function() {
            const itemIndex = toDoData.indexOf(item)
            toDoData.splice(itemIndex, 1)
            render()
            localStorage.removeItem('storageList', JSON.stringify(toDoData))
            localStorage.setItem('storageList', JSON.stringify(toDoData))
        })

        console.log(toDoData);

    })
}

todoControl.addEventListener('submit', function(event) {
    event.preventDefault()

    const newToDo = {
        text: headerInput.value,
        completed: false  
    }

    if(newToDo.text !== '') {
        toDoData.push(newToDo)
    }

    headerInput.value = ''

    render()

    localStorage.setItem('storageList', JSON.stringify(toDoData))
})

storageRender()