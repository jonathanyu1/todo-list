import { format, compareAsc } from 'date-fns'
import { project } from './project.js';

// format(new Date(2021, 2, 15), 'MM/dd/yyyy');
// const dates = [
//     new Date(1995, 6, 2),
//     new Date(1987, 1, 11),
//     new Date(1989, 6, 10),
// ];
// dates.sort(compareAsc);
// console.log(dates);

console.log('hello');
const chores = project('chores');
chores.sayHello();
