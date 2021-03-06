import { project } from "./project";
import { task } from "./task";
import { format, compareAsc, isToday, isThisWeek, parseISO,toDate } from 'date-fns'

const requiredFieldAdd = (field) => {
    field.classList.add('requiredField');
}

const requiredFieldRemove = (field) => {
    field.classList.remove('requiredField');
}

const setEditTaskForm = (uuid, projectList) => {
    const titleInputEdit = document.querySelector('#titleInputEdit');
    const descriptionInputEdit = document.querySelector('#descriptionInputEdit');
    const taskDueDateEdit = document.querySelector('#taskDueDateEdit');
    const taskPriorityEdit = document.querySelector('#taskPriorityEdit');
    const taskProjectEdit = document.querySelector('#taskProjectEdit');
    projectList.forEach((projectObject)=>{
        projectObject.getTasks().forEach((item)=>{
            if (item.getUUID()===uuid){
                console.log('found '+uuid);
                titleInputEdit.defaultValue = item.getTitle();
                descriptionInputEdit.defaultValue = item.getDescription();
                taskDueDateEdit.defaultValue = format(new Date(item.getDate()),'yyyy-MM-dd');
                taskPriorityEdit.defaultValue = item.getPriority();
                taskProjectEdit.defaultValue = item.getProject();
            }
        });
    });
}

const openEditTaskForm = () => {
    document.getElementById('formContainerEdit').classList.remove('hideContent');
}

const closeEditTaskForm = () => {
    document.getElementById('formContainerEdit').classList.add('hideContent');
}

const openTaskForm = () => {
    document.getElementById('formContainer').classList.remove('hideContent');
    document.getElementById('formPopup').reset();
}

const closeTaskForm = () => {
    document.getElementById('formContainer').classList.add('hideContent');
}

const openProjectForm = () => {
    // open form, hide 'add project' button
    document.getElementById('projectPopupContainer').classList.remove('hideContent');
    document.getElementById('newProject').classList.add('hideContent');
    document.getElementById('projectInputName').value='';
}

const closeProjectForm = () => {
    document.getElementById('projectPopupContainer').classList.add('hideContent');
    document.getElementById('newProject').classList.remove('hideContent');
}

const addProjectDom = (projectName) => {
    // creates a button with li tag wrapped around it, appends to 'projectList' node
    const projectList = document.getElementById('projectList');
    if (projectName=='Inbox'){
        projectList.innerHTML += `<li><button class='btnProject'>
                                    <div class='projectLeftSide'>
                                        <i class='material-icons'>assignment</i>
                                        <span class='projectName'>${projectName}</span>
                                    </div>
                                </button></li>`
    } else{
    projectList.innerHTML += `<li><button class='btnProject'>
                                    <div class='projectLeftSide'>
                                        <i class='material-icons'>assignment</i>
                                        <span class='projectName'>${projectName}</span>
                                    </div>
                                    <i class='material-icons' id='projectDelete'>delete</i>
                                </button></li>`
    }
    // add left right side, delete button
}

const clearProjectDropdown = () => {
    const taskProject = document.querySelector('.taskProject');
    while (taskProject.lastChild){
        taskProject.removeChild(taskProject.lastChild);
    }
    const taskProjectEdit = document.querySelector('#taskProjectEdit');
    while (taskProjectEdit.lastChild){
        taskProjectEdit.removeChild(taskProjectEdit.lastChild);
    }
}

const updateDomProjectDropdown = (projectName) => {
    const taskProject = document.querySelector('#taskProject');
    taskProject.innerHTML+=`<option value=${projectName}>${projectName}</option>`;
    const taskProjectEdit = document.querySelector('#taskProjectEdit');
    taskProjectEdit.innerHTML+=`<option value=${projectName}>${projectName}</option>`;
}

const clearDomProjects = () => {
    const projectListContainer = document.querySelector('#projectList');
    while (projectListContainer.lastChild){
        projectListContainer.removeChild(projectListContainer.lastChild);
    }
}

const clearDomTasks = () => {
    const todoListContainer = document.querySelector('#todoListContainer');
    while (todoListContainer.lastChild){
        todoListContainer.removeChild(todoListContainer.lastChild);
    }
}

const changeProjectTitle = (projectTitle) => {
    const todoProjectTitle = document.querySelector('#todoProjectTitle');
    todoProjectTitle.innerHTML = projectTitle;
}

function compare(a,b){
    if ( a.getDate() < b.getDate() ){
        return -1;
    }
    if ( a.getDate() > b.getDate() ){
        return 1;
    }
    return 0;
}

