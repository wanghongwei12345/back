<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :obj="obj" ref="aa"></v-add>
  </div>
</template>


<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      obj: {
        istrue: false,
        isadd: true,
      },
    };
  },
  methods: {
    add() {
      this.obj.istrue = true;
      this.obj.isadd = true;
    },
    edit(uid) {
      this.obj.istrue = true;
      this.obj.isadd = false;
      this.$refs.aa.getone(uid)
    },
  },
};
</script>

<style scoped>
</style>