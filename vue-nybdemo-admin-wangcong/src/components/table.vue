<template>
  <div>
    <Table
      :columns="columns1"
      :data="data"
      :context="self"
      :nextPath="nextPath"
      size="large"
      @on-selection-change="changeChecked"
      ref="table"
    ></Table>
    <el-dialog
      title="审核历史记录查看"
      :visible.sync="showHandleHistory"
      width="30%"
    >
      <el-empty
        description="暂无处理记录"
        v-if="handleRecords.length == 0"
      ></el-empty>
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in handleRecords"
          :key="index"
          placement="top"
          :color="color"
          :timestamp="
            activity.createTime.slice(0, 10) +
            ' ' +
            activity.createTime.slice(11, 19)
          "
        >
          <el-card>
            <h4>{{ activity.adminId }}: 返回修改</h4>
            <p>修改建议： {{ activity.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showHandleHistory = false">返 回</el-button>
      </span>
    </el-dialog>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="data.length"
          :current="1"
          show-total
          show-sizer
          :page-size-opts = [10,20,50,100]
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import { historyHandles, checkPassDetail } from "../network/detailCheck"
import { checkPassEasy } from "../network/easyCheck"
export default {
  inject: ["reload"],
  name: "beaTable",
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    nextPath: {
      type: String,
      default () {
        return "/"
      }
    },
    checkType: {
      default () {
        return "1"
      }
    }
  },
  data () {
    return {
      color: "#0bbd87",
      self: this,
      pageSize: 10,
      showHandleHistory: false,
      handleRecords: [],
      selection: [],
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "展会ID",
          key: "id"
        },
        {
          title: "申报日期",
          key: "createTime"
        },
        {
          title: "展会名称",
          key: "name"
        },
        {
          title: "举办地",
          key: "chooseCity"
        },
        {
          title: "主办方",
          key: "hostComp"
        },
        {
          title: "申报状态",
          key: "checkState"
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              params.row.checkState == "待审核"
                ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.check(params.row)
                      }
                    }
                  },
                  "审批"
                )
                : h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.check(params.row)
                      }
                    }
                  },
                  "查看"
                ),
              params.row.checkState == "待总结"
                ? h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.rejected(params.row)
                      }
                    }
                  },
                  "驳回"
                )
                : null,
              params.row.checkState == "已完成"
                ? h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.check(params.row, "查看总结")
                      }
                    }
                  },
                  "查看总结"
                )
                : null,
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.removeButton(params.row);
                    }
                  }
                },
                "导出表单"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.getHandleRecords(params.row.id)
                    }
                  }
                },
                "处理历史"
              )
            ])
          }
        }
      ]
    }
  },
  methods: {
    changeChecked (a) {
      this.selection = a
    },
    downCSV () {
      if (this.selection.length <= 0) {
        this.$notify.error({
          title: "警告",
          message: "请至少选择一条数据进行导出"
        })
        return
      }
      this.$refs.table.exportCsv({
        filename: "申报记录",
        columns: this.columns1.filter((col, index) => index > 1 && index < 8),
        data: this.selection
      })
    },
    changePageSize (size) {
      this.pageSize = size
      this.changePage(1)
    },
    changePage (res) {
      this.data = this.data.slice(
        (res - 1) * this.pageSize,
        res * this.pageSize
      )
    },
    rejected (item) {
      this.$confirm("确定驳回此条申报吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.checkType == 1
            ? checkPassDetail(item.id, this.$store.getters.token, 5).then(
              (successResponse) => {
                if (successResponse.data.code === 0) {
                } else {
                  this.$message({
                    showClose: true,
                    message: "提交失败！",
                    type: "error"
                  })
                }
              }
            )
            : checkPassEasy(item.id, this.$store.getters.token, 5).then(
              (successResponse) => {
                if (successResponse.data.code === 0) {
                } else {
                  this.$message({
                    showClose: true,
                    message: "提交失败！",
                    type: "error"
                  })
                }
              }
            )
          this.$message({
            type: "success",
            message: "驳回成功!"
          })
          this.reload()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消驳回"
          })
        })
    },
    check (data, status) {
      this.$router.push({
        path: this.nextPath,
        query: {
          item: data,
          checkType: this.checkType,
          checkState: data.checkState,
          status: status
        }
      })
    },
    getHandleRecords (id) {
      this.showHandleHistory = true
      historyHandles(id).then((res) => {
        this.handleRecords = res.data
        this.handleRecords.forEach((record) => {
          let date = new Date(record.createTime)
          let targetTime = new Date(date.getTime() + 8*60*60*1000)
          let showTime = targetTime.getFullYear()+"-"+ (targetTime.getMonth()+1).toString() +"-"+targetTime.getDate()+" "+targetTime.getHours()+":"+targetTime.getMinutes()+":"+targetTime.getSeconds()
          Vue.set(record, "createTime", showTime)
        })
      })
    }
  }
}
</script>

<style>
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
</style>
