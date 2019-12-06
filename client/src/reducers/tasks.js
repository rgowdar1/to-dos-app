const tasksInitialState=[]

const tasksReducer=(state=tasksInitialState,action)=> {
    switch(action.type) {
        case 'GET_TASKS' : {
            return [...state]
        }
        case 'ADD_TASK' : {
            return [...state,action.payload]
        }
        case 'DELETE_TASK' : {
            return [...state.filter(task=>task.id==action.payload)]
        }
        case 'EDIT_TASK' : {
            return state.map(task=> {
                if(task.id==action.payload.id) {
                    return Object.assign({},task,action.payload.data)
                } else {
                    return Object.assign({},task)
                    //return {...task}
                }
            })
        }
        default : {
            return [...state]
        }
    }
}

export default tasksReducer