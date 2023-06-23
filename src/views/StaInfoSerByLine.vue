<template>
<!--    查询2路公交的全部站点信息，以链状形式返回，即站点间具有⽅向性。由于2路不是环线，所以需要区分上下⾏-->
<!--    查询全部公交的全部站点信息，按照字典序排序-->
    <div class="StaInfoSerByLine">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col>
                    <el-autocomplete  style="width: 100%"
                                     :fetch-suggestions="querySearch"
                                     @select="handleSelect"
                                     placeholder="请输入线路名称(如2路上行)"
                                     v-model="query"
                                     class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                    </el-autocomplete>
                </el-col>
<!--                <el-col :span="8">-->
<!--                    <el-button type="primary" plain @click="getAll">全部线路站点</el-button>-->
<!--                </el-col>-->
            </el-row>
            <el-table
                    :data="tableData"
                    height="590"
                    border
                    v-loading="tableloading"
                    style="width: 100%"
                    :span-method="objectSpanMethod">
                <el-table-column
                        prop="linename"
                        label="线路名">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="站点id">
                </el-table-column>
                <el-table-column
                        prop="stationname"
                        label="站点名">
                </el-table-column>
                <el-table-column
                        prop="english"
                        label="站点英文">
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="pagenum"
                    :page-size="pagesize"
                    :total="total">
            </el-pagination>
        </el-card>

    </div>

</template>

<script>
    // import HelloWorld from "@/components/HelloWorld";

    export default {

        name: 'StaInfoSerByLine',
        components: {
            // HelloWorld
        },
        data() {
            return {
                query:'',
                pagenum:1,
                pagesize:5,
                tableData:[],
                total:0,
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

          objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if(rowIndex === 0)
                        return {
                            rowspan: this.tableData.length,
                            colspan: 1
                        };
                    else{
                        return{
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },
            handleCurrentChange(val){
                this.fetch(val)
            },
            async fetch(page){
                const {data:res} = await this.$axios.get("/station/getall",{params:{pagenum:page,pagesize:this.pagesize}})
                this.tableData = res.list
                this.total = res.total
                console.log(res)
            },
            async getAll(){
                const {data:res} = await this.$axios.get("/station/getall",{params:{pagenum:1,pagesize:this.pagesize}})
                this.tableData = res.list
                this.total = res.total
                console.log(res)
            },
            split(row,column,cellValue){
                cellValue = cellValue.join('，')
                return cellValue
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
                    const {data:res} = await this.$axios.get("/station/get",{params:{name:this.query}})
                    this.tableData = res
                    this.total = 2
                    this.tableloading = false;
                    if(res.length)this.$message.success('查询线路成功！')
                    else this.$message.error('查询线路失败！')
                    console.log(res)
                }
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
