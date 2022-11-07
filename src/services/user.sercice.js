import httpService from './http.service'

const userEndpoint = 'user/'

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint)
    console.log(data)
    return data
  }
}

export default userService
