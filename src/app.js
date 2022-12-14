const searchFormInput = document.querySelector('.search input');
const addForm = document.querySelector('.add');
const todoList = document.querySelector('.todos');
const emptyListText = document.querySelector('.emptyTodo');
const searchForm = document.querySelector('.search');

const checkLocalStorage = (() => {
  if(localStorage.length !== 0){
    for(i=1; i <= localStorage.length; i++){
      const htmlTemplate = `
        <li class="list-group-item d-flex justify-content-between align-items-center" data-liId=${i}>
          <span>${localStorage.getItem(i)}</span>
          <i class="bi bi-x-octagon delete"></i>
        </li>
        `;
      todoList.innerHTML += htmlTemplate;
    }
  }
});
checkLocalStorage();

const checkTodoListLength = (() => {
  if(todoList.childElementCount === 0){
    emptyListText.classList.remove('hideElement');    
  } else {
    emptyListText.classList.add('hideElement');
  }
});
checkTodoListLength();

// insert todo
const generateTodoTemplate = (todo) => {
  const liSize = document.getElementById('todoList').getElementsByTagName('li').length + 1;
  localStorage.setItem(liSize, todo);

  const htmlTemplate = `
  <li class="list-group-item d-flex justify-content-between align-items-center" data-liId=${liSize}>
    <span>${todo}</span>
    <i class="bi bi-x-octagon delete"></i>
  </li>
  `;
  todoList.innerHTML += htmlTemplate;
};

addForm.addEventListener('submit', e => {
  e.preventDefault();
  const todo = addForm.add.value.trim(); // removes leading and trailing empty spaces
  if(todo.length){
    generateTodoTemplate(todo);
    checkTodoListLength();
    addForm.reset();
  }
});

// delete todo
todoList.addEventListener('click', e => {  
  if(e.target.classList.contains('delete')){
    const liid = parseInt(e.target.parentElement.dataset.liid);
    e.target.parentElement.remove(); // e.target is the <i> and parentElement is the <li> in which the <i> is inside
    localStorage.removeItem(liid);
    checkTodoListLength();
  }
});

// search and filter todos
const filterTodos = (searchTerm) => {
  // hide todos that don't match with the term
  Array.from(todoList.children)
    .filter((todo) => {
      // return the todos that don't match, to add the "hide" class in the forEach
      return !todo.textContent.toLowerCase().includes(searchTerm);
    })
    .forEach((todo) => {
      todo.classList.add('hideElement');
    });

  // find the todos that match with the search term and remove the "hide" class, so that it becomes visible
  Array.from(todoList.children)
    .filter((todo) => {
      return todo.textContent.toLowerCase().includes(searchTerm);
    })
    .forEach((todo) => {
      todo.classList.remove('hideElement');
    });
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();
});

searchForm.addEventListener('focusout', e => {
  Array.from(todoList.children).forEach((todo) => todo.classList.remove('hideElement'));
  searchForm.reset();
});

searchFormInput.addEventListener('keyup', (e) => {
  const searchTerm = searchFormInput.value.trim().toLowerCase();
  filterTodos(searchTerm);
});