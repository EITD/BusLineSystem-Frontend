<template>
  <div  align="center">
    <div style="width:800px;alignment: center;height:500px" ref="chart"></div>
  </div>
</template>
<script>
import axios from "axios";

const echarts = require('echarts');
export default{
  data () {
    return {

    };

  },
  methods: {
    initCharts () {
      var myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({

        title: { text: '公交线路数量统计' },
        tooltip: {},
        backgroundColor :"#F8F8FF",
        xAxis: {
          data: ["干线","支线","城乡线","驳接线","社区线","快速公交","高峰公交","夜班公交"]
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          data: [],
          itemStyle:{
            normal:{
              color: function(params) {
                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                const colorList = ['#c23531', '#2f4554', '#61a0a8','#ccc', '#c101c1', '#FCCE10', '#E87C25', '#27727B', '#D7504B'];
                return colorList[params.dataIndex]
              }
            },

          },
          barWidth:60,
        }]
      });
    },
    async getData(){
      // this.$axios.post("/line/get",{name:"N8"})
      //     .then(res=>{
      //       alert(res.data.result.text);
      //       this.data=res.data.result.text;
      //       console.log(res.data)
      // })
      axios.get("/statistics/busCount").then(res=>{
        let myChart = echarts.init(this.$refs.chart);
        console.log(res.data);
        myChart.setOption({
          series: [{
            data: res.data
          }]

        })

      })

    }
  },
  mounted () {
    this.initCharts();
  },
  created() {
    this.getData();

  },

}
</script>


<style scoped>

</style>