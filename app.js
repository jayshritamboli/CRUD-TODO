const cl = console.log;

const todoForm = document.getElementById("todoForm");
const todoList  = document.getElementById("todoList");
const todoItemControl = document.getElementById("todoItem");
const addTodoBtn = document.getElementById("addTodoBtn");
const updateTodoBtn = document.getElementById("updateTodoBtn");


let todoArr = [{
    todoItem: 'Javascript',
    todoId: '8831b165-6b8d-4646-b47f-bea2e69f0be3'
  },

  {
    todoItem: 'Angular',
    todoId: 'be298203-08ac-4f50-a24a-c6d28e3e804a'
  },

   { todoItem: 'TypeScript',
    todoId: 'da424bf1-82e8-4e12-b864-1f0642b826c7'
  }]; 

  const uuid = () => {
   return String("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace(/[xy]/g, (character) => {
    const random = (Math.random() * 16) | 0;
    const value = character === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  })                                                    
};

 
  const createLists = (arr) => {
    let result = "";
    arr.forEach((todo) => {
      result += `<li class="list-group-item d-flex justify-content-between" id="${todo.todoId}">
      <strong>${todo.todoItem}</strong>
      <div>
      <i class="fa-solid fa-pen-to-square text-success" onclick="onEdit(this)"></i>
      <i class="fa-solid fa-trash text-danger" onClick="onRemove(this)"></i>
      </div>
      </li> `;
    })
    todoList.innerHTML = result;
  };
  createLists(todoArr);


let EDIT_ID;
const onEdit = (ele) =>{

  EDIT_ID = ele.closest("li").id;
  cl(EDIT_ID);

  let EDIT_OBJ = todoArr.find(todo =>{
    return todo.todoId === EDIT_ID;
  })
  cl(EDIT_OBJ);

  todoItemControl.value = EDIT_OBJ.todoItem

  updateTodoBtn.classList.remove("d-none")
  addTodoBtn.classList.add("d-none");

}

const onRemove = (ele) => {
  let getConfirm = confirm("ARE YOU SURE TO REMOVE DATA ?");
  cl(getConfirm);
  if(getConfirm === true){
     cl(ele);
    let removeId = ele.closest("li").id
    cl(removeId);
    let getIndex = todoArr.findIndex(todo => {
      return todo.todoId === removeId;
    })
    cl(getIndex)
    todoArr.splice(getIndex, 1)
    ele.closest("li").remove();
  }
};
    


const onTodoSubmit = (eve) =>{
  eve.preventDefault();
  
  let todoObj = {
    todoItem : todoItemControl.value,
     todoId: uuid()
  }
  cl(todoObj);
  todoForm.reset();
  todoArr.push(todoObj);
  cl(todoArr);
  createLists(todoArr);
}


const onTodoUpdate = () => {
  let updateId = EDIT_ID;
  cl(updateId)
  let updatedObj = {
    todoItem: todoItemControl.value,
    todoId : updateId
  }
  
  cl(updatedObj);
  todoForm.reset();
  
  let getIndex = todoArr.findIndex(todo =>{
    return todo.todoId === updateId
  })
  cl(getIndex);

todoArr[getIndex] = updatedObj;

let li = document.getElementById(updateId);
 cl(li.firstElementChild); 
li.firstElementChild.textContent = updatedObj.todoItem
updateTodoBtn.classList.add("d-none");
addTodoBtn.classList.remove("d-none");
}



todoForm.addEventListener("submit", onTodoSubmit);
updateTodoBtn.addEventListener("click", onTodoUpdate);