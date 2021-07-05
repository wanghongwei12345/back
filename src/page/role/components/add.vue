<template>
  <div>
    <el-dialog
      :title="obj.isadd ? '角色添加' : '角色编辑'"
      :visible.sync="obj.istrue"
      width="50%"
      @close="cancel()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit()" v-if="obj.isadd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="edit()">编 辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { menulist, roleadd, roleinfo, roleedit } from "../../../request/api";
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  props: ["obj"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqmenulist: "menu/reqchenglist",
      reqlist: "role/reqchanglist",
    }),
    //清空
    concel() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //清空树形控件
      this.$refs.tree.setCheckedKeys([]);
    },
    //点击了取消
    cancel() {
      this.obj.istrue = false;
      this.concel();
    },
    //确定
    submit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleadd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqlist();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条信息
    getone(id) {
      roleinfo({ id: id }).then((res) => {
        this.form = {
          ...res.data.list,
          menus: JSON.parse(res.data.list.menus),
        };
        this.$refs.tree.setCheckedKeys(this.form.menus);
        this.form.id = id;
      });
    },
    //编辑
    edit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      roleedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqlist();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqmenulist();
  },
};
</script>


<style scoped>
</style>