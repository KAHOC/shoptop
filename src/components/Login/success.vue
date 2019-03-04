<template>
  <div class="">
    <h2>亲爱的{{this.$route.query.name}},你将在{{time}}秒后自动跳转</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      time:0,
    }
  },
  methods:{
    countDown(){
      let THIS=this;
      THIS.time--;
    }

  },
  mounted(){
    let THIS=this;
    THIS.time=5;
    setInterval(THIS.countDown,1000);
  },
  watch:{
    'time':function(newVal,oldVal){
          if(newVal==0){
            this.$router.push('/login');
          }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>