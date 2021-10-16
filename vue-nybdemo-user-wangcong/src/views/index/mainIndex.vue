<template>
  <div class="main">
    <div class="all-info">
      <div class="current-font">
        <div class="new-font">
          <p>进行中申报</p>
          <a class="new-font-btn" v-if="!hasCurrentFont" @click="newFont()">
            <img :src="addBtn" alt="">
            <span>新建申报</span>
          </a>
          <div class="current-font-data" v-else>
            <table border="1" cellspacing="0">
              <thead>
                <td>展会名称</td>
                <td>首次申报</td>
                <td>举办地点</td>
                <td>举办时间</td>
                <td>申报状态</td>
                <td>操作</td>
              </thead>
              <tr>
                <td>{{ currentFont.name }}</td>
                <td>{{ currentFont.isFirstFont ? "是" : "否" }}</td>
                <td>{{ place }}</td>
                <td>{{ time }}</td>
                <td style="color: #515A6E">{{ checkState }}</td>
                <td>
                  <el-button type="primary" @click="seefont (currentFont)">查看申报</el-button>
                  <span>
                    <el-button type="primary" v-if="currentFont.checkState === 0" @click="centerCancelDialogVisible = true">撤回</el-button>
                    <el-button type="primary" disabled v-else>撤回</el-button>
                  </span>
                  <span>
                    <el-button type="primary" v-if="currentFont.checkState === 2" @click="modifyFont()">修改</el-button>
                    <el-button type="primary" disabled v-else>修改</el-button>
                  </span>
                  <span>
                    <el-button type="primary" v-if="currentFont.checkState === 1" @click="handinSummary()">填写总结</el-button>
                    <el-button type="primary" disabled v-else>填写总结</el-button>
                  </span>
                  <el-button type="primary" @click="seeHandleRecord(currentFont.id)">处理记录</el-button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="history-font">
        <div>
          <p>历史申报</p>
          <div class="history-font-data">
            <table border="1" cellspacing="0">
              <thead>
                <td width="60px">#</td>
                <td>展会名称</td>
                <td>首次申报</td>
                <td>举办地点</td>
                <td>举办时间</td>
                <td>申报状态</td>
                <td>操作</td>
              </thead>
              <tr v-if="historyFontData.length === 0">
                <td colspan="6">暂无历史申报数据</td>
              </tr>
              <tr v-for="(item,index) in showHistoryFontData" v-else :key="index">
                <td>{{(currentPage-1)*pageSize + index+1}}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.isFirstFont ? "是" : "否" }}</td>
                <td>{{ item.chooseCity + "-" + item.place }}</td>
                <td>{{ item.startTime.slice(0, 10) + " 至 " + item.endTime.slice(0, 10) }}</td>
                <td>
                  <el-tag style="font-size: 16px" v-show="item.checkState === 3" type="success">已完成</el-tag>
                  <el-tag style="font-size: 16px" v-show="item.checkState === 4">已撤销</el-tag>
                  <el-tag style="font-size: 16px" v-show="item.checkState === 5" type="danger">已驳回</el-tag>
<!--                  <span style="color: #515A6E" v-show="item.checkState === 3">已完成</span>-->
<!--                  <span style="color: #515A6E" v-show="item.checkState === 4">已撤销</span>-->
<!--                  <span style="color: #515A6E" v-show="item.checkState === 5">已驳回</span>-->
                </td>
                <td>
                  <el-button type="primary" @click="seefont (item)">查看申报</el-button>
