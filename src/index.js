import { format, compareAsc, isToday, isThisWeek } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';
import { project } from './project.js';
import { task } from './task.js';
import { requiredFieldAdd, requiredFieldRemove, setEditTaskForm, openEditTaskForm, closeEditTaskForm, openTaskForm, closeTaskForm, openProjectForm, closeProjectForm, addProjectDom,clearDomProjects, updateDomProjectDropdown, clearProjectDropdown,changeProjectTitle, displayDomTasks, displayDomTasksDefault,addTasksDefault,displayDomTasksToday,displayDomTasksWeek} from './dom.js'


// * Things Left to do: *     

// - local storage: find spots to updateStorage()

// * issues with storage: *
// 

const siteFlow = (()=>{
    let projectList=[];

    const updateStorage = () => {
        const tempProjectList = [];
        projectList.forEach((projectObject)=>{
            // console.log(JSON.stringify(projectObject.save(),null,2));
            tempProjectList.push(JSON.stringify(projectObject.save()));
        });
        localStorage.setItem('tempProjectList', JSON.stringify(tempProjectList));
        
    }

    const localStorageGrabber = () =>{
        let storageProjectList = JSON.parse(localStorage.getItem('tempProjectList'));
        storageProjectList.forEach((projectString)=>{
            let parseProject = JSON.parse(projectString);
            const newProject = project(parseProject.name);
            parseProject.tasksList.forEach((taskStr)=>{
                newProject.addTask(task(taskStr.title,taskStr.description,taskStr.dueDate,taskStr.priority,taskStr.project,taskStr.UUID))
            });
            projectList.push(newProject);
        });
    }

    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    // if (storageAvailable('localStorage')) {
    //     // Yippee! We can use localStorage awesomeness
    //     console.log('localStorage available!');
    //     // if localStorage has tempProjectList then get it
    //     if(localStorage.getItem('tempProjectList')) {
    //         console.log('yes projectList');
    //         console.log(projectList);
    //         // localStorageGrabber();
    //         // update project List Container on side
    //         // add event listeners for projects
    //         // now need to simulate 'Default' click:
    //         // display all tasks under 'Default'
    //     } else {
    //     // no projectList so this is new user
    //     // initialize storage projectList
    //         console.log('no projectList');
    //     }
      
    // } else {
    //     // Too bad, no localStorage for us
    //     console.log('no localStorage available :(');
    // }

    

    let currentEvent = '';

    const defaultProject = project('Default');
   

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
        displayDomTasks(currProject);
    }

    const displayProject = (projectName) => {
        // get corresponding project object
        let currProject = selectCurrentProject(projectName);
        console.log(currProject);
        // set title
        const todoProjectTitle = document.querySelector('#todoProjectTitle');
        todoProjectTitle.innerHTML = currProject.getName();
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
                        addTasksDefault(projectList, defaultProject);
                        displayDomTasksDefault(defaultProject);
                        changeProjectTitle(defaultProject.getName());
                        break;
                    case 'today':
                        console.log(defProj.id+'switch');
                        addTasksDefault(projectList, defaultProject);
                        displayDomTasksToday(defaultProject);
                        changeProjectTitle('Today');
                        break;
                    case 'thisWeek':
                        console.log(defProj.id+'switch');
                        addTasksDefault(projectList, defaultProject);
                        displayDomTasksWeek(defaultProject);
                        changeProjectTitle('This Week');
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
        })
    }

    const addProject = (projectName) =>{
        const newProject = project(projectName);
        projectList.push(newProject);
        updateStorage();
    }

    const addTaskToProject = (task) =>{
        projectList.forEach(item=>{
            if (task.getProject()===item.getName()){
                item.addTask(task);
            }
        });
        updateStorage();
    }

    const addTaskEdit = () => {
        const titleInput = document.querySelector('#titleInputEdit');
        const descriptionInput = document.querySelector('#descriptionInputEdit');
        const taskDueDate = document.querySelector('#taskDueDateEdit');
        const taskProject = document.querySelector('#taskProjectEdit');
        const taskPriority = document.querySelector('#taskPriorityEdit');
        const UUID = uuidv4();
        console.log(taskDueDate.value);
        console.log(UUID+ ' task UUID');
        // format bugs the date since it converts it into some timezone behind 1 day
        // solution to bug: https://stackoverflow.com/a/52352512
        const newDate = new Date(taskDueDate.value);
        const newDateOnly = new Date(newDate.valueOf() + newDate.getTimezoneOffset() * 60 * 1000);
        console.log(format(newDate, 'MM/dd/yyyy')+' newDate');
        console.log(format(newDateOnly, 'MM/dd/yyyy')+'newDateOnly');
        const newTask = task(titleInput.value, descriptionInput.value, format(newDateOnly, 'MM/dd/yyyy'), taskPriority.value, taskProject.value, UUID);
        // const newTask = task(titleInput.value, descriptionInput.value, format(new Date(taskDueDate.value), 'MM/dd/yyyy'), taskPriority.value, taskProject.value);
        console.log(newTask);
        addTaskToProject(newTask);
        // display project
        let currProject = selectCurrentProject(taskProject.value);
        displayTasks(currProject);
        updateStorage();
    }

    const addTask = () => {
        const titleInput = document.querySelector('#titleInput');
        const descriptionInput = document.querySelector('#descriptionInput');
        const taskDueDate = document.querySelector('#taskDueDate');
        const taskProject = document.querySelector('#taskProject');
        const taskPriority = document.querySelector('#taskPriority');
        const UUID = uuidv4();
        console.log(taskDueDate.value);
        console.log(UUID+ ' task UUID');
        // format bugs the date since it converts it into some timezone behind 1 day
        // solution to bug: https://stackoverflow.com/a/52352512
        const newDate = new Date(taskDueDate.value);
        const newDateOnly = new Date(newDate.valueOf() + newDate.getTimezoneOffset() * 60 * 1000);
        console.log(format(newDate, 'MM/dd/yyyy')+' newDate');
        console.log(format(newDateOnly, 'MM/dd/yyyy')+'newDateOnly');
        const newTask = task(titleInput.value, descriptionInput.value, format(newDateOnly, 'MM/dd/yyyy'), taskPriority.value, taskProject.value, UUID);
        // const newTask = task(titleInput.value, descriptionInput.value, format(new Date(taskDueDate.value), 'MM/dd/yyyy'), taskPriority.value, taskProject.value);
        console.log(newTask);
        addTaskToProject(newTask);
        // display project
        let currProject = selectCurrentProject(taskProject.value);
        displayTasks(currProject);

    }

    const inboxProjectInit = (() => {
        // addProject('Inbox');
        // addProjectDom('Inbox');
        // projectEventListener();
       // updateStorage();
        
       if (storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
        console.log('localStorage available!');
        // if localStorage has tempProjectList then get it
        if(localStorage.getItem('tempProjectList')) {
            console.log('yes projectList');
            console.log(projectList);
            localStorageGrabber();
            console.log('hi');
            console.log(projectList[0].getName());
            // update project List Container on side
            projectList.forEach((projectObject)=>{
                addProjectDom(projectObject.getName());
            });
            // add event listeners for projects
            projectEventListener();
            // now need to simulate 'Default' click:
            // display all tasks under 'Default'
            document.querySelector('.defaultProject').click();
        } else {
        // no tempProjectList so this is new user
        // initialize 
            console.log('no projectList');
            addProject('Inbox');
            addProjectDom('Inbox');
            projectEventListener();
            updateStorage();
        }
      
    } else {
        // Too bad, no localStorage for us
        console.log('no localStorage available :(');
    }


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
        }else if(projectList.find(checkSameNameProject)||projectName.value==='Default' || projectName.value==='Today' || projectName.value==='This Week') {
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
        console.log('date: '+document.querySelector('#taskDueDate').value);
        const titleInput = document.querySelector('#titleInput');
        const taskDueDate = document.querySelector('#taskDueDate');
        
        if ((!taskDueDate.value) && (!titleInput.value)){
            console.log('empty date and title');
            requiredFieldAdd(taskDueDate);
            requiredFieldAdd(titleInput);
        }else if (!taskDueDate.value){
            console.log('empty date!');
            requiredFieldAdd(taskDueDate);
            requiredFieldRemove(titleInput);
        } else if (!titleInput.value){
            console.log('empty title!');;
            requiredFieldAdd(titleInput);
            requiredFieldRemove(taskDueDate);
        } else{
            requiredFieldRemove(titleInput);
            requiredFieldRemove(taskDueDate);
            addTask();
            closeTaskForm();
        }
    });

    const btnCancelForm = document.querySelector('#btnCloseForm');
    btnCancelForm.addEventListener('click', ()=>{
        requiredFieldRemove(titleInput);
        requiredFieldRemove(taskDueDate);
        closeTaskForm();
    });

    function delTask (event){
        const todoProjectTitle = document.querySelector('#todoProjectTitle');
            let projectObj = '';
            console.log('task delete');
            console.log(event.target);
            // need to edit this if structure of task tree changes
            const taskUUID = event.target.closest('[data-uuid]').dataset.uuid;
            //const taskUUID = event.target.parentNode.parentNode.dataset.uuid;
            console.log(taskUUID);
            // delete task from project, clear current DOM tasks, display DOM tasks
            projectList.forEach((projectObject)=>{
                projectObject.getTasks().forEach((item, index)=>{
                    if (item.getUUID()===taskUUID){
                        console.log(item.getUUID());
                        console.log(item.getTitle());
                        console.log(item.getDate());
                        console.log(item.getProject());
                        console.log(projectObject.getName());
                        console.log(index);
                        projectObject.deleteTask(index);
                        projectObj = projectObject;
                    }
                });
            });
            if (todoProjectTitle.innerHTML ==='Default'){
                addTasksDefault(projectList, defaultProject);
                displayDomTasksDefault(defaultProject);
            } else if (todoProjectTitle.innerHTML ==='Today'){
                addTasksDefault(projectList, defaultProject);
                displayDomTasksToday(defaultProject);
            } else if (todoProjectTitle.innerHTML ==='This Week'){
                addTasksDefault(projectList, defaultProject);
                displayDomTasksWeek(defaultProject);
            } else {
                displayDomTasks(projectObj);
            }
        updateStorage();
    }

    document.body.addEventListener( 'click', function (event) {
        // clicking 'delete button' for tasks
        if (event.target.className=='btnTaskDelete'){
            delTask(event);
        };
        // clicking 'delete button' for projects
        if (event.target.id==='projectDelete'){
            console.log('delete project time');
            console.log(event.target.parentNode);
            console.log(event.target.parentNode.getElementsByClassName('projectName')[0].innerHTML);
            const projectDeleteName = event.target.parentNode.getElementsByClassName('projectName')[0].innerHTML;
            projectList.forEach((projectObject,index)=>{
                if (projectObject.getName()===projectDeleteName){
                    projectList.splice(index,1);
                }
            });
            // clear project List
            clearDomProjects();
            // display new project List
            projectList.forEach((projectObject)=>{
                addProjectDom(projectObject.getName());
            });
            projectEventListener();
            // refresh current displayed tasklist
            const currDisplayProject = document.querySelector('#todoProjectTitle').innerHTML;
            document.querySelector('.defaultProject').click();
            updateStorage();
        }
        // click 'edit' button on task
        console.log(event.target);
        console.log(event.target.className);
        console.log(event.target.id);
        
        if (event.target.className==='taskTitle'){
            currentEvent = event;
            updateProjectDropdown();
            openEditTaskForm();
            const uuid = currentEvent.target.closest('[data-uuid]').dataset.uuid;
            setEditTaskForm(uuid, projectList);
            const titleInputEdit = document.querySelector('#titleInputEdit');
            requiredFieldRemove(titleInputEdit);
        }
        if (event.target.id==='btnEditTask'){
            const titleInputEdit = document.querySelector('#titleInputEdit');
            console.log(titleInputEdit.value + ' titleInputEdit Value');
            if (!titleInputEdit.value){
                requiredFieldAdd(titleInputEdit);
            } else{
            // delete current task
            delTask(currentEvent);
            // create new task with new details
            addTaskEdit();
            // need to check empty title
            closeEditTaskForm();
            }
        } else if (event.target.id==='btnCloseFormEdit'){
            closeEditTaskForm();
        }
      });
})();