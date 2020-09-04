<template>
  <div class="reset" style="margin-top: 200px">
    <el-row>
      <!--offset 属性可以指定分栏偏移的栏数。-->
      <el-col :span="5" :offset="9">
        <el-form :model="user" ref="formValidate" :rules="ruleValidate" class="user_form" size="small">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" placeholder="请输入密码" style="margin-left:28px;width: auto" />
          </el-form-item>
          <el-form-item label="确认密码" prop="reqPassword">
            <el-input type="password" v-model="user.reqPassword" placeholder="请输入密码" style="width: auto" @input="checkForPsw"/>
          </el-form-item>
          <el-form-item>
            <el-button long @click="submit" :disabled="isDisabled">
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
    import  api from "../api/reset"
    export default {
        name: "Reset",
        data(){
            return {
                user:{
                    password: "",
                    reqPassword:""
                },
                ruleValidate:{
                    password:[{ required: true, message: '密码不能为空', trigger: 'blur'},
                        {required: true, message: '密码长度在8到20', trigger: ['blur', 'change'],min:8,max:20}],
                    reqPassword:[{ required: true,message:'请输入有效信息',trigger: ['blur', 'change']}]
                },
                isDisabled:false,
                count:0,
                timer: null,
            }
        },

        methods:{
            checkForPsw(){
              this.isDisabled = this.user.password !== this.user.reqPassword;
            },
            submit(){
                this.$refs['formValidate'].validate((valid)=>{
                    if (valid){
                        api.reset(this.user,(res)=>{
                            if (res.data.success==='success'){
                                this.$message.success('修改成功');
                                if (!this.timer) {
                                    this.count = 2;
                                    this.timer = setInterval(() => {
                                        if (this.count > 0 && this.count <= 2) {
                                            this.count--
                                        } else {
                                            clearInterval(this.timer);
                                            this.timer = null;
                                            this.$router.push('/login');
                                        }
                                    }, 1000)
                                }
                            }else {
                                this.$message.error('修改失败，请重新操作');
                            }
                        },(error)=>{
                            this.$message.error('未知的错误');
                        })
                    }
                })
            },

            back(){
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>
