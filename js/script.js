// Define UI Element

let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');

//Define EventListener
 form.addEventListener('submit', addTask);
 taskList.addEventListener('click', removeTask);
 clearBtn.addEventListener('click', clearTask);
 filter.addEventListener('keyup', filterTask);
 document.addEventListener('DOMContentLoaded', getTasks);

// Define functions
// Add Task

function addTask(e) {
    if(taskInput.value === '') {
        alert('Please Add a task!');
    } else {
        // Create li element 
        let li = document.createElement('li');
        let newText = document.createTextNode(taskInput.value + " ");
        li.appendChild(newText);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
        
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
    
}

// Remove Task
function removeTask(e) {
    if(e.target.hasAttribute("href")) {
        if(confirm("Are you sure to delete this task?"));
        let element = e.target.parentElement;
        element.remove();
        //console.log(element);
        removeFromLS(element);
    }
}


// Clear Task function
function clearTask(e) {
  taskList.innerHTML = "";
}

localStorage.clear();



// Filter Task
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    //console.log(text);
    document.querySelectorAll('li').forEach(task =>{
       let item = task.firstChild.textContent;
       if(item.toLocaleLowerCase().indexOf(text)!= -1){
        task.style.display = 'block';
       } else {
        task.style.display = 'none';
       }
    });
}

// Store in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get Tasks
function getTasks () {
    let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(task => {
    let li = document.createElement('li');
    let newText = document.createTextNode(task + " ");
    li.appendChild(newText);
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li)
  })
}

// Remove from Local Storage
function removeFromLS (taskItem) { 
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}
