import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useLoginAuthStore = defineStore('loginAuth', {
  state: () => ({
    usuario: {}
  }),

  getters: {
    listaUsuarios: (state) => state.usuario
  },

  actions: {
    async login (form) {
      try {
        const { data } = await api.post('login', form)
        console.log(data)
        if (data) {
          this.usuario = data.data
          localStorage.setItem('token', data.token)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
