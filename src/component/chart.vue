<template>


  <el-container>

      <el-container>
        <el-main>
          <div id="1">

            <div style="width:500px;height:500px;" class="div1" ref="chart"></div>

            <div style="width:500px;height:500px;" class="div1" ref="chart2"></div>
          </div>

        </el-main>
        <el-footer>
          <el-button  type="primary" @click="getData2">绘制表格</el-button>
        </el-footer>
      </el-container>

  </el-container>


</template>
<script>
import axios from "axios";
import group from "./group";

const echarts = require('echarts');
const echarts2 = require('echarts');
export default{
  data () {

    return {

    };

  },
  mounted:function () {
    this.initCharts();
    this.getData1();

  },
  methods: {
    initCharts () {
      const myChart = echarts.init(this.$refs.chart);
      const myChart2 = echarts2.init(this.$refs.chart2);
      // 绘制图表
      let needData;
      myChart.setOption({
        title: { text: '特殊站台数量统计' },
        tooltip: {},
        // backgroundColor :"#F8F8FF",
        xAxis: {
          data: ["终点站","始发站","地铁站"]
        },
        yAxis: {
          type:'value',
          name:'数量'
        },
        series: [{
          name: '数量',
          type: 'bar',
          data: [],
          itemStyle:{
            normal:{
              color: function(params) {
                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                const colorList = ['#c23531', '#2f4554', '#61a0a8'];
                return colorList[params.dataIndex]
              }
            },

          },
          barWidth:60,


        }]
      });
      let v1,v2,v3;
      myChart2.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              // borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]

      })
    },

    getData1:function (){
      // this.$axios.post("/line/get",{name:"N8"})
      //     .then(res=>{
      //       alert(res.data.result.text);
      //       this.data=res.data.result.text;
      //       console.log(res.data)
      // })
      axios.get("/statistics/stationCount").then(res=>{
        let myChart = echarts.init(this.$refs.chart);
        console.log(res.data);
        let datas = res.data;
        console.log(datas);
        myChart.setOption({
          series: [{
            data: [datas[0].num,datas[1].num,datas[2].num]
          }]


        });
        let myChart2 = echarts2.init(this.$refs.chart2);
        console.log(res.data);
        let datass = res.data;
        console.log(datas);
        myChart2.setOption({
          series: [{
            data: [
              {value:datass[0].num,name:"终点站"},
              {value:datass[1].num,name:"始发站"},
              {value:datass[2].num,name:"地铁站"}
            ]
          }]


        })


      })

    },
    async getData2() {
      await this.$router.push('/home/stationGroup')
    },
  },

}
</script>


<style scoped>
.div1{
  display:inline-block;
  width: 500px;

}


</style>