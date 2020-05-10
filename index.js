var toDos = {};
    
document.addEventListener('DOMContentLoaded', updateRenderedTodos);


// localStorage keeps an object of {todoId:todo}
// Simulate API
{
function getAllTodos(){
    /**
     * Get a Object key=todoID, value=todo
     */
        
    todos = JSON.parse(localStorage.getItem('todos'));
    return todos;
}

function getOneTodo(todoId){
    return JSON.parse(localStorage.getItem('todos'))[todoId];
}

function addTodo(newTodo){
    todos = JSON.parse(localStorage.getItem('todos'));
    if (todos == null)
        todos = {};
    todos[newTodo.id] = newTodo;
    localStorage.setItem('todos', JSON.stringify(todos));
    // updateRenderedTodos();
}

function updateTodo(newTodo){
    // todos = localStorage.getItem('todos');
    // todos[newTodo.id] = newTodo;
    // localStorage.setItem(todo.id)
}


function deleteTodo(todoId){
    todos = JSON.parse(localStorage.getItem('todos'));
    delete todos[todoId];
    localStorage.setItem('todos', JSON.stringify(todos));
    // updateRenderedTodos();
}
}
// end of querys

// Utils
{
function generateRandomNumber(){
    let resp = "";
    for(let i = 0; i < 10; i++){
        resp += String(Math.floor(Math.random()*10));
    }
    return resp;
}
}

class Todo{
    constructor(task, where, hour){
        this.task = task;
        this.where = where;
        this.hour = hour;
        this.id = generateRandomNumber();
    }
}

function openDescription(event){
    target = event.target;
    item = target.closest('.item');
    todos = document.querySelector('#to-dos');
    
    if (item.changing){
        // if the item is opening or closing, the event
        // shouldn't interfere
        return
    }
    if (item.opened){
        item.changing = true;
        decreaseHeight(item, 53);
        item.className = 'item'
        item.opened = false;
    } else {
        if (todos.openedItem){
        
            openedItem = document.getElementById(todos.openedItem);
            if(openedItem.changing){
                return
            }
            decreaseHeight(openedItem, 53);
            openedItem.className = 'item';
            openedItem.opened = false;
        }
        item.changing = true;
        increaseHeight(item, 200);
        item.className = 'item open';
        todos.openedItem = item.id;
        item.opened = true;
    }

}

function createItem(todo){
    let item = document.createElement('div');
    item.addEventListener('click', openDescription);
    item.className = 'item';
    item.innerHTML = 
    `   <p class="name" >${todo.task}</p>
        <button class="delete" onclick="deleteItem(event)" ><i class="fas fa-trash-alt"></i>
        </button>
    `
    item.id = String(todo.id);
    item.style.height = '50px';
    item.style.padding = '3px';
    return item;
}

function deleteItem(event){
    item = event.target;
    parent = event.target.parentElement;
    
    todoId = parent.id;
    parent.removeChild(item);
    deleteTodo(todoId);
    window.location.reload();
}

function renderNewTodo(todo){
    let elem = document.getElementById('to-dos');
    newTodo = createItem(todo);
    elem.appendChild(newTodo);
    addTodo(todo);
}

// sync with database
function updateRenderedTodos(){
    queryTodos = getAllTodos();

    noTodoMessage = document.getElementById('no-items-msg');
    if(Object.entries(queryTodos).length === 0){
        noTodoMessage.style.display = "block";
    } else {
        noTodoMessage.style.display = "none";
    }
    renderedTodos = document.getElementsByClassName('item');
    renderedTodosIds = [];
    for(todo of renderedTodos){
        renderedTodosIds.push(todo.id);
    }
    for (todo in queryTodos){
        if(!(todo in renderedTodosIds)){
            renderNewTodo(queryTodos[todo]);
        }
    }


}

function validateNewTodo(name, where, when){
    if (name != ''){
        return true;
    }
}

function createToDo(event){
    // event.preventDefault();

    let form = document.getElementById("create-todo");
    var name = document.querySelector('#todo-name').value
    var where = document.querySelector('#todo-where').value
    var when = document.querySelector('#todo-when').value

    let valid = true;
    // form.submit();
    // validate inputs
    // if validate(inputs){ create new todo }
    var newTodo = new Todo(name, where, when);
    renderNewTodo(newTodo);
}


// Animations
{
function getHeight(pixel){
    return pixel.replace("px", "");
}

function increaseHeight(elem, limit=370, padding=3){
    let height = Number(getHeight(elem.style.height));
    if(height < limit){
        height += 10;
        // elem.style.padding = padding + "px";
        elem.style.height = height + "px";
        setTimeout(increaseHeight, 10, elem, limit, padding);
    } else {
        elem.opened = true;
        elem.changing = false;
    }
}

function decreaseHeight(elem, limit=0, padding=3){
    let height = getHeight(elem.style.height);
    if(height > limit){
        height -= 10;
        elem.style.height = height + "px";
        setTimeout(decreaseHeight, 10, elem, limit, padding);
    } else {
        elem.opened = false;
        elem.style.padding = padding + "px";
        elem.changing = false;
    }
}

function openDiv(e){
    let elem = document.getElementById("create-todo");
    if(elem.opened){
        decreaseHeight(elem);
    }
    else{
        increaseHeight(elem);
    }
}




function increaseOpacity(elem, opacity, limit=0.9){
    if(opacity < limit){
        opacity += 0.1;
        setTimeout(increaseOpacity, 10, elem, opacity);
    }
    elem.style.opacity = opacity;
}
function decreaseOpacity(elem, opacity, limit=0){
    if(opacity > limit){
        opacity -= 0.1;
        setTimeout(decreaseOpacity, 10, elem, opacity);
        elem.style.opacity = opacity;
    }
    else
        document.body.removeChild(elem)
}

function takeOffElementSmoothly(elem){
    opacity = elem.style.opacity;
    decreaseOpacity(elem, opacity);
    
}

function createBackScreen(){
    let screen = document.createElement('div');
    screen.className = 'back-screen';
    document.body.append(screen);
    var task = document.getElementsByClassName('task-description')[0];
    screen.task = task;
    screen.addEventListener('click',(e) => {
        takeOffElementSmoothly(e.target.task);
        takeOffElementSmoothly(e.target);
    })

}

// function openDescription(){
//     if(document.contains(document.getElementsByClassName('task-description')[0]))
//         return

//     const elem = document.createElement('div');
//     elem.className = "task-description";
//     elem.innerHTML = `
//     <h2>New activitie</h2>
//     <div class="task-input-area">
//         <div class="task">
//             <label for="input-task-name" required >Task's name</label>
//             <input type="text" id="input-task-name">
//         </div>
//         <div class="task">
//             <label for="input-task-where" >Task's location</label>
//             <input type="text" id="input-task-where">
//         </div>
//         <div class="task">
//             <label for="input-task-when" >Task's hour</label>
//             <input type="text" id="input-task-when">
//         </div>
//     </div>`
//     document.body.appendChild(elem);

//     increaseOpacity(elem, 0);
//     createBackScreen();
    
// }

}

//