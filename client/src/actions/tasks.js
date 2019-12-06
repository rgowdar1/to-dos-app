
export const getTasks=()=> {
    return {type:'GET_TASKS'}
}

export const addTask=(task)=> {
    return {type:'ADD_TASK',payload:task}
}

export const editTasks=(id,data)=> {
    return {type:'EDIT_TASK',
            payload:{
                id,
                data
            }}
}

export const deleteTask=(id)=> {
    return {type:'DELETE_TASK',payload:id}
}