import React from 'react'
import axios from '../../config/axios'
import TaskForm from '../tasks/form'

export default class TaskNew extends React.Component {

    submitHandler=(formData)=>{
        axios.post('/tasks',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                console.log(response.data)
                this.props.history.push('/tasks')
            }
        })
    }

    render() {
        return (
            <div>
                <TaskForm submitHandler={this.submitHandler}/>
            </div>
        )
    }
}