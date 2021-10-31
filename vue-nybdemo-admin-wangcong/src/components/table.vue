<template>
  <div>
<!--    <Table-->
<!--      :columns="columns1"-->
<!--      :data="currentPageData"-->
<!--      :context="self"-->
<!--      :nextPath="nextPath"-->
<!--      size="large"-->
<!--      @on-selection-change="changeChecked"-->
<!--      ref="table"-->
<!--    ></Table>-->
    <el-table
      border
      :data="currentPageData"
      :context="self"
      :nextPath="nextPath"
      size="large"
      @selection-change="changeChecked"
      ref="table">
      <el-table-column
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        label="#"
        width="60">
        <template slot-scope="scope">
          {{ scope.$index+ 1 + (currentPage-1)*pageSize}}
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        align="center"-->
<!--        prop="id"-->
<!--        label="展会ID"-->
<!--        width="100">-->
<!--      </el-table-column>-->
      <el-table-column
        align="center"
        label="首次申报"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.isFirstFont">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="展会名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="申报日期"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="chooseCity"
        label="举办地">
      </el-table-column>
      <el-table-column
        align="center"
        prop="hostComp"
        label="主办方">
      </el-table-column>
      <el-table-column
        align="center"
        prop="checkState"
        label="申报状态"
        width="80">
      </el-table-column>
      <el-table-column
        align="center"
        width="240"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="check(scope.row)" v-show="scope.row.checkState == '待修改' || scope.row.checkState == '待总结' || scope.row.checkState == '已完成'">查看</el-button>
          <el-button type="primary" size="mini" @click="check(scope.row)" v-show="scope.row.checkState == '待审核'">审核</el-button>
          <el-button type="danger" size="mini" @click="rejected(scope.row)" v-show="scope.row.checkState == '待总结'">驳回</el-button>
          <el-button type="primary" size="mini" @click="check(scope.row, '查看总结')" v-show="scope.row.checkState == '已完成'">查看总结</el-button>
