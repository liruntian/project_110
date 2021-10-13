<template>
  <div class="frozen">
    <!-- <div class="search-content">
      <h3 style="margin-right: 16px">展会名称</h3>
      <el-input
        v-model="exportName"
        placeholder="请输入展会名称"
        style="width: 200px; margin-right: 48px"
      ></el-input>
      <h3 style="margin-right: 16px">展会简称</h3>
      <el-input
        v-model="hostComp"
        placeholder="请输入展会简称"
        style="width: 200px"
      ></el-input>
      <div class="search-button">
        <el-button type="primary" icon="el-icon-search" size="small"
          >查询</el-button
        >
        <el-button size="small">重置</el-button>
      </div>
    </div> -->

    <Table border :columns="columns7" :data="data6" :row-class-name="rowClassName" ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="data.length"
          :current="1"
          show-total
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsers, freeze, unFreeze } from "../../network/freeze"

export default {
  inject: ["reload"],
  data () {
    return {
      exportName: "",
      hostComp: "",
      pageSize: 10,
      columns7: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "展会名称",
          key: "name",
          align: "center"
        },
        {
          title: "处室负责人",
          key: "charger",
          align: "center"
        },
        {
          title: "联系人手机",
          key: "teleNum",
          align: "center"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              params.row.isFreeze
                ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.unFrozen(params.row)
                      }
                    }
                  },
                  "解冻"
                )
                : h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.frozen(params.row)
                      }
                    }
                  },
                  "冻结"
                )
            ])
          }
        }
      ],
      data: [],
      data6: [
        {
          exhiName: "John Brown",
          charger: "汪聪",
          teleNum: "13051578190"
        }
      ]
    }
  },
  created () {
    getAllUsers().then((res) => {
      this.data = res.data
      this.changePage(1)
    })
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    frozen (account) {
      this.$confirm("确定冻结该账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        freeze(account.meetAddr).then((res) => {
          this.$notify({
            title: "冻结成功",
            message: `成功将"${account.name}"的账号冻结`,
            type: "success"
          })
        })
        this.reload()
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消冻结"
        })
      })
    },
    unFrozen (account) {
      this.$confirm("确定解冻该账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        unFreeze(account.meetAddr).then((res) => {
          this.$notify({
            title: "解冻成功",
            message: `成功将"${account.name}"的账号解冻`,
            type: "success"
          })
        })
        this.reload()
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消解冻"
        })
      })
    },
    changePageSize (size) {
      this.pageSize = size
      this.changePage(1)
    },
    changePage (res) {
      this.data6 = this.data.slice(
        (res - 1) * this.pageSize,
        res * this.pageSize
      )
    },
    rowClassName (row, index) {
      if (row.isFreeze) {
        return "demo-table-error-row"
      }
      return ""
    }
  }
}
</script>

<style>
.search-content {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.search-button {
  margin-left: 16px;
}
.ivu-table-cell {
  font-size: 16px;
}
.ivu-table .demo-table-error-row td {
    background-color: #f5f7f9;
    color: #c3cbd6;
}
</style>
