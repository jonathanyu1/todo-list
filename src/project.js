const project = (name) => {
    const getName = () => name;
    const setName = (newName) =>{
        name = newName;
    }
    const addTask = (task) =>{

    }
    const deleteTask = (task) =>{

    }

    const sayHello = () => console.log('hello project');
    return {
        getName,
        setName,
        addTask,
        deleteTask,
        sayHello
    }
}

export {project}