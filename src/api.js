import axios from 'axios';
import { getItem } from './utils/storage'

export default axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getItem('token')}`
    },
})


