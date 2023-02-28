<template>
  <div>
    <!--  搜索栏  -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input v-model="searchModel.username" placeholder="用户名" clearable></el-input>
          <el-input v-model="searchModel.phone" placeholder="电话" clearable></el-input>
          <el-button @click="getUserList" type="primary" round icon="el-icon-search">查询</el-button>
        </el-col>
        <el-col :span="4" align="right">
          <el-button type="primary" icon="el-icon-plus" circle></el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--  结果列表  -->
    <el-card>
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column label="#" width="80">
          <template slot-scope="scope">
            <!--     (pageNo-1) * pageSize + index + 1      -->
            <!--     添加一个插槽用于获取索引  -->
            {{(searchModel.pageNo-1) * searchModel.pageSize + scope.$index + 1}}
          </template>

        </el-table-column>
        <el-table-column prop="id" label="用户ID" width="180">

        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">

        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">

        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" >

        </el-table-column>
        <el-table-column label="操作" width="180">

        </el-table-column>
      </el-table>
    </el-card>
<!--  分页组件  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchModel.pageNo"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
import userAPI from '@/api/userManage'
export default {
  name: "User",
  data() {
    return {
      total: 0,
      searchModel: {
        pageNo: 1,
        pageSize: 10
      },
      userList: []
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize
      this.getUserList()
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo
      this.getUserList()
    },
    getUserList() {
      userAPI.getUserList(this.searchModel).then(response => {
        this.userList = response.data.rows
        this.total = response.data.total
      })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style scoped>
#search .el-input {
  width: 200px;
  margin-right: 10px;
}
</style>
