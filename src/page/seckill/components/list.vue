<template>
  <div>
    <el-table
      :data="seckilllist"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="活动名称" ></el-table-column>
      
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {seckdelete} from '../../../request/api'
import { successAlert,warningAlert  } from '../../../util/alert';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      seckilllist:"seckill/list",

      
    }),
  },
  methods: {
    ...mapActions({
      reqseckill:'seckill/reqchenglist',

     
    }),
    //点击编辑
    edit(id){
      this.$emit("edit",id)
    },
    //删除
    del(id){
      seckdelete({id:id}).then(res=>{
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.reqseckill();
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    this.reqseckill();
  },
  
  
};
</script>

<style  scoped>

</style>