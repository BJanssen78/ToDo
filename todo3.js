const localLink = 'http://localhost:3000/';
const sendHeaders = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };

const toDoList = document.querySelectorAll('#todo-list-conatiner ul');
const toDoListTrash = document.querySelectorAll('#todo-list-conatiner .trash');
const addBtn = document.querySelector('#btn-add');
const addTask = document.querySelector('#input-task');

const createEventToList = function(){
    console.log(toDoList);

    toDoList.addEventListener('click', function(e){
        if (e.target.className == 'todo-item-cbx'){
            const li = e.target.parentElement;
            let eventName = e.target.title.toString();
            let eventID = e.target.id;
            let cbxChecked = document.getElementById(eventID);

            if(cbxChecked.checked == true){
                const toDoListItem = e.target.parentElement;
                toDoListItem.classList.add('done');
            }
            else{
                const toDoListItem = e.target.parentElement;
                toDoListItem.classList.remove('done');
            };
        }
    })
};

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
    createCbx.setAttribute("id",element.taskDescription);
    createCbx.setAttribute("name","hallo");
    createCbx.setAttribute("class","todo-item-cbx");

    createLi.appendChild(createLbl);
    createLbl.setAttribute("class","todo-list-cbx-label");
    createLbl.setAttribute("for",element.taskDescription);
    createLbl.innerHTML = element.taskDescription;

    createLi.appendChild(createTrsh);
    createTrsh.setAttribute("class","material-symbols-outlined trash");
    createTrsh.innerHTML = "delete"
    
    // createEventToList();
};

const showTaskList = async function(){

    try {    
        const showListFirstTime = await fetch(localLink,
            {
                method:'GET',
                headers: sendHeaders
            }
        )
        .then(response => response.json())
        .then(response => {
            // console.log(JSON.stringify(response))
            let showUlTaksList = Object.values(response);

            showUlTaksList.map(element => element)
            .forEach(element => {
                console.log(element);
                createUlTaskList(element);
                // createEventToList();      
            })}
        )
    }
    catch (error){
        console.log(error)
    }
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



showTaskList();
createEventToList();