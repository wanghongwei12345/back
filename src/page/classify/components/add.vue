<template>
  <div>
    <el-dialog
      :title="obj.isadd ? '商品分类添加' : '商品分类编辑'"
      :visible.sync="obj.istrue"
      width="50%"
      @close="cancel()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in classlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="files">
            <h2>+</h2>
            <input type="file" @change="changeimg" v-if="obj.istrue" />
            <img :src="imgurl" alt="" v-if="imgurl" />
          </div>
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
        <el-button type="primary" @click="confirm()" v-if="obj.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { cateadd, cateinfo, cateedit } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["obj"],
  data() {
    return {
      imgurl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      classlist: "classify/list",
    }),
  },
  methods: {
    ...mapActions({
      reqclass: "classify/reqchenglist",
    }),
    changeimg(e) {
      let file = e.target.files[0];
      console.log(file);
      this.imgurl = URL.createObjectURL(file);
      this.form.img = file;
    },
    concel() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imgurl = "";
    },
    //取消
    cancel() {
      this.concel()
      this.obj.istrue = false;
    },
    //添加
    confirm() {
      console.log(this.form);
      cateadd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqclass();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getone(id) {
      cateinfo({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgurl = this.$pre + this.form.img;
      });
    },
    //修改
    edit() {
      
      cateedit(this.form).then((res) => {
        
        if (res.data.code == 200) {
          // 成功的弹窗
          successAlert(res.data.msg);
          // 关闭对话框并清空
          this.cancel();
          // 重新请求列表数据
          this.reqclass();
        } else {
          // 失败的弹窗
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqclass();
  },
};
</script>
<style >
.files {
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  position: relative;
}
.files h2 {
  font-size: 50px;
  text-align: center;
  line-height: 200px;
  margin: 0 auto;
}
.files input {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  opacity: 0;
}
.files img {
  width: 200px;
  height: 200px;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
}
</style>