//TODO: npm calendar on form

//OPEN AND CLOSE FORM
const modal = document.querySelector('.modal')


const addBtn = document.querySelector('.add-btn')
addBtn.addEventListener('click', displayModal)
function displayModal(e) {
    modal.style.display = 'block'
  }


const closeBtn = document.querySelector('.close-btn')  
closeBtn.addEventListener('click', closeModal)
function closeModal(e) {
    modal.style.display = 'none'
}


//SUBMIT FORM
let form = document.getElementById('add-form')
form.addEventListener('submit', submitItem)

function submitItem(e) {
  e.preventDefault();
  let newTask = document.getElementById('task').value; //task input
  let newDescription = document.getElementById('description').value
  const date = new Date()

  createTodoItem(newTask, newDescription, date)  
  closeModal()
}

//FACTORY FUNCTION
const TodoItem = (newTask, newDescription, date) => {
  return {
    newTask,
    newDescription,
    date,
    addCheck () { 
      console.log(`this is ${newTask} and ${newDescription}`)
    }
  }
}


function createTodoItem(task, description, date) {
  const toDo = TodoItem(task, description, date)
  renderToDo(toDo)
}


function renderToDo(toDo) {
  let toDoItemsContainer = document.querySelector('.todo-items-container')
  
  let toDoItems = document.createElement('div')
  toDoItems.classList.add('todo-items')

  let toDoItemTask = document.createElement('div')
  toDoItemTask.classList.add('todo-item-task')

  let toDoItemDescription = document.createElement('div')
  toDoItemDescription.classList.add('todo-item-description')

  let toDoItemDate = document.createElement('div')
  toDoItemDate.classList.add('todo-item-date')

  const task = document.createElement('p')
  task.textContent = `${toDo.newTask}`
  task.classList.add('task')
  task.classList.add('task-text')
  toDoItemTask.appendChild(task)
  toDoItems.appendChild(toDoItemTask)
  toDoItemsContainer.appendChild(toDoItems)

  const description = document.createElement('p')
  description.textContent = `${toDo.newDescription}`
  description.classList.add('description')
  description.classList.add('description-text')
  toDoItems.appendChild(description)
  toDoItemsContainer.appendChild(toDoItems)

  const date = document.createElement('p')
  date.textContent = toDo.date.toString().split(' ').slice(0, 5).join(' ')
  date.classList.add('date')
  date.classList.add('date-text')
  toDoItems.appendChild(date)
  toDoItemsContainer.appendChild(toDoItems)

  renderDeleteButton(toDoItemsContainer, toDoItems)
 
  renderCheckButton(toDoItems, task)
}


function renderDeleteButton(toDoItemsContainer, toDoItems) {
  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('delete-button')
  deleteBtn.textContent = 'Delete Task'
  toDoItems.appendChild(deleteBtn)

  deleteBtn.addEventListener('click', (event) => deleteToDoItems(event, toDoItemsContainer))
}

function deleteToDoItems(e, toDoItemsContainer){
  console.log('delete')
  toDoItems = e.target.parentElement;
  toDoItemsContainer.removeChild(toDoItems);
}


function renderCheckButton(toDoItems, task) {
  const checkBtn = document.createElement('button')
  checkBtn.classList.add('check-button')
  checkBtn.textContent = 'Done'
  toDoItems.appendChild(checkBtn)
// can this function be moved??
  checkBtn.addEventListener('click', (event) => addLineThroughTask(event, task))
}

function addLineThroughTask(e, task){
  console.log('checked')
  task.classList.add('checked')
}
