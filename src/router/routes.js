const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('src/pages/login/login.vue') },
      { path: 'login', name: 'login', component: () => import('src/pages/login/login.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },

  {
    path: '/despesas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'despesas',
        path: '/despesas',
        component: () => import('pages/despesas/lista-despesas.vue')
      },
      {
        name: 'cadastro-despesa',
        path: 'cadastro-despesa/:id?',
        component: () => import('pages/despesas/cadastro-despesa.vue')
      }
    ]
  },

  {
    path: '/usuarios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'usuarios',
        path: '/usuarios',
        component: () => import('pages/usuarios/lista-usuarios.vue')
      },
      {
        name: 'cadastro-usuario',
        path: 'cadastro-usuario/:id?',
        component: () => import('pages/usuarios/cadastro-usuario.vue')
      }
    ]
  }
]

export default routes
