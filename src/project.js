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
    const deleteTask = (task) =>{

    }

    const getTasks = () => tasksList;

    const getTask = (taskName) =>{

    }

    const sortTasksByDate = () =>{
        tasksList.sort(compare);
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
        sortTasksByDate
    }
}

export {project}