<!--          <el-button type="primary" size="mini" @click="downAllFile(scope.row)">导出相关文件</el-button>-->
          <el-button type="primary" size="mini" @click="getHandleRecords(scope.row.id)">处理历史</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      id="tableData"
      :data="selection"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="80">
        <template slot-scope="scope">
          {{ scope.$index+ 1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="isFirstFont"
        label="首次申报"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.isFirstFont">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="展会名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="申报日期">
      </el-table-column>
      <el-table-column
        prop="chooseCity"
        label="举办地">
      </el-table-column>
      <el-table-column
        prop="hostComp"
        label="主办方">
      </el-table-column>
      <el-table-column
        prop="checkState"
        label="申报状态">
      </el-table-column>
    </el-table>

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
            <span>修改建议： {{ activity.content }}</span>
            <span>
              <a style="margin-left: 15px" @click="downloadFile(activity)">
                <img style="height: 30px;width: 30px" :src="downloadFileIcon" alt="">
                点击下载附件
              </a>
            </span>
            <el-popover
              placement="bottom"
              trigger="manual"
              width="60px"
              content="正在下载附件..."
              :visible-arrow="true"
              offset="0"
              v-model="activity.isDownloading">
            </el-popover>
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
          :current="currentPage"
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
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { historyHandles, checkPassDetail, getdetailFile } from "../network/detailCheck"
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
      currentPage: 1,
      currentPageData: [],
      pageSize: 10,
      showHandleHistory: false,
      handleRecords: [],
      selection: [],
      downloadFileIcon: require("../assets/file.svg"),
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
                  "审核"
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
                      this.downAllFile(params.row)
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
  watch: {
    data (val) {
      this.currentPage = 1
      this.currentPageData = val.slice(0, this.currentPage*this.pageSize)
    },
    selection (val) {
      console.log(val)
    }
  },
  created() {
    // console.log(this.data)
    // console.log(sessionStorage.getItem("data"))
    // if (sessionStorage.getItem("data")){
    //   this.data = JSON.parse(sessionStorage.getItem("data"))
    // }
    // this.currentPage = sessionStorage.getItem("currentPage") ? sessionStorage.getItem("currentPage") * 1 : 1
    // this.pageSize = sessionStorage.getItem("pageSize") ? sessionStorage.getItem("pageSize") * 1 : 10
    // console.log(this.currentPage)
    // this.changePage(this.currentPage)
  },
  destroyed () {
    // console.log(this.currentPage)
    // sessionStorage.setItem("currentPage", JSON.stringify(this.currentPage))
    // sessionStorage.setItem("pageSize", JSON.stringify(this.pageSize))
    // sessionStorage.setItem("data", JSON.stringify(this.data))
  },
  methods: {
    changeChecked (a) {
      console.log(a)
      this.selection = a
      this.$emit("selectionChange",this.selection.length)
    },
    async downFile (fileId, fileName) {
      await getdetailFile(fileId).then((res) => {
        const blob = new Blob([res]) // 处理文档流
        const elink = document.createElement("a")
        elink.setAttribute("download", decodeURIComponent(fileName))
        elink.download = fileName
        elink.style.display = "none"
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      })
    },
    async downAllFile (a) {
      console.log(a.meetPlanFileId);
      await this.downFile(a.meetPlanFileId, a.name + "的展会工作方案文档.pdf")
      await this.downFile(a.investmentPlanFileId, a.name + "的招商方案.pdf")
      await this.downFile(a.feasibilityFileId, a.name + "的可行性报告文档.pdf")
      await this.downFile(a.conditionStateFileId, a.name + "的承办单位办展条件说明.pdf")
    },
    downloadFile (record) {
      Vue.set(record, "isDownloading", true)
      getdetailFile(record.fileId).then(res => {
        console.log(res);
        const blob = new Blob([res]); //处理文档流
        const fileName =  "处理意见.pdf";
        const elink = document.createElement("a");
        elink.setAttribute("download", decodeURIComponent(fileName));
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
        Vue.set(record, "isDownloading", false)
      }).catch(() => {
        Vue.set(record, "isDownloading", false)
        this.$message.error("下载失败，请重试")
      })
    },
    downCSV () {
      console.log(this.selection)
      if (this.selection.length <= 0) {
        this.$notify.error({
          title: "警告",
          message: "请至少选择一条数据进行导出"
        })
        return
      }
      let xlsxData = XLSX.utils.table_to_book(document.querySelector("#tableData"))
      let downloadData = XLSX.write(xlsxData,{ bookType: 'xlsx', bookSST: true, type: 'array' })
      FileSaver.saveAs(new Blob([downloadData], {type: "application/octet-stream"}), "汇总表格.xlsx")
      return downloadData
    },
    changePageSize (size) {
      this.pageSize = size
      this.currentPageData = this.data.slice(0, this.currentPage*this.pageSize)
    },
    changePage (res) {
      console.log(this.data)
      this.currentPage = res
      this.currentPageData = this.data.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
      console.log(this.currentPageData)
    },
    rejected (item) {
      this.$confirm("确定驳回此条申报吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          item.isFirstFont
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
          status: status
        }
      })
    },
    getHandleRecords (id) {
      historyHandles(id).then((res) => {
        console.log(res.data)
        this.handleRecords = res.data
        this.handleRecords.forEach((record) => {
          Vue.set(record, "isDownloading", false)
          let date = new Date(record.createTime)
          let targetTime = new Date(date.getTime() + 8*60*60*1000)
          let y = targetTime.getFullYear()
          let M = (targetTime.getMonth() + 1).toString()
          M = M < 10 ? "0"+M : M
          let d = targetTime.getDate()
          d = d < 10 ? "0" + d : d
          let h = targetTime.getHours()
          h = h < 10 ? "0" + h : h
          let m = targetTime.getMinutes()
          m = m < 10 ? "0" + m : m
          let s = targetTime.getSeconds()
          s = s < 10 ? "0" + s : s
          let showTime = y+"-"+ M +"-"+d+" "+h+":"+m+":"+s
          Vue.set(record, "createTime", showTime)
        })
        this.showHandleHistory = true
      }).catch(() => {
        this.$message.error("网络出错，请重试！")
      })
    }
  }
}
</script>

<style>
  #tableData{
    display: none;
  }
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.el-table .el-button{
  padding: 5px 10px;
  margin-left: 0px;
  font-size: 13px;
}
.el-table th{
  background-color: #f2f2f3;
  color: #515a6e;
  border: 1px solid #ebeef5;
}

.el-popover{
  right: 0 !important;
  bottom: -32px !important;
  border-radius: 20px !important;
  background: #0bbd87 !important;
  min-width: 80px !important;
  color: #fff !important;
}
.el-popover--plain{
  padding: 5px 20px !important;
}
</style>
