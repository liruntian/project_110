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
                  <span>撤回</span>
                  <span>
                    <router-link to="/easyfont">修改</router-link>
                  </span>
                  <span>填写总结</span>
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
                <td>{{ item.checkState }}</td>
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
    </div>
  </div>
</template>

<script>
import { getAllFirstFontData, getAllNotFirstFontData } from "../../network/exhiState"
export default {
  name:'mainIndex',
  data () {
    return {
      addBtn: require('../../assets/icons/add_btn.svg'),
      historyFontData: []
    }
  },
  created () {
    this.getHistoryFontData()
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
