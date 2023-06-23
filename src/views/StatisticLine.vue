<template>
  <div>
    <el-table @filter-change="filterChange"
        :data="tableData"
        style="width: 100% "
        :default-sort = "{prop: 'date', order: 'descending'}"
    >
      <el-table-column
          prop="address"
          label="线路名"

          :formatter="formatter">
      </el-table-column>
      <el-table-column
          prop="date"
          label="站点数量"
          sortable
          >
      </el-table-column>
      <el-table-column
          prop="name"
          label="运行时间"
          sortable
          >
      </el-table-column>

    </el-table>


  </div>

</template>

<script>

export default {
  name: "StatisticLine"
}

</script>

<style scoped>

</style>