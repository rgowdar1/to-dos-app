import React from 'react';
import { Formik } from 'formik';
import axios from '../../config/axios'

const Register = () => (
    <div><br/><br/>
  <div className="row">
      <div className="col-md-5 offset-md-3">
      <h1 className="text-center">REGISTER</h1>
    <Formik 
      initialValues={{username:'', email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values) => {
        axios.post('/users/register',values)
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')) {
                console.log(response.data.message)
            } else {
                const token=response.data.token
                console.log(token)
                localStorage.setItem('authToken',token)
                //window.location.reload()
                window.location.href="/users/login"
                //window.location.reload()
            }
        })
        .catch((err)=>{
            alert(err)
        })
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
            <div className="form-froup">    
          <input
          className="form-control"
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          {errors.username && touched.username && errors.username}</div>
<br/>
            <div className="form-froup">    
          <input
          className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}</div>
<br/>
            <div className="form-group">
          <input
          className="form-control"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}</div><br/>
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
      </div>
    
  </div>
  </div>
);

export default Register;