<template>
  <div class="nonRepeat">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input placeholder="请输入线路名(如261路上行)" v-model="query1" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getData1"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!--      可换乘数量：{{num}}-->
      <el-table
          :data="tableData"
          height="590"
          border
          style="width: 100%">
        <el-table-column
            prop="Co"
            label="非重复系数">
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

  name: 'nonRepeat',
  components: {
    // HelloWorld
  },
  data() {
    return {
      query1:'',
      tableData:[],
      // totalCount: '',
      // num : ''
    }
  },
  created() {

  },

  methods:{


    async getData1() {
      this.tableData=undefined;
      this.tableData = new Array();

      await this.$axios.get("/statistics/nonRepeat", {params: {route: this.query1}}).then((res) => {
        console.log(res);
        console.log(res.data);

        let data = res.data;
        for (let v = 0; v < data.length; v++) {
          // const r = data[v].routes;

            this.tableData.push({
              Co: data[v]

            })
        }
      })
      //    //let map = res.data;
      //    let map= new Map(Object.entries(res)).forEach();
      //    let newMap= map.map(val=>{undefined
      //      let js
      //
      //    })
      //
      //      this.tableData.push({
      //        station: key,
      //        line: value
      //      })
      //    }
      //
      //  })
      // // ，
      // async getData2(){
      //
      //   await this.$axios.get("/statistics/changeRoad",{params:{route:this.query1}}).then((res)=>{
      //     console.log(res)
      //     this.num = res.data;
      //   })


      // },
      // async Sum(){
      //   this.totalCount = "数量：" + this.tableData.length;
      //
      // }

      // .then((res) => {
      //   let data = res.data;
      //   for (let v = 0; v < data.length; v++) {
      //     this.tableData.push({
      //       date: data[v].PLAN_BAME,
      //       name: data[v].RFACIVER_NAME,
      //       address: data[v].CKACATE_CYCEL,
      //     })


      //   console.log(this.array)
      // })
      //     .catch((error) => {
      //       console.error(error);
      //     });

//   }
//
// }}

    }
  },
}



</script>


<style scoped>
.el-card{
  text-align: left;


}

</style>
