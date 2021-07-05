<template>
  <div>
    <el-table
      :data="adminilist"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="info" v-if="scope.row.status == 1">启用</el-button>
            <el-button type="success " v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="info" plain @click="edit(scope.row.uid)"
              >编辑</el-button
            >
            <v-del @del = "del(scope.row.uid)"></v-del>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="adminitotal" :page-size='adiminisize' @current-change="change"> 
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { userdel } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      adminilist: "admini/list",
      adminitotal :'admini/total',
      adiminisize:'admini/size'
    }),
  },
  methods: {
    ...mapActions({
      reqadminilist: "admini/reqchenglist",
      reqtotal :'admini/reqchengtotal',
      //分页
      reqpage:'admini/reqchegnpage'
    }),
    //点击编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    change(num){
      this.reqpage(num)
    },
    //删除
    del(uid){
        userdel({uid:uid}).then(res=>{
          if (res.data.code==200) {
            successAlert(res.data.msg)
            this.reqadminilist()
            this.reqtotal()
          }else{
            warningAlert(res.data.msg)
          }
        })
    }
  },
  mounted() {
    this.reqadminilist();
    this.reqtotal();
    this.reqpage(1);
  },
};
</script>

<style lang="" scoped>
</style>