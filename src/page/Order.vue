<template>
    <div class="order">
      <leftNav></leftNav>
      <div style="width: 95%;float: left;height: 100%">
        <el-row>
          <el-col :span="20" class="order_list" id="order_list">
            <el-table :data="orderData" border>
              <el-table-column>
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="count" label="数量" width="90"></el-table-column>
                <el-table-column prop="price" label="金额" width="110"></el-table-column>
              </el-table-column>
            </el-table>

            <div class="totalDiv">
              <small>数量：</small>  &nbsp;&nbsp;&nbsp;&nbsp;   <small>金额：</small>元
            </div>
            <el-button  size="mini" @click="back" style="margin-left: 200px">
              返回
            </el-button>
          </el-col>
        </el-row>
      </div>

    </div>
</template>

<script>
    import leftNav from "../common/leftNav"
    import api from '../api/order'
    export default {
        name: "Order",
        components:{
            leftNav
        },
        data(){
            return{
                orderData:[]
            }
        },
        created:function () {
            api.getOrder((res)=>{
                console.log(res);
                this.orderData = res.data;
            },(err)=>{
                console.log(err);
            })
        },
        methods:{
            back(){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
  .order_list{
    padding-left: 200px;
  }
  .totalDiv{
    background-color: #fff;
    padding: 10px;
    border: 1px solid #D3dce6;
  }

</style>
