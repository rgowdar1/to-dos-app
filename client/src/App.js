import React from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap'
import axios from './config/axios'
import Home from '../src/common/home'
// import Register from '../src/controllers/users/register'
import Register from '../src/controllers/users/formic-register'
//import Login from '../src/controllers/users/login'
import Login from '../src/controllers/users/formic-login'
import Task from '../src/controllers/tasks/task'
import TaskNew from '../src/controllers/tasks/new'
import TaskEdit from '../src/controllers/tasks/edit'
import Label from '../src/controllers/labels/label'
import TaskCompleted from '../src/controllers/tasks/showComplete'

function App() {
  function handleLogout() {
    axios.delete('/users/logout',{
      headers:{
        'x-auth':localStorage.getItem('authToken')
      }
    })
    .then((response)=>{
      if(response.data.hasOwnProperty('errors')) {
        alert(response.data.message)
      } else {
        localStorage.removeItem('authToken')
        window.location.reload()
        window.location.href="/"
      }
    }) 
  }
  return (
    <div className="container">
      <BrowserRouter>
        {localStorage.getItem('authToken') ?
          (
<Navbar bg="dark" variant="primary">
    <Navbar.Brand href="/hh"><h2>TO_DO'S_@_APP</h2></Navbar.Brand> 
    <Nav.Link href="#"><Link to="/">Home</Link></Nav.Link>
    <Nav.Link href="#"><Link to="/tasks">Tasks</Link> </Nav.Link>
    <Nav.Link href="#"><Link to="/labels">Labels</Link></Nav.Link>
    <Nav.Link href="#"><Link to="/tasks/archieved">Completed Tasks</Link></Nav.Link>
    <Nav.Link href="#"><Link to="#"> <Link to="#" onClick={()=>{handleLogout()}}>Logout</Link></Link></Nav.Link> 
  </Navbar>  ) : (

<Navbar bg="dark" variant="dark">
<Navbar.Brand href="#"><h2>TO_DO'S_@_APP</h2></Navbar.Brand> 
<Nav.Link href="#"><Link to="/">Home</Link></Nav.Link>
<Nav.Link href="#"><Link to="/users/register">Register</Link></Nav.Link>
<Nav.Link href="#"><Link to="/users/login">Login</Link></Nav.Link> 
</Navbar>)   }
      <Route path="/" component={Home} exact={true}/>
      <Route path="/users/register" component={Register}/>
      <Route path="/users/login" component={Login}/>
      <Route path="/tasks" component={Task} exact={true} />
      <Route path="/tasks/new" component={TaskNew} />
      <Route path="/tasks/archieved" component={TaskCompleted} />
      <Route path="/tasks/edit/:id" component={TaskEdit} />
      <Route path="/labels" component={Label} /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
