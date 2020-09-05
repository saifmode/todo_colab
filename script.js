//TODO: npm calendar on form
let tags = ['shopping', 'finance', 'work', 'education', 'family', 'sports']
let selectedTags = []

const modal = document.querySelector('.modal')
const tagsPanel = document.querySelector('.tags-panel')

tags.forEach(tag => {
  let tagCard = document.createElement('div');
  tagCard.classList.add('tag-card');
  let tagText = document.createTextNode(tag);
  tagCard.appendChild(tagText);
  tagCard.addEventListener('click', (event) => {
    event.target.classList.toggle('selected-tag');
    if (event.target.classList.contains('selected-tag')) {
      selectedTags.push(tag)
    } else {
      selectedTags.splice(selectedTags.indexOf(tag), 1)
    };
  });
  tagsPanel.appendChild(tagCard);
})

// function addTag(event, tag) {
//   let closableTag = document.createElement('div');
//   closableTag.classList.add('closeable-tag');
//   let closableTagText = document.createTextNode(tag);
//   closableTag.appendChild(closableTagText);
//   closableTagCard.addEventListener('click', (event) => close(event, tag));
//   selectedTags.value += tag;
// }


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
  const tags = selectedTags.map(tag => tag);
  document.querySelectorAll('.selected-tag').forEach(tag => tag.classList.remove('selected-tag'));
  selectedTags = []
  
  createTodoItem(newTask, newDescription, date, tags)  
  closeModal()
}

//FACTORY FUNCTION
const TodoItem = (newTask, newDescription, date, tags) => {
  return {
    newTask,
    newDescription,
    date,
    tags,
    addCheck () { 
      console.log(`this is ${newTask} and ${newDescription}`)
    }
  }
}


function createTodoItem(task, description, date, tags) {
  const toDo = TodoItem(task, description, date, tags)
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

  const tags = document.createElement('p')
  tags.textContent = toDo.tags.join(', ')
  tags.classList.add('tags')
  tags.classList.add('tags-text')
  toDoItems.appendChild(tags)
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
