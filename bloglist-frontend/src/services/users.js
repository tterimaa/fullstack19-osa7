import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getUser = async (id) => {
  const res = await axios.get(baseUrl)
  const user = res.data.find(u => u.id === id)
  return user
}

export default { getAll, getUser }