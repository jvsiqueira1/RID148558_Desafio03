const taskInput = document.getElementById('taskInput')
const tagInput = document.getElementById('tagInput')
const addButton = document.getElementById('addButton')
const taskList = document.getElementById('taskList')
const stats = document.getElementById('stats')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addTask() {
    const text = taskInput.value.trim()
    const tag = tagInput.value.trim()

    if(text !== '') {
        const task = {
            text: text,
            tag: tag,
            completed: false,
            date: new Date().toLocaleDateString(),
            id: Date.now()
        }

        tasks.push(task)
        saveTasks()

        taskInput.value = ''
        tagInput.value = ''

        showTasks()
    }
}

function showTasks() {
    taskList.innerHTML = ''

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div')
        taskDiv.className = 'task-item'
        if(task.completed) {
            taskDiv.className += ' completed'
        }

        const content = document.createElement('div')
        content.className = 'content'

        const text = document.createElement('span')
        text.textContent = task.text
        content.appendChild(text)

        if(task.tag) {
            const tag = document.createElement('span')
            tag.className = 'tag'
            tag.textContent = task.tag
            content.appendChild(tag)
        }

        const date = document.createElement('span')
        date.className = 'date'
        date.textContent = 'Criado em: ' + task.date
        content.appendChild(date)

        taskDiv.appendChild(content)

        const completeButton = document.createElement('button')
        completeButton.className = task.completed ? 'complete-button completed' : 'complete-button'
        
        const checkMark = `
            <svg class="check-mark ${task.completed ? 'visible' : ''}" viewBox="0 0 24 24" width="24" height="24">
                <path d="M20 6L9 17L4 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `
        
        completeButton.innerHTML = task.completed ? checkMark : 'Concluir'

        completeButton.addEventListener('click', () => {
            toggleTask(index)
        })

        taskDiv.appendChild(completeButton)
        taskList.appendChild(taskDiv)
    })

    updateStats()
}

function toggleTask(index) {
    if (tasks[index]) {
        tasks[index].completed = !tasks[index].completed
        saveTasks()
        showTasks()
    }
}

function deleteTask(index) {
    tasks.splice(index, 1)
    saveTasks()
    showTasks()
}

function updateStats() {
    const completed = tasks.filter(task => task.completed).length
    stats.textContent = `${completed} ${completed === 1 ? 'tarefa concluída' : 'tarefas concluídas'} de ${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'}`
}

addButton.addEventListener('click', addTask)

taskInput.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        addTask()
    }
})

showTasks()