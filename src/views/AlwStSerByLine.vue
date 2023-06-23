<template>
<!--    查询乘坐10路从⼤悦城到⼩吃街，线路的运⾏⽅向（上⾏或下⾏）、沿路站点和运⾏时⻓。-->
    <div class="AlwStSerByLine">
        <el-card class="box-card">
                    <el-input style="width:30%" placeholder="请输入线路名称(如10路)" v-model="query1" class="input-with-select"></el-input>
                    <el-autocomplete :fetch-suggestions="querySearch"
                                     style="width:30%"
                                        @select="handleSelect" placeholder="请输入出发站(如大悦城)" v-model="query2" class="input-with-select">
<!--                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>-->
                    </el-autocomplete>
                   <el-autocomplete :fetch-suggestions="querySearch"
                                    style="width:30%"
                                    @select="handleSelect" placeholder="请输入目的站(如小吃街)" v-model="query3" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                    </el-autocomplete>

            <el-table
                    :data="tableData"
                    height="590"
                    border
                    v-loading="tableloading"
                    style="width: 100%"
                    :span-method="objectSpanMethod">
                <el-table-column
                        prop="linename"
                        label="运行方向">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="沿路站点id">
                </el-table-column>
                <el-table-column
                        prop="stationname"
                        label="沿路站点名">
                </el-table-column>
                <el-table-column
                        prop="english"
                        label="沿路站点英文名">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="运行时长(分钟)">
                </el-table-column>
            </el-table>


        </el-card>


    </div>

</template>

<script>
    // import HelloWorld from "@/components/HelloWorld";

    export default {

        name: 'AlwStSerByLine',
        components: {
            // HelloWorld
        },
        data() {
            return {
                query1:'',
                query2:'',
                query3:'',
                tableData:[],
                selects: {},
                selects2: {},

                state: '',
                timeout: null,
                data2: [],
                data3: [],
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

        this.loadAll2();
        this.selects2 = this.data3; //模糊查询选项所有条目


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
          querySearch2(queryString, cb) {
            const selects = this.selects2;  //模糊查询选项所有条目
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

            this.$axios.get("/statistics/findStations").then( (res)=>{
              let records = res.data;
              for(let i=0;i<records.length;i++) {
                let obj = {};
                obj.value = records[i].value;
                //上面是格式转换
                this.selects.push(obj);//selects就是所有信息
              }
              console.log(this.selects)
            });

          },
          loadAll2:function () {  //加载所有后台传的信息，用于下拉框模糊查询

            this.$axios.get("/statistics/findLines").then( (res)=>{
              let records = res.data;
              for(let i=0;i<records.length;i++) {
                let obj = {};
                obj.value = records[i].value;
                //上面是格式转换
                this.selects2.push(obj);//selects就是所有信息
              }
              console.log(this.selects2)

            });

          },
          handleSelect(item) {
            console.log(item);
          },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0 || columnIndex === 4) {
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
            async getData(){
                // this.$axios.post("/line/get",{name:"N8"})
                //     .then(res=>{
                //       alert(res.data.result.text);
                //       this.data=res.data.result.text;
                //       console.log(res.data)
                // })
                if(this.query1==='')this.$message.info('请输入线路名')
                else if(this.query2===''||this.query3==='')this.$message.info('请输入站点名')
                else{
                    this.tableloading = true;
                    const {data:res} = await this.$axios.get("/station/alongway",{params:{line:this.query1,station1:this.query2,station2:this.query3}})
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
