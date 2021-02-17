import { project } from "./project";
import { task } from "./task";

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
export {openTaskForm, closeTaskForm, openProjectForm, closeProjectForm, addProjectDom, updateDomProjectDropdown,clearProjectDropdown}