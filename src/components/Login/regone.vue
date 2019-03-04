<template>
    <div>
            <form action="">
            <Input v-model="val" icon="ios-clock-outline" placeholder="输入您的邮箱..." style="width: 200px" />
            <Button @click="post(val);getCode()" type="info" :disabled="disabled">
                <span id="show" v-show="show">&nbsp;获取验证码</span>
                <span v-show="!show" class="count">请{{count}}秒后重试</span>
            </Button>
            <br/>
            <Input v-model="vcode" style="width:300px"/>
            <br/>
            <Button type="info" @click="getVerify(vcode);" long style="width:300px;">提交</Button>
            </form>
        </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
     data () {
        return {
        userToken: '',
        pass: '',
        account: '',
        val:'',
        show: true,
        count: '',
        timer: null,
        disabled:false,
        vcode:'',
        token:''
        
        }
     },
     methods: {
       ...mapMutations(['changeLogin']),
    post:function(val){
      if(val==0){
            alert("邮箱不能为空!");
          }else{
            this.$http({
              method: 'post',
              url: '/Signin/api/VerifyMail.json',
              data:{
                'email':this.val
              },
              headers:{
              "Content-Type":"application/json"
        }}).then((res)=> {
          console.log(this.val);
          console.log(res.data.code);
          this.token=res.data.token;
          })
        .catch((res) => {
          console.log(res);
        });
          }
      
    },
    getCode(){
				const TIME_COUNT = 5;
				if (!this.timer) {
					this.disabled=true;
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
					this.count--;
					this.a = false;
					} else {
					this.disabled=false;
					this.show = true;
					clearInterval(this.timer);
					this.timer = null;
					}
					}, 1000)
				}
    },
    getVerify:function(vcode){
      let _this=this;
      this.$http({
        method : 'post',
        url : '/Signin/api/VerifyCode.json',
        data:{
          'verifycode':vcode
        },
        headers:{
           "Authorization":this.token
        }
      }).then(res => {  //res是返回结果
            console.log(res.data);
            _this.userToken=this.token;
            console.log(this.userToken)//获取到的token
            _this.changeLogin({ Authorization: this.userToken });
            if(res.data.code==0){
                this.$router.push({path:'./confirm',query:{user:this.val}});
                //alert('注册成功');
                this.$Message.success('注册成功!');
            }else{
              //alert('登录失败，请输入正确的验证码！');
              this.$Message.error('登录失败，请输入正确的验证码!');
            }
            
          }).catch(err => { //请求失败就会捕获报错信息
            console.log('服务器连接失败');
            console.log(err);
          })
    }
  }
}
</script>
<style>

</style>
