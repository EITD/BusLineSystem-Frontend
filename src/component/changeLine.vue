<template>
  <div class="LineSerByTiSt">
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-autocomplete style="width: 35%"  class="inline-input"
                           v-model="query1"
                           :fetch-suggestions="querySearch"
                           @select="handleSelect"
                           placeholder="请输入线路名(如261路上行)">
            <template style="width: 30%" slot="prepend">线路名称</template>
            <el-button slot="append" icon="el-icon-search" @click="getData1"></el-button>
          </el-autocomplete>
        </el-col>
      </el-row>

<!--      可换乘数量：{{num}}-->
      <el-table

          :data="tableData"
          v-loading="tableloading"
          height="590"
          border
          style="width: 100%">
        <el-table-column
            prop="station"
            label="换乘站点名">
        </el-table-column>
        <el-table-column
            prop="line"
            label="可换乘线路名">
        </el-table-column>

      </el-table>
      <el-row align="middle">
        <div align="middle" id="1" style="display: none">
          {{totalCount}}
        </div>
      </el-row>


    </el-card>


  </div>

</template>

<script>


export default {

  name: 'changeLine',
  components: {
    // HelloWorld
  },
  data() {
    return {
      query1:'',
      tableData:[],
      tableloading : false,
      selects:{},
      totalCount: '',
      state: '',
      timeout: null,
      data2: [],
      // totalCount: '',
      // num : ''
    }
  },
  created() {

  },
  mounted() {
    this.loadAll();
    this.selects = this.data2; //模糊查询选项所有条目
    console.log(this.selects)
  },

  methods:{
    querySearch(queryString, cb) {
      const select = this.selects;  //模糊查询选项所有条目
      const results = queryString ? select.filter(this.createFilter(queryString)) : select;//筛选找到匹配的
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
        console.log(res.data)
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

    async getData1() {
      if (this.query1 === '') this.$message.info('请输入线路名')

      else {
        this.tableData = undefined;
        this.tableData = new Array();
        this.tableloading = true;
        const target = document.getElementById("1")

        target.style.display = "none"

        await this.$axios.get("/statistics/changeRoad", {params: {route: this.query1}}).then((res) => {
          console.log(res);
          console.log(res.data);

          let data = res.data;
          for (let v = 0; v < data.length; v++) {
            // const r = data[v].routes;
            if (data[v].routes.length == 0) {
              this.tableData.push({
                    station: data[v].name,
                    line: "无"
                  }
              )
            } else {
              this.tableData.push({
                    station: data[v].name,
                    line: data[v].routes.join(",")
                  }
              )
            }
          }
          this.tableloading = false;

          this.totalCount = "数量：" + this.tableData.length;
          const target = document.getElementById("1")
          target.style.display = "block"
          if(data.length)this.$message.success('查询线路成功！')
          else this.$message.error('查询线路失败，不存在该线路！')
        })

      }
    }
  },
}



</script>


<style scoped>
.el-card{
  text-align: left;


}

</style>
