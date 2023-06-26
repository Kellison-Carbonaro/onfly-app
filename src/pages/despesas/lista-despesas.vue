<!-- eslint-disable no-tabs -->
<template>
	<loadingComponent :Loading="loading"></loadingComponent>
  <q-page padding>
    <div class="q-pa-md">
			<q-table
					title="Usuários"
					:rows="store.listaDespesas"
					:columns="columns"
					row-key="name"
					:rows-per-page-options="[0]"
			>
				<template v-slot:top>
					<span class="text-5"> Despesas</span>
					<q-space />
					<q-btn color="primary" icon="add" label="Novo despesa" :to="{ name: 'cadastro-despesa'}" />
				</template>
				<template v-slot:body-cell-acao="props">
						<q-td :props="props" class="q-gutter-sm">
							<q-btn icon="edit" color="info" dense size="sm" :label="props.value" @click="editarDespesa(props.row.id)"/>
							<q-btn icon="delete" color="negative" dense size="sm" :label="props.value" @click="deleteDespesa(props.row.id)"/>
						</q-td>
				</template>
        </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useDespesasStore } from 'stores/despesas.js'
import loadingComponent from 'src/components/loading/loadingComponent.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'


export default defineComponent({
  name: 'DespesasPage',
  setup () {
    const store = useDespesasStore()
    const loading = ref(false)
    const $q = useQuasar()
    const router = useRouter()

    onMounted(async () => {
      if (store.listaDespesas.length === 0) {
        loading.value = true
        await store.getDespesas()
        loading.value = false
      }
    })

    const columns = [
      { name: 'data', field: 'data', label: 'Data', align: 'center', sortable: true },
      { name: 'usuario', field: 'nome', label: 'Usuário', align: 'center', sortable: true },
      { name: 'valor', field: 'valor', label: 'Valor R$', align: 'center', sortable: true },
      { name: 'descricao', field: 'descricao', label: 'Descrição', align: 'center', sortable: true },
      { name: 'acao', field: 'acao', label: 'Opções', align: 'right' }
    ]

    const deleteDespesa = async (id) => {
      try {
        $q.dialog({
          title: 'Excluir',
          message: 'Deseja excluir despesa?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          loading.value = true
          await store.excluirDespesa(id)
          $q.notify({ message: 'Despesa removido com sucesso', icon: 'check', color: 'positive' })
          loading.value = false
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao remover Despesa', icon: 'times', color: 'negative' })
      }
    }
    const editarDespesa = async (id) => {
      router.push({ name: 'cadastro-despesa', params: { id } })
    }

    return {
      store,
      columns,
      loading,
      deleteDespesa,
      editarDespesa
    }
  },
  components: {
    loadingComponent
  }

})
</script>
