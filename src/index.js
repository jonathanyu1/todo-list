import { format, compareAsc } from 'date-fns'
import { project } from './project.js';
import { task } from './task.js';
import { openTaskForm, closeTaskForm } from './dom.js'

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

const UI = (()=>{

    

    // put this after logic to display project tasks
    const btnNewTask = document.querySelector('.addTask');
    btnNewTask.addEventListener('click', ()=>{
        openTaskForm();
    });
    const btnCancelForm = document.querySelector('#btnCloseForm');
    btnCancelForm.addEventListener('click', ()=>{
        closeTaskForm();
    });

})();