import api from "./baseAPI"

export const register = async (data: any) => {
  try {
    const response = await api("/auth/register", {
      data,
      method: "POST",
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const signIn = async (data: any) => {
  try {
    const response = await api("/auth/login", {
      data,
      method: "POST",
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
