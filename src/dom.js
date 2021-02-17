const openTaskForm = () => {
        document.getElementById('formContainer').classList.remove('hideContent');
        document.getElementById('formPopup').reset();
}

const closeTaskForm = () => {
    document.getElementById('formContainer').classList.add('hideContent');
}

export {openTaskForm, closeTaskForm}