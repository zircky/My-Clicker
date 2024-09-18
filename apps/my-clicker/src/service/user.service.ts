import { axiosInstasnce } from '../api/axios.instance';

export type User = {
  id: number
  telegramId: number
  username: string
}

export type LoginResponse = {
  user: User
  token: string
}

const AUTH = "auth"

export const userService = {
  async login(initData: string) {
    return axiosInstasnce<LoginResponse>({
      url:`${AUTH}/login`,
      method: 'POST',
      data: { initData }
    })
  },

  async getCurrentUser() {
    axiosInstasnce<User>({
      url: `${AUTH}/me`,
      method: 'GET',
    })
  }

}
