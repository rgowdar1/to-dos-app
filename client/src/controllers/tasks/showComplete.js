import React from 'react'
import axios from '../../config/axios'
import {Card,Button,Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import moment from 'moment'

export default class TaskCompleted extends React.Component {
    
    constructor() {
        super()
        this.state={
            tasks:[]
        }
        

    }
    handleDelete=(id)=>{
        const confirm=window.confirm('Are you sure')
        if(confirm) {
        axios.delete(`/tasks/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response.data)
            window.location.reload()
        }) 
        .catch((err)=>{
            alert(err)
        })
    } 
    }
    componentDidMount() {
        axios.get('/tasks/archieved',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const tasks=response.data
            this.setState({tasks})
        })
        .catch((err)=>{
            alert(err)
        })
    }

 checkHandle=(e,id)=>{
    this.state.tasks.find(task=>task._id===id).archieved=e.target.checked
    const data={
        archieved:e.target.checked
    }
    axios.put(`/tasks/${id}`,data,{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        console.log(response.data)
    })
    .catch((err)=>{
        alert(err)
    })
    axios.get('/tickets',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        const tasks=response.data
        this.setState({tasks})
    })
    .catch((err)=>{
        alert(err)
    })
 }   
    render() {
        console.log(this.state.tasks)
        return (
            <div>
                <br/><br/>
                <h1 className="text-center">TASKS</h1><br/>
                <button type="button" className="btn btn-outline-primary"><Link to="/tasks/new"><h4>Add task</h4></Link></button>
                <br/><br/>
                
                <div className="row">  
                {this.state.tasks.map(task=>{
                    return (<div key={task._id}>
                        <div className="col-md">
                        <Card border="primary" bg="light" style={{ width: '20rem' }}>
                        <Card.Header className="text-center"><Card.Title>{task.title}</Card.Title>
                        Status:<Badge variant="warning">{task.status}</Badge><br/>
                        </Card.Header>
                        <Card.Body>
                            
                        <Card.Text>
                        <p>CreatedAt:{task.createdAt.slice(0,10)}</p>
                        <p>Due-Date:{moment(task.dueDate).calendar()}</p> 
                        
                               <p>Labels:{task.label.map(l=>{
                                       return <Badge variant="primary">{l.name}</Badge>
                                   })} </p>
                        <input type="checkbox" checked={task.archieved} onChange={(e)=>{this.checkHandle(e,task._id)}}/>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer className="muted"><span>   </span>  <Button variant="primary" onClick={()=>{
                                       this.handleDelete(task._id)
                                   }}>DELETE</Button> <span> </span>

                            <button className="btn btn-outline-primary"><Link to={`tasks/edit/${task._id}`}>EDIT</Link></button>
                                   </Card.Footer>
                                   </Card>
                                </div>
                            <br/>
                            </div>)
                })}   
                </div>

            </div>
        )
    }
}
