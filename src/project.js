const project = (name) => {
    let tasksList = [];

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

    const sayHello = () => console.log('hello project');
    return {
        getName,
        setName,
        addTask,
        deleteTask,
        getTasks,
        getTask,
        sayHello
    }
}

export {project}