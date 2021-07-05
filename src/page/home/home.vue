<template>
  <div id="box"></div>
</template>


<script>
//引入
import * as echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  watch: {
    list:{
      handler(){
          var myChart = echarts.init(document.getElementById('box'));
         var option = {
                    xAxis: {
                        type: 'category',
                        data: this.list.map(item => item.catename)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.list.map(item=> item.children.length),
                        type: 'line'
                    }]
             };
        myChart.setOption(option);
      },
       deep: true,
    },
  },
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  methods: {
    ...mapActions({
      reqlist: "classify/reqchenglist",
    }),
  },
  mounted(){
      this.reqlist()
  }
};
</script>

<style scoped>
#box {
  width: 80%;
  height: 90%;
  border: 1px solid #ccc;
}
</style>