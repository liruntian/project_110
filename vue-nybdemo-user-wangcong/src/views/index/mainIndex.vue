<template>
  <div class="main">
    <div class="all-info">
      <div class="current-font">
        <div class="new-font">
          <p>进行中申报</p>
          <a class="new-font-btn" v-if="completeState==1" @click="newFont()">
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
                <td>中国（海南）国际热带农产品冬季交易会 世界中国茶艺博览会</td>
                <td>中国 海南 三亚</td>
                <td>2020-12-25</td>
                <td>待总结</td>
                <td>
                  <span>
                    <router-link to="/easyfontview">查看申报</router-link>
                  </span>
                  <span>撤回</span>
                  <span>修改</span>
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
              <tr v-for="(item,index) in tableData2" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.place }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.state }}</td>
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
export default {
  name:'mainIndex',
  data () {
    return {
      addBtn: require('../../assets/icons/add_btn.svg'),
      completeState: 2,
      tableData1: [{
        date: '2016-05-02',
        name: '王小虎',
        place: '上海',
        state: '普陀区',
      }],
      tableData2: [{
        date: '2016-05-02',
        name: '王小虎',
        place: '上海',
        state: '普陀区',
      }, {
        date: '2016-05-02',
        name: '世界中国茶艺博览会',
        place: '上海',
        state: '普陀区',
      }, {
        date: '2016-05-02',
        name: '王小虎',
        place: '上海',
        state: '普陀区',
      }, {
        date: '2016-05-02',
        name: '中国（海南）国际热带农产品冬季交易会 世界中国茶艺博览会',
        place: '中国 海南 三亚',
        state: '已完成',
      }, {
        date: '2016-05-02',
        name: '王小虎',
        place: '上海',
        state: '普陀区',
      }]
    }
  },
  methods: {
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
