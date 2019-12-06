import React from 'react'
import axios from '../../config/axios'
import TaskForm from '../tasks/form'

export default class TaskEdit extends React.Component {
    constructor() {
        super()
        this.state={
            task:{}
        }
    }

    submitHandler=(formData)=>{
        const id=this.props.match.params.id
        axios.put(`/tasks/${id}`,formData,{
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
    componentDidMount() {
        const id=this.props.match.params.id
        axios.get(`/tasks/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const task=response.data
            this.setState({task})
        })
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.task).length>=1 &&  <TaskForm task={this.state.task} submitHandler={this.submitHandler}/>}
            </div>
        )
    }
}