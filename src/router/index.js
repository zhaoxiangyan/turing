import Vue from 'vue'
import Router from 'vue-router'
// 安装vue-router插件
Vue.use(Router)

export default new Router({
  mode: 'history',
  // 打包之前要取消html5的history模式
  // base: '/system/',
  routes: [
    {
      path: '*',
      component: resolve => require(['../components/common/Notfound.vue'], resolve)
    },
     // 路由地址重定向
    {
      path: '/system/',
      redirect: '/system/login'
    },
    {
      path: '/system/login',
      component: resolve => require(['../components/common/Login.vue'], resolve)
    },
    {
      path: '/system/findpassword',
      component: resolve => require(['../components/common/Findpassword.vue'], resolve)
    },
    {
      path: '/system/register',
      component: resolve => require(['../components/common/Register.vue'], resolve)
    },
    {
      path: '/system/protocol',
      component: resolve => require(['../components/common/Protocol.vue'], resolve)
    },
    // {
    //   path: '/system/email',
    //   component: resolve => require(['../components/common/Email.vue'], resolve)
    // },
    {
      path: '/system/add',
      component: resolve => require(['../components/common/Add.vue'], resolve)
    },
    {
      path: '/system/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/Account.vue'], resolve)
        },
        {
          path: '/system/cooperation',
          component: resolve => require(['../components/page/Cooperation.vue'], resolve)
        },
        {
          path: '/system/transaction',
          component: resolve => require(['../components/page/Transaction.vue'], resolve)
        },
        {
          path: '/system/information',
          component: resolve => require(['../components/page/Information.vue'], resolve)
        }
      ]
    },
    // 管理员页面路由
    {
      path: '/system/admin/',
      redirect: '/system/admin/login'
    },
    {
      path: '/system/admin/login',
      component: resolve => require(['../components/admin/common/Login.vue'], resolve)
    },
    {
      path: '/system/admin/home',
      component: resolve => require(['../components/admin/common/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/admin/page/Account.vue'], resolve)
        },
        {
          path: '/system/admin/cooperation',
          component: resolve => require(['../components/admin/page/Cooperation.vue'], resolve)
        },
        {
          path: '/system/admin/information',
          component: resolve => require(['../components/admin/page/Information.vue'], resolve)
        }
        // {
        //   path: '/system/admin/three',
        //   component: resolve => require(['../components/admin/page/Three.vue'], resolve)
        // }
      ]
    }
  ]
})

