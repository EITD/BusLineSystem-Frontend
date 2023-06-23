<template>
<!--    查询N8路（环线）的全部班次信息-->
    <div class="TimeInfoSerByLine">
        <el-card class="box-card">
            <el-row>
                <el-col>
                    <el-autocomplete
                        style="width: 100%"
                       :fetch-suggestions="querySearch"
                        @select="handleSelect"
                        placeholder="请输入线路名称(如239路上行)"
                        v-model="query"
                        class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                    </el-autocomplete>
                </el-col>
            </el-row>
            <el-table
                    :data="tableData"
                    height="598"
                    border
                    v-loading="tableloading"
                    style="width: 100%">
                <el-table-column label="">
                    <template slot-scope='scope'>
                        <span>{{scope.row[0]}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        v-for="(item,index) in head"
                        :label="item">
                    <template slot-scope='scope'>
                        <span>{{scope.row[index+1]}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </div>

</template>

<script>
    // import HelloWorld from "@/components/HelloWorld";

    export default {

        name: 'TimeInfoSerByLine',
        components: {
            // HelloWorld
        },
        data() {
            return {
                query:'',
                tableData:[],
                head:[],
                selects: {},
                state: '',
                timeout: null,
                data2: [],
                json:'',
                tableloading : false,
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
                    const {data:result} = await this.$axios.get("/line/station",{params:{name:this.query}})
                    this.head = result
                    const {data:res} = await this.$axios.get("/line/timetable",{params:{name:this.query}})
                    this.tableData = res
                    this.tableloading = false;
                    if(res.length)this.$message.success('查询线路成功！')
                    else this.$message.error('查询线路失败！')
                    console.log(res)
                }
            },
            split(row,column,cellValue){
                cellValue = cellValue.join('，')
                return cellValue
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
