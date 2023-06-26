import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useUsuarioStore = defineStore('usuarios', {
  state: () => ({
    usuarios: []
  }),

  getters: {
    listaUsuarios: (state) => state.usuarios
  },

  actions: {
    async getUsuarios () {
      try {
        const { data } = await api.get('usuarios')
        this.usuarios = data
      } catch (error) {
        console.error(error)
      }
    },

    async getUsuarioById (id) {
      try {
        const { data } = await api.get(`usuarios/${id}`)
        return data
      } catch (error) {
        console.error(error)
      }
    },

    async salvarUsuarios (form) {
      try {
        const response = await api.post('usuarios', form)
        console.log(response)
        this.getUsuarios()
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },

    async excluirUsuario (id) {
      try {
        await api.delete(`usuarios/${id}`)
        this.getUsuarios()
      } catch (error) {
        console.error(error)
      }
    },

    async editarUsuarios (form) {
      try {
        await api.put(`usuarios/${form.id}`, form)
        this.getUsuarios()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
