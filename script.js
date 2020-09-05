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

  createTodoItem(newTask, newDescription)  
  closeModal()
}

//FACTORY FUNCTION
const TodoItem = (newTask, newDescription) => {
  return {
    newTask,
    newDescription,
    addCheck () { 
      console.log(`this is ${newTask} and ${newDescription}`)
    }
  }
}


function createTodoItem(task, description) {
  const toDo = TodoItem(task, description)
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

  const task = document.createElement('p')
  task.textContent = `${toDo.newTask}`
  task.classList.add('task')
  toDoItemTask.appendChild(task)
  toDoItems.appendChild(toDoItemTask)
  toDoItemsContainer.appendChild(toDoItems)

  const description = document.createElement('p')
  description.textContent = `${toDo.newDescription}`
  description.classList.add('description')
  toDoItems.appendChild(description)
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
