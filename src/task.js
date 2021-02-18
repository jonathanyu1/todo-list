import { format, compareAsc } from 'date-fns'

// format(new Date(2014, 1, 11), 'MM/dd/yyyy')
// use this for date 

const task = (title, description, dueDate, priority, project) =>{

    const getTitle = () => title;

    const setTitle = (newTitle) =>{
        title = newTitle;
    }

    const getDate = () => dueDate;

    const setDate = (newDate) => {
        dueDate = newDate;
    }

    const getDescription = () => description;

    const setDescription = (newDescription) =>{
        description = newDescription;
    }

    const getPriority = () => priority;

    const setPriority = (newPriority) =>{
        priority = newPriority;
    }   

    const getProject = () => project;

    const setProject = (newProject) =>{
        project = newProject;
    }

    const getStatus = () => status;

    const setStatus = (newStatus) => {
        status = newStatus;
    }

    return {
        getTitle,
        setTitle,
        getDate,
        setDate,
        getDescription,
        setDescription,
        getPriority,
        setPriority,
        getProject,
        setProject,
        getStatus,
        setStatus
    }
}

export {task}