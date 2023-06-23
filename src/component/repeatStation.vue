<template>
  <div class="LineSerByTiSt">
    <el-card class="box-card">
      <div align="left">
<!--          <el-input placeholder="请输入线路1(如15路上行)" v-model="query1" class="input-with-select">-->
<!--            &lt;!&ndash;                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>&ndash;&gt;-->
<!--          </el-input>-->
          <el-autocomplete style="width: 35%" class="inline-input"
                           v-model="query1"
                           :fetch-suggestions="querySearch"
                           placeholder="请输入线路1(如15路上行)"
                           @select="handleSelect"
          >
            <template  slot="prepend">线路1</template>
          </el-autocomplete>


          <el-autocomplete style="width: 40%" placeholder="请输入线路2(如30路下行)" v-model="query2" :fetch-suggestions="querySearch" @select="handleSelect" class="input-with-select">
            <!--                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>-->
            <template  slot="prepend">线路2</template>
            <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-autocomplete>

      </div>
      <el-table
          :data="tableData"
          height="590"
          border
          style="width: 100%">
        <el-table-column
            prop="id"
            label="站点名">

        </el-table-column>

      </el-table>
      <el-row >{{totalCount}}</el-row>


    </el-card>


  </div>

</template>

<script>


export default {

  name: 'repeatStation',
  components: {
    // HelloWorld
  },
  data() {
    return {
      query1: '',
      query2: '',
      tableData: [],
      totalCount: '',
      selects: {},
      state: '',
      timeout: null,
      data2: [],
      json:''
      }
    },

  created() {

  },
  mounted() {
    this.loadAll();
    this.selects = this.data2; //模糊查询选项所有条目
    console.log(this.selects)
  },

  methods: {

    querySearch(queryString, cb) {
      const selects = this.selects;  //模糊查询选项所有条目
      const results = queryString ? selects.filter(this.createFilter(queryString)) : selects;//筛选找到匹配的
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (select) => {
        console.log(select.value)
        return (select.value.indexOf(queryString) === 0);
      };
    },
    loadAll:function () {  //加载所有后台传的信息，用于下拉框模糊查询

      this.$axios.get("/statistics/findRoutes").then( (res)=>{
            let records = res.data;
            for(let i=0;i<records.length;i++) {
              let obj = {};
              obj.value = records[i].value;
              //上面是格式转换
              this.selects.push(obj);//selects就是所有信息
            }
        console.log(this.selects)


      });

      console.log(this.selects)


    },
    handleSelect(item) {
      console.log(item);
    },

    async getData() {
      this.tableData = undefined;
      this.tableData = new Array();
      if (this.query1 === '') this.$message.info('请输入线路1名称')
      if (this.query2 === '') this.$message.info('请输入线路2名称')
      else {

        await this.$axios.get("/statistics/repeatStation", {
          params: {
            line1: this.query1,
            line2: this.query2
          }
        }).then((res) => {
          console.log(res)
          let data = res.data;
          if(data.length==0) {
            this.$message.error('查询线路失败，请重新输入线路名！')
            this.tableloading = false;
          }
          else {
            for (let v = 0; v < data.length; v++) {
              this.tableData.push({
                id: data[v]
              })
            }
            this.totalCount = "数量：" + this.tableData.length;
          }


        });

      }



    },


  }
}

</script>


<style scoped>

</style>
