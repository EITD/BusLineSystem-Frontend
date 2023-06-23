<template>
  <div class="routeSortByRuntime">
    <el-card class="box-card">
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="11">-->
<!--          <el-select v-model="value" placeholder="请选择排序方式">-->
<!--            <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-col>-->
<!--        <el-col :span="13">-->
<!--          <el-input placeholder="请输入排序显示条数" v-model="query2" class="input-with-select">-->
<!--            &lt;!&ndash;                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>&ndash;&gt;-->
<!--            <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>-->
<!--          </el-input>-->

<!--        </el-col>-->
<!--      </el-row>-->
      <div align="left">
        <el-input style="width: 35%" placeholder="100" v-model="input1">
          <template slot="prepend">查询条数</template>
          <el-button slot="append" icon="el-icon-search" @click="getData2"></el-button>
        </el-input>
      </div>
      <el-table
          :data="tableData"
          v-loading ="tableloading"
          height="590"
          border
          @sort-change="sortChange"
          style="width: 100%">
        <el-table-column
            prop="name"
            label="线路名">

        </el-table-column>
        <el-table-column
            prop="time"
            sortable
            label="运行时间(分钟)"
            sortable="custom">
        </el-table-column>


      </el-table>

      <!--      <el-row>-->
      <!--        <el-button type="primary" @click="Sum">统计站点数量</el-button>-->
      <!--        {{totalCount}}-->
      <!--      </el-row>-->



    </el-card>


  </div>

</template>

<script>


export default {

  name: 'routeSortByRuntime',
  components: {
  },
  data() {
    return {
      value: '',
      query2: '',
      tableData: [],
      totalCount: '',
      num2: '100',
      input1: '',
      sortNum: '0',
      tableloading: false,
      options: [{
        value: '1',
        label: '升序'

      }, {
        value: '2',
        label: '降序'
      }, {
        value: '3',
        label: '不排序'
      }
      ]
    }
  },
  created(){

  },

  methods:{
    sortChange: function(column) {
      if(column.order == "ascending"){
        this.sortNum=1;
        console.log(this.input1.length)
        if(this.input1== "") {
          this.num=100;
          this.getData()
        }
        else {this.getData2();}
      }else if(column.order == "descending"){
        this.sortNum=2;
        console.log(this.input1.length)
        if(this.input1== "") {

          this.getData()
        }
        else {this.getData2();}

      }else{
        this.sortNum=0;
        console.log(this.input1.length)
        if(this.input1== "") {

          this.getData()
        }
        else{this.getData2();}
      }
    },

    async getData(){
      // this.tableData = undefined;
      this.tableData = undefined;
      this.tableData = new Array();
      this.tableloading = true;
      await this.$axios.get("/statistics/routeSortByRuntime",{params:{option:this.sortNum,num:100}}).then((res)=>{
        console.log(res)
        let data= res.data;
        for (let v = 0; v < data.length; v++) {
          this.tableData.push({
            name: data[v].route.name,
            time: data[v].route.onewayTime

          })
        }
        this.tableloading = false;
      })
    },
    async getData2(){
        if(this.input1==''){this.input1=100;}
        // this.tableData = undefined;
        this.tableData = undefined;
        this.tableData = new Array();
      this.tableloading = true;
        await this.$axios.get("/statistics/routeSortByRuntime",{params:{option:this.sortNum,num: this.input1}}).then((res)=>{
          console.log(res)
          let data= res.data;
          for (let v = 0; v < data.length; v++) {
            this.tableData.push({
              name: data[v].route.name,
              time: data[v].time

            })
          }
          this.tableloading = false;
        })


    },




  },
  mounted() {
    this.getData();
  }

}

</script>


<style scoped>

</style>
