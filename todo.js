const localLink = 'http://localhost:3000/';
const toDoList = document.querySelectorAll('#todo-list-conatiner .todo-item-cbx');
const toDoListTrash = document.querySelectorAll('#todo-list-conatiner .trash');
const addBtn = document.querySelector('#btn-add');
const addTask = document.querySelector('#input-task');

console.log(addTask);
// let addTaskText = addTask.value();

addBtn.addEventListener('click', function(inputTask){
    let taskValue = addTask.value;
    // console.log(addTask.value)
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