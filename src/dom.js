import { project } from "./project";
import { task } from "./task";
import { format, compareAsc, isToday, isThisWeek, parseISO,toDate } from 'date-fns'

const openTaskForm = () => {
    document.getElementById('formContainer').classList.remove('hideContent');
    document.getElementById('formPopup').reset();
}

const closeTaskForm = () => {
    document.getElementById('formContainer').classList.add('hideContent');
}

const openProjectForm = () => {
    // open form, hide add project button
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
    // let newListProject = document.createElement('li');
    // let newProject = document.createElement('button');
    // newProject.classList.add('btnProject');
    // newProject.innerHTML = projectName;
    // newListProject.appendChild(newProject);
    // projectList.appendChild(newListProject);

    // projectList.innerHTML += `<li><div class='project'>
    //                             <button class='btnProjectLeftSide'>
    //                                 <i class='material-icons'>assignment</i>
    //                                 <span class='projectName'>${projectName}</span>
    //                             </button>
    //                             <button class='btnProjectRightSide'>
    //                                 <i class='material-icons'>delete</i>
    //                             </button>
    //                         </div></li>`

    projectList.innerHTML += `<li><button class='btnProject'>
                                    <div class='projectLeftSide'>
                                        <i class='material-icons'>assignment</i>
                                        <span class='projectName'>${projectName}</span>
                                    </div>
                                    <i class='material-icons'>delete</i>
                                </button></li>`
    // add left right side, delete button
}

const clearProjectDropdown = () => {
    const taskProject = document.querySelector('#taskProject');
    while (taskProject.lastChild){
        taskProject.removeChild(taskProject.lastChild);
    }
}

const updateDomProjectDropdown = (projectName) => {
    const taskProject = document.querySelector('#taskProject');
    taskProject.innerHTML+=`<option value=${projectName}>${projectName}</option>`;
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

// const displayDomTasks = (tasks,projectName) => {
//     // tasks.sort((a,b)=>a.getDate()>b.getDate());
//     // https://stackoverflow.com/a/1129270
//     tasks.sort(compare);
//     const todoListContainer = document.querySelector('#todoListContainer');
//     changeProjectTitle(projectName);
//     clearDomTasks();
//     tasks.forEach((item,index)=>{
//         console.log(item.getTitle());
//         console.log(item.getDate());
//         console.log(typeof(item.getDate()));
//         console.log('index= '+index);
//         todoListContainer.innerHTML += `<div class='task' data-index=${index}>
//                                             <div class='taskLeftSide'>
//                                                 <input type='checkbox' class='taskCheckbox'>
//                                                 <button class='btnTaskDetails'>
//                                                     <span class='taskTitle'>${item.getTitle()}</span>
//                                                 </button>
//                                             </div>
//                                             <div class='taskRightSide'>
//                                                 <span class='taskDate'>${item.getDate()}</span>
//                                                 <button class='btnTaskDelete'>X</button>
//                                             </div>
//                                         </div>`
//     });
// }

const displayDomTasks = (projectObject) => {
    // tasks.sort(compare);
    projectObject.sortTasksByDate();
    changeProjectTitle(projectObject.getName());
    clearDomTasks();
    const todoListContainer = document.querySelector('#todoListContainer');
    projectObject.getTasks().forEach((item,index)=>{
        console.log(item.getTitle());
        console.log(item.getDate());
        console.log(typeof(item.getDate()));
        console.log('index= '+index);
        todoListContainer.innerHTML += `<div class='task' data-index=${index}>
                                            <div class='taskLeftSide'>
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
    clearDomTasks();
    // clear defaultProject's tasks
    defaultProject.clearTasks();
    // add all tasks into defaultProject's tasks
    projectList.forEach((projectObject)=>{
        projectObject.getTasks().forEach((item)=>{
            // defaultTasks.push(item);
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
    defaultProject.getTasks().forEach((item)=>{
        if (checkToday(item.getDate())){
            console.log(`today! ${item.getTitle()}`);
            todoListContainer.innerHTML += `<div class='task' data-index=${index}>
                                            <div class='taskLeftSide'>
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
        // console.log(isToday(toDate(parseISO(item.getDate())), 'MM/dd/yyyy'));
        // remove the task delete button here if cant figure out how to delete task while in default page
    });
}

const displayDomTasksWeek = (defaultProject) => {
    const todoListContainer = document.querySelector('#todoListContainer');
    let index=0;
    defaultProject.getTasks().forEach((item,index)=>{
        // remove the task delete button here if cant figure out how to delete task while in default page
        console.log(isThisWeek(toDate(parseISO(item.getDate())), 'MM/dd/yyyy'));
        if (isThisWeek(toDate(parseISO(item.getDate())), 'MM/dd/yyyy')){
            console.log(`this week! ${item.getDate()}`);
        }
        todoListContainer.innerHTML += `<div class='task' data-index=${index}>
                                            <div class='taskLeftSide'>
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

const displayDomTasksDefault = (defaultProject) => {
    // add to Dom
    const todoListContainer = document.querySelector('#todoListContainer');
    defaultProject.getTasks().forEach((item,index)=>{
        // remove the task delete button here if cant figure out how to delete task while in default page
        todoListContainer.innerHTML += `<div class='task' data-index=${index}>
                                            <div class='taskLeftSide'>
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

export {openTaskForm, closeTaskForm, openProjectForm, closeProjectForm, addProjectDom, updateDomProjectDropdown,clearProjectDropdown, changeProjectTitle,displayDomTasks, displayDomTasksDefault,addTasksDefault,displayDomTasksToday,displayDomTasksWeek}