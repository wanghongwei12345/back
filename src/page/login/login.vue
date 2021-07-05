<template>
  <div id="login">
    <div class="cirle1"></div>
    <div class="cirle2"></div>
    <div class="cirle3"></div>
    <div class="cirle4"></div>
    <div class="box">
      <div class="content">
          <img src="../../assets/img/orange.png" alt="">
        <h3>优 质 甄 选 . 高 枕 无 忧</h3>
        <el-input placeholder="请输入你的用户名"  class="inp" clearable v-model="form.username"></el-input>
        <el-input placeholder="请输入你的密码" class="inp" show-password v-model="form.password"></el-input>
        <el-button type="danger" class="inp tn" round @click="cheng">登&nbsp;&nbsp;&nbsp;录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {userlogin} from '../../request/api'
import { successAlert, warningAlert } from "../../util/alert";
import {mapActions} from "vuex"
export default {
    data() {
      return {
        form:{
          username:"",
          password:''
        }
        
      }
    },
    methods:{
      ...mapActions({
        reqChangeUser:"reqChangeUser"
      }),
      cheng(){
        userlogin(this.form).then(res=>{
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            // 将用户的信息存储到状态层
            this.reqChangeUser(res.data.list)
            this.$router.push("/")

          }else{
            warningAlert(res.data.msg)
          }
        })
      }
    }
};
</script>

<style scoped lang="less">
@import url(../../less/index.less);
#login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(@color1, @color2);
  position: relative;
}
.box {
  width: 90%;
  height: 100%;
  background: url(../../assets/img/login.png) no-repeat;
  background-size: 700px 530px;
  background-position: right;
  box-sizing: border-box;
}
.content{
    margin-right: 20px;
    width: 370px;
    float: right;
    margin-top: 130px;
    background-color: #fffefe;
    right: 100px;
    top: 100px;
    text-align: center;
    padding-bottom: 10px;
    border-radius: 10px;
}
.content h3{
    margin:50px 0  50px;
    color: #ccc;
}
.content img{
    width: 350px;
    height: 90px;
}
.content .inp{
    width: 330px;
    margin-top: 30px;
    
}
.content .tn{
background-color: @color1;
color: #fff;
}
.cirle1{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(@color1, @color2);
  position: absolute;
}
.cirle2{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(@color2,@color1 );
  position: absolute;
  left: 10px;
  top: 300px;
}
.cirle3{
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(@color1, @color2);
  position: absolute;
  left: 270px;
  top: 300px;
}
.cirle4{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(@color1, @color2);
  position: absolute;
  right: 0;
  top: 100px;
}
</style>