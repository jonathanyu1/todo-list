import { format, compareAsc } from 'date-fns'
import { project } from './project.js';
import { task } from './task.js';
import { openTaskForm, closeTaskForm, openProjectForm, closeProjectForm, addProjectDom } from './dom.js'

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

const today = project('today');
const week = project('week');

const siteFlow = (()=>{

    let projectList = [];

    const addProject = (projectName) =>{
        const newProject = project(projectName);
        projectList.push(newProject);
    }

    // event listeners for project and tasks

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
        console.log(projectName.value);
        // const newProject = project(projectName.value);
        addProject(projectName.value);
        addProjectDom(projectName.value);
        console.log(projectList[0].getName);
        closeProjectForm();
    });

    // put this after logic to display project tasks
    const btnAddTask = document.querySelector('.addTask');
    btnAddTask.addEventListener('click', ()=>{
        openTaskForm();
    });
    const btnCancelForm = document.querySelector('#btnCloseForm');
    btnCancelForm.addEventListener('click', ()=>{
        closeTaskForm();
    });

})();