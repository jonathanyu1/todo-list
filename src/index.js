import { format, compareAsc } from 'date-fns'
import { project } from './project.js';
import { task } from './task.js';
import { openTaskForm, closeTaskForm, openProjectForm, closeProjectForm, addProjectDom, updateDomProjectDropdown, clearProjectDropdown } from './dom.js'

// format(new Date(2021, 2, 15), 'MM/dd/yyyy');
// const dates = [
//     new Date(1995, 6, 2),
//     new Date(1987, 1, 11),
//     new Date(1989, 6, 10),
// ];
// dates.sort(compareAsc);
// console.log(dates);

console.log('hello');
// const chores = project('chores');
// chores.sayHello();
// console.log(chores.getName);


const siteFlow = (()=>{
    //const inbox = project('inbox');

    let projectList = [];

    const alertEmptyName = () => {
        alert('You must include a name!');
    }

    const alertSameName = () => {
        alert('You cannot have the same title!');
    }

    const addProject = (projectName) =>{
        const newProject = project(projectName);
        projectList.push(newProject);
    }

    const addTaskToProject = (task) =>{
        projectList.forEach(item=>{
            if (task.getProject()===item.getName()){
                item.addTask(task);
            }
            console.log(item.getName());
            console.log(item.getTasks());
        });
    }

    const addTask = () => {
        const titleInput = document.querySelector('#titleInput');
        const descriptionInput = document.querySelector('#descriptionInput');
        const taskDueDate = document.querySelector('#taskDueDate');
        const taskProject = document.querySelector('#taskProject');
        const taskPriority = document.querySelector('#taskPriority');
        const newTask = task(titleInput.value, descriptionInput.value, taskDueDate.value, taskPriority.value, taskProject.value);
        console.log(newTask);
        addTaskToProject(newTask);
    }

    const defaultProjectInit = (() => {
        addProject('inbox');
    })();

    const updateProjectDropdown = () => {
        // clear list first then add all in project list
        clearProjectDropdown();
        projectList.forEach(item=>{
            console.log(item);
            updateDomProjectDropdown(item.getName());
        });
    }

    function checkSameNameProject (projectObject){
        const projectName = document.querySelector('#projectInputName');
        return (projectName.value === projectObject.getName());
    }

    // event listeners for project

    const btnNewProject = document.querySelector('#newProject');
    btnNewProject.addEventListener('click', ()=>{
        openProjectForm();
    });

    const btnCancelProject = document.querySelector('#projectCancelBtn');
    btnCancelProject.addEventListener('click', ()=>{
        closeProjectForm();
    });

    const btnAddProject = document.querySelector('#projectAddBtn');
    btnAddProject.addEventListener('click', ()=>{
        const projectName = document.querySelector('#projectInputName');
        // prevent empty name for project
        if (projectName.value===''){
            alertEmptyName();
        }else if(projectList.find(checkSameNameProject)) {
            alertSameName();
        } else{
            addProject(projectName.value);
            addProjectDom(projectName.value);
            closeProjectForm();
        }
    });

    // event listeners for tasks

    const btnNewTask = document.querySelector('.newTask');
    btnNewTask.addEventListener('click', ()=>{
        openTaskForm();
        // update project selection list
        updateProjectDropdown();
    });

    const btnAddTask = document.querySelector('.btnAddTask');
    btnAddTask.addEventListener('click', ()=>{
        // need to add check to prevent same title tasks
        addTask();
        closeTaskForm();
        // display
        
        // re-display current project
    });

    const btnCancelForm = document.querySelector('#btnCloseForm');
    btnCancelForm.addEventListener('click', ()=>{
        closeTaskForm();
    });

})();