const localLink = 'http://localhost:3000/';
const sendHeaders = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };

const toDoList = document.querySelectorAll('#todo-list-conatiner ul');
const toDoListDone = document.querySelector('#show-done');
const toDoListTrash = document.querySelectorAll('#todo-list-conatiner .trash');
const addBtn = document.querySelector('#btn-add');
const addTask = document.querySelector('#input-task');

const createUlTaskList = function(element){
    let selectUl = document.getElementById('todo-list');
    let createLi = document.createElement('li');
    let createCbx = document.createElement('input');
    let createLbl = document.createElement('label');
    let createTrsh = document.createElement('span');

    selectUl.appendChild(createLi);
    createLi.setAttribute('class', "todo-list-item");

    createLi.appendChild(createCbx);
    createCbx.setAttribute("title",element.taskDescription);
    createCbx.setAttribute("type","checkbox");
    createCbx.setAttribute("id",element._id);
    createCbx.setAttribute("name","hallo");
    createCbx.setAttribute("class","todo-item-cbx");

    createLi.appendChild(createLbl);
    createLbl.setAttribute("class","todo-list-cbx-label");
    createLbl.setAttribute("for",element.taskDescription);
    createLbl.innerHTML = element.taskDescription;

    createLi.appendChild(createTrsh);
    createTrsh.setAttribute("class","material-symbols-outlined trash");
    createTrsh.innerHTML = "delete"
};

const createUlTaskListDone = function(element){
    let selectUl = document.getElementById('todo-list-done');
    let createLi = document.createElement('li');
    let createCbx = document.createElement('input');
    let createLbl = document.createElement('label');
    let createTrsh = document.createElement('span');

    selectUl.appendChild(createLi);
    createLi.setAttribute('class', "todo-list-item done");

    createLi.appendChild(createCbx);
    createCbx.setAttribute("title",element.taskDescription);
    createCbx.setAttribute("type","checkbox");
    createCbx.setAttribute("id",element._id);
    createCbx.setAttribute("name","hallo");
    createCbx.setAttribute("class","todo-item-cbx");
    createCbx.setAttribute('checked', 'checked')

    createLi.appendChild(createLbl);
    createLbl.setAttribute("class","todo-list-cbx-label");
    createLbl.setAttribute("for",element.taskDescription);
    createLbl.innerHTML = element.taskDescription;

    createLi.appendChild(createTrsh);
    createTrsh.setAttribute("class","material-symbols-outlined trash");
    createTrsh.innerHTML = "delete"
};


let sendTaskObject = function(taskDescription){
    fetch(localLink,{
        method:'POST',
        headers:sendHeaders,
        body: JSON.stringify({
            "taskDescription" : taskDescription,
            "done" : false,
        })
    })
};

addBtn.addEventListener('click', function(inputTask){
    let taskDescription = addTask.value;
    console.log(addTask.value)

    sendTaskObject(taskDescription);
    location.reload();

});

const trashFunction = function(){
    let trashBtn = document.querySelectorAll('#todo-list-conatiner .trash');
    Array.from(trashBtn).forEach(function(trashBtn){
        trashBtn.addEventListener('click', function(event){
            // console.log(event);
            const removeTask = event.target.parentElement;
            console.log(event.target);
            let removeTaskId = event.target.parentElement.firstChild.id;
            console.log(removeTaskId);
            // console.log(removeTask.id);
            removeTask.parentNode.removeChild(removeTask);

            fetch (localLink+removeTaskId,
                {
                    method:'delete',
                    headers: sendHeaders,
                }
            )
            location.reload();
        })
    });
};

const updateTask = function(eventName, eventID, taskValue){
    let taakUpdate = fetch(localLink+eventID,
        {
            method: 'PUT',
            headers: sendHeaders,
            body: JSON.stringify({
                "taskDescription" : eventName,
                "done" : taskValue,
            })
        }
        )
        location.reload();
};

const showListAtStart = async function(){
    try {
        const showAtStart = await fetch(localLink, 
            {
                method:'GET',
                headers: sendHeaders
            }
        )
        .then(response => response.json())
        .then(response => {
            let firstTimeTaskList = Object.values(response);
            firstTimeTaskList.filter(doneTask => doneTask.done == false)
            .map(e1 => e1).forEach(e2 => {
                // console.log(e2);
                createUlTaskList(e2);
                

                let newUlList = document.querySelectorAll('#todo-list-conatiner ul');
                Array.from(newUlList).forEach(function(checkbox){
                    checkbox.addEventListener('click', function(e){
                        if (e.target.className == 'todo-item-cbx'){
                            // console.log(e);
                            const li = e.target.parentElement;
                            let eventName = e.target.title.toString();
                            let eventID = e.target.id;
                            let cbxChecked = document.getElementById(eventID);
                            // console.log(eventName);
                            // console.log(eventID);
                    
                            if(cbxChecked.checked == true){
                                const toDoListItem = e.target.parentElement;
                                toDoListItem.classList.add('done');
                                let taskValue = true;
                                updateTask(eventName, eventID, taskValue);
                            }
                            else{
                                const toDoListItem = e.target.parentElement;
                                toDoListItem.classList.remove('done');
                            };
                        }
                    })
                })
                trashFunction();

            }
            )
        })
    }
    catch (error){
        console.log(error);
    }
};

const showListAtClick = async function(){
    try {
        const showAtStart = await fetch(localLink, 
            {
                method:'GET',
                headers: sendHeaders
            }
        )
        .then(response => response.json())
        .then(response => {
            let firstTimeTaskList = Object.values(response);
            console.log(firstTimeTaskList);
            firstTimeTaskList.filter(doneTask => doneTask.done == true)
            .map(e1 => e1).forEach(e2 => {
                createUlTaskListDone(e2);
                

                let newUlList = document.querySelectorAll('#todo-list-container ul');
                Array.from(newUlList).forEach(function(checkbox){
                    checkbox.addEventListener('click', function(e){
                        if (e.target.className == 'todo-item-cbx'){
                            // console.log(e);
                            const li = e.target.parentElement;
                            let eventName = e.target.title.toString();
                            let eventID = e.target.id;
                            let cbxChecked = document.getElementById(eventID);
                            // console.log(eventName);
                            // console.log(eventID);
                    
                            if(cbxChecked.checked == false){
                                const toDoListItem = e.target.parentElement;
                                toDoListItem.classList.remove('done');
                                let taskValue = false;
                                updateTask(eventName, eventID, taskValue);
                            }
                            else{
                                const toDoListItem = e.target.parentElement;
                                toDoListItem.classList.add('done');
                            };
                        }
                    })
                })
                trashFunction();
            }
            )
        })
    }
    catch (error){
        console.log(error);
    }
};

toDoListDone.addEventListener('click', function(e){
    if (toDoListDone.checked == true){
                showListAtClick();
            }
            else{
                location.reload();
                alert('There are no more done task, complete one first');
            }
});

showListAtStart();