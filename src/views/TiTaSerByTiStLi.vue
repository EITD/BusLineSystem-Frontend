<template>
<!--    查询上午10:32分地铁万盛站82路的最近的3趟班次信息。可能当前时间下暂⽆班次    -->
    <div class="TiTaSerByTiStLi">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-input placeholder="请输入时间(如10:32)" v-model="query1" class="input-with-select">
                        <!--                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>-->
                    </el-input>
                </el-col>
<!--                <el-col :span="7">-->
<!--                    <el-input placeholder="请输入站点id(如59760)" v-model="query2" class="input-with-select">-->
<!--                        &lt;!&ndash;                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>&ndash;&gt;-->
<!--                    </el-input>-->
<!--                </el-col>-->
                <el-col :span="14">
                    <el-input placeholder="请输入站点id(如59760)" v-model="query3" class="input-with-select">
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
                        prop="latest1"
                        label="班次1">
                </el-table-column>
                <el-table-column
                        prop="latest2"
                        label="班次2">
                </el-table-column>
                <el-table-column
                        prop="latest3"
                        label="班次3">
                </el-table-column>
            </el-table>


        </el-card>


    </div>

</template>

<script>
    // import HelloWorld from "@/components/HelloWorld";

    export default {

        name: 'TiTaSerByTiStLi',
        components: {
            // HelloWorld
        },
        data() {
            return {
                query1:'',
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
                else if(this.query3==='')this.$message.info('请输入站点id')
                else{
                    this.tableloading = true;
                    const {data:res} = await this.$axios.get("/timetable/latest",{params:{time:this.query1,id:this.query3}})
                    this.tableData = res
                    this.tableloading = false;
                    if(res.length)this.$message.success('查询线路成功！')
                    else this.$message.error('查询线路失败！')
                    console.log(res)
                }
            },
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
