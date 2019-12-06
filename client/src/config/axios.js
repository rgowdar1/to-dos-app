import Axios from 'axios'

const axios=Axios.create({
    baseURL:'http://localhost:3040'
})

export default axios