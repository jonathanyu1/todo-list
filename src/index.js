import { format, compareAsc, isToday, isThisWeek } from 'date-fns'
import { project } from './project.js';
import { task } from './task.js';
import { openTaskForm, closeTaskForm, openProjectForm, closeProjectForm, addProjectDom, updateDomProjectDropdown, clearProjectDropdown, displayDomTasks, displayDomTasksDefault } from './dom.js'


// * Things Left to do: *     
// - functionality of clicking inbox, today, this week
// - functionality of clicking tasks to reveal details / edit details
// - functionality of deleting project, including its tasks
// - functionality of deleting tasks
// - styling 
// - fix date bug with timezone
// - set default value of date picker to today


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
    // const inbox = project('inbox');

    let projectList = [];
    const defaultProject = project('defaultProject');

    const alertEmptyName = () => {
        alert('You must include a name!');
    }

    const alertSameName = () => {
        alert('You cannot have the same title!');
    }

    function selectCurrentProject (projectName){
        let currProject = '';
        projectList.forEach(item=>{
            console.log(item);
            console.log(projectName);
            console.log(item.getName() + ' get name');
            if (item.getName() === projectName){
                currProject=item;
            }
        });
        return currProject;
    }

    const displayTasks = (currProject) => {
        // const tasks = currProject.getTasks();
        // console.log(tasks);
        // console.log('tasks of ' + currProject.getName());
        // displayDomTasks(tasks, currProject.getName());
        displayDomTasks(currProject);
    }

    const displayProject = (projectName) => {
        // get corresponding project object
        let currProject = selectCurrentProject(projectName);
        // projectList.forEach(item=>{
        //     console.log(item.getName() + ' get name');
        //     if (item.getName() === projectName){
        //         currProject = item;
        //     }
        // });
        console.log(currProject);
        // set title
        const todoProjectTitle = document.querySelector('#todoProjectTitle');
        todoProjectTitle.innerHTML = currProject.getName();
        // clear current tasks
        // clearDomCurrTasks();
        // display tasks
        displayTasks(currProject);
    }
    
    const defaultProjectEventListener = (() => {
        // Default, Today, This Week
        const defaultProjects = document.querySelectorAll('.defaultProject');
        defaultProjects.forEach((defProj)=>{
            console.log(defProj.id);
            defProj.addEventListener('click',()=>{
                switch (defProj.id){
                    case 'default':
                        console.log(defProj.id+'switch');
                        displayDomTasksDefault(projectList, defaultProject);
                        break;
                    case 'today':
                        console.log(defProj.id+'switch');
                        break;
                    case 'thisWeek':
                        console.log(defProj.id+'switch');
                        break;    
                }
            });
        });    
    })();

    const projectEventListener = () => {
        const btnProjects = document.querySelectorAll('.btnProject');
        btnProjects.forEach(item=>{
            console.log(item);
            const nameChild = item.querySelector(`.projectName`);
            console.log(nameChild.innerHTML+'inner');
            item.addEventListener('click', ()=>{
                console.log('added');
                displayProject(nameChild.innerHTML);
            });
            // if (nameChild.innerHTML === projectName){
            //     item.addEventListener('click', ()=>{
            //         console.log('added');
            //     });
            // }
        })
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
        console.log(taskDueDate.value);
        // this format bugs the date since it converts it into some timezone behind 1 day
        // format(new Date(taskDueDate.value), 'MM/dd/yyyy')
        const newTask = task(titleInput.value, descriptionInput.value, format(new Date(taskDueDate.value), 'MM/dd/yyyy'), taskPriority.value, taskProject.value);
        console.log(newTask);
        addTaskToProject(newTask);
        // clear current displayed tasks

        // display project
        let currProject = selectCurrentProject(taskProject.value);
        displayTasks(currProject);
    }

    const inboxProjectInit = (() => {
        addProject('Inbox');
        addProjectDom('Inbox');
        projectEventListener();
        // add event listener for inbox

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
            projectEventListener();
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
    });

    const btnCancelForm = document.querySelector('#btnCloseForm');
    btnCancelForm.addEventListener('click', ()=>{
        closeTaskForm();
    });

})();