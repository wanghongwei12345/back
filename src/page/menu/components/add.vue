<template>
  <div>
    <el-dialog
      :title="obj.isadd? '菜单添加':'菜单编辑'"
      :visible.sync="obj.istrue"
      width="50%"
      @close="cancel()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="change()"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in menulist" :key="item.id" :label="item.title" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1" disabled>目录</el-radio>
            <el-radio :label="2" disabled>菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标" v-show="this.form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option
              v-for="(item, index) in iconadd"
              :key="index"
              :value="item"
            >
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-show="this.form.type == 2">
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              v-for="(item, index) in menurouter"
              :key="index"
              :label="item.meta.title"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()" v-if="obj.isadd">添 加</el-button>
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { menurouter } from "../../../router/index";
import { menuadd,menuinfo,menuedit } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["obj"],
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      iconadd: [
        "el-icon-star-off",
        "el-icon-help",
        "el-icon-video-camera",
        "el-icon-umbrella",
        "el-icon-data-analysis",
      ],
      menurouter: menurouter,
    };
  },
  computed:{
    ...mapGetters({
      menulist:'menu/list'
    })
  },
  methods: {
    ...mapActions({
      reqmenulist:'menu/reqchenglist'
    }),
    //清空
    concel() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //点击了取消
    cancel() {
      this.obj.istrue = false;
      this.concel();
    },
    //上级菜单发生变换
    change() {
      if (this.form.pid == 0) {
        this.form.type = 1;
        this.form.url = "";
      } else {
        this.form.type = 2;
        this.form.icon = "";
      }
    },
    //点击了确定
    confirm() {
      menuadd(this.form).then( res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqmenulist()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条商品信息
    getone(id){
      menuinfo({id:id}).then(res=>{
        this.form = res.data.list;
        this.form.id = id
      })
    },
    //点击了修改
    edit(){
      menuedit(this.form).then(res=>{
        if(res.data.code == 200){
          // 成功的弹窗
          successAlert(res.data.msg)
          // 关闭对话框并清空
          this.cancel()
          // 重新请求列表数据
          this.reqmenulist()
        }else{
          // 失败的弹窗
          warningAlert(res.data.msg)
        }
      })
    }
  },
};
</script>

<style  scoped>
</style>