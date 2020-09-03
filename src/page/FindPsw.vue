<template>
  <div class="findPsw" style="margin-top: 100px">
    <el-row>
      <!--offset 属性可以指定分栏偏移的栏数。-->
      <el-col :span="5" :offset="9">
        <el-form :model="user" ref="formValidate" :rules="ruleValidate" class="user_form" size="small">
          <el-form-item label="姓名" prop="username">
            <el-input type="text" v-model="user.username" placeholder="请输入用户名" style="width: auto" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input  v-model="user.email" placeholder="请输入邮箱" style="width: auto" />
          </el-form-item>
          <el-form-item label="验证码" prop="VerificationCode" style="width: 800px">
            <el-input type="text" v-model="user.VerificationCode" placeholder="请输入验证码" style="width: auto;float: left;margin-left: 10px"/>
            <el-button v-show="show" @click="getVerificationCode" style="margin-left:40px;float: left">获取验证码</el-button>
            <el-button id="vCode" v-show="!show" :disabled="isDisabled" @click="getVerificationCode" style="margin-left:40px;float: left">
              {{count}}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button long @click="submit">
              提交
            </el-button>
            <el-button long @click="back">
              返 回
            </el-button>
            <br>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import api from "../api/FindPsw";
    export default {
        name: "FindPsw",
        data(){
            return {
                user:{
                    username: "",
                    email: "",
                    VerificationCode:""
                },
                ruleValidate:{
                    username:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                    email:[{ required: true, message: '邮箱不能为空', trigger: 'blur' },{
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change'],
                    }]
                },
                count:0,
                timer:null,
                show:true,
                isDisabled:false
            }
        },

        methods:{
            getVerificationCode(){
                this.$refs['formValidate'].validate((valid)=>{
                    if (valid){
                        api.getVerificationCode(this.user,(res)=>{
                            if(res.data.success==='success'){
                                this.$message.success('验证码已发送至您邮箱');
                                document.getElementById("vCode").style.backgroundColor="RGB(236,245,255)";
                                const Timer_count = 60*5;
                                if(!this.timer) {
                                    this.count = Timer_count;
                                    this.timer = setInterval(() => {
                                        if (this.count > 0 && this.count <= Timer_count) {
                                            this.isDisabled = true;
                                            this.show = false;
                                            this.count--
                                        } else {
                                            this.isDisabled = false;
                                            this.count = '重新获取';
                                            clearInterval(this.timer);
                                            this.timer = null
                                        }
                                    }, 1000)
                                }else {
                                    this.$message.error("出错了，请刷新页面重新获取");
                                }
                            }
                        });
                    }else {
                        this.$message.error("请输入正确的信息");
                    }
                })
            },

            submit(){
                api.checkVCode(this.user,(res)=>{
                    if (res.data.success==='success'){
                        this.$router.push('/login');
                    }else{
                        this.$message.error(res.data.message);
                    }
                },(error)=>{
                    this.$message.error(error)
                })
            },
            back(){
                this.$router.back();
            }
        }
    }
</script>

<style scoped>

</style>
