<template>
  <q-page padding>
    <q-form
      class="row q-col-gutter-sm"
    >
      <q-input
        outlined
        v-model="form.nome"
        label="Seu nome *"
        lazy-rules
        class="col-md-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />

      <q-input
        outlined
        v-model="form.email"
        label="Seu email *"
        lazy-rules
        class="col-md-6 col-xs-12"
        :rules="[
          val => val && val.length > 0 || 'Campo obrigatório',
          val => isValidEmail(),
        ]"
      />

      <q-input
        v-model="form.senha"
        outlined
        label="Seu senha *"
        lazy-rules
        :type="isPwd ? 'password' : 'text'"
        class="col-md-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        v-model="confirmaSenha"
        outlined
        label="Confirme sua senha *"
        lazy-rules
        :type="isPwdConfSenha ? 'password' : 'text'"
        class="col-md-6 col-xs-12"
        :rules="[
          val => val !== null && val !== '' || 'Campo obrigatório',
          val => val === form.senha || 'Senhas divergentes'
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwdConfSenha ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdConfSenha = !isPwdConfSenha"
          />
        </template>
      </q-input>
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
import { useUsuarioStore } from 'stores/usuarios.js'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'CadastroUsuario',
  setup () {
    const store = useUsuarioStore()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const confirmaSenha = ref(null)
    const isPwd = ref(true)
    const isPwdConfSenha = ref(true)
    const form = ref({
      nome: null,
      email: null,
      senha: null
    })

    onMounted(async () => {
      if (route.params.id) {
        getUsuario(route.params.id)
      }
    })

    const getUsuario = async (id) => {
      try {
        const response = await store.getUsuarioById(id)
        form.value = response[0]
        confirmaSenha.value = response[0].senha
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Não foi possivel carregar o usuário', icon: 'check', color: 'negative' })
      }
    }

    const salvar = async () => {
      try {
        if (form.value.id) {
          await store.editarUsuarios(form.value)
        } else {
          await store.salvarUsuarios(form.value)
        }
        $q.notify({ message: 'Usuário salvo com sucesso', icon: 'check', color: 'positive' })
        router.push({ name: 'usuarios' })
      } catch (error) {
        console.error(error)
        $q.notify({ message: 'Não foi possivel salvar o usuário', icon: 'check', color: 'negative' })
      }
    }

    return {
      form,
      confirmaSenha,
      isPwd,
      isPwdConfSenha,
      salvar
    }
  },

  methods: {
    isValidEmail () {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(this.form.email) || 'e-mail não existe'
    }
  }
})
</script>
