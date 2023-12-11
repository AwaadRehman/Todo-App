let circleEl = document.querySelectorAll('.circle')
let todosEl = document.querySelector('.todos')
let input = document.querySelector('input')
let numoftodosEl = document.querySelectorAll('.numoftodos')
let spanEls = document.querySelectorAll('.remtask span')
let clearEl = document.querySelectorAll('.clear')
let sun = document.querySelector('.sun')
let moon = document.querySelector('.moon')

let numberOfTodos = 0
let completedTask = 0
let todoarr = []

function creatingTodos(todoInput) {
    let todo = document.createElement('div')
    todo.classList.add('todo')
    todosEl.appendChild(todo)

    let todoWrapper = document.createElement('div')
    todo.appendChild(todoWrapper)
    todoWrapper.classList.add('todoWrapper')

    let circle = document.createElement('div')
    circle.classList.add('circle')
    todoWrapper.appendChild(circle)
    completeingTask(circle)

    let innerCircle = document.createElement('div')
    innerCircle.classList.add('innercircle')
    circle.appendChild(innerCircle)

    let img = new Image()
    img.src = 'build/images/icon-check.svg'
    innerCircle.appendChild(img)

    let p = document.createElement('p')
    p.textContent = todoInput
    todoWrapper.appendChild(p)

    let crDiv = document.createElement('div')
    let crossImg = new Image()
    crossImg.classList.add('crossIcon')
    crossImg.src = 'build/images/icon-cross.svg'
    crDiv.appendChild(crossImg)
    todo.appendChild(crDiv)

    crossImg.addEventListener('click', (e) => {
        let todo = e.target.parentElement.parentElement
        if (todo.className == 'todo') {
            todo.remove()
            numberOfTodos--
            numoftodosEl.forEach(num => num.textContent = numberOfTodos + ' items left')

            let p = todo.children[0]
            removeLocaltodos(p)

        }
    })

    numberOfTodos++
    numoftodosEl.forEach(num => num.textContent = numberOfTodos + ' items left')
    todoarr.push(todo)
    input.value = ''
}


window.addEventListener('keydown', (e) => {
    let inputV = input.value
    if (inputV) {
        if (e.key == 'Enter') {
            creatingTodos(inputV)
            saveLocaltodos(inputV)
        }
    }
})


function saveLocaltodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

window.addEventListener('load', getTodos)

function getTodos() {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(todo => {
        creatingTodos(todo)
    })
}

function completeingTask(param) {

    param.addEventListener('click', () => {
        param.classList.toggle('active')
        let todo = param.parentElement.parentElement

        if (param.classList.contains('active')) {
            todo.classList.add('completed')
            todo.children[1].classList.add('complete')
            removeLocaltodos(todo)
        }
        else {
            todo.classList.remove('completed')
            todo.children[1].classList.remove('complete')

        }

        if (!todo.classList.contains('completed')) {
            numberOfTodos++
            numoftodosEl.forEach(num => num.textContent = numberOfTodos + ' items left')
        } else {
            numberOfTodos--
            numoftodosEl.forEach(num => num.textContent = numberOfTodos + ' items left')
        }
    })
}

function removeLocaltodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[1].innerText
    console.log(todoIndex)
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

circleEl.forEach(circle => {
    circle.addEventListener('click', () => {
        circle.classList.toggle('active')

    })
})

spanEls.forEach(span => {
    span.addEventListener('click', (e) => {

        let span = e.target

        if (span.innerText == 'All') {

            todoarr.forEach(todo => todo.style.display = 'flex')
            spanEls.forEach(spaan => spaan.classList.remove('active'))
            span.classList.add('active')
        }
        else if (span.innerText == 'Active') {

            todoarr.forEach(todo => {
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
            })
            spanEls.forEach(spaan => spaan.classList.remove('active'))
            span.classList.add('active')

        }
        else if (span.innerText == 'Completed') {
            todoarr.forEach(todo => {
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
            })
            spanEls.forEach(spaan => spaan.classList.remove('active'))
            span.classList.add('active')
        }

    })
})
clearEl.forEach(clear => {
    clear.addEventListener('click', () => {
        todoarr.forEach(todo => {
            if (todo.classList.contains('completed')) {
                todo.remove()
            }
        })
    })

})

sun.addEventListener('click', () => {
    moon.classList.add('active')
    sun.classList.remove('active')
    document.body.classList.replace('dark', 'light')
})

moon.addEventListener('click', () => {
    sun.classList.add('active')
    moon.classList.remove('active')
    document.body.classList.replace('light', 'dark')
})