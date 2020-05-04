var toDos = [

]

class Todo{
    constructor(task, where, hour){
        this.task = task;
        this.where = where;
        this.hour = hour;
    }
    createItem(){
        let item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = 
        `<p class="name">${this.task}</p>
         <button class="delete">x</button>
         <button class="infos">Description</button>
        `
    }
}

var closeNewTaskListener = function(){
    var newTask = document.getElementsByClassName('new-task')[0]
    var blackScreen = document.getElementsByClassName('back-screen')[0]
    function close(e) {
        if(!newTask.contains(e.target)){
            e.stopPropagation();
            e.preventDefault();
            console.log('fora');
            let opacity = 1;
            function decreaseOpacity(){
                if(opacity > 0){
                    opacity -= 0.1;
                    console.log(opacity);
                    setTimeout(decreaseOpacity, 10);
                    newTask.style.opacity = opacity;
                    blackScreen.style.opacity = opacity/6;
                }else{
                    document.removeEventListener("click", close);
                    document.body.removeChild(newTask);
                    document.body.removeChild(blackScreen);
                }
            }
            decreaseOpacity();
        }
        
    }
    // document.addEventListener('click', close);
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
    var newTask = document.getElementsByClassName('new-task')[0];
    screen.newTask = newTask;
    screen.addEventListener('click',(e) => {
        takeOffElementSmoothly(e.target.newTask);
        takeOffElementSmoothly(e.target);
    });

}

function createTodo(){
    if(document.contains(document.getElementsByClassName('new-task')[0]))
        return

    const elem = document.createElement('div');
    elem.className = "new-task";
    elem.innerHTML = `
    <h2>New activitie</h2>
    <div class="task-input-area">
        <div class="task">
            <label for="input-task-name" required >Task's name</label>
            <input type="text" id="input-task-name">
        </div>
        <div class="task">
            <label for="input-task-where" >Task's location</label>
            <input type="text" id="input-task-where">
        </div>
        <div class="task">
            <label for="input-task-when" >Task's hour</label>
            <input type="text" id="input-task-when">
        </div>
    </div>`
    document.body.appendChild(elem);
    // var opacity = 0;
    // function increaseOpacity(){
    //     if(opacity < 0.90){
    //         opacity += 0.1;
    //         setTimeout(increaseOpacity, 10);
    //     }
    //     elem.style.opacity = opacity
    // };


    increaseOpacity(elem, 0);
    createBackScreen();
    // setTimeout(closeNewTaskListener, 100);
    
}


