<template>
  <div class="main">
    <h1 style="margin-bottom: 16px">待处理任务</h1>
    <table border=".5px" cellspacing="0" class="task-table">
      <tr>
        <th>待审核首次申报</th>
        <th>待审核再次申报</th>
        <th>待提交总结</th>
      </tr>

      <tr class="num">
        <td>
          <el-button
            plain
            type="info"
            @click="toDetailCheck"
            class="num-button"
            >{{ detailNum }}</el-button
          >
        </td>
        <td>
          <el-button
            plain
            type="info"
            class="num-button"
            @click="toEasyCheck"
            >{{ easyNum }}</el-button
          >
        </td>
        <td>
          <el-button plain class="num-button" type="info" disabled>{{
            summaryNum
          }}</el-button>
        </td>
      </tr>
    </table>

    <h1 style="margin-bottom: 16px">进行中的申报情况</h1>
    <el-steps :space="400" :active="3" align-center>
      <el-step
        title="待审核"
        icon="el-icon-edit"
        :description="this.waitCheck.toString()"
      ></el-step>
      <el-step
        title="待修改"
        icon="el-icon-document-delete"
        :description="this.waitChange.toString()"
      ></el-step>
      <el-step
        title="待总结"
        :description="this.summaryNum.toString()"
        icon="el-icon-upload"
      ></el-step>
    </el-steps>

    <h1 style="margin-bottom: 16px; margin-top: 16px">历史申报情况</h1>
    <i-circle
      :size="250"
      :trail-width="4"
      :stroke-width="5"
      :percent="75"
      stroke-linecap="square"
      stroke-color="#43a3fb"
    >
      <div class="demo-i-circle-custom">
        <h1>{{finishedApply}}</h1>
        <p>已经完成的申报</p>
        <!-- <span>
          总占人数
          <i>75%</i>
        </span> -->
      </div>
    </i-circle>
  </div>
</template>

<script>
import LineEcharts from "../../components/ECharts/lineEcharts";
import Cookies from "js-cookie";
import { getdetailFormdata } from "../../network/detailCheck";
import { getEasyFormdata } from "../../network/easyCheck";
export default {
  name: "mainIndex",
  components: { LineEcharts },
  mounted() {
    this.selfAdaption();
  },
  data() {
    return {
      imgUrl: require("../../assets/photo.jpeg"),
      detailForm: [],
      easyForm: [],
      easyNum: 0,
      detailNum: 0,
      summaryNum: 0,
      waitCheck: 0,
      waitChange: 0,
      finishedApply: 0,
    };
  },

  async created() {
    await this.getdetailList();
    await this.getEasyList();
    await this.$axios
      .post("/message/easyNum", {})
      .then((successResponse) => {
        if (successResponse.data.code === 0) {
          this.easyNum = successResponse.data.data;
        } else {
          this.$message({
            showClose: true,
            message: "系统错误！",
            type: "error",
          });
        }
      })
      .catch((failResponse) => {});

    await this.$axios
      .post("/message/detailNum", {})
      .then((successResponse) => {
        if (successResponse.data.code === 0) {
          this.detailNum = successResponse.data.data;
        } else {
          this.$message({
            showClose: true,
            message: "系统错误！",
            type: "error",
          });
        }
      })
      .catch((failResponse) => {});

    this.waitCheck = this.easyNum + this.detailNum;
  },
  computed: {},
  destroyed() {},

  methods: {
    logout() {
      Cookies.remove("token");
      Cookies.remove("face");
      location.reload();
    },
    toDetailCheck() {
      this.$router.push({
        path: "/detail",
        query: {
          value: 1,
        },
      });
    },
    toEasyCheck() {
      // this.$router.push({ path: "/easy" });
      this.$router.push({
        path: "/detail",
        query: {
          value: 2,
        },
      });
    },

    // echart自适应
    selfAdaption() {
      let that = this;
      setTimeout(() => {
        window.onresize = function () {
          if (that.$refs.echarts) {
            that.$refs.echarts.chart.resize();
          }
        };
      }, 10);
    },
    async getdetailList() {
      getdetailFormdata().then((res) => {
        this.detailForm = res.data;
        this.summaryNum += this.detailForm.filter(
          (item) => item.checkState == 1
        ).length;
        this.waitChange += this.detailForm.filter(
          (item) => item.checkState == 2
        ).length;
        this.finishedApply += this.detailForm.filter(
          (item) => item.checkState == 3
        ).length;
      });
    },
    async getEasyList() {
      await getEasyFormdata().then((res) => {
        this.easyForm = res.data;
        this.summaryNum += this.easyForm.filter(
          (item) => item.checkState == 1
        ).length;
        this.waitChange += this.easyForm.filter(
          (item) => item.checkState == 2
        ).length;
        this.finishedApply += this.easyForm.filter(
          (item) => item.checkState == 3
        ).length;
      });
    },
  },
};
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

@mixin flex($direction: row, $content: space-between) {
  display: flex;
  flex-direction: $direction;
  justify-content: $content;
}

.main {
  display: flex;
  background-color: #fff;
  padding: 20px;
  flex-direction: column;
  .el-table .cell {
    text-align: center;
  }

  .task-table {
    width: 70%;
    font-family: verdana, arial, sans-serif;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    background-color: #fff;
    text-align: center;
    font-size: 16px;
    margin-bottom: 32px;
    th {
      padding: 4px;
    }
    td {
      padding: 6px;
    }
    .num {
      color: red;
      .num-button {
        color: rgb(245, 108, 108);
        font-size: 16px;
        font-weight: bold;
        font-family: "element-icons";
      }
    }
  }

  .el-step__description.is-wait {
    color: #000;
  }
}
.demo-i-circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 28px;
    font-weight: normal;
  }
  & p {
    color: #657180;
    font-size: 14px;
    margin: 10px 0 15px;
  }
  & span {
    display: block;
    padding-top: 15px;
    color: #657180;
    font-size: 14px;
    &:before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: -15px;
    }
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
}
.ivu-chart-circle {
  margin-left: 15%;
}
</style>
