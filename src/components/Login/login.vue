<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline');post(formInline)">Signin</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入6~14位密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            post (val){
                this.$http({
                    method : 'post',
                    url : '/Login/api/userlogin.json',
                    data:{
                        'userid':this.formInline.user,
                        'password':this.formInline.password
                        },
                    headers:{

                    }
                    }).then((res)=> {
                    //console.log(res.data);
                    //this.token=res.data.token;
                    if(res.data.code==0){
                        this.$router.push('/login');
                        alert('登录成功');
                    console.log(res.data.code);
                    console.log(res.data.token);
                        //this.$Message.success('注册成功!');
                    }else{
                    //alert('登录失败，请输入正确的验证码！');
                    this.$Message.error('用户名或密码错误');
                    }
                    
                    })
                    .catch((res) => {
                    console.log(res);
                    });
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //this.$Message.success('Success!');
                    } else {
                        //this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>