const displayDomTasks = (projectObject) => {
    projectObject.sortTasksByDate();
    changeProjectTitle(projectObject.getName());
    clearDomTasks();
    const todoListContainer = document.querySelector('#todoListContainer');
    projectObject.getTasks().forEach((item,index)=>{
        console.log(item.getTitle());
        console.log(item.getDate());
        console.log(typeof(item.getDate()));
        console.log('index= '+index);
        todoListContainer.innerHTML += `<div class='task' data-description='${item.getDescription()}' data-uuid=${item.getUUID()}>
                                            <div class='taskLeftSide ${item.getPriority()}Priority' >
                                                <input type='checkbox' class='taskCheckbox'>
                                                <button class='btnTaskDetails'>
                                                    <span class='taskTitle'>${item.getTitle()}</span>
                                                </button>
                                            </div>
                                            <div class='taskRightSide'>
                                                <span class='taskDate'>${item.getDate()}</span>
                                                <button class='btnTaskDelete'>X</button>
                                            </div>
                                        </div>`
    });
}

const addTasksDefault = (projectList, defaultProject) => {
    // clear defaultProject's tasks
    defaultProject.clearTasks();
    // add all tasks into defaultProject's tasks
    projectList.forEach((projectObject)=>{
        projectObject.getTasks().forEach((item)=>{
            defaultProject.addTask(item);
        });
    });
    // sort
    defaultProject.sortTasksByDate();
}

function checkToday (taskDate){
    const today = format(new Date(),'MM/dd/yyyy');
    console.log(today);
    console.log(taskDate);
    return (today===taskDate);
}

const displayDomTasksToday = (defaultProject) => {
    const todoListContainer = document.querySelector('#todoListContainer');
    let index=0;
    clearDomTasks();
    defaultProject.getTasks().forEach((item)=>{
        if (checkToday(item.getDate())){
            console.log(`today! ${item.getTitle()}`);
            todoListContainer.innerHTML += `<div class='task' data-description='${item.getDescription()}' data-uuid=${item.getUUID()}>
                                            <div class='taskLeftSide ${item.getPriority()}Priority'>
                                                <input type='checkbox' class='taskCheckbox'>
                                                <button class='btnTaskDetails'>
                                                    <span class='taskTitle'>${item.getTitle()}</span>
                                                </button>
                                            </div>
                                            <div class='taskRightSide'>
                                                <span class='taskDate'>${item.getDate()}</span>
                                                <button class='btnTaskDelete'>X</button>
                                            </div>
                                        </div>`
            index++;
        }
    });
}

const displayDomTasksWeek = (defaultProject) => {
    const todoListContainer = document.querySelector('#todoListContainer');
    let index=0;
    clearDomTasks();
    defaultProject.getTasks().forEach((item,index)=>{
        // solution to bug: https://stackoverflow.com/a/52352512
        const newDate = new Date(item.getDate());
        const newDateOnly = new Date(newDate.valueOf() + newDate.getTimezoneOffset() * 60 * 1000);
        console.log(isThisWeek(newDateOnly));
        if (isThisWeek(newDateOnly)){
            console.log(`this week! ${item.getDate()}`);
            todoListContainer.innerHTML += `<div class='task' data-description='${item.getDescription()}' data-uuid=${item.getUUID()}>
                                            <div class='taskLeftSide ${item.getPriority()}Priority'>
                                                <input type='checkbox' class='taskCheckbox'>
                                                <button class='btnTaskDetails'>
                                                    <span class='taskTitle'>${item.getTitle()}</span>
                                                </button>
                                            </div>
                                            <div class='taskRightSide'>
                                                <span class='taskDate'>${item.getDate()}</span>
                                                <button class='btnTaskDelete'>X</button>
                                            </div>
                                        </div>`
            index++;
        } 
    });
}

const displayDomTasksDefault = (defaultProject) => {
    clearDomTasks();
    // add to Dom
    const todoListContainer = document.querySelector('#todoListContainer');
    defaultProject.getTasks().forEach((item,index)=>{
        todoListContainer.innerHTML += `<div class='task' data-description='${item.getDescription()}' data-uuid=${item.getUUID()}>
                                            <div class='taskLeftSide ${item.getPriority()}Priority'>
                                                <input type='checkbox' class='taskCheckbox'>
                                                <button class='btnTaskDetails'>
                                                    <span class='taskTitle'>${item.getTitle()}</span>
                                                </button>
                                            </div>
                                            <div class='taskRightSide'>
                                                <span class='taskDate'>${item.getDate()}</span>
                                                <button class='btnTaskDelete'>X</button>
                                            </div>
                                        </div>`
    });
}



export {requiredFieldAdd, requiredFieldRemove,setEditTaskForm, openEditTaskForm, closeEditTaskForm,openTaskForm, closeTaskForm, openProjectForm, closeProjectForm, addProjectDom, clearDomProjects,updateDomProjectDropdown,clearProjectDropdown, changeProjectTitle,displayDomTasks, displayDomTasksDefault,addTasksDefault,displayDomTasksToday,displayDomTasksWeek}