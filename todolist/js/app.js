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

    taskinput.value = '';
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

    //Remove task from localStorage
    removetaskfromlocalstorage(e.target.parentElement.parentElement);
    
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

    //Clear all data from localstorage
    cleartasksfromlocalstorage();
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

// Get tasks from localStorage
function gettasks(){
    // console.log("hay");

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = []
    }
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{
        // console.log(task);
        
        // create li element
        const li = document.createElement('li');

        // add class
        li.className = "collection-item";

        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');
        // add class
        link.className = "delete-item secondary-content";
        //add icon
        link.innerHTML =  `<i class="far fa-trash-alt"></i>`;
        // append link into li
        li.appendChild(link);

        // append li into ul
        tasklist.appendChild(li);

    });
}

//Remove task from localStorage
function removetaskfromlocalstorage(taskitem){
    // console.log("hey");
    // console.log(taskitem);

    let tasks;
    if(localStorage.getItem('tasks' === null)){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task,index)=>{

        if(taskitem.textContent === task){
             tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear All Data form localStorage
function cleartasksfromlocalstorage(){
    localStorage.clear();
}

function filtertasks(e){
    // console.log('hay');
    // console.log(e.target);

    const inputfilter = e.target.value.toLowerCase();
    // console.log(inputfilter);

    const tasks = document.querySelectorAll('.collection-item');
    // console.log(tasks);

    tasks.forEach((task)=>{
        //console.log(task);
        const item = task.firstChild.textContent.toLowerCase();
        // console.log(item);

        if(item.indexOf(inputfilter) !== -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    });
}

// Event Listener
// Add Task
form.addEventListener('submit',addtask);

// Remove Task
tasklist.addEventListener('click',removetask);

// Clear Tasks
clearbtn.addEventListener('click',cleartasks);

// DOM Load Event
document.addEventListener('DOMContentLoaded',gettasks);

// Filter task event
filter.addEventListener('keyup',filtertasks);