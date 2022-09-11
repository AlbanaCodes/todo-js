const searchForm = document.querySelector('.search input');
const addForm = document.querySelector('.add');
const todoList = document.querySelector('.todos');

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
    addForm.reset();
  }
});