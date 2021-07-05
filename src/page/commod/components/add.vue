<template>
  <div>
    <el-dialog
      :title="obj.isadd ? '菜单添加' : '菜单编辑'"
      :visible.sync="obj.istrue"
      width="50%"
      @close="cancel()"
    >
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" v-for="(item,index) in benadd" :key="index">
          <div class="btn">
            <el-input v-model="item.arr" ></el-input>
            <el-button type="info"  v-if="index == 0" @click="btn()">新增规格属性</el-button>
            <el-button type="primary" v-else @click="splice(index)">删 除</el-button>
          </div>
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
import { specsadd, specsinfo, specsedit } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["obj"],
  data() {
    return {
      benadd: [{arr :""},{arr :""}],
      form: {
        specsname: '',
        attrs: "",
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
    btn(){
      this.benadd.push({arr :""})
    },
    splice(index){
      this.benadd.splice(index,1)
    },
    ...mapActions({
      reqlist: "commod/reqchenglist",
      reqtotal:'commod/reqchengtotal'
    }),
    changeimg(e) {
      let file = e.target.files[0];
      console.log(file);
      this.imgurl = URL.createObjectURL(file);
      this.form.img = file;
    },
    concel() {
      this.form = {
        specsname: '',
        attrs: "",
        status: 1,
      };
      this.benadd = [{arr :''},{arr :''}]
    },
    //取消
    cancel() {
      this.concel()
      this.obj.istrue = false;
    },
    //添加
    confirm() {
      this.form.attrs = JSON.stringify(this.benadd.map((item) => item.arr))
      
      specsadd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqlist();
          this.reqtotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getone(id) {
      specsinfo({ id: id }).then(res => {
        this.benadd = JSON.parse(res.data.list[0].attrs).map((item) => ({arr : item}))
        this.form = res.data.list[0];
        this.form.id = id;
        
      });
    },
    //修改
    edit() {
      this.form.attrs = JSON.stringify(this.benadd.map((item) => item.arr))
      specsedit(this.form).then((res) => {
        
        if (res.data.code == 200) {
          // 成功的弹窗
          successAlert(res.data.msg);
          // 关闭对话框并清空
          this.cancel();
          // 重新请求列表数据
          this.reqlist();
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
<style >
.btn{
  display: flex;
}
</style>