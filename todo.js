const localLink = 'http://localhost:3000/';
const sendHeaders = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
const toDoList = document.querySelectorAll('#todo-list-conatiner .todo-item-cbx');
const toDoListTrash = document.querySelectorAll('#todo-list-conatiner .trash');
const addBtn = document.querySelector('#btn-add');
const addTask = document.querySelector('#input-task');

// console.log(addTask);

const showTaskList = async function(taskDescription){
    let selectUl = document.getElementById('todo-list');
    let createLi = document.createElement('li');
    let createCbx = document.createElement('input');
    let createLbl = document.createElement('label');
    let createTrsh = document.createElement('span');

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

                selectUl.appendChild(createLi);
                createLi.setAttribute('class', "todo-list-item");

                createLi.appendChild(createCbx);
                createCbx.setAttribute("title",element.taskDescription);
                createCbx.setAttribute("type","checkbox");
                createCbx.setAttribute("id",element.taskDescription);
                createCbx.setAttribute("name",element.taskDescription);
                createCbx.setAttribute("class","todo-item-cbx");

                createLi.appendChild(createLbl);
                createLbl.setAttribute("class","todo-list-cbx-label");
                createLbl.setAttribute("for",element.taskDescription);
                createLbl.innerHTML = element.taskDescription;

                createLi.appendChild(createTrsh);
                createTrsh.setAttribute("class","material-symbols-outlined trash");
                createTrsh.innerHTML = "delete"

            })}
        )
    }
    catch (error){
        console.log(error)
    }
}

showTaskList();

let sendTaskObject = function(taskDescription){
    fetch(localLink,{
        method:'POST',
        headers:sendHeaders,
        body: JSON.stringify({
            "taskDescription" : taskDescription,
            "done" : false,
        })
    })
}

addBtn.addEventListener('click', function(inputTask){
    let taskDescription = addTask.value;
    console.log(addTask.value)

    sendTaskObject(taskDescription);
    location.reload();

})

Array.from(toDoListTrash).forEach(function(trashBtn){
    trashBtn.addEventListener('click', function(event){
        console.log(event);
        const removeTask = event.target.parentElement;
        removeTask.parentNode.removeChild(removeTask);
    })
});

Array.from(toDoList).forEach(function(chkBox){
    chkBox.addEventListener('click', function(event){
        let eventName = event.target.title.toString();
        let eventID = event.target.id;
        let cbxChecked = document.getElementById(eventID);

        if(cbxChecked.checked == true){
            const toDoListItem = event.target.parentElement;
            toDoListItem.classList.add('done');
        }
        else{
            const toDoListItem = event.target.parentElement;
            toDoListItem.classList.remove('done');
        };
 
    })
});