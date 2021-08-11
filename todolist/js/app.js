// UI

const form = document.getElementById('task-form');
const taskinput = document.getElementById('task');
const filter = document.getElementById('filter');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');

function addtask(e){
    // console.log("hey");
    if(taskinput.value === ""){
        window.alert("Add a task");
        return;
    }

    // create li element
    const li = document.createElement('li');

    // add class
    // li.classList.add('collection-item');
    li.className = 'collection-item';

    // create text node append to li
    li.appendChild(document.createTextNode(taskinput.value));

    // create link
    const link = document.createElement('a');

    // add class
    link.className = "delete-item secondary-content";

    // add icon
    link.innerHTML = `<i class="far fa-trash-alt"></i>`;
    // console.log(link);

    // append link to li 
    li.appendChild(link);

    // console.log(li);

    // append li to ul
    tasklist.appendChild(li);

    // store in localStorage
    storetaskinlocalstorage(taskinput.value);

    e.preventDefault();
}

// Remove Task
function removetask(e){
    // console.log(e.target);

    if(e.target.parentElement.classList.contains('delete-item')){
        
        if(confirm('Are your sure')){
                    // i
            e.target.parentElement.parentElement.remove();
        }
    }
    
}

// Clear Tasks
function cleartasks(){
    
    //Method 1
    // tasklist.innerHTML="";

    // Method 2
    // let x=0;
    // while(x < tasklist.childElementCount){
    //     tasklist.removeChild(tasklist.firstChild);
    // }

    // Method 3
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
}

//Store Task
function storetaskinlocalstorage(task){
    // console.log(task);

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    console.log(tasks);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Event Listener
// Add Task
form.addEventListener('submit',addtask);

// Remove Task
tasklist.addEventListener('click',removetask);

// Clear Tasks
clearbtn.addEventListener('click',cleartasks);