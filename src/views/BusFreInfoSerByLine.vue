<template>
<!--  查询30路公交的基本信息-->
  <div class="BusFreInfoSerByLine">
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-autocomplete style="width: 100%"
                           class="input-with-select"
                           v-model="query"
                           :fetch-suggestions="querySearch"
                           placeholder="请输入线路名(如30)"
                           @select="handleSelect">
            <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-autocomplete>
        </el-col>
      </el-row>
      <el-table
          :data="tableData"
          height="470"
          border
          v-loading="tableloading"
          style="width: 100%">
        <el-table-column
            prop="directional"
            label="方向"
            :formatter="formatBoolean">
        </el-table-column>
        <el-table-column
            prop="interval"
            label="间隔(分钟)">
        </el-table-column>
        <el-table-column
            prop="kilometer"
            label="里程(公里)">
        </el-table-column>
        <el-table-column
          prop="onewayTime"
          label="单程时长">
        </el-table-column>
        <el-table-column
          prop="route"
          label="路线">
        </el-table-column>
        <el-table-column
          prop="runtime"
          label="运行时长">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
      </el-table>


    </el-card>



  </div>

</template>

<script>
// import HelloWorld from "@/components/HelloWorld";

export default {

  name: 'BusFreInfoSerByLine',
  components: {
    // HelloWorld
  },
  data() {
    return {
      query:'',
      tableData:[],
      tableloading : false,
      selects:{},
      data2: [],
    }
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.loadAll();
    this.selects = this.data2; //模糊查询选项所有条目
    console.log(this.selects)
  },
  // mounted() {
  //   this.getData();
  // },
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
      this.$axios.get("/statistics/findLines").then( (res)=>{
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
    async getData(){
      // this.$axios.post("/line/get",{name:"N8"})
      //     .then(res=>{
      //       alert(res.data.result.text);
      //       this.data=res.data.result.text;
      //       console.log(res.data)
      // })
      if(this.query==='')this.$message.info('请输入线路名')
      else{
        this.tableloading = true;
        const {data:res} = await this.$axios.get("/line/get",{params:{name:this.query}})
        this.tableData = res
        this.tableloading = false;
        if(res[0]!==null)this.$message.success('查询线路成功！')
        else this.$message.error('查询线路失败！')
        console.log(res)
      }
    },
    formatBoolean(row, column, cellValue) {
      let ret = '';  //你想在页面展示的值
      if (cellValue) {
        ret = "true"  //根据自己的需求设定
      } else if(cellValue===false){
        ret = "false"
      }
      return ret;
    }
    // this.$http.get('/api/xxxxx?xxxx=1路&xxx=0926&xxxx=10',{
    //   headers: {
    //     'Content-type': 'application/json;charset=UTF-8'
    //     /*'Content-Type': 'text/plain;charset=utf-8'*/
    //   },
    // }).then(function (response) {
    //   console.log(response,'response');
    // })
    //     .catch(function (error) {
    //       console.log(error);
    //     });


   }

}

</script>


<style scoped>

</style>
