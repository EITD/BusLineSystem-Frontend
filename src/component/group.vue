
<template>
  <el-card class="box-card">

    <el-table
        :data="tableData"
        height="590"
        border
        style="width: 100%"
        v-show="is_show">
      <el-table-column width="100px"
                       prop="name"
                       label="分组" align="center">
      </el-table-column>
      <el-table-column width="60px"
                       prop="num"
                       label="数量" align="center">
      </el-table-column>
      <el-table-column
          prop="station"
          label="站点名称"
          align="center">
      </el-table-column>

    </el-table>

  </el-card>
</template>

<script>

export default {
  name: "group",
  data() {
    return {
      query1:'',
      tableData:[],
      is_show : true,
      // totalCount: '',
      // num : ''
    }
  },

  created() {

  },
  mounted:function () {
    this.getData1();
  },

  methods:{


    getData1:function () {
      this.tableData= undefined;
      this.tableData = new Array();

       this.$axios.get("/statistics/stationCount").then((res) => {
        console.log(res);
        console.log(res.data);

        let data = res.data;

        for(let i=0; i<data.length; i++){

          this.tableData.push({
                name:data[i].name,
                num:data[i].num,
                station: data[i].stations.join("，")
              }
          )
        }

      })

    },



  },
}



</script>

<style scoped>

</style>