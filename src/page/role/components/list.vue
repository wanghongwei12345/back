<template>
  <div>
    <el-table
      :data="rolelist"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
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
            <el-button type="info" plain @click="edit(scope.row.id)">编辑</el-button>
            <v-del @del = "del(scope.row.id)"></v-del>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import  {roledelete} from '../../../request/api'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      rolelist: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqlist: "role/reqchanglist",
    }),
    //删除
    del(id){
      roledelete({id:id}).then(res=>{
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.reqlist()
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    //编辑
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.reqlist();
  },
};
</script>


<style scoped>
</style>