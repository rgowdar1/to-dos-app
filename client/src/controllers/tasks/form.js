import React from 'react'
import axios from '../../config/axios'
import CreatableSelect from 'react-select/creatable'
import Datetime from 'react-datetime'


export default class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            Options:[],
            title:props.task ? props.task.title : '',
            dueDate:props.task ? props.task.dueDate : new Date(),
            status:props.task ? props.task.status : '',
            SelectedLabel:[],
            labels:[]
        }
    }
    
    componentDidMount() {
        axios.get('/labels',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const labels=response.data
            let options=[]
            labels.map(l=>{
                options=options.concat({value:l._id,label:l.name})
            })
            this.setState({options})
        })
        .catch((err)=>{
            alert(err)
        })
      }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleChange1 = (newValue) => {
        this.setState({selectedLabel:newValue})

      };

      onChange = dueDate => this.setState({ dueDate })
    submitHandler=(e)=>{
        e.preventDefault()
        const newLabels=this.state.selectedLabel.filter(l=>l.__isNew__)
        console.log(newLabels)
        let data=[]
        newLabels.map(lab=>data.push({name:lab.label}))
        console.log(data)
        axios.post('/labels/more',data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response.data)
            axios.get('/labels',{
                headers:{
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then((response)=>{
                const labels=response.data
                this.setState({labels})
            })
            .catch((err)=>{
                alert(err)
            })
        })
        .catch((err)=>{
            alert(err)
        })
        let labelData=[]
        setTimeout(() => {
            this.state.labels.map(lb=>{
                this.state.selectedLabel.map(sb=>{
                    if(lb.name===sb.label) {
                        labelData.push(lb._id)
                    }
                })
            })
            console.log('labelData',labelData)

            const formData={
                title:this.state.title,
                dueDate:this.state.dueDate,
                status:this.state.status,
                label:labelData
            }
            console.log(formData)
            this.props.submitHandler(formData)

        }, 3000);

        
    }
    
    render() {
        console.log('labels',this.state.labels)
        //console.log('createlabels',this.state.createLabel)
        return (
            <div className="row">
                <div className="col-md-5 offset-md-3">
                        <div className="form-group">
                        <form onSubmit={this.submitHandler}>
                            <h1>TASK FORM</h1>
                            <label htmlFor="title">Title:</label>
                            <input id="title" type="text" value={this.state.title} name="title" onChange={this.handleChange} className="form-control"/>
                            <label htmlFor="dueDate">Due Date:</label><br/>
                            <Datetime  onChange={this.dateChange}
                                 value={this.state.dueDate}
                                /><br/>
                            <label htmlFor="status">Status:</label><br/>
                            <input id="status" type="radio" value="new" name="status" onChange={this.handleChange} />New <br/>
                            <input id="status" type="radio" value="in progress" name="status" onChange={this.handleChange} />In progress<br/>
                            <input id="status" type="radio" value="completed" name="status" onChange={this.handleChange}/>Completed<br/>
                            <label>Label:</label><br/>
                            <CreatableSelect isMulti options={this.state.options} onChange={this.handleChange1} />
                            <input className="btn btn-primary" type="submit"/>                     
                        </form>
                        
                    </div>
                </div>
            </div>
            
        )
    }
}