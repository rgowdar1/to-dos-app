import React from 'react'
import axios from '../../config/axios'

export default class Register extends React.Component {
    constructor() {
        super()
        this.state={
            username:'',
            email:'',
            password:''
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submitHandler=(e)=>{
        e.preventDefault()
    const formData={
        username:this.state.username,
        email:this.state.email,
        password:this.state.password
    }
    console.log(formData)
    axios.post('/users/register',formData)
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')) {
                console.log(response.data.message)
            } else {
                this.props.history.push('/users/login')
            }
        })
        .catch((err)=>{
            alert(err)
        })
    }
    render() {
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-md-4 offset-md-3">
                    <form onSubmit={this.submitHandler}>
                    <h2 className="text-center">Registration form</h2>
                    <label htmlFor="username">Username:</label>
                        <input id="username" type="text" value={this.state.username} onChange={this.handleChange} name="username" className="form-control"/>
                    <label htmlFor="email">Email:</label>
                        <input id="email" type="email" value={this.state.email} onChange={this.handleChange} name="email" className="form-control"/>
                    <label htmlFor="password">Password:</label>
                        <input id="password" type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control"/>
                    <br/>
                    <input className="btn btn-primary" type="submit"/>
                     </form>
                    </div>
                </div>   
            </div>
        )
    }
}