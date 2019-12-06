import React from 'react'
import axios from '../../config/axios'
export default class Label extends React.Component {
    constructor() {
        super()
        this.state={
            labels:[]
        }
    }
    deleteHandler=(id)=>{
        const confirm=window.confirm('Are you sure ? ')
        if(confirm) {
            axios.delete(`/labels/${id}`,{
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
    }
    render() {
        return (
            <div><br/><br/>
                <div className="row">
                    <div className="col-md-6">
                    <h2 className="text-center">LABELS</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>LABEL NAME</th>
                            <th>DELETE LABEL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.labels.map(label=>{
                            return <tr key={label._id}>
                                <td>{label.name}</td>
                                <td><button className="btn btn-primary" onClick={()=>{
                                    this.deleteHandler(label._id)
                                }}>DELETE</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                    </div>
                </div>
                
                
            </div>
        )
    }
}