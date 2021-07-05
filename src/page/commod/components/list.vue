<template>
  <div>
    <el-table
      :data="chenglist"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" >
      <el-table-column prop="id" label="规格编号" >
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" >
      </el-table-column>
      <el-table-column  label="规格属性" >
        <template slot-scope="scope">
          <div >
            <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
          </div>
        </template>
        
      </el-table-column>
      
      
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="info" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="success " v-else>禁用</el-button>
          </div>
        </template>
        
      </el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="info" plain @click="edit(scope.row.id)">编辑</el-button>
            <v-del @del = del(scope.row.id)></v-del> 
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="chengtotal" :page-size='chengsize'        @current-change="change"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {specsdel} from '../../../request/api'
import { successAlert,warningAlert  } from '../../../util/alert';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      chenglist:'commod/list',
      chengtotal:"commod/total",
      chengsize:"commod/size",
      classlist: "classify/list",
    }),
  },
  methods: {
    ...mapActions({
      reqlist :'commod/reqchenglist',
      reqtotal:'commod/reqchengtotal',
      reqpage:"commod/reqchengpage",
      
    }),
    //点击编辑
    edit(id){
      this.$emit("edit",id)
    },
    //删除
    del(id){
      specsdel({id:id}).then(res=>{
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.reqlist();
          this.reqtotal()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    change(num){
      this.reqpage(num)
    }
  },
  mounted() {
    this.reqlist();
    this.reqtotal();
    this.reqpage(1);
  },
  
  
};
</script>

<style  scoped>
.img img{
  width: 100px;
  height: 100px;
}
</style>