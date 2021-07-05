<template>
  <div>
    <el-table
      :data="menulist"
      style="width: 100%"
      row-key="id"
      border
      
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="id" label="菜单编号" >
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" >
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <div>
            <i :class="scope.row.icon"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
        <el-button type="success"  @click="del(scope.row.id)">删除</el-button> 
          </div>
        </template>
         
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {menudelete} from '../../../request/api'
import { successAlert,warningAlert  } from '../../../util/alert';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqmenulist: "menu/reqchenglist",
    }),
    //删除按钮
    del(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
            menudelete({id:id}).then(res=>{
              if (res.data.code == 200) {
                successAlert(res.data.msg)
                //重新渲染
                this.reqmenulist()
              }else{
                warningAlert(res.data.msg)
              }
          
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //点击编辑
    edit(id){
      this.$emit("edit",id)
    }
  },
  mounted() {
    this.reqmenulist();
  },
  
  
};
</script>

<style lang="" scoped>
</style>