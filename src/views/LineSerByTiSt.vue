<template>
    <!--    查询上午08:37分新华书店站10分钟内即将停靠的线路，并显示⼏分钟后某线路即将到站，若查询到多个同名站点，需要按照id进⾏分组-->
    <div class="LineSerByTiSt">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入时间(如08:37)" v-model="query1" class="input-with-select">
                        <!--                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>-->
                    </el-input>
                </el-col>
                <el-col :span="7">
                    <el-input placeholder="请输入站点id(如16147)" v-model="query2" class="input-with-select">
                        <!--                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>-->
                    </el-input>
                </el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入时间范围(分钟)(如5)" v-model="query3" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-table
                    :data="tableData"
                    height="590"
                    border
                    v-loading="tableloading"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="线路名">
                </el-table-column>
                <el-table-column
                        prop="lineTime"
                        label="到站时间">
                </el-table-column>
            </el-table>


        </el-card>


    </div>

</template>

<script>
    // import HelloWorld from "@/components/HelloWorld";

    export default {

        name: 'LineSerByTiSt',
        components: {
            // HelloWorld
        },
        data() {
            return {
                query1:'',
                query2:'',
                query3:'',
                tableData:[],
                tableloading : false,
            }
        },
        created() {
            // this.getData();
        },
        // mounted() {
        //   this.getData();
        // },
        methods:{

            async getData(){
                // this.$axios.post("/line/get",{name:"N8"})
                //     .then(res=>{
                //       alert(res.data.result.text);
                //       this.data=res.data.result.text;
                //       console.log(res.data)
                // })
                if(this.query1==='')this.$message.info('请输入时间')
                else if(this.query2==='')this.$message.info('请输入站点id')
                else if(this.query3==='')this.$message.info('请输入时间范围')
                else{
                    this.tableloading = true;
                    const {data:res} = await this.$axios.get("/line/stopline",{params:{time:this.query1,id:this.query2,minute:this.query3}})
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
    /*.el-table .cell {*/
    /*    white-space: pre-line;*/
    /*}*/
</style>
