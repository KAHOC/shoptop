<template>
  <div id="app">
    
    <RegHeader></RegHeader>
    <router-view></router-view>
    <Home></Home>
  </div>
</template>
 
<script>
import Home from './components/Home/home'
import RegHeader from './components/Header/resheader'
export default {
  name: 'App',
  components: {
  RegHeader,
  Home
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
