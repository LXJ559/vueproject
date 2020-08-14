<template>
  <div class="left-nav">
    <ul>
      <li>
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li>
      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <div>店铺</div>
      </li>
      <li>
        <i class="icon iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="icon iconfont icon-zuanshi"></i>
        <div>统计</div>
      </li>
      <li>
        <i class="icon iconfont icon-gongnengjianyi"></i>
        <div>设置</div>
      </li>

      <li @click="table = true" type="text">
        <a class="el-icon-message-solid">
        </a>
        <div>消息</div>
      </li>

      <el-drawer
        title="消息列表"
        :visible.sync="table"
        :direction="direction"
        size="40%">

        <el-table :data="gridData" border>
          <el-table-column prop="msgTitle" label="标题" width="150px"></el-table-column>
          <el-table-column prop="msgContent" label="内容"></el-table-column>
        </el-table>
      </el-drawer>

      <li  @click="myOrder">
        <i><img src="../assets/logo.png" alt="" style="height: 20px;width: 20px"></i>
        <div>个人中心</div>
      </li>
    </ul>
  </div>
</template>

<script>
    import store from "../vuex/store";
    export default {
        data() {
            return {
                table: false,
                direction: 'ltr',
                gridData: [],
                queueReceiveSetting: { // 消息队列配置
                    websock: null,
                    client: null,
                    wsuri: 'ws://localhost:8888/pos/websocket/'+ sessionStorage.getItem("uName")
                }
            };
        },
        name: "leftNav",
        methods:{
            myOrder(){
                this.$router.push('/order');
            },
            initWebSocket () {
                // ws地址
                if (this.queueReceiveSetting.websock) {
                    this.queueReceiveSetting.websock.close()
                }
                this.queueReceiveSetting.websock = new WebSocket(this.queueReceiveSetting.wsuri)
                this.queueReceiveSetting.websock.onopen = res => {
                    console.log('开启连接')
                }
                this.queueReceiveSetting.websock.onmessage = res => {
                    let data = JSON.parse(res.data)
                    console.log('接收到的数据：', data)
                    this.gridData.push(data);
                }
                this.queueReceiveSetting.websock.onclose = res => {
                    console.log('连接关闭')
                }
                this.queueReceiveSetting.websock.onerror = res => {
                    console.log('连接出错')
                }
            }
        },
        created () {
            this.initWebSocket();
        }

    }
</script>

<style>
  .left-nav{
    color: #fff;
    font-size: 10px;
    height: 100%;
    background-color: #1D8CE0;
    float: left;
    width: 5%;
  }
  .iconfont{
    font-size: 24px;
  }
  .left-nav ul{
    padding: 0px;
    margin: 0px;
  }
  .left-nav li{
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    padding: 10px;
    cursor: pointer;
  }
</style>
