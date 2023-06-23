<template>
<!--    查询最短路径-->
    <div class="StaInfoSerByLine">
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input placeholder="请输入出发站id(如16115)" v-model="query1" class="input-with-select">
                        <!--                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>-->
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-input placeholder="请输入目的站id(如14768)" v-model="query2" class="input-with-select">
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
                        prop="id"
                        label="站点id">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="站点名">
                </el-table-column>
                <el-table-column
                        prop="english"
                        label="站点英文">
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "SPathSerByStation",

        data() {
            return {
                query1:'',
                query2:'',
                tableData:[],
                tableloading : false,
            }
        },
        methods:{
            async getData(){
                if(this.query1===''||this.query2==='')this.$message.info('请输入站点名')
                else{
                    this.tableloading = true;
                    const {data:res} = await this.$axios.get("/station/findShort",{params:{id1:this.query1,id2:this.query2}})
                    this.tableData = res
                    this.tableloading = false;
                    if(res.length)this.$message.success('查询路径成功！')
                    else this.$message.error('查询路径失败！')
                    console.log(res)
                }
            }

        }

    }

</script>

<style scoped>

</style>
