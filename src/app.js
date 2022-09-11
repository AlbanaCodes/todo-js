const searchFormInput = document.querySelector('.search input');
const addForm = document.querySelector('.add');
const todoList = document.querySelector('.todos');
const emptyListText = document.querySelector('.emptyTodo');
const searchForm = document.querySelector('.search');

console.log(todoList);

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
  const htmlTemplate = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="bi bi-x-octagon delete"></i>
  </li>
  `;
  todoList.innerHTML += htmlTemplate;
};

addForm.addEventListener('submit', e => {
  console.log('submit1');
  console.log('addForm: ', addForm);
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
    e.target.parentElement.remove(); // e.target is the <i> and parentElement is the <li> in which the <i> is inside
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
    })
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