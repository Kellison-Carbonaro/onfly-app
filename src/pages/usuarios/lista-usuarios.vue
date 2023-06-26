<!-- eslint-disable no-tabs -->
<template>
	<loadingComponent :Loading="loading"></loadingComponent>
  <q-page padding>
		<div class="q-pa-md">
			<q-table
				title="Usuários"
				:rows="store.listaUsuarios"
				:columns="columns"
				row-key="name"
				:rows-per-page-options="[0]"
			>
			<template v-slot:top>
				<span class="text-5"> Usuarios</span>
				<q-space />
        <q-btn color="primary" icon="group_add" label="Novo Usuarios" :to="{ name: 'cadastro-usuario'}" />
      </template>
				<template v-slot:body-cell-acao="props">
					<q-td :props="props" class="q-gutter-sm">
						<q-btn icon="edit" color="info" dense size="sm" :label="props.value" @click="editarUsuarios(props.row.id)"/>
						<q-btn icon="delete" color="negative" dense size="sm" :label="props.value" @click="deleteUsuarios(props.row.id)"/>
					</q-td>
				</template>
			</q-table>
		</div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useUsuarioStore } from 'stores/usuarios.js'
import loadingComponent from 'src/components/loading/loadingComponent.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'UsuariosPage',
  setup () {
    const store = useUsuarioStore()
    const loading = ref(false)
    const $q = useQuasar()
    const router = useRouter()

    onMounted(async () => {
      if (store.listaUsuarios.length === 0) {
        loading.value = true
        await store.getUsuarios()
        loading.value = false
      }
    })

    const columns = [
      { name: 'nome', field: 'nome', label: 'Nome', align: 'center', sortable: true },
      { name: 'email', field: 'email', label: 'E-mail', align: 'center', sortable: true },
      { name: 'acao', field: 'acao', label: 'Opções', align: 'right' }
    ]

    const deleteUsuarios = async (id) => {
      try {
        $q.dialog({
          title: 'Excluir',
          message: 'Deseja excluir usuário?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          loading.value = true
          await store.excluirUsuario(id)
          $q.notify({ message: 'Usuário removido com sucesso', icon: 'check', color: 'positive' })
          loading.value = false
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao remover usuário', icon: 'times', color: 'negative' })
      }
    }
    const editarUsuarios = async (id) => {
      router.push({ name: 'cadastro-usuario', params: { id } })
    }

    return {
      store,
      columns,
      loading,
      deleteUsuarios,
      editarUsuarios
    }
  },
  components: {
    loadingComponent
  }
})
</script>
