
<template>

  <el-card class="box-card">


    <group>

    </group>
    <el-row>
      <el-col>

        <el-button type="primary" @click="getData2">绘制统计图</el-button>
      </el-col>
    </el-row>

  </el-card>


</template>

<script>
import chart from "./chart";
import group from "./group";
export default {
  components:{
    chart,group
  },
  name: "stationGroup",
  data() {
    return {
      query1:'',
      // totalCount: '',
      // num : ''
    }
  },

  created() {

  },

  methods:{



    async getData2() {
      await this.$router.push('/home/chart')
    },
    created() {
      this.getData1();

    },

  },
}



</script>

<style scoped>

</style>