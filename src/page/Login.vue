<template>
  <div class="login">
        <!--用:model不能用:data,否则在验证数据合法性时会出错-->
        <el-form :model="user" ref="formValidate" :rules="ruleValidate" class="user_form" size="small">
          <el-form-item label="姓名" prop="username">
            <el-input type="text" v-model="user.username" placeholder="请输入用户名" style="width: 200px"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" placeholder="请输入密码" style="width: 200px"/>
          </el-form-item>
          <el-form-item>
            <el-button long @click="register">
              注  册
            </el-button>
            <el-button long @click="login">
              登  录
            </el-button>
            <br>
            <el-link type="primary" :underline="false" :href="findPsw" style="float: right">忘记密码？</el-link>
          </el-form-item>
        </el-form>
  </div>
</template>

<script>
    import api from '../api/login'
    export default {
        name: "Login",
        data(){
            return {
                user:{
                    username: "",
                    password: ""
                },
                ruleValidate:{
                    username:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                    password:[{ required: true, message: '密码不能为空', trigger: 'blur' }]
                },
                findPsw:'http://localhost:8080/#/findPsw',
            }
        },
        created(){
            localStorage.removeItem("token");
        },

        methods:{
            register(){
                this.$router.push('/register');
            },
            login(){
                this.$refs['formValidate'].validate((valid)=>{
                    if(valid){
                        api.login(this.user,(res)=>{
                            console.log(res.data);
                            if(res.data.status ==='success'){
                                //这两个一定要按顺序，否则第一次登陆报错
                                localStorage.setItem("token",res.data.token);
                                // store.commit('add',this.user.username); //刷新页面信息失效,用下面两种方式
                                localStorage.setItem("uName",this.user.username);
                                // sessionStorage.setItem("uName",this.user.username); //这种是为了保证与token一致，所以用上面的
                                this.$router.push('/');
                            }else if(res.data.status === 'please register'){
                                this.$message.error('请先注册！');
                                this.user.username = "";
                                this.user.password = "";
                            } else {
                                this.$message.error('用户名或密码不正确！');
                            }
                        },(error)=>{
                            console.log(error);
                        })
                    }else {
                        this.$message.error('请输入正确的用户名或者密码！');
                    }
                })
            }
        }
    }
</script>

<style scoped>
.login{
  border: 1px solid #D3dce6;
  padding: 50px;
  margin-top: 100px;
  margin-left: 500px;
  width: 250px;
  background-color: #E5E9F2;
}

</style>
