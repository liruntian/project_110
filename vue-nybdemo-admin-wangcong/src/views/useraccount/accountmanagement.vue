<template>
  <div class="frozen">
    <el-card>
      <div class="search-content">
        <h3 style="margin-right: 16px">展会名称</h3>
        <el-input
          v-model="exportName"
          placeholder="请输入展会名称"
          style="width: 160px; margin-right: 18px"
        ></el-input>
        <h3 style="margin-right: 16px">展会简称</h3>
        <el-input
          v-model="meetAddr"
          placeholder="请输入展会简称"
          style="width: 160px;margin-right: 18px"
        ></el-input>
        <h3 style="margin-right: 16px">展会类型</h3>
        <el-select style="width: 160px" v-model="exportKind" placeholder="请选择展会类型">
          <el-option label="事业单位" value="0"></el-option>
          <el-option label="省部级" value="1"></el-option>
          <el-option label="海外机构" value="2"></el-option>
        </el-select>
        <div class="search-button">
          <el-button type="primary" icon="el-icon-search" @click="searchAccountData">查询</el-button>
          <el-button>重置</el-button>
        </div>
        <div class="addCount">
          <el-button type="primary" @click="addDialogVisible = true">添加账号</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="添加账号"
      :visible.sync="addDialogVisible"
      width="35%"
      center>
      <div class="register">
        <el-form :model="formInline" label-position="left">
          <el-form-item label="展会名称:">
            <el-input style="width: 300px;" v-model="formInline.name" placeholder="展会名称"></el-input>
          </el-form-item>
          <el-form-item label="展会简称:">
            <el-input
              style="width: 300px;"
              v-model="formInline.meetAddr"
              placeholder="展会首字母小写"
            ></el-input>
          </el-form-item>
          <el-form-item label="展会类型">
            <el-select style="width: 300px;" v-model="formInline.kind" placeholder="请选择展会类型">
              <el-option label="事业单位" value="0"></el-option>
              <el-option label="省部级" value="1"></el-option>
              <el-option label="海外机构" value="2"></el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="展会类型:">-->
<!--            <el-radio-group v-model="formInline.kind">-->
<!--              <el-radio-button label="事业单位"></el-radio-button>-->
<!--              <el-radio-button label="省部级"></el-radio-button>-->
<!--              <el-radio-button label="海外机构"></el-radio-button>-->
<!--            </el-radio-group>-->
<!--            &lt;!&ndash; <el-input v-model="formInline.kindInput" placeholder="事业单位 或 省部级 或 海外机构" ></el-input> &ndash;&gt;-->
<!--          </el-form-item>-->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确认添加</el-button>
      </span>
    </el-dialog>
