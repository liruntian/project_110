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
          <el-button plain class="num-button" type="info">{{
            easyNum
          }}</el-button>
        </td>
      </tr>
    </table>

    <h1 style="margin-bottom: 16px">进行中的申请情况</h1>
    <el-steps>
      <el-step
        title="待审核"
        :description="this.detailNum.toString()"
      ></el-step>
      <el-step
        title="待修改"
        description="这是一段很长很长很长的描述性文字"
      ></el-step>
      <el-step title="待总结" description="这段就没那么长了"></el-step>
      <el-step title="已完成" description="这段就没那么长了"></el-step>
    </el-steps>

    <h1 style="margin-bottom: 16px; margin-top: 16px">历史申请情况</h1>
    <el-steps>
      <el-step
        title="待审核"
        :description="this.detailNum.toString()"
      ></el-step>
      <el-step
        title="待修改"
        description="这是一段很长很长很长的描述性文字"
      ></el-step>
      <el-step title="待总结" description="这段就没那么长了"></el-step>
      <el-step title="已完成" description="这段就没那么长了"></el-step>
    </el-steps>
  </div>
</template>

<script>
import LineEcharts from "../../components/ECharts/lineEcharts";
import Cookies from "js-cookie";

export default {
  name: "mainIndex",
  components: { LineEcharts },
  mounted() {
    this.selfAdaption();
  },
  data() {
    return {
      imgUrl: require("../../assets/photo.jpeg"),

      efcheck: false,
      easyNum: "",
      detailNum: "",
      summaryNum: "",
    };
  },

  created() {
    console.log(this.$store);
    this.$axios
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

    this.$axios
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
  },

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
    margin-bottom: 16px;
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
</style>
