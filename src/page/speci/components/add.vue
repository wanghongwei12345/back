<template>
  <div>
    <el-dialog
      :title="obj.isadd ? '分类添加' : '分类编辑'"
      :visible.sync="obj.istrue"
      width="50%"
      @close="cancel()"
      @opened="opened()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
            @change="changone"
          >
            <el-option
              v-for="(item, index) in classlist"
              :key="index"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
            <el-option
              v-for="item in istwo"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <div class="files">
            <h2>+</h2>
            <input type="file" @change="changeimg" v-if="obj.istrue" />
            <img :src="imgurl" alt="" v-if="imgurl" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择商品规格"
            @change="chengshopp"
          >
            <el-option
              v-for="(item, index) in commodlist"
              :key="index"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性">
          <el-select
            v-model="form.specsattr"
            multiple
            placeholder="请选择规格属性"
          >
            <el-option
              v-for="(item, index) in isshopp"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <div id="div1" v-if="obj.istrue"></div>
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
import { catelist, goodsadd, goodsinfo, goodsedit } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";
//富文本编译器
import E from "wangeditor";
export default {
  props: ["obj"],
  data() {
    return {
      imgurl: "",
      //渲染二级分类
      istwo: "",
      //渲染规格属性
      isshopp: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      commodlist: "commod/list",
      classlist: "classify/list",
      specilist:'speci/list',
      chengtotal:'speci/total'
    }),
  },
  methods: {
    ...mapActions({
      reqcommod: "commod/reqchenglist",
      reqclass: "classify/reqchenglist",
      reqspecilist:'speci/reqchenglist',
      reqpage:"speci/reqchengpage",
      reqtotal:'speci/reqchengtotal'
    }),
    opened() {
      this.editor = new E("#div1");
      this.editor.create();

      // // 给富文本编辑器设置内容
      this.editor.txt.html(this.form.description);
    },
    changeimg(e) {
      let file = e.target.files[0];
      console.log(file);
      this.imgurl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //点击一级分类
    changone() {
      catelist({ pid: this.form.first_cateid }).then((res) => {
        this.istwo = res.data.list;
        this.form.second_cateid = "";
      });
    },
    //点击商品规格
    chengshopp() {
      let data = this.commodlist.find((item) => item.id == this.form.specsid);
      this.isshopp = data.attrs;
      this.form.specsattr = "";
    },
    concel() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgurl = "";
      this.istwo = "";
      this.isshopp = "";
    },
    //取消
    cancel() {
      this.concel();
      this.obj.istrue = false;
    },
    //添加
    confirm() {
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
        description: this.editor.txt.html(),
      };
      goodsadd(data).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqspecilist();
          this.reqtotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条信息
    getone(id) {
      goodsinfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.specsattr = JSON.parse(this.form.specsattr)
        catelist({pid: this.form.first_cateid}).then(res=>{
          this.istwo = res.data.list
        })
        this.imgurl = this.$pre + this.form.img;
        let data = this.commodlist.find(
          (item) => item.id == this.form.specsid
        );
        this.form.id = id;
      });
    },
    //修改
    edit() {
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
        description: this.editor.txt.html(),
      };
      goodsedit(data).then((res) => {
        if (res.data.code == 200) {
          // 成功的弹窗
          successAlert(res.data.msg);
          // 关闭对话框并清空
          this.cancel();
          // 重新请求列表数据
          this.reqspecilist();
        } else {
          // 失败的弹窗
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqcommod();
    this.reqclass();
    this.reqspecilist()
    this.reqtotal()
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