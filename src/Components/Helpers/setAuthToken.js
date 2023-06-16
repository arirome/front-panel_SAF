import axios from 'axios'

const setAuthToken = token => {
    
    if(token){
        axios.defaults.headers.common['x-token'] = token
    } else {
        delete axios.defaults.headers.common['x-token']
    }
}

export default setAuthToken