<!--                  <span>-->
<!--                    <a ></a>-->
<!--                  </span>-->
                  <span>
                    <el-button type="primary" v-if="item.checkState === 3" @click="seeSummary(item.id)">查看总结</el-button>
                    <el-button type="primary" disabled v-else>查看总结</el-button>
                  </span>
                  <el-button type="primary" @click="seeHandleRecord(item.id)">处理记录</el-button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="historyFontData.length">
          </el-pagination>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="centerCancelDialogVisible"
        width="30%">
        <span>确认撤回申报？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerCancelDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="cancelFont()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="处理记录"
        :visible.sync="handleRecordDialogVisible"
        width="30%"
      >
        <span v-show="handleRecord.length === 0">暂无处理记录</span>
        <el-timeline :reverse="true">
          <el-timeline-item
            v-for="(record, index) in handleRecord"
            :key="index"
            placement="top"
            color="#0bbd87"
            :timestamp="record.createTime.replace('T',' ')">
            <el-card>
              <span>处理意见：{{record.content}}</span>
              <span>
                <a style="margin-left: 15px" @click="downloadFile(record.fileId)">
                  <img style="height: 30px;width: 30px" :src="downloadIcon" alt="">
                  点击下载附件
                </a>
              </span>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleRecordDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getAllFirstFontData,
  getAllNotFirstFontData,
  changeDetailCheckState,
  changeEasyCheckState,
  getHandleRecord,
  getLatestSummary,
  downloadFile } from "../../network/exhiState"
import Vue from "vue"
export default {
  name:'mainIndex',
  data () {
    return {
      addBtn: require('../../assets/icons/add_btn.svg'),
      downloadIcon: require('../../assets/icons/file.svg'),
      historyFontData: [],
      centerCancelDialogVisible: false,
      handleRecordDialogVisible: false,
      handleRecord: [],
      hasCurrentFont: false,
      currentFont: {},
      pageSize: 5,
      currentPage: 1,
      showHistoryFontData: [],
    }
  },
  created () {
    this.getAllFontData()
  },
  computed: {
    isFirstFont () {
      return typeof (this.$store.state.isFirstFont) === "string" ? JSON.parse(this.$store.state.isFirstFont):this.$store.state.isFirstFont
    },
    place () {
      return this.currentFont.chooseCity + "-" + this.currentFont.place
    },
    time () {
      return this.currentFont.startTime.slice(0, 10) + " 至 " + this.currentFont.endTime.slice(0, 10)
    },
    checkState () {
      let checkState = ""
      switch (this.currentFont.checkState) {
        case 0:
          checkState = "待审核"
            break
        case 1:
          checkState = "待总结"
          break
        case 2:
          checkState = "待修改"
          break
        case 9:
          checkState = "草稿"
          break
      }
      return checkState
    }
  },
  methods: {
    getAllFontData () {
      const that = this
      getAllFirstFontData(that.$store.state.token).then(res => {
        console.log(res.data);
        this.historyFontData = []
        if (res.data.length === 0) {
          console.log("首次");
          that.$store.dispatch("setIsFirstFont", true)
        } else {
          for (let item of res.data) {
            Vue.set(item, "isFirstFont", true)
            if (item.checkState === 3) {
              that.historyFontData.push(item)
              that.$store.dispatch("setIsFirstFont", false)
            } else if (item.checkState === 4 || item.checkState === 5) {
              that.historyFontData.push(item)
              that.$store.dispatch("setIsFirstFont", true)
            } else {
              that.$store.dispatch("setIsFirstFont", true)
              that.hasCurrentFont = true
              that.currentFont = item
              that.$store.dispatch("setCurrentFont", item)
            }
          }
          console.log(that.historyFontData)
          getAllNotFirstFontData(that.$store.state.token).then(res => {
            console.log(res.data)
            if (res.data.length === 0) {
              if (!that.hasCurrentFont) {
                that.hasCurrentFont = false
              }
            } else {
              for (let item of res.data) {
                Vue.set(item, "isFirstFont", false)
                if (item.checkState === 0 || item.checkState === 1 || item.checkState === 2 || item.checkState === 9){
                  that.hasCurrentFont = true
                  that.currentFont = item
                } else {
                  that.historyFontData.push(item)
                }
              }
            }
            that.showHistoryFontData = that.historyFontData.slice(0, that.currentPage*that.pageSize)
          })
        }
      })
    },
    cancelFont () {
      let cancelForm = {
        id: this.currentFont.id,
        adminId: this.$store.state.userId * 1,
        checkState: 4
      }
      console.log(cancelForm)
      console.log(this.isFirstFont)
      if (this.isFirstFont) {
        changeDetailCheckState(cancelForm).then(res => {
          this.$message.success("撤回成功")
          this.centerCancelDialogVisible = false
          this.getAllFontData()
          location.reload()
        })
      } else {
        changeEasyCheckState(cancelForm).then(res => {
          this.$message.success("撤回成功")
          this.centerCancelDialogVisible = false
          this.getAllFontData()
          location.reload()
        })
      }
    },
    modifyFont () {
      this.$router.push({
        path: "/modifyfont",
        query: {
          item: this.currentFont
        }
      })
    },
    handinSummary () {
      this.$router.push({
        path: `/handin/${this.currentFont.id}`
      })
    },
    seeHandleRecord (id) {
      getHandleRecord(id).then(res => {
        console.log(res.data)
        this.handleRecord = res.data
        this.handleRecordDialogVisible = true
      })
    },
    downloadFile (fileId) {
      downloadFile(fileId).then(res => {
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
      })
    },
    seefont (font) {
      this.$router.push({
        path: "/seefont",
        query: {
          item: font
        }
      })
    },
    seeSummary (id) {
      console.log(id);
      this.$router.push({
        path: "/seesummary",
        query: {
          id
        }
      })
      // for (let font of this.historyFontData){
      //   getLatestSummary(font.id).then(res => {
      //     console.log(res)
      //     console.log(res.data)
      //   })
      // }
    },
    handleClick(row) {
      console.log(row);
    },
    newFont() {
      this.$router.push('/easyfont')
    },
    handIn() {
      this.$router.push('/handin')
    },
    handleSizeChange (val) {
      console.log("每页",val);
      this.pageSize = val
      this.showHistoryFontData = this.historyFontData.slice(0, this.currentPage*this.pageSize)
    },
    handleCurrentChange (val) {
      console.log("当前页",val)
      this.currentPage = val
      this.showHistoryFontData = this.historyFontData.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize)
    }
  },
}
</script>

