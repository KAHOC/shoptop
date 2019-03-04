<template>
  <v-card class="bot" flat>
   <div class="headline text-xs-center pa-5">
    <!-- <router-link :to="{name:'success'}"></router-link> -->
    </div>
    <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent">
      <v-btn color="teal" flat value="regone" @click="routeTo"> 
        <span>首页</span>
       <Icon type="ios-home" size="30"/>
      </v-btn>

      <v-btn color="teal" flat value="itemize" @click="routeTo1">
        <span>分类</span>
        <Icon type="ios-list-box" size="30"/>
      </v-btn>

      <v-btn color="teal" flat value="cart" @click="routeTo2">
        <span>购物车</span>
        <Icon type="ios-cart" size="30"/>
      </v-btn>

      <v-btn color="teal" flat value="mine" @click="routeTo3">
        <span>我的</span>
        <Icon type="ios-person" size="30"/>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        bottomNav: 'regone',
        value:''
      }
    },
    methods:{
      routeTo() {
            this.$router.push(name="success");
        },
      routeTo1() {
            this.$router.push(name="regone");
        },
      routeTo2() {
            this.$router.push(name="login");
        },
      routeTo3() {
            this.$router.push(name="confirm");
        },
    }
  }
</script>
<style>
.bot{
  	position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: 5px;
		background: #fff;
}
.col{
  
  height: 500px;
}
</style>
