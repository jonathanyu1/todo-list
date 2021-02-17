const project = (name) => {
    const getName = () => name;
    const setName = (newName) =>{
        name = newName;
    }
    const addTask = (task) =>{

    }
    const deleteTask = (task) =>{

    }

    const getTasks = () =>{

    }

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