import api from './baseAPI'

export const getAllUsers = async () => {
  try {
    const response = await api('/users')
    return response.data
  } catch (error) {
    console.error('getAllUsers error', error)
    return { status: false, message: 'Unable to load users', data: [] }
  }
}

export const getUserById = async (id: string) => {
  try {
    const response = await api(`/users/${id}`)
    return response.data
  } catch (error) {
    console.error('getUserById error', error)
  }
}

export const updateUser = async (id: string, data: any) => {
  try {
    const response = await api(`/users/${id}`, {
      method: 'PUT',
      data,
    })
    return response.data
  } catch (error) {
    console.error('updateUser error', error)
  }
}

export const deleteUser = async (id: string) => {
  try {
    const response = await api(`/users/${id}`, {
      method: 'DELETE',
    })
    return response.data
  } catch (error) {
    console.error('deleteUser error', error)
  }
}
