<template>
<!--    添加⼀条站点数不少于10的线路，要求线路合理-->
<!--    删除某条线路，若沿途站点为该线路独有，也需要删除该站点-->
<!--    为某条线路增加、删除、替换站点（班次信息和路线信息也需要同步更新）-->
    <div class="AddDeleteEdit">
        <el-card class="box-card">
            <el-row>
                <el-col :span="2">
                    <el-button type="primary" plain @click="addDialogVisible = true">添加线路站点</el-button>
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
                        label="线路名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="alongStation"
                        label="站点"
                        :formatter="split">
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.name)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="remove(scope.row.name)"></el-button>
                    </template>
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

        <el-dialog title="添加线路站点" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
                <el-form-item label="线路名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="站点" prop="alongStation">
                    <el-input v-model="addForm.alongStation"></el-input>
                </el-form-item>
                <el-form-item label="首班车" prop="first">
                    <el-input v-model="addForm.first"></el-input>
                </el-form-item>
                <el-form-item label="站点时间间隔" prop="timetable">
                    <el-input v-model="addForm.timetable"></el-input>
                </el-form-item>
                <el-form-item label="班次间隔" prop="interval">
                    <el-input v-model="addForm.interval"></el-input>
                </el-form-item>
                <el-form-item label="班次数量" prop="number">
                    <el-input v-model="addForm.number"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑线路站点" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
                <el-form-item label="线路名">
                    <el-input v-model="editForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="站点" prop="editalongStation">
                    <el-input v-model="editForm.editalongStation"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    // import HelloWorld from "@/components/HelloWorld";

    export default {

        name: 'AddDeleteEdit',
        components: {
            // HelloWorld
        },
        data() {
            let checkalongStation = (rule,value,callback) =>{
                const reg = /^([0-9_-])/;
                let str = value.split(",");
                str.forEach(s=>{
                    if(!reg.test(s))return callback(new Error('请输入站点id'))
                })
                if(str.length<10)return callback(new Error('站点数不能少于10'));
                return callback();
            };
            let checkfirst = (rule,value,callback) =>{
                const reg = /^([0-1][0-9]|2[0-3]):([0-5][0-9])/;
                if(!reg.test(value))return callback(new Error('输入格式为hh:mm'))
                return callback();
            };
            let checktimetable = (rule,value,callback) =>{
                // const reg = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])/;
                const reg = /^\d+/;
                let str = value.split(",");
                str.forEach(s=>{
                    if(!reg.test(s))return callback(new Error('请输入站点间隔时间'))
                    else if(s==='0')return callback(new Error('站点间隔时间不能为0'))
                })
                let size = this.addForm.alongStation.split(",").length
                if(str.length!==size-1)return callback(new Error('站点间隔时间与站点数不匹配'));
                return callback();
            };
            let checkinterval = (rule,value,callback) =>{
                const reg = /^\d+/;
                if(!reg.test(value))return callback(new Error('请输入班次间隔时间'))
                else if(value==='0')return callback(new Error('班次间隔时间不能为0'))
                return callback();
            };
            let checknumber = (rule,value,callback) =>{
                const reg = /^\d+/;
                if(!reg.test(value))return callback(new Error('请输入班次数量'))
                else if(value==='0')return callback(new Error('班次数量不能为0'))
                return callback();
            };
            return {
                pagenum:1,
                pagesize:5,
                tableData:[],
                total:0,
                tableloading : false,

                editDialogVisible:false,
                editForm:{
                    name:'',
                    editalongStation:''
                },
                editFormRules:{
                    editalongStation:[
                        {required:true, message:'请输入站点', trigger:'blur'},
                        {validator:checkalongStation,trigger:'blur'}
                    ]
                },
                addDialogVisible:false,
                addForm:{
                    name:'',
                    alongStation:'',
                    first:'',
                    timetable:'',
                    interval:'',
                    number:''
                },
                addFormRules:{
                    name:[
                        {required:true, message:'请输入线路名', trigger:'blur'}
                    ],
                    alongStation:[
                        {required:true, message:'请输入站点', trigger:'blur'},
                        {validator:checkalongStation,trigger:'blur'}
                    ],
                    first:[
                        {required:true, message:'请输入首班车', trigger:'blur'},
                        {validator:checkfirst,trigger:'blur'}
                    ],
                    timetable:[
                        {required:true, message:'请输入站点间隔时间', trigger:'blur'},
                        {validator:checktimetable,trigger:'blur'}
                    ],
                    interval:[
                        {required:true, message:'请输入班次间隔时间', trigger:'blur'},
                        {validator:checkinterval,trigger:'blur'}
                    ],
                    number:[
                        {required:true, message:'请输入班次数量', trigger:'blur'},
                        {validator:checknumber,trigger:'blur'}
                    ]
                },

            }
        },
        created() {
            this.getAll();
        },
        // mounted() {
        //   this.getData();
        // },
        methods:{
            async remove(name){
                const result = await this.$confirm('此操作将永久删除该线路, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                // console.log(result)
                if(result !== 'confirm')return this.$message({
                                                        type: 'info',
                                                        message: '已取消删除'
                                                    });

                await this.$axios.get("/line/delete",{params:{name:name}})
                await this.getAll()
                this.$message({
                                type: 'success',
                                message: '删除成功！'
                            });
            },
            async showEditDialog(name){
                // console.log(name)
                // const {data:res1} = await this.$axios.get("/station/get",{params:{name:name}})
                // console.log(res)
                // this.editForm.name = res1[0].name
                const {data:res} = await this.$axios.get("/station/getalongStation",{params:{name:name}})
                console.log(res)
                this.editForm.name = name
                this.editForm.editalongStation = res.alongStation.toString()
                this.editDialogVisible = true
            },
            editDialogClosed(){
              this.$refs.editFormRef.resetFields()
            },
            edit(){
                this.$refs.editFormRef.validate(async valid =>{
                    if(!valid)return
                    await this.$axios.get("/line/edit",{params:{name:this.editForm.name,alongStation:this.editForm.editalongStation}})
                    this.editDialogVisible = false
                    await this.getAll()
                    this.$message.success('修改线路成功！')
                })
            },
            addDialogClosed(){
                this.$refs.addFormRef.resetFields()
            },
            add(){
                this.$refs.addFormRef.validate(async valid =>{
                    if(!valid)return
                    await this.$axios.get("/line/add",{params:{name:this.addForm.name,alongStation:this.addForm.alongStation,first:this.addForm.first,timetable:this.addForm.timetable,interval:this.addForm.interval,number:this.addForm.number}})
                    this.addDialogVisible = false
                    await this.getAll()
                    console.log(this.total)
                    this.$message.success('添加线路成功！')
                })
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
                this.tableloading = true;
                const {data:res} = await this.$axios.get("/station/getall",{params:{pagenum:1,pagesize:this.pagesize}})
                this.tableData = res.list
                this.total = res.total
                this.tableloading = false;
                console.log(res)
            },
            // async add(){
                // this.$axios.post("/line/get",{name:"N8"})
                //     .then(res=>{
                //       alert(res.data.result.text);
                //       this.data=res.data.result.text;
                //       console.log(res.data)
                // })
                // const {data:res} = await this.$axios.get("/station/alongway",{params:{line:this.query1,station1:this.query2,station2:this.query3}})
                // this.tableData = res
                // console.log(res)
            // },
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
