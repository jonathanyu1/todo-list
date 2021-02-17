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

const today = project('today');
const week = project('week');

const siteFlow = (()=>{

    let projectList = [];

    const addProject = (projectName) =>{
        const newProject = project(projectName);
        projectList.push(newProject);
    }

    const updateProjectDropdown = () => {
        // clear list first then add all in project list
        clearProjectDropdown();
        updateDomProjectDropdown('inbox'); // change this inbox string to object when created later
        projectList.forEach(item=>{
            console.log(item);
            updateDomProjectDropdown(item.getName());
        });
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
        addProject(projectName.value);
        addProjectDom(projectName.value);
        closeProjectForm();
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
        closeTaskForm();
        // add task to project with its details, display
    });

    const btnCancelForm = document.querySelector('#btnCloseForm');
    btnCancelForm.addEventListener('click', ()=>{
        closeTaskForm();
    });

})();