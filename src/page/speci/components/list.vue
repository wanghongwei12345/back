<template>
  <div>
    <el-table
      :data="specilist"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div class="img">
            <img :src="$pre + scope.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column  label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button type="info" v-if="scope.row.isnew == 1">是</el-button>
            <el-button type="success " v-else>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column  label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button type="info" v-if="scope.row.ishot == 1">是</el-button>
            <el-button type="success " v-else>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column  label="状态">
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
            <el-button type="info" plain @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <v-del @del="del(scope.row.id)"></v-del>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background layout="prev, pager, next" :total="chengtotal" :page-size="chengsize" @current-change="change"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { goodsdel } from "../../../request/api";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      specilist: "speci/list",
      chengtotal:"speci/total",
      chengsize:"speci/size",
    }),
  },
  methods: {
    ...mapActions({
      reqspecilist: "speci/reqchenglist",
      reqtotal:'speci/reqchengtotal',
      reqpage:"speci/reqchengpage",
    }),
    //点击编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      goodsdel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqspecilist();
          this.reqtotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    change(num){
      this.reqpage(num)
    }
  },
  mounted() {
    this.reqspecilist();
    this.reqtotal();
    this.reqpage(1);
  },
};
</script>

<style  scoped>
.img img {
  width: 100px;
  height: 100px;
}
</style>