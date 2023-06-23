<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    主题-->

    <el-container class="container" style="height: 100%;">

      <el-header  class="header" style="color: ghostwhite; font-size: 24px;font-family: 'Microsoft YaHei',serif;">金河市公交线路管理系统</el-header>
      <el-container>
        <el-aside class="aside" width="240px">


          <el-menu
              :router="true"
              background-color="#545c64"
              :unique-opened="true"
              text-color="#fff"
              default-active="2"
              class="el-menu-vertical-demo"
              active-text-color="#ffd04b"
              @open="handleOpen"
              @close="handleClose">
            <el-menu-item index="busFreInfoSerByLine" >
              <i class="el-icon-document"></i>
              <span slot="title">基本信息查询</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>站点查询</span>
              </template>
              <el-menu-item-group >
                <el-menu-item index="staInfoSerByLine"><i class="el-icon-search"></i>线路站点</el-menu-item>
                <!--                    <el-menu-item index="stationSerByLine"><i class="el-icon-search"></i>单挑线路站点</el-menu-item>-->
                <el-menu-item index="liStSerByStation"><i class="el-icon-search"></i>站点停靠线路</el-menu-item>
                <el-menu-item index="alwStSerByLine"><i class="el-icon-search"></i>沿途站点</el-menu-item>
                <el-menu-item index="SPathSerByStation"><i class="el-icon-search"></i>最短路径</el-menu-item>
                <el-menu-item index="dirRouSerByStation"><i class="el-icon-search"></i>直达线路</el-menu-item>
              </el-menu-item-group>
              <!--                  <el-submenu index="1-4">-->
              <!--                    <template slot="title">选项4</template>-->
              <!--                    <el-menu-item index="1-4-1">选项1</el-menu-item>-->
              <!--                  </el-submenu>-->
            </el-submenu>


            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>班次查询</span>
              </template>
              <!--                  <el-menu-item-group title="通过线路查询">-->
              <el-menu-item-group>
                <el-menu-item index="timeInfoSerByLine"><i class="el-icon-search"></i>班次信息</el-menu-item>
                <!--                  </el-menu-item-group>-->
                <!--                  <el-menu-item-group title="通过时间查询">-->
                <el-menu-item index="lineSerByTiSt"><i class="el-icon-search"></i>到站线路</el-menu-item>
                <el-menu-item index="tiTaSerByTiStLi"><i class="el-icon-search"></i>最近3趟班次</el-menu-item>
              </el-menu-item-group>
              <!--                  <el-submenu index="1-4">-->
              <!--                    <template slot="title">选项4</template>-->
              <!--                    <el-menu-item index="1-4-1">选项1</el-menu-item>-->
              <!--                  </el-submenu>-->
            </el-submenu>


            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>分析查询</span>
              </template>
              <el-submenu index="4-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>排序</span>
                </template>

                <el-menu-item-group>

                  <template slot="title">排序站点</template>
                  <el-menu-item index="StationSortByChangeRoad" ><i class="el-icon-search"></i>站点停靠路线数</el-menu-item>
                  <el-menu-item index="TwoStationLine" ><i class="el-icon-search"></i>相邻站台间线路数</el-menu-item>
                </el-menu-item-group>


                <!--                    <el-menu-item index="StatisticStation">统计站点信息</el-menu-item>-->


                <el-menu-item-group>
                  <template slot="title">排序线路</template>
                  <el-menu-item index="RouteSortBySnum" ><i class="el-icon-search"></i>线路的站点数量</el-menu-item>
                  <el-menu-item index="RouteSortByRuntime" ><i class="el-icon-search"></i>线路运行时间</el-menu-item>
                </el-menu-item-group>
                <!--                           <el-menu-item index="ChartLine" ><i class="el-icon-search"></i>公交种类分组统计</el-menu-item>-->

              </el-submenu>


              <el-submenu index="4-2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>查询</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">站点信息查询</template>
                  <el-menu-item index="stationGroup" ><i class="el-icon-search"></i>特殊站点统计</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <template slot="title">线路信息查询</template>
                  <el-menu-item index="ChartLine" ><i class="el-icon-search"></i>公交种类统计</el-menu-item>
                  <el-menu-item index="repeatStation" ><i class="el-icon-search"></i>查询两路重复站点</el-menu-item>
                  <el-menu-item index="directStation" ><i class="el-icon-search"></i>查询线路单行站</el-menu-item>
                  <el-menu-item index="changeLine" ><i class="el-icon-search"></i>查询沿线可换乘线路</el-menu-item>
                  <el-menu-item index="NonRepeat" ><i class="el-icon-search"></i>查询线路非重复系数</el-menu-item>

                </el-menu-item-group>

              </el-submenu>


              <!--                <el-submenu index="5">-->
              <!--                  <template slot="title">-->
              <!--                    <i class="el-icon-menu"></i>-->
              <!--                    <span>线路管理</span>-->
              <!--                  </template>-->
              <!--                  <el-menu-item-group>-->
              <!--                    <template slot="title">分组一</template>-->
              <!--                    <el-menu-item index="test">选项1</el-menu-item>-->
              <!--                    <el-menu-item index="1-2">选项2</el-menu-item>-->
              <!--                  </el-menu-item-group>-->
              <!--                  <el-menu-item-group title="分组2">-->
              <!--                    <el-menu-item index="1-3">选项3</el-menu-item>-->
              <!--                  </el-menu-item-group>-->
              <!--                  <el-submenu index="1-4">-->
              <!--                    <template slot="title">选项4</template>-->
              <!--                    <el-menu-item index="1-4-1">选项1</el-menu-item>-->
              <!--                  </el-submenu>-->
              <!--                </el-submenu>-->
            </el-submenu>

            <el-menu-item index="addDeleteEdit" >
              <i class="el-icon-document"></i>
              <span slot="title">线路管理</span>
            </el-menu-item>

          </el-menu>

        </el-aside>
        <el-main class="main" >
<!--          <img :src="imgSrc" width="100%" height="100%" alt="" />-->

          <router-view>

          </router-view>

        </el-main>
      </el-container>



    </el-container>

  </div>

</template>

<script>

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'


export default {
  // data() {
  //   return {
  //     imgUrl:require("../assets/test.png")
  //   }
  // },
  name: 'Home',
  components: {
    // HelloWorld
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.home{
  height: 100%;
}
.container{
  height: 100%;

}
.header
{
  background-color: black;
  text-align: center;
  line-height: 60px;
  height:100px;

}
.aside{
  background-color: #545c64;

  margin: 0;
  padding: 0;
  height:720px;

}
.main{
  background-color: ghostwhite;
  margin: 0;
  padding: 0;
  height:720px;


}


</style>
