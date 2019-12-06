import React from 'react'
import axios from '../../config/axios'


export default class Login extends React.Component {
    constructor() {
        super()
        this.state={
            email:'',
            password:''
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submithandler=(e)=>{
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post('/users/login',formData)
            .then((response)=>{
                if(response.data.hasOwnProperty('errors')) {
                    console.log(response.data.message)
                } else {
                    const token=response.data.token
                    console.log(token)
                    localStorage.setItem('authToken',token)
                    //window.location.reload()
                    this.props.history.push('/')
                    window.location.reload()
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
                    <div className="col-md-4 offset-md-2">
                    <form onSubmit={this.submithandler}>
                    <h2>Login form</h2><br/>
                    <label htmlFor='email'>Email:</label>
                        <input id='email' type="email" value={this.state.email} name="email" onChange={this.handleChange} className="form-control"/>
                    <label htmlFor='password'>Password:</label>
                        <input id='password' type="password" value={this.state.password} name="password" onChange={this.handleChange} className="form-control"/><br/>
                    <input className="btn btn-primary" type="submit"/>
                </form>
                    </div>

                </div>
               
            </div>
        )
    }
}