import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import resheader from './../components/Header/resheader.vue'
import regone from './../components/Login/regone.vue'
import login from './../components/Login/login.vue'
import confirm from './../components/Login/confirm.vue'
import success from './../components/Login/success.vue'
import home from './../components/Home/home.vue'

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path :'/resheader',
      name: 'resheader',
      component: resheader
    },
    {
      path :'/regone',
      name: 'regone',
      component: regone
    },
    {
      path :'/login',
      name: 'login',
      component: login
    },
    {
      path :'/confirm',
      name: 'confirm',
      component: confirm
    },
    {
      path :'/success',
      name: 'success',
      component: success
    },
    {
      path :'/home',
      name: 'home',
      component: home
    }
  ]
})
