<template>
  <div class="main">
    <div class="all-info">
      <div class="current-font">
        <div class="new-font">
          <p>进行中申报</p>
          <div class="new-font-btn" v-if="completeState==2" @click="newFont()">
            <img :src="addBtn" alt="">
            <span>新建申报</span>
          </div>
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
<!--          <el-table-->
<!--            :data="tableData2"-->
<!--            style="width: 100%"-->
<!--            height="500">-->
<!--            <el-table-column-->
<!--              fixed-->
<!--              prop="name"-->
<!--              label="展会名称"-->
<!--              width="150">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              prop="place"-->
<!--              label="举办地点"-->
<!--              width="120">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              prop="date"-->
<!--              label="开始时间"-->
<!--              width="120">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              prop="state"-->
<!--              label="申报状态"-->
<!--              width="120">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              prop="operation"-->
<!--              label="操作"-->
<!--              width="300">-->
<!--            </el-table-column>-->
<!--          </el-table>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import detailExhiList from "../../components/common/exhiList/detailExhiList";
// import easyExhiList from "../../components/common/exhiList/easyExhiList";
// import notRead from '../message/notread';
//
// import {getDetail} from '../../network/getForm';
//
// import { getNotLookCount } from "network/message.js";

export default {
  name:'mainIndex111',
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
// export default {
//   name: "mainIndex",
//   mounted() {
//     this.selfAdaption();
//   },
//   data() {
//     return {
//       msgCount: 1,
//
//     };
//   },
//   components: {
//     detailExhiList,
//     easyExhiList,
//     notRead
//   },
//
//   watch:{
//     '$store.getters.checkState':function(){ //监听vuex
//       if(this.$store.getters.flash == false) {
//         this.$store.dispatch("setFlash", true);
//         location.reload();
//       }
//     }
//   },
//
//   created() {
//
//     getNotLookCount(this.$store.getters.token).then((res) => {
//       //   console.log(res)
//       this.msgCount = res.data;
//     });
//
//   },
//
//   destroyed() {},
//
//   methods: {
//     logout() {
//       Cookies.remove("token");
//       Cookies.remove("face");
//       Cookies.remove("checkState");
//       location.reload();
//     },
//     // echart自适应
//     selfAdaption() {
//       let that = this;
//       setTimeout(() => {
//         window.onresize = function () {
//           if (that.$refs.echarts) {
//             that.$refs.echarts.chart.resize();
//           }
//         };
//       }, 10);
//     },
//     msgLook() {
//       this.$router.push("/notread").catch(() => {});
//     },
//   },
// };
</script>

<style lang="scss">
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
$pinkk: #eec2d3;
$bluee: #409eff;
$yelloww: #f4d884;
$grennn: #89dda0;
$purplee: #78a2ea;
$lightBluee: #b8d6ff;

$list: bluee pinkk yelloww grennn purplee lightBluee;
$list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;

%shadow {
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);

  .title {
    font-size: 14px;
    padding: 10px;

    i {
      margin-#{$right}: 5px;
    }
  }
}

//@mixin flex($direction: row, $content: space-between) {
//  display: flex;
//  flex-direction: $direction;
//  justify-content: $content;
//}

.photo {
  height: 200px;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  color: #666;
  @extend %shadow;

  ul {
    //@include flex;

    li {
      flex: 1;

      a {
        color: #666666;
        align-items: center;
        padding-#{$top}: 20px;
        padding-#{$bottom}: 20px;
        //@include flex(column);

        span {
          height: 44px;
        }

        .num {
          line-height: 44px;
          font-size: 42px;
          color: $bluee;
          margin: 0px;
        }
      }

      .kjfs-bluee {
        color: $bluee;
      }

      .kjfs-pinkk {
        color: $pinkk;
      }

      .kjfs-yelloww {
        color: $yelloww;
      }

      .kjfs-grennn {
        color: $grennn;
      }

      .kjfs-purplee {
        color: $purplee;
      }

      .kjfs-lightBluee {
        color: $lightBluee;
      }

      &:hover {
        .kjfs-bluee {
          color: #ffffff;
          background: $bluee;
        }

        .kjfs-pinkk {
          color: #ffffff;
          background: $pinkk;
        }

        .kjfs-yelloww {
          color: #ffffff;
          background: $yelloww;
        }

        .kjfs-grennn {
          color: #ffffff;
          background: $grennn;
        }

        .kjfs-purplee {
          color: #ffffff;
          background: $purplee;
        }

        .kjfs-lightBluee {
          color: #ffffff;
          background: $lightBluee;
        }
      }
    }
  }

  .table {
    padding: 21px;

    p {
      height: 52px;
      line-height: 52px;
      border: 1px solid #cccccc;
      overflow: hidden;
      border-#{$top}: none;
      //@include flex(null, start);

      &:first-child {
        border-#{$top}: 1px solid #cccccc;
      }

      // span {}

      .tit {
        width: 180px;
        min-width: 180px;
        height: 100%;
        text-align: center;
        border-#{$right}: 1px solid #cccccc;
        margin-#{$right}: 18px;
      }

      span.gitbox {
        flex: 1;
        height: 100%;
        overflow: hidden;
        //@include flex(row, start);

        a {
          &:first-child {
            margin-#{$right}: 30px;
          }
        }
      }
    }
  }
}

#lineEcharts {
  margin-#{$top}: 30px;
  padding-#{$top}: 30px;
  @extend %shadow;
}

#maintable {
  margin-#{$top}: 30px;
  padding-#{$top}: 10px;
  @extend %shadow;
}
.msg {
  position: relative;
}

.msg:hover {
  cursor: pointer;
}

.count {
  position: absolute;
  top: 1.3rem;
  left: 1.5rem;

  font-size: 20px;

  color: red;
}
.active {
  background-color: #eec2d3;
}

.msg > img {
  width: 50px;
  height: 50px;
  float: right;
  margin-right: 20px;
}
.el-col {
  margin-right: 5px;
  background-color: #fff;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
}
.el-row{
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
