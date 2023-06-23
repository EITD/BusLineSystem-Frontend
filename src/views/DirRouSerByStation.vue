<template>
<!--    查询从荷花池到环球中⼼(始发站)是否存在直达线路-->
    <div class="DirRouSerByStation">
        <el-card class="box-card" >
                    <el-autocomplete :fetch-suggestions="querySearch" style="width:40%"
                                     @select="handleSelect" placeholder="请输入出发站(如如环球中心(始发站))" v-model="query2" class="input-with-select">
                        <!--                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>-->
                    </el-autocomplete>
                    <el-autocomplete :fetch-suggestions="querySearch" style="width:40%"
                              @select="handleSelect" placeholder="请输入目的站(如荷花池)" v-model="query3" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                    </el-autocomplete>

            <el-table
                    :data="tableData"
                    height="590"
                    border
                    v-loading="tableloading"
                    style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column
                        prop="name"
                        label="线路名">
                </el-table-column>
            </el-table>


        </el-card>


    </div>

</template>

<script>
    // import HelloWorld from "@/components/HelloWorld";

    export default {

        name: 'DirRouSerByStation',
        components: {
            // HelloWorld
        },
        data() {
            return {
                query2:'',
                query3:'',
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
                if(this.query1===''||this.query2=='')this.$message.info('请输入站点名')
                else{
                    this.tableloading = true;
                    const {data:res} = await this.$axios.get("/line/list",{params:{station1:this.query2,station2:this.query3}})
                    this.tableData = res
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
