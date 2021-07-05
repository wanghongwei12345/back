<template>
    <div>
        <v-list @edit = "edit"></v-list>
        <v-add :obj = "obj" ref="aa"></v-add>
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
                istrue:false,
                isadd :true
            },
            form:{
                phone:'17693553947',
                nickname:'pyy',
                password:'1111'
            }
        }
    },
    methods:{
        add(){
            this.obj.istrue = true
            this.obj.isadd = true
        },
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