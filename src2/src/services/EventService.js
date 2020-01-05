import axios from 'axios'

//A single axios instance for entire app
//Call base URL all calls
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

async function getEvents() {
  try {
    //const res = await axios.get('http://localhost:3000/events')
    const res = await apiClient.get('/events')
    return res.data
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getEvent(id) {
  try {
    const res = await apiClient.get(`/events/${id}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export default { getEvents, getEvent }
