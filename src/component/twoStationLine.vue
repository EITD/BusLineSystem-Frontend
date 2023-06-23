<template>
  <div class="TwoStationLine">
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
        <el-input style="width: 35%" placeholder="请输入查询条数(默认100)" v-model="input1">
          <template slot="prepend">查询条数</template>
          <el-button slot="append" icon="el-icon-search" @click="getData2"></el-button>
        </el-input>
      </div>
      <el-table
          :data="tableData"
          height="590"
          border
          v-loading="tableloading"
          @sort-change="sortChange"
          style="width: 100%">
        <el-table-column
            prop="name1"
            label="站点1">
        </el-table-column>
        <el-table-column
            prop="IDnum1"
            label="id1">
        </el-table-column>
        <el-table-column
            prop="name2"
            label="站点2">
        </el-table-column>
        <el-table-column
            prop="IDnum2"
            label="id2">
        </el-table-column>

        <el-table-column
            prop="count"
            label="线路数"
            sortable="custom">
        </el-table-column>

      </el-table>


<!--      <el-row>-->
<!--        &lt;!&ndash;        <el-button type="primary" @click="Sum">统计线路数量</el-button>&ndash;&gt;-->
<!--        {{totalCount}}-->
<!--      </el-row>-->



    </el-card>


  </div>

</template>

<script>


export default {

  name: 'twoStationLine',
  components: {
  },
  data() {
    return {
      value: '',
      query2: '',
      input1: '',
      sortNum: 0,
      tableData: [],
      totalCount: '',
      tableloading : false,
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
        if(this.input1== "") {
          this.num=100;
          this.getData()
        }
        else {this.getData2();}
      }else if(column.order == "descending"){
        this.sortNum=2;
        if(this.input1== "") {
          this.num=100;
          this.getData()
        }
        else {this.getData2();}
      }else{
        this.sortNum=0;
        if(this.input1== "") {
          this.num=100;
          this.getData()
        }
        else {this.getData2();}
      }
    },

    async getData(){
      this.tableData = undefined;
      this.tableData = new Array();
      this.tableloading=true;


      await this.$axios.get("/statistics/straightRoadSort",{params:{option:this.sortNum,num:100}}).then((res)=>{
        console.log(res)
        let data= res.data;
        for (let v = 0; v < data.length; v++) {
          this.tableData.push({
            name1: data[v].station1,
            name2: data[v].station2,
            count: data[v].count,
            IDnum1: data[v].id1,
            IDnum2: data[v].id2,
          })
        }
        this.tableloading = false;
      })
      // this.totalCount = "数量：" + this.tableData.length;


    },
    async getData2(){

      if(this.input1==''){this.input1=100; }
      this.tableData = undefined;
      this.tableData = new Array();
      this.tableloading=true;

      await this.$axios.get("/statistics/straightRoadSort",{params:{option:this.sortNum,num:this.input1}}).then((res)=>{
        console.log(res)
        let data= res.data;
        for (let v = 0; v < data.length; v++) {
          this.tableData.push({
            name1: data[v].station1,
            name2: data[v].station2,
            count: data[v].count,
            IDnum1: data[v].id1,
            IDnum2: data[v].id2,
          })
        }
      })
      this.totalCount = "数量：" + this.tableData.length;
      this.tableloading = false;

    },
    async Sum(){
      // this.totalCount = "数量：" + this.tableData.length;

    }



  },
  mounted() {
    this.getData()
  }

}

</script>


<style scoped>

</style>