<style lang="scss">
.main {
  width: 100%;
  /*height: 100%;*/
  display: flex;
}
.all-info{
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
.current-font{
  p{
    font-size: 24px;
    color: black;
    margin: 30px 0px 20px 20px;
  }
  .current-font-data{
    font-size: 16px;
    width: 95%;
    height: 120px;
    margin-left: 20px;
    table{
      width: 100%;
      text-align: center;
      thead{
        font-size: 20px;
        height: 60px;
        font-weight: bold;
      }
      tr{
        height: 50px;
        tr :last-child{
          display: flex;
          justify-content: center;
        }
        /*td{*/
        /*  span{*/
        /*    color: #409EFF;*/
        /*  }*/
        /*}*/
      }
    }
  }
  //.new-font{
  //  text-align: center;
  //}
  .new-font-btn{
    height: 120px;
    width: 300px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    //border: #8c939d solid 1px;
    box-shadow: 2px 2px 2px 2px #cccdce, -2px -2px 2px 2px #cccdce, 2px -2px 2px 2px #cccdce, -2px 2px 2px 2px #cccdce;
    img{
      height: 100px;
      width: 100px;
    }
    span{
      font-size: 24px;
      color: black;
      margin-left: 30px;
    }
  }
}

.history-font{
  p{
    font-size: 24px;
    color: black;
    margin: 30px 0px 20px ;
  }
  font-size: 16px;
  width: 95%;
  //height: 120px;
  margin-left: 20px;
  padding-bottom: 40px;
  table{
    width: 100%;
    text-align: center;
    thead{
      font-size: 20px;
      height: 60px;
      font-weight: bold;
    }
    tr{
      height: 50px;
      tr :last-child{
        display: flex;
        justify-content: center;
      }
    }
  }
}
.pagination{
  float: right;
  margin: 20px 0px;
}
.el-button{
  padding: 10px 12px !important;
}
</style>