<!--    <Table border :columns="columns7" :data="allShowData" :row-class-name="rowClassName" ></Table>-->
    <div class="tableData">
      <el-table
        :data="currentPageData"
        border
        :row-class-name="rowClassName"
        header-row-class-name="headerRow"
        style="width: 100%;align-items: center">
        <el-table-column
          align="center"
          width="60"
          label="#">
          <template slot-scope="scope">
            {{ scope.$index+ 1 + (currentPage-1)*pageSize}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="展会名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="meetAddr"
          label="展会简称"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          label="展会类型"
          width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.kind === 0">省部级</span>
            <span v-else-if="scope.row.kind === 1">事业单位</span>
            <span v-else>海外机构</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button size="small" type="primary" v-if="scope.row.isFreeze" @click="unFrozen(scope.row)">解冻</el-button>
            <el-button size="small" type="danger" v-else @click="frozen(scope.row)">冻结</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
        <Page
          :total="allShowData.length"
          :current="currentPage"
          show-total
          show-sizer
          :page-size-opts = [10,20,50,100]
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
    </div>
  </div>
</template>

<script>
import { getAllUsers, freeze, unFreeze } from "../../network/freeze"
import {addUser} from "../../network/addUser";

export default {
  inject: ["reload"],
  data () {
    return {
      exportName: "",
      meetAddr: "",
      exportKind: "",
      currentPage: 1,
      pageSize: 10,
      allShowData: [],
      allSearchData: [],
      currentPageData: [],
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
          title: "展会简称",
          key: "meetAddr",
          align: "center",
          width: 90
        },
        {
          title: "展会类型",
          key: "kind",
          align: "center",
          width: 90
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
      allShowData: [
        {
          exhiName: "John Brown",
          charger: "汪聪",
          teleNum: "13051578190"
        }
      ],
      addDialogVisible: false,
      formInline: {
        name: "",
        meetAddr: "",
        kind: "",
      },
    }
  },
  created () {
    getAllUsers().then((res) => {
      console.log(res.data)
      this.data = res.data
      this.allShowData = this.data
      this.changePage(1)
    })
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.allShowData[index].name}<br>Age：${this.allShowData[index].age}<br>Address：${this.allShowData[index].address}`
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
      this.currentPageData = this.allShowData.slice(0, this.currentPage*this.pageSize)
      // this.changePage(1)
    },
    changePage (res) {
      this.currentPage = res
      this.currentPageData = this.allShowData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
    },
    searchAccountData () {
      if (!(this.exportName || this.meetAddr || this.exportKind)){
        this.$message.warning("请至少输入一个查询条件")
      }else {
        if (this.exportKind){
          this.allSearchData = this.data.filter((item) => {
            return item.kind === this.exportKind * 1
          })
        }else {
          this.allSearchData = this.data
        }
        if (this.exportName){
          this.allSearchData = this.allSearchData.filter((item) => {
            return item.name.match(this.exportName)
          })
        }
        if (this.meetAddr){
          this.allSearchData = this.allSearchData.filter((item) => {
            return item.meetAddr.match(this.meetAddr)
          })
        }
        console.log(this.allSearchData)
        this.allShowData = this.allSearchData
        console.log(this.allShowData)
        this.changePage(1)
      }
    },
    rowClassName ({ row, index }) {
      if (row.isFreeze) {
        return "frozenRow"
      }
      return ""
    },
    onSubmit() {
      if (!this.formInline.name) {
        this.$message({
          showClose: true,
          message: "请填写展会名称！",
          type: "error",
        });
        return false;
      }
      if (!this.formInline.meetAddr) {
        this.$message({
          showClose: true,
          message: "请填写展会简称！",
          type: "error",
        });
        return false;
      }
      if (!this.formInline.kind) {
        this.$message({
          showClose: true,
          message: "请填写展会类型！",
          type: "error",
        });
        return false;
      }
      // if (this.formInline.kindInput === "事业单位") {
      //   this.formInline.kind = 0;
      // } else if (this.formInline.kindInput === "省部级") {
      //   this.formInline.kind = 1;
      // } else if (this.formInline.kindInput === "海外机构") {
      //   this.formInline.kind = 2;
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: "请填写正确的类型！",
      //     type: "error",
      //   });
      //   return false;
      // }

      addUser(
        this.formInline.name,
        this.formInline.meetAddr,
        this.formInline.kind * 1
      ).then((successResponse) => {
        if (successResponse.code === 0) {
          this.$Notice.success({
            title: "添加成功",
          });
          this.reload();
        } else {
          this.$Notice.error({
            title: "添加失败",
            desc: successResponse.msg ? successResponse.msg : "添加失败",
          });
        }
      });

    },

  }
}
</script>

<style>
  .frozen{
    width: 100%;
    padding: 30px 30px 25px 30px;
    background-color: #ffffff;
  }
  .tableData{
    margin-top: 30px ;
  }
  .page{
    margin-top: 15px;
    text-align: right;
  }
.search-content {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.search-button {
  margin-left: 16px;
}
.addCount{
  /*position: absolute;*/
  /*right: 120px;*/
  margin-left: 40px;
}
  .register {
    height: 100%;
    padding: 0 25px;
  }
.ivu-table-cell {
  font-size: 16px;
  padding: 0 8px;
}
.el-table .frozenRow td{
  background-color: #f5f7f9;
  color: #c3cbd6;
}
  .headerRow{
    background-color: #f2f2f3;
    color: #515a6e;
    border: 1px solid #ebeef5;
  }
  .el-table th{
    background-color: #f2f2f3;
  }
.ivu-table .demo-table-error-row td {
    background-color: #f5f7f9;
    color: #c3cbd6;
}
</style>
