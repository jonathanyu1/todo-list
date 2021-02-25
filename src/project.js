import { task } from "./task";

const project = (name) => {
    let tasksList = [];

    // sorts tasks by date
    // https://stackoverflow.com/a/1129270
    function compare(a,b){
        if ( a.getDate() < b.getDate() ){
            return -1;
        }
        if ( a.getDate() > b.getDate() ){
            return 1;
        }
        return 0;
    }

    const getName = () => name;
    const setName = (newName) =>{
        name = newName;
    }
    const addTask = (task) =>{
        tasksList.push(task);
    }
    const deleteTask = (taskIndex) =>{
        tasksList.splice(taskIndex, 1);
    }

    const clearTasks = () =>{
        tasksList.splice(0,tasksList.length);
    }

    const getTasks = () => tasksList;

    const getTask = (taskName) =>{

    }

    const sortTasksByDate = () =>{
        tasksList.sort(compare);
    }

    /***
     * so this is new - the method simply pulls the
     *  data from each variable and stores it into an
     *  object. Then it creates an array of tasks,
     *  calling the `save` method on each object, 
     *  which does exactly the same - sends a data
     *  object back.
     */

    // const save = () => {
    //     const returnObj = {
    //       name,
    //       tasksList:[],
    //     };
    //     tasksList.forEach(task => {
    //       returnObj.tasksList.push(task.save())
    //     })
  
    //     return returnObj;
    //   }

    const save = () =>{
        const returnObj = {
          name,
          tasksList: tasksList.map(task => task.save() ),
        };
        return returnObj;
      }

    const sayHello = () => console.log('hello project');
    return {
        getName,
        setName,
        addTask,
        deleteTask,
        getTasks,
        getTask,
        sayHello,
        sortTasksByDate,
        clearTasks,
        save
    }
}

export {project}

// const Task = (title, description) => {
//     const save = () => {
//         // the function is tiny here, so I simply send
//         //  back the data as an object!
//         return {title, description};
//       }
//       return { save }
//     }
    
    
    
//     const myProject = Project("Stuf to do");
//     myProject.addTask(Task("clean", "got to clean this mess"));
//     myProject.addTask(Task("Make waffles", "Love me some waffles"));
    
//     console.log(JSON.stringify(myProject.save(), null, 2));