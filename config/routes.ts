export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },

  {
    path:'/admin',
    name: '系统管理',
    routes: [
      {
        path: "/admin/user",
        component: './management/user',

        name:'user',
      },

      {
        path: "/admin/menu",
        component: './management/menu',
        name:'menu'
      },
      {
        path: "/admin/role",
        component: './management/role',
        name:'role'
      }
      ,
      {
        path: "/admin/dept",
        component: './management/dept',
        name:'dept'
      }
      ,
      {
        path: "/admin/post",
        component: './management/post',
        name:'post'
      }
      ,
      {
        path: "/admin/log",
        component: './management/log',
        name:'log'
      }
      ,
      {
        path: "/admin/dict",
        component: './management/dict',
        name:'dict'
      },
      {
        path: "/admin/dictItem",
        component: './management/dictItem',
        name:'dictItem'
      },
      {
        path: "/admin/post",
        component: './management/post',
        name:'post'
      },

    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',

    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
