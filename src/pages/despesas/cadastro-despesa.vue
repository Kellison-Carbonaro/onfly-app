<template>
  <q-page padding>
    <q-form
      class="row q-col-gutter-sm"
    >
      <q-input
        outlined
        v-model="form.descricao"
        label="Descrição da despesa *"
        lazy-rules
        class="col-md-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />

      <q-input
        outlined
        v-model="form.data"
        label="Data *"
        lazy-rules
        class="col-md-6 col-xs-12"
        :rules="[
          val => val && val.length > 0 || 'Campo obrigatório',
          val => isValidData(),
        ]"
      />

      <q-input
        v-model="form.usuarios_id"
        outlined
        label="Usuario *"
        lazy-rules
        class="col-md-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />

      <q-input
        v-model="form.valor"
        outlined
        label="Valor da despesa *"
        lazy-rules
        class="col-md-6 col-xs-12"
        :rules="[
          val => val !== null && val !== '' || 'Campo obrigatório',
          val => val !== '0' || 'Despesa não pode ter um valor zerado'
        ]"
      />
      <div class="col-12" style="text-align: right;">
        <q-btn
          label="Salvar"
          type="submit"
          color="primary"
          icon="save"
          @click.prevent="salvar()"
          />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useDespesasStore } from 'stores/despesas.js'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'CadastroDespesa',
  setup () {
    const store = useDespesasStore()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      descricao: null,
      data: null,
      usuarios_id: null,
      valor: null
    })

    onMounted(async () => {
      if (route.params.id) {
        getDespesa(route.params.id)
      }
    })

    const getDespesa = async (id) => {
      try {
        const response = await store.getDespesaById(id)
        form.value = response[0]
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Não foi possivel carregar a desoesa', icon: 'check', color: 'negative' })
      }
    }

    const salvar = async () => {
      try {
        if (form.value.id) {
          await store.editarDespesa(form.value)
        } else {
          const response = await store.salvarDespesa(form.value)
        }
        $q.notify({ message: 'Despesa salva com sucesso', icon: 'check', color: 'positive' })
        router.push({ name: 'despesas' })
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Não foi possivel salvar a despesa', icon: 'check', color: 'negative' })
      }
    }

    return {
      form,
      salvar
    }
  },

  methods: {
    isValidData () {
      // const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      // return emailPattern.test(this.form.email) || 'e-mail não existe'
      return true
    }
  }
})
</script>
