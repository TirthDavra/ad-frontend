import api from "./baseAPI"

export const getAllPost = async () => {
  try {
    const response = await api("/post")
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createPost = async (data: any) => {
  try {
    const response = await api('/post/create', {
      data,
      method: 'POST',
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getPostById = async (id: string) => {
  try {
    const response = await api(`/post/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updatePost = async (id: string, data: any) => {
  try {
    const response = await api(`/post/${id}`, {
      data,
      method: 'PUT',
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const deletePost = async (id: string) => {
  try {
    const response = await api(`/post/${id}`, {
      method: "DELETE",
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}