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
              <tr>
                <td>展会名称</td>
                <td>举办地点</td>
                <td>举办时间</td>
                <td>申报状态</td>
                <td>操作</td>
              </tr>
              <tr>
                <td>{{ currentFont.name }}</td>
                <td>{{ place }}</td>
                <td>{{ time }}</td>
                <td>{{ checkState }}</td>
                <td>
                  <span>
                    <router-link to="/easyfontview">查看申报</router-link>
                  </span>
                  <span>
                    <a @click="centerDialogVisible = true">撤回</a>
                  </span>
                  <span>
                    <router-link to="/easyfont">修改</router-link>
                  </span>
                  <span>
                    <router-link to="/handin">填写总结</router-link>
                  </span>
                  <span>处理记录</span>
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
                <td>展会名称</td>
                <td>举办地点</td>
                <td>举办时间</td>
                <td>申报状态</td>
                <td>操作</td>
              </thead>
              <tr v-if="historyFontData.length === 0">
                <td colspan="5">暂无历史申报数据</td>
              </tr>
              <tr v-for="(item,index) in historyFontData" v-else :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.chooseCity + "-" + item.place }}</td>
                <td>{{ item.startTime.slice(0, 10) + " 至 " + item.endTime.slice(0, 10) }}</td>
                <td>
                  <span v-show="item.checkState === 3">已完成</span>
                  <span v-show="item.checkState === 4">已撤销</span>
                  <span v-show="item.checkState === 5">已驳回</span>
                </td>
                <td>
                  <span>
                    查看申报
                  </span>
                  <span>查看总结</span>
                  <span>处理记录</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%">
        <span>确认撤回申报？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="cancelFont()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAllFirstFontData, getAllNotFirstFontData, changeDetailCheckState, changeEasyCheckState } from "../../network/exhiState"
export default {
  name:'mainIndex',
  data () {
    return {
      addBtn: require('../../assets/icons/add_btn.svg'),
      historyFontData: [],
      centerDialogVisible: false
    }
  },
  created () {
    this.getAllFontData()
  },
  computed: {
    isFirstFont () {
      return typeof (this.$store.state.isFirstFont) === "string" ? JSON.parse(this.$store.state.isFirstFont):this.$store.state.isFirstFont
    },
    hasCurrentFont () {
      return typeof (this.$store.state.hasCurrentFont) === "string" ? JSON.parse(this.$store.state.hasCurrentFont):this.$store.state.hasCurrentFont
    },
    currentFont () {
      return typeof (this.$store.state.currentFont) === "string" ? JSON.parse(this.$store.state.currentFont):this.$store.state.currentFont
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
          that.$store.dispatch("setHasCurrentFont", false)
        } else {
          for (let item of res.data) {
            if (item.checkState === 3) {
              that.historyFontData.push(item)
              that.$store.dispatch("setIsFirstFont", false)
            } else if (item.checkState === 4 || item.checkState === 5) {
              that.historyFontData.push(item)
              that.$store.dispatch("setIsFirstFont", true)
              that.$store.dispatch("setHasCurrentFont", false)
            } else {
              that.$store.dispatch("setIsFirstFont", true)
              that.$store.dispatch("setHasCurrentFont", true)
              that.$store.dispatch("setCurrentFont", item)
            }

            // if (item.checkState === 3) {
            //   that.$store.dispatch("setIsFirstFont", false)
            //   getAllNotFirstFontData(that.$store.state.token).then(res => {
            //     console.log(res.data);
            //     if (res.data.length === 0) {
            //       that.$store.dispatch("setHasCurrentFont", false)
            //     } else {
            //       for (let item of res.data) {
            //         if (item.checkState === 0 || item.checkState === 1 || item.checkState === 2 || item.checkState === 9){
            //           that.$store.dispatch("setHasCurrentFont", true)
            //           that.$store.dispatch("setCurrentFont", item)
            //         }
            //       }
            //     }
            //   })
            //   break
            // } else {
            //   that.$store.dispatch("setIsFirstFont", true)
            //   if (item.checkState === 0 || item.checkState === 1 || item.checkState === 2 || item.checkState === 9){
            //     that.$store.dispatch("setHasCurrentFont", true)
            //     that.$store.dispatch("setCurrentFont", item)
            //   }
            // }
          }
          getAllNotFirstFontData(that.$store.state.token).then(res => {
            console.log(res.data)
            if (res.data.length === 0) {
              if (!that.hasCurrentFont) {
                that.$store.dispatch("setHasCurrentFont", false)
              }
            } else {
              for (let item of res.data) {
                if (item.checkState === 0 || item.checkState === 1 || item.checkState === 2 || item.checkState === 9){
                  that.$store.dispatch("setHasCurrentFont", true)
                  that.$store.dispatch("setCurrentFont", item)
                } else {
                  that.historyFontData.push(item)
                }
              }
            }
          })
        }
      })
    },
    getHistoryFontData () {
      getAllFirstFontData(this.currentFont.meetAddr).then(res => {
        console.log(res.data);
        this.historyFontData = []
        for (let font of res.data) {
          if (font.checkState === 3 || font.checkState === 4 || font.checkState === 5){
            this.historyFontData.push(font)
          }
        }
        getAllNotFirstFontData(this.currentFont.meetAddr).then(res => {
          console.log(res.data);
          for (let font of res.data) {
            if (font.checkState === 3 || font.checkState === 4 || font.checkState === 5){
              this.historyFontData.push(font)
            }
          }
        })
      })
    },
    cancelFont () {
      console.log("撤销申报")
      let cancelForm = {
        id: this.currentFont.id,
        adminId: this.$store.state.userId * 1,
        checkState: 4
      }
      console.log(cancelForm)
      if (this.isFirstFont) {
        changeDetailCheckState(cancelForm).then(res => {
          this.centerDialogVisible = false
          console.log(res);
          this.getAllFontData()
        })
      } else {
        changeEasyCheckState(cancelForm).then(res => {
          this.centerDialogVisible = false
          console.log(res);
          this.getAllFontData()
        })
      }
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
    fontView() {
      this.$router.push('/easyfontview')
    },
  },
}
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100%;
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
    margin: 50px 0px 20px 60px;
  }
  .current-font-data{
    font-size: 16px;
    width: 90%;
    height: 120px;
    margin-left: 60px;
    table{
      width: 100%;
      text-align: center;
      tr{
        height: 50px;
        tr :last-child{
          display: flex;
          justify-content: center;
        }
        td{
          span{
            color: #409EFF;
          }
        }
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
    margin: 50px 0px 20px ;
  }
  font-size: 16px;
  width: 90%;
  height: 120px;
  margin-left: 60px;
  table{
    width: 100%;
    text-align: center;
    thead{
      font-size: 22px;
      height: 60px;
      font-weight: bold;
    }
    tr{
      height: 50px;
      tr :last-child{
        display: flex;
        justify-content: center;
      }
      td{
        span{
          color: #409EFF;
        }
      }
    }
  }
}
</style>
