<template>
  <div>
    <el-dialog
      :title="obj.isadd ? '管理员添加' : '管理员编辑'"
      :visible.sync="obj.istrue"
      width="50%"
      @close="cancel()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"></el-switch>
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
import { useradd, userinfo, useredit } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  props: ["obj"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      adminilist: "admini/list",
      rolelist: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqadminilist: "admini/reqchenglist",
      reqtoal: "admini/reqchengtotal",
      reqlist: "role/reqchanglist",
    }),
    //清空
    concel() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //点击了取消
    cancel() {
      this.obj.istrue = false;
      this.concel();
    },
    //点击了确定
    confirm() {
      useradd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqadminilist();
          this.reqtoal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条商品信息
    getone(uid) {
      userinfo({ uid: uid }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    //点击了修改
    edit() {
      useredit(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功的弹窗
          successAlert(res.data.msg);
          // 关闭对话框并清空
          this.cancel();
          // 重新请求列表数据
          this.reqadminilist();
        } else {
          // 失败的弹窗
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqlist();
  },
};
</script>

<style  scoped>
</style>