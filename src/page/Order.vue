<template>
    <div class="order">
      <leftNav></leftNav>
      <div style="width: 95%;float: left;height: 100%">
        <el-row>
          <el-col :span="20" class="order_list" id="order_list">
            <el-table :data="orderData" border>
              <el-table-column>
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column id="count" prop="count" label="数量" width="90"></el-table-column>
                <el-table-column prop="price" label="金额" width="110"></el-table-column>
              </el-table-column>
            </el-table>

            <div class="totalDiv">
              <label>数量：</label>  &nbsp;&nbsp;&nbsp;&nbsp;   <label>金额：</label>元
              <router-link to="/" style="text-decoration: none;float: right;">返回</router-link>
            </div>
          </el-col>

          <el-col :span="4" style="float: right;border: solid 1px #333;margin-top: 30px;height: 100%;">
            <label>姓名：</label>{{name}}
          </el-col>
        </el-row>
      </div>

    </div>
</template>

<script>
    import leftNav from "../common/leftNav"
    import api from '../api/order'
    import store from "../vuex/store";
    export default {
        name: "Order",
        components:{
            leftNav
        },
        data(){
            return{
                orderData:[],
                name:store.state.username
            }
        },
        created:function () {
            api.getOrder((res)=>{
                // console.log(res);
                let goodsList = res.data.goodsList;
                let countList = res.data.orderList;
                for(let i=0 ; i<goodsList.length;i++){
                    for(let key in countList[i]){
                        goodsList[i][key]=countList[i][key]
                    }
                }
                console.log(goodsList)
                this.orderData = goodsList;
            },(err)=>{
                console.log(err);
            })
        },
        methods:{
        }
    }
</script>

<style scoped>
  .order_list{
    padding-left: 200px;
    margin-top: 30px;
  }
  .totalDiv{
    background-color: #fff;
    padding: 10px;
    border: 1px solid #D3dce6;
  }

</style>
