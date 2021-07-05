<template>
  <div>
    <el-container class="box">
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <!-- 
              default-active    当前激活的菜单
              background-color  背景颜色
              text-color        字体颜色
              active-text-color 当前激活菜单的文字颜色
              unique-opened     是否只保持一个子菜单打开
             -->
            <el-menu
              default-active="1-1"
              class="el-menu-vertical-demo"
              background-color="#ff6141"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              router
            >
              <el-menu-item index="/">
                <i class="el-icon-warning-outline"></i>
                <span slot="title">首页</span>
              </el-menu-item>

              <div v-for="item in user.menus " :key="item.id">
                <el-submenu :index="item.id+''" v-if="item.children">
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                  </template>
                  <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">
                    {{i.title}}
                  </el-menu-item>
                </el-submenu>

                <el-menu-item :index="item.url" v-else>{{item.title}}</el-menu-item>
              </div>


            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <el-button type="info" class="btn" @click="btn">退出</el-button>
          <p>{{user.username}}</p>
          
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions}  from "vuex"
import {successAlert} from "../../util/alert"

export default {
  computed:{
    ...mapGetters({
      user :'user'
    })
  },
  methods:{
    ...mapActions({
      reqChangeUser:"reqChangeUser"
    }),
    //退出
    btn(){
      // 清空状态层
      this.reqChangeUser({})
      // 即将跳转的提示
      successAlert("退出成功")
      // 跳转到登录页
      this.$router.push("/login")
    }
  }

};
</script>

<style scoped lang="less">
@import url("../../less/index.less");

.box {
  width: 100vw;
  height: 100vh;
}

.el-header {
  background-color: @color2;
  color: #333;
}

.el-aside {
  background-color: @color1;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.btn{
  float: right;
  margin: 10px 50px 0 20px ;
}
p{
  float: right;
  line-height: 60px;
}
</style>