<template>
  <q-page padding>
    <q-form
      class="row justify-center q-col-gutter-sm"
    >
      <span class="col-md-12 col-xs-12 text-h5 text-center"> Login </span>
      <div class="col-md-4 col-sm-6 q-gutter-y-md" style="display: inline-block;">
        <q-input
          outlined
          v-model="form.email"
          label="Seu email *"
          lazy-rules
          class="col-md-6 col-xs-12"
          :rules="[
            val => val && val.length > 0 || 'Campo obrigatório',
          ]"
        />
        <q-input
          outlined
          v-model="form.password"
          label="Senha *"
          lazy-rules
          :type="isPwd ? 'password' : 'text'"
          class="col-md-12 col-xs-12"
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
      </div>
      <div class="col-12" style="text-align: center;">
        <q-btn
          label="Logar"
          type="submit"
          color="primary"
          outlined
          size="lg"
          class=""
          @click.prevent="logar()"
        />
      </div>
    </q-form>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { useLoginAuthStore } from 'stores/loginAuth.js'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const isPwd = ref(true)
    const store = useLoginAuthStore()
    const router = useRouter()
    const $q = useQuasar()

    const form = ref({
      email: null,
      password: null
    })

    const logar = async () => {
      try {
        await store.login(form.value)
        router.push({ name: 'despesas' })
      } catch (error) {
        $q.notify({ message: 'Não foi possivel logar', icon: 'times', color: 'negative' })
      }
    }

    return {
      form,
      store,
      isPwd,
      logar
    }
  }
})
</script>
