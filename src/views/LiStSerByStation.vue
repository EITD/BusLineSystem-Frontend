<template>
<!--    查询锦城⼴场站停靠的所有线路-->
    <div class="LiStSerByStation">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col>
                    <el-autocomplete :fetch-suggestions="querySearch"
                                     style="width: 100%"
                                     @select="handleSelect"
                                     placeholder="请输入站点名称(如锦城广场)" v-model="query" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                    </el-autocomplete>
                </el-col>
            </el-row>
            <el-table
                    :data="tableData"
                    height="590"
                    border
                    v-loading="tableloading"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="id">
                </el-table-column>
                <el-table-column
                        prop="key"
                        label="线路"
                        :formatter="split">
                </el-table-column>
            </el-table>


        </el-card>


    </div>

</template>

<script>
    // import HelloWorld from "@/components/HelloWorld";

    export default {

        name: 'LiStSerByStation',
        components: {
            // HelloWorld
        },
        data() {
            return {
              query:'',
              tableData:[],
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
        // mounted() {
        //   this.getData();
        // },
      mounted() {
        this.loadAll();
        this.selects = this.data2; //模糊查询选项所有条目
        console.log(this.selects)
      },
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

            console.log(this.selects)


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
                if(this.query==='')this.$message.info('请输入站点名')
                else{
                    this.tableloading = true;
                    const {data:res} = await this.$axios.get("/line/stop",{params:{name:this.query}})
                    this.tableData = res
                    this.tableloading = false;
                    if(res.length)this.$message.success('查询站点成功！')
                    else this.$message.error('查询站点失败！')
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
