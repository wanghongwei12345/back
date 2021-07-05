<template>
    <el-button type="success" @click="del">删 除</el-button>
</template>
<script>
import { warningAlert } from "../util/alert";
export default {
  methods: {
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 通知父组件我点了确定删除
          this.$emit("del");
        })
        .catch(() => {
          warningAlert("已取消删除");
        });
    },
  },
};
</script>

<style>
    
</style>