const searchForm = document.querySelector('.search input');
const addForm = document.querySelector('.add');
const todoList = document.querySelector('.todos');
const emptyListText = document.querySelector('.emptyTodo');

console.log(todoList);

const checkTodoListLength = (() => {
  if(todoList.childElementCount === 0){
    emptyListText.classList.remove('hideElement');
  } else {
    emptyListText.classList.add('hideElement');
  }
});

checkTodoListLength();

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
  e.preventDefault();
  const todo = addForm.add.value.trim(); // removes leading and trailing empty spaces
  if(todo.length){
    generateTodoTemplate(todo);
    checkTodoListLength();
    addForm.reset();
  }
});