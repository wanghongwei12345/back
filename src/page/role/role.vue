<template>
    <div>
        <el-button type="primary" @click="add">添加</el-button>
       <v-list @edit = "edit" ></v-list>
       <v-add :obj="obj" ref="aa"></v-add>
    </div>
</template>


<script>
import vAdd from './components/add.vue'
import vList from './components/list.vue'
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
        //添加
        add(){
            this.obj.istrue = true
            this.obj.isadd = true
        },
        //编辑
        edit(id){
            this.obj.istrue = true
            this.obj.isadd = false
            
            this.$refs.aa.getone(id)
        }
    }
}
</script>

<style scoped>
    
</style>