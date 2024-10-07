import axios from 'axios'
const token = localStorage.getItem('token')


const clienteAxios = axios.create({
 baseURL: 'http://localhost:4000/apiStock/'

})

export const config = {
    headers: {
        "content-type":"application/json",
        'authorization': `Bearer ${token}`
      }
}

export default clienteAxios