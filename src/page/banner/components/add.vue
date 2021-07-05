<template>
  <div>
    <el-dialog
      :title="obj.isadd ? '轮播图添加' : '轮播图编辑'"
      :visible.sync="obj.istrue"
      width="50%"
      @close="cancel()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
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
import { banneradd, bannerinfo, banneredit } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["obj"],
  data() {
    return {
      imgurl: "",
      form: {
        title: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      classlist: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqclass: "banner/reqchenglist",
    }),
    changeimg(e) {
      let file = e.target.files[0];
      console.log(file);
      this.imgurl = URL.createObjectURL(file);
      this.form.img = file;
    },
    concel() {
      this.form = {
        title: "",
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
      banneradd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqclass();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条信息
    getone(id) {
      bannerinfo({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgurl = this.$pre + this.form.img;
      });
    },
    //修改
    edit() {
      banneredit(this.form).then((res) => {
        
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