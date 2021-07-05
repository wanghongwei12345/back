<template>
  <div>
    <el-dialog
      :title="obj.isadd ? '活动添加' : '活动编辑'"
      :visible.sync="obj.istrue"
      width="60%"
      @close="cancel()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item >
        <el-form-item label="活动期限">
          <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        </el-form-item>
        

        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" placeholder="请选择一级分类" @change="changone">
            <el-option
              v-for="(item, index) in classlist"
              :key="index"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类" @change="changtwo">
            <el-option
              v-for="(item, index) in istwo"
              :key="index"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品">
          <el-select v-model="form.goodsid" placeholder="请选择选择商品">
            <el-option
              v-for="(item, index) in isthree"
              :key="index"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { catelist,goodslist,seckadd, seckinfo, seckedit } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["obj"],
  data() {
    return {
      value1:[],
      //二级分类渲染
      istwo:[],
      isthree:[],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid:"",
        second_cateid:"",
        goodsid:"",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      classlist: "classify/list",
      seckilllist:"seckill/list"
    }),
  },
  methods: {
    ...mapActions({
      reqclass: "classify/reqchenglist",
      reqseckill:'seckill/reqchenglist',
    }),
  
    //点击了一级分类
    changone(){
      catelist({pid:this.form.first_cateid}).then(res=>{
        this.istwo = res.data.list
        this.form.second_cateid = '';
        this.form.goodsid = ''
      })
    },
    //点击了二级分类
    changtwo(){
      goodslist({fid:this.form.first_cateid,sid:this.form.second_cateid}).then(res=>{
        this.isthree = res.data.list
        this.form.goodsid = ""
      })
      

    },
    //清空
    concel() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid:"",
        second_cateid:"",
        goodsid:"",
        status: 1,
      };
      
      this.isthree = '';
      this.istwo = "";
    },
    //取消
    cancel() {
      this.concel();
      this.obj.istrue = false;
    },
    //添加
    confirm() {
      let data ={
        ...this.form ,
        begintime :new Date(this.value1[0]).getTime(),
        endtime :new Date(this.value1[1]).getTime()
      }
      
      seckadd(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.reqseckill();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取一条信息
    getone(id) {
      seckinfo({ id: id }).then((res) => {
          this.form = res.data.list;
          this.form.id = id;
          //渲染二级分类
          catelist({pid:this.form.first_cateid}).then(res =>{
             this.istwo = res.data.list
          })
          //渲染商品
          goodslist({fid:this.form.first_cateid,sid:this.form.second_cateid}).then(res=>{
              this.isthree = res.data.list
          })
          //渲染时间
          this.value1.push(Number(this.form.begintime))
          this.value1.push(Number(this.form.endtime))
        
      });
    },
    //修改
    edit() {
      let data ={
        ...this.form ,
        begintime :new Date(this.value1[0]).getTime(),
        endtime :new Date(this.value1[1]).getTime()
      }
      seckedit(data).then((res) => {
        if (res.data.code == 200) {
          // 成功的弹窗
          successAlert(res.data.msg);
          // 关闭对话框并清空
          this.cancel();
          // 重新请求列表数据
          this.reqseckill();
        } else {
          // 失败的弹窗
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    //渲染一级分类
    this.reqclass();
    this.reqseckill()
    
  },
};
</script>
<style >

</style>