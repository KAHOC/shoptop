// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'
import iView from 'iview'
import axios from 'axios'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.use(iView);
Vue.prototype.$http = axios;
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://evasimu.cn';
axios.defaults.timeout = 6000; //6000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json';


//异步请求前在header里加入token
axios.interceptors.request.use(
  config => {
    if(config.url==='/login'||config.url==='/'){  //如果是登录和注册操作，则不需要携带header里面的token
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorizatior = localStorage.getItem('Authorization');
        console.log("全局"+localStorage.getItem('Authorization'));
      }
    
    }else{
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  });
//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error => {
    if(error.response){
      switch (error.response.data.code) {
        case 0:
          localStorage.removeItem('Authorization');
          this.$router.push('/');
      }
    }
  }
)
//异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    console.log("我是浏览器本地缓存的token: "+token);
    if (token === 'null' || token === '') {
      next('/');
    } else {
      next();
    }
  }
});



// axios.defaults.baseURL = 'http://evasimu.cn/Signin/api';
// axios.defaults.timeout = 6000; //6000的超时验证
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//创建一个axios实例
// const instance = axios.create();
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.interceptors.request.use = instance.interceptors.request.use;

// request拦截器
// instance.interceptors.request.use(
//       config => {
//           //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
//           if(store.state.token){
//               config.headers.Authorization = `token ${store.state.token}`;
//           }
//           return config;
//       },
//       err => {
//           return Promise.reject(err);
//       }
//   );


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
