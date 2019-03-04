<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="Confirm" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"></Input>
        </FormItem>
        <FormItem>
            <Button :disabled="disabled" type="primary" @click="handleSubmit('formCustom');post(formCustom.passwd)">Submit</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            
            return {
                disabled:false,
                user:'',
                formCustom: {
                    passwd: '',
                    passwdCheck: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                    
                }
            }
        },
        methods: {
            post (val){
                this.$http({
                    method : 'post',
                    url : '/Signin/api/SetPassword.json',
                    data:{
                    'password':this.formCustom.passwd
                        },
                    headers:{
                        "Authorization":localStorage.getItem('Authorization')
                    }
                    }).then((res)=> {
                    console.log(this.formCustom.passwd);
                    console.log(res.data);
                    //this.token=res.data.token;
                    if(res.data.code==0){
                        this.user=this.$route.query.user;
                        this.disabled=true;
                        this.$Message.success('注册成功!');
                        this.$router.push({path:'./success',query:{name:this.user}});
                        //alert('注册成功');
                       
                    }else{
                    //alert('登录失败，请输入正确的验证码！');
                    this.$Message.error('登录失败，请输入正确的验证码!');
                    }
                    
                    })
                    .catch((res) => {
                    console.log(res);
                    });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>