import httpService from './http.service.js'
import localStorageService from './localStorage.service.js'

const userEndpoint = 'user/'

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload)
    return data
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    )
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    )
    return data
  }
}

export default userService
