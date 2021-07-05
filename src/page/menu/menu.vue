<template>
    <div>
        <el-button type="primary" @click="add">添加</el-button>
        <v-list @edit = "edit"></v-list>
        <v-add :obj = "obj" ref="rr"></v-add>
    </div>
</template>


<script>
import vList from './components/list.vue'
import vAdd from './components/add'

export default {
    components:{
        vAdd,
        vList
    },
    data() {
        return {
            obj:{
                istrue :false,
                isadd :true
            }
        }
    },
    methods:{
        //点击了添加
        add(){
            this.obj.istrue = true
            this.obj.isadd = true
        },
        //点击了编辑 出一条信息
        edit(id){
            this.obj.istrue = true
            this.obj.isadd = false
            this.$refs.rr.getone(id)
            console.log(id);
        }
    }
}
</script>

<style scoped>
    
</style>