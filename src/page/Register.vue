<template>
  <div class="register">
    <!--用:model不能用:data,否则在验证数据合法性时会出错-->
    <el-form :model="user" ref="formValidate" :rules="ruleValidate" class="user_form" size="small">
      <el-form-item label="姓名" prop="username">
        <el-input type="text" v-model="user.username" placeholder="请输入用户名" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="user.password" placeholder="请输入密码" style="width: 200px"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email" placeholder="请输入邮箱" style="width: 200px"/>
      </el-form-item>
      <el-form-item>
        <el-button long @click="register">
          注  册
        </el-button>
        <el-button long @click="login">
          登  录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import api from '../api/login'
    export default {
        name: "register",
        data(){
            return {
                user:{
                    username: "",
                    password: "",
                    email: ""
                },
                ruleValidate:{
                    username:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                    password:[{ required: true, message: '密码不能为空', trigger: 'blur' }],
                    email:[{ required: true, message: '邮箱不能为空', trigger: 'blur' },{
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change'],
                    }],
                }
            }
        },
        methods:{
            register(){
                this.$refs['formValidate'].validate((valid)=>{
                    if (valid){
                        api.register(this.user,(res)=>{
                            console.log(res.data);
                            if (res.data.message === '注册成功'){
                                //this.$message.success('注册成功');
                                // const loading = this.$loading({
                                //     lock: true,
                                //     text: '注册成功,两秒后自动跳转',
                                //     spinner: 'el-icon-loading',
                                //     background: 'rgba(0, 0, 0, 0.7)'
                                // });
                                // setTimeout(() => {
                                //     loading.close();
                                // }, 2000);
                                this.$router.push('/login');
                            }else {
                                this.$message.error('该用户已被注册，请直接登录!')
                            }
                        },(error)=>{
                            console.log(error);
                            this.$message.error('未知的错误');
                        })
                    }else {
                        this.$message.error('请输入正确的用户信息！');
                    }
                })
            },
            login(){
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
  .register{
    border: 1px solid #D3dce6;
    padding: 50px;
    margin-top: 100px;
    margin-left: 500px;
    width: 250px;
    background-color: #E5E9F2;
  }
</style>
