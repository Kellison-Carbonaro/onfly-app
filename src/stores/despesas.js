import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useDespesasStore = defineStore('despesas', {
  state: () => ({
    despesas: []
  }),

  getters: {
    listaDespesas: (state) => state.despesas
  },

  actions: {
    async getDespesas () {
      try {
        const { data } = await api.get('despesas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.despesas = data
      } catch (error) {
        console.error(error)
      }
    },

    async getDespesaById (id) {
      try {
        const { data } = await api.get(`despesas/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        return data
      } catch (error) {
        console.error(error)
      }
    },

    async salvarDespesa (form) {
      try {
        await api.post('despesas', form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.getDespesas()
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    },

    async excluirDespesa (id) {
      try {
        await api.delete(`despesas/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.getDespesas()
      } catch (error) {
        console.error(error)
      }
    },

    async editarDespesa (form) {
      try {
        await api.put(`despesas/${form.id}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.getDespesas()
      } catch (error) {
        console.error(error)
        throw new Error(error)
      }
    }
  }
})
