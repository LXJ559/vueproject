<template>
    <div class="pos">
      <leftNav></leftNav>
      <div style="width: 95%;float: left;height: 100%;">
        <el-row>
          <el-col :span="7" class="pos-order" id="order-list">
            <el-tabs>
              <el-tab-pane label="点餐">
                <el-table :data="tableData" border style="width: 100%" >
                  <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                  <el-table-column prop="count" label="数量" width="50"></el-table-column>
                  <el-table-column prop="price" label="金额" width="70"></el-table-column>
                  <el-table-column label="操作" width="100" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                      <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="totalDiv">
                  <small>数量：</small>{{totalCount}}   &nbsp;&nbsp;&nbsp;&nbsp;   <small>金额：</small>{{totalMoney}}元
                </div>
                <div class="div-btn">
<!--                  <el-button type="warning" >挂单</el-button>-->
                  <el-button type="danger" @click="delAllGoods">删除</el-button>
                  <el-button type="success" @click="checkout">结账</el-button>
                </div>
              </el-tab-pane>

              <el-tab-pane label="挂单">
                挂单
              </el-tab-pane>
              <el-tab-pane label="外卖">
                外卖
              </el-tab-pane>
            </el-tabs>
          </el-col>

          <el-col :span="17">
            <div class="often-goods">
              <div class="title">常用商品</div>
              <div class="often-goods-list">
                <ul>
                  <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                    <span>{{goods.goodsName}}</span>
                    <span class="o-price">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="goods-type">
              <el-tabs>
                <el-tab-pane label="汉堡">
                  <ul class='cookList'>
                    <li v-for="goods in type0Goods">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="小食">
                  <ul class='cookList'>
                    <li v-for="goods in type1Goods">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="饮料">
                  <ul class='cookList'>
                    <li v-for="goods in type2Goods">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="套餐">
                  <ul class='cookList'>
                    <li v-for="goods in type3Goods">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </el-tab-pane>

              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    import api from '../api/pos'
    import leftNav from "../common/leftNav"
    export default {
        name: "Pos",
        components:{
            leftNav
        },
        data(){
            return{
                //左侧清单
                tableData:[],
                //常用商品
                oftenGoods:[],
                //下面分类商品
                type0Goods:[],
                type1Goods:[],
                type2Goods:[],
                type3Goods:[],
                totalMoney:0,
                totalCount:0
            }
        },
        created:function(){
            api.getAllGoods((res)=>{
                // console.log(res);
                this.oftenGoods = res.data.goodsList;
            },(error)=>{
                console.log('数据加载失败！')
            })
        },
        mounted:function() {
          var orderListHeight = document.body.clientHeight;
          document.getElementById('order-list').style.height = orderListHeight + 'px';
        },
        methods:{
            //添加订单列表的方法
            addOrderList(goods){
                this.totalCount=0; //汇总数量清0
                this.totalMoney=0;
                let isHave=false;
                //判断是否这个商品已经存在于订单列表
                for (let i=0; i<this.tableData.length;i++){
                    console.log(this.tableData[i].goodsId);
                    if(this.tableData[i].goodsId === goods.goodsId){
                        isHave=true; //存在
                    }
                }
                //根据isHave的值判断订单列表中是否已经有此商品
                if(isHave){
                    //存在就进行数量添加
                    let arr = this.tableData.filter(o =>o.goodsId === goods.goodsId);
                    arr[0].count++;
                    //console.log(arr);
                }else{
                    //不存在就推入数组
                    let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
                    this.tableData.push(newGoods);
                }

                //进行数量和价格的汇总计算
                this.getAllMoney();
            },

            //删除单个商品
            delSingleGoods(goods){
                console.log(goods);
                this.tableData=this.tableData.filter(o => o.goodsId != goods.goodsId);
                this.getAllMoney();
            },

            //汇总数量和金额
            getAllMoney(){
                this.totalCount=0;
                this.totalMoney=0;
                if(this.tableData){
                    this.tableData.forEach((element) => {
                        this.totalCount+=element.count;
                        this.totalMoney=this.totalMoney+(element.price*element.count);
                    });
                }
            },
            //删除所有商品
            delAllGoods() {
                this.tableData = [];
                this.totalCount = 0;
                this.totalMoney = 0;
            },
            //结账
            checkout() {
                if (this.totalCount!=0) {
                    api.checkoutMoney(this.tableData,(res)=>{
                        console.log(res.data);
                        if(res.data.status ==='success'){
                            this.tableData = [];
                            this.totalCount = 0;
                            this.totalMoney = 0;
                            this.$message.success('结账成功，感谢你又为店里出了一份力!');
                        }
                    },(err)=>{
                        console.log(err);
                        this.$message.error('请先登录！');
                    })
                }else{
                    this.$message.error('不能空结。老板了解你急切的心情！');
                }

            }
        }
    }
</script>

<style>
.pos-order{
  background-color: #F9FAFC;
  border-right: 1px solid #C0CCDA;
  height: 100%;
  /*内容溢出出现滚动条*/
  overflow: auto;
}
 .div-btn{
   margin-top: 10px;
 }
 .title{
   height: 20px;
   border-bottom: 1px solid #D3dce6;
   background-color: #F9FAFC;
   padding: 10px;
   text-align: left;
 }
 .often-goods-list ul li{
   /*去除li的点*/
   list-style: none;
   float: left;
   border: 1px solid #E5E9F2;
   padding: 10px;
   margin: 10px;
   background-color: #FFF;
   /*鼠标悬浮样式*/
   cursor: pointer;
 }
 .o-price{
   color: #58B7FF;
 }
 .goods-type{
   /*清除浮动*/
   clear: both;
 }
.cookList li{
  list-style: none;
  width:23%;
  border:1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color:#fff;
  padding: 2px;
  float:left;
  margin: 2px;

}
.cookList li span{
  display: block;
  float:left;
}
.foodImg{
  width: 40%;
}
.foodName{
  font-size: 16px;
  padding-left: 10px;
  color:brown;

}
.foodPrice{
  font-size: 16px;
  padding-left: 10px;
  padding-top:10px;
}
 .totalDiv{
   background-color: #fff;
   padding: 10px;
   border-bottom: 1px solid #D3dce6;
 }
</style>
