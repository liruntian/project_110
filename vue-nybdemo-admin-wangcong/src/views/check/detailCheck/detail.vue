<template>
  <div class="detailCheck">
    <div class="card kjfs">
      <el-button type="primary" round @click="back" class="back"
        >返回</el-button
      >

      <div
        v-if="!(checkState == '已完成')"
        id="pdfDom"
        style="
          padding-top: 55px;
          padding-left: 24px;
          padding-right: 24px;
          background-color: #fff;
          margin: auto;
          width: fit-content;
        "
      >
        <table border="1px" cellspacing="0">
          <colgroup span="8" width="200"></colgroup>
          <!-- <colgroup span="1" width="200"></colgroup> -->
          <tr align="center">
            <th colspan="8" v-if="isFirstApply">展会首次申报审核</th>
            <th colspan="8" v-if="!isFirstApply">展会再次申报审核</th>
          </tr>
          <tr align="center">
            <td>展会名称</td>
            <td colspan="7">{{ detailForm.name }}</td>
          </tr>
          <tr align="center">
            <td>主办单位</td>
            <td>{{ detailForm.hostComp }}</td>
            <td>承办单位</td>
            <td>{{ detailForm.fundComp }}</td>
            <td>协办单位</td>
            <td v-if="detailForm.supportComp">{{ detailForm.supportComp }}</td>
            <td v-if="!detailForm.supportComp">无</td>
            <td>指导单位</td>
            <td v-if="detailForm.orderComp">{{ detailForm.orderComp }}</td>
            <td v-if="!detailForm.orderComp">无</td>
          </tr>
          <tr align="center">
            <td>批准单位</td>
            <td>{{ detailForm.authObj }}</td>
            <td>批准文号</td>
            <td v-if="detailForm.authNum">{{ detailForm.authNum }}</td>
            <td v-if="!detailForm.authNum">无</td>
            <td>举办地点</td>
            <td>{{ detailForm.chooseCity }}-{{ detailForm.place }}</td>
            <td>举办面积(㎡)</td>
            <td>{{ detailForm.area }}</td>
          </tr>

          <tr align="center">
            <td>举办时间</td>
            <td>
              {{ detailForm.startTime.slice(0, 10) }}—{{
                detailForm.endTime.slice(0, 10)
              }}
            </td>
            <td>举办周期</td>
            <td>{{ detailForm.cycle }}</td>
            <td>是否邀请境外有关机构及参展商</td>
            <td>{{ getForign }}</td>
            <td>观众构成</td>
            <td>
              是否有参展商：<span>{{ getView1 }}</span>
              <br />是否有消费者：<span>{{ getView2 }}</span>
            </td>
          </tr>
          <tr align="center">
            <td>填报单位</td>
            <td>{{ detailForm.writeObject }}</td>
            <td>负责处室</td>
            <td>{{ detailForm.department }}</td>
            <td>处室负责人</td>
            <td>{{ detailForm.charger }}</td>
            <td>手机号</td>
            <td>{{ detailForm.teleNum }}</td>
          </tr>
          <tr align="center">
            <td>展会内容</td>
            <td colspan="7">{{ detailForm.meetState }}</td>
          </tr>
          <tr align="center">
            <td>同期活动</td>
            <td colspan="7">{{ detailForm.activityBrief }}</td>
          </tr>
          <tr align="center">
            <td>经费来源</td>
            <td colspan="7">
              财政资金：<span>{{ detailForm.finanFund }} 元<br /></span>
              自筹资金:
              <span>{{ detailForm.selfFund }} 元</span>
            </td>
          </tr>
          <tr align="center">
            <td>领导出席情况</td>
            <td colspan="7">
              是否邀请党和国家领导人出席：<span>{{ getLeaderN }} </span><br />
              有关司局和事业单位负责人： <span>{{ getLeaderD }}</span
              ><br />
              省部级以上领导： <span>{{ getLeaderP }}</span
              ><br />
              国家级行业协会负责人： <span>{{ getLeaderA }}</span
              ><br />
              是否有国外政府官员含驻华使馆：<span>{{ getLeaderF }}</span
              ><br />
            </td>
          </tr>
          <tr align="center">
            <td v-if="isFirstApply">批准审核文件</td>
            <td v-if="!isFirstApply">去年审批文件</td>
            <td colspan="7" style="font-size: 10px">
              <div class="down" @click="downAuthorizeFile">
                <img src="../../../assets/file.svg" />点击下载
              </div>
            </td>
          </tr>
          <tr align="center">
            <td>展会工作方案文档</td>
            <td colspan="7" style="font-size: 10px">
              <div class="down" @click="downMeetPlanFile">
                <img src="../../../assets/file.svg" />点击下载
              </div>
            </td>
          </tr>
          <tr align="center">
            <td>招展招商方案文档</td>
            <td colspan="7" style="font-size: 10px">
              <div class="down" @click="downInvestmentPlanFile">
                <img src="../../../assets/file.svg" />点击下载
              </div>
            </td>
          </tr>
          <tr align="center" v-show="isFirstApply">
            <td>可行性报告文档</td>
            <td colspan="7" style="ffont-size: 10px">
              <div class="down" @click="downFeasibilityFile">
                <img src="../../../assets/file.svg" />点击下载
              </div>
            </td>
          </tr>
          <tr align="center" v-show="isFirstApply">
            <td>承办单位办展条件说明</td>
            <td colspan="7" style="font-size: 10px">
              <div class="down" @click="downConditionStateFile">
                <img src="../../../assets/file.svg" />点击下载
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div
        id="pdfDom"
        style="
          padding-top: 55px;
          padding-left: 24px;
          padding-right: 24px;
          background-color: #fff;
          margin: auto;
          width: fit-content;
        "
        v-if="checkState == '已完成'"
      >
        <table border="1px" cellspacing="0">
          <colgroup span="8" width="200"></colgroup>
          <!-- <colgroup span="1" width="200"></colgroup> -->
          <tr align="center">
            <th colspan="8">{{ detailForm.name }}上报总结</th>
          </tr>
          <tr align="center">
            <td>展会名称</td>
            <td colspan="7">{{ detailForm.name }}</td>
          </tr>
          <tr align="center">
            <td>展览面积</td>
            <td>{{ detailForm.area }}</td>
            <td>参展国家和地区数量</td>
            <td>{{ detailForm.countryNum }}</td>
            <td>参展省市自治区情况</td>
            <td>{{ detailForm.provinceState }}</td>
            <td>参展企业数量</td>
            <td>{{ detailForm.companyNum }}</td>
          </tr>
          <tr align="center">
            <td>采购商数量</td>
            <td>{{ detailForm.buyerNum }}</td>
            <td>参展产品数量</td>
            <td>{{ detailForm.displayObj }}</td>
            <td>同期活动数量</td>
            <td>{{ detailForm.activityNum }}</td>
            <td>宣传媒体数</td>
            <td>{{ detailForm.mediaNum }}</td>
          </tr>

          <tr align="center">
            <td>线下成交额（含意向）</td>
            <td>{{ detailForm.turnover }}</td>
            <td>线上成交额</td>
            <td>{{ detailForm.onlineTurnover }}</td>
            <td>线下参展人数</td>
            <td>{{ getForign }}</td>
            <td>{{ detailForm.viewerNum }}</td>
            <td>{{ detailForm.onlineViewerNum }}</td>
          </tr>
          <tr align="center">
            <td>填报单位</td>
            <td>{{ detailForm.writeObject }}</td>
            <td>负责处室</td>
            <td>{{ detailForm.department }}</td>
            <td>处室负责人</td>
            <td>{{ detailForm.charger }}</td>
            <td>手机号</td>
            <td>{{ detailForm.teleNum }}</td>
          </tr>
          <tr align="center">
            <td>展会亮点(200字以内)</td>
            <td colspan="7">{{ detailForm.meetHighlight }}</td>
          </tr>
          <tr align="center">
            <td>下一步工作计划(200字以内)</td>
            <td colspan="7">{{ detailForm.nextWorkPlan }}</td>
          </tr>

          <tr align="center">
            <td>总结报告全文</td>
            <td colspan="7" style="font-size: 10px">
              <div class="down" @click="downSummaryFile">
                <img src="../../../assets/file.svg" />点击下载
              </div>
            </td>
          </tr>
          <tr align="center">
            <td>单位主要负责同志签发页</td>
            <td colspan="7" style="font-size: 10px">
              <div class="down" @click="downHosterSignFile">
                <img src="../../../assets/file.svg" />点击下载
              </div>
            </td>
          </tr>
        </table>
      </div>
      <br />
      <div class="check" v-if="checkState == '待审核'">
        <button class="pass" @click="Pass" style="cursor: pointer">
          审核通过
        </button>
        <button class="pass" @click="getPdf()" style="cursor: pointer">
          导出为pdf
        </button>
        <Button class="reject" type="primary" @click="rejected"
          >返回修改</Button
        >
      </div>
    </div>
    <el-dialog title="修改建议" :visible.sync="centerDialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item>
          <el-input
            type="textarea"
            :rows="3"
            ref='content'
            placeholder="请输入内容"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item enctype="multipart/form-data">
          <!-- <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="form.fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >上传附件</el-button
            >
          </el-upload> -->
          <label class="xrequired">上传附件</label><br />
          <input type="file" ref="adviceFile" accept=".pdf" name="adviceFile" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <div class="summary"></div>
  </div>
</template>

<script>
import { getUserId, send } from "../../../network/sendMessage";
import { getdetailFile, checkPassDetail, getSummary } from "../../../network/detailCheck";
import { checkPassEasy } from "../../../network/easyCheck";
import { sendAmendments } from "../../../network/sendMessage";
export default {
  name: "detail",
  data() {
    return {
      detailForm: {},
      modal1: false,
      pdfTitle: "",
      isFirstApply: true,
      centerDialogVisible: false,
      form: {
        content: "",
        fileList: [],
      },
      // ishow: false
    };
  },
  created() {
    this.detailForm = this.$route.query.item;
    getSummary(this.detailForm.id).then(res => {
      console.log('res',res);
    })
    console.log('detailForm',this.detailForm);
    this.checkState = this.$route.query.checkState;
    console.log('this.checkState',this.checkState);
    // this.checkState = '待总结';
    if (this.$route.query.checkType == 2) {
      this.isFirstApply = false;
    }
    this.pdfTitle = `${
      this.detailForm ? this.detailForm.name : "未命名展会"
    }申报文件`;
  },
  computed: {
    leaderState () {
      if (this.detailForm.leaderState.toString().length === 0) {
        return "00000" + this.detailForm.leaderState.toString()
      }else if (this.detailForm.leaderState.toString().length === 1){
        return "0000" + this.detailForm.leaderState.toString()
      }else if (this.detailForm.leaderState.toString().length === 2){
        return "000" + this.detailForm.leaderState.toString()
      }else if (this.detailForm.leaderState.toString().length === 3){
        return "00" + this.detailForm.leaderState.toString()
      }else if (this.detailForm.leaderState.toString().length === 4){
        return "0" + this.detailForm.leaderState.toString()
      }else {
        return this.detailForm.leaderState.toString()
      }
    },
    ishow() {
      return this.detailForm.checkState == "待审核" ? true : false;
    },
    getForign() {
      return this.detailForm.view1 == true ? "是" : "否";
    },
    getView1() {
      return this.detailForm.view1 == true ? "是" : "否";
    },
    getView2() {
      return this.detailForm.view2 == true ? "是" : "否";
    },
    getLeaderN() {
      return parseInt(this.leaderState.toString()[0]) == 1
        ? "是"
        : "否";
    },
    getLeaderD() {
      return parseInt(this.leaderState.toString()[1]) == 1
        ? "是"
        : "否";
    },

    getLeaderP() {
      return parseInt(this.leaderState.toString()[2]) == 1
        ? "是"
        : "否";
    },
    getLeaderA() {
      return parseInt(this.leaderState.toString()[3]) == 1
        ? "是"
        : "否";
    },
    getLeaderF() {
      return parseInt(this.leaderState.toString()[4]) == 1
        ? "是"
        : "否";
    },
  },
  methods: {
    downSummaryFile(){
      console.log("下载总结报告全文");
    },
    downHosterSignFile(){
      console.log("下载单位主要负责同志签发页");

    },
    back() {
      history.go(-1);
    },
    rejected() {
      this.centerDialogVisible = true;
    },
    Pass() {
      this.isFirstApply
        ? checkPassDetail(
            this.detailForm.id,
            this.$store.getters.token,
            1
          ).then((successResponse) => {
            if (successResponse.data.code === 0) {
            } else {
              this.$message({
                showClose: true,
                message: "提交失败！",
                type: "error",
              });
            }
          })
        : checkPassEasy(this.detailForm.id, this.$store.getters.token, 1).then(
            (successResponse) => {
              if (successResponse.data.code === 0) {
              } else {
                this.$message({
                  showClose: true,
                  message: "提交失败！",
                  type: "error",
                });
              }
            }
          );
      //todo 自动发送处理成功消息
      getUserId(this.detailForm.meetAddr).then((res) => {
        this.detailForm.userId = res.data;
        send(
          this.$store.getters.token,
          this.detailForm.userId,
          "审核通过",
          "您的申请已经通过审核"
        );
      });
      history.go(-1);
    },
    submitForm() {
      let ip = this.$refs.adviceFile;
      let formdata = new FormData();
      formdata.append("adminId", this.$store.getters.token);
      formdata.append("meetId", this.detailForm.id);
      formdata.append("content", this.form.content);
      formdata.append("file", ip.files[0]);
      if (!this.form.content) {
        this.$notify({
          title: "请输入修改意见",
          type: "warning",
        });
        this.$refs.content.focus();
        return false;
      }
      if (!ip.files[0]) {
        this.$notify({
          title: "请提交意见附件",
          type: "warning",
        });
        this.$refs.adviceFile.focus();
        return false;
      }
      // var axios = require("axios");
      this.$axios
        .post(this.GLOBAL.BASE_URL+"/handin/checkInfo", formdata)
        .then((successResponse) => {
          console.log("successResponse", successResponse);
          if (successResponse.data.code == 0) {
            this.$notify({
              title: "返回修改成功",
              message: "该条申报将返回给用户进行修改",
              type: "success",
            });
            this.centerDialogVisible = false;
            history.go(-1).catch(() => {}
            );
          } else {
            this.$message({
              showClose: true,
              message: "返回失败",
              type: "error",
            });
          }
        })
        .catch((failResponse) => {});
        this.reject();
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    downAuthorizeFile() {
      getdetailFile(this.detailForm.authFileId).then((res) => {
        const blob = new Blob([res]); //处理文档流
        const fileName = this.detailForm.name + "的批准审核文件.pdf";
        const elink = document.createElement("a");
        elink.setAttribute("download", decodeURIComponent(fileName));
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
    },
    //下载展会工作方案文档
    downMeetPlanFile() {
      getdetailFile(this.detailForm.meetPlanFileId).then((res) => {
        const blob = new Blob([res]); //处理文档流
        const fileName = this.detailForm.name + "的展会工作方案文档.pdf";
        const elink = document.createElement("a");
        elink.setAttribute("download", decodeURIComponent(fileName));
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
    },
    downFeasibilityFile() {
      getdetailFile(this.detailForm.feasibilityFileId).then((res) => {
        const blob = new Blob([res]); //处理文档流
        const fileName = this.detailForm.name + "的承办单位办展条件说明.pdf";
        const elink = document.createElement("a");
        elink.setAttribute("download", decodeURIComponent(fileName));
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
    },
    //下载条件说明
    downConditionStateFile() {
      getdetailFile(this.detailForm.conditionStateFileId).then((res) => {
        const blob = new Blob([res]); //处理文档流
        const fileName = this.detailForm.name + "的承办单位办展条件说明.pdf";
        const elink = document.createElement("a");
        elink.setAttribute("download", decodeURIComponent(fileName));
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
    },
    downInvestmentPlanFile() {
      getdetailFile(this.detailForm.investmentPlanFileId).then((res) => {
        const blob = new Blob([res]); //处理文档流
        const fileName = this.detailForm.name + "的招商方案.pdf";
        const elink = document.createElement("a");
        elink.setAttribute("download", decodeURIComponent(fileName));
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
    },
    reject() {
      this.isFirstApply
        ? checkPassDetail(
            this.detailForm.id,
            this.$store.getters.token,
            2
          ).then((successResponse) => {
            if (successResponse.data.code === 0) {
            } else {
              this.$message({
                showClose: true,
                message: "提交失败！",
                type: "error",
              });
            }
          })
        : checkPassEasy(this.detailForm.id, this.$store.getters.token, 2).then(
            (successResponse) => {
              if (successResponse.data.code === 0) {
              } else {
                this.$message({
                  showClose: true,
                  message: "提交失败！",
                  type: "error",
                });
              }
            }
          );
    },
  },
};
</script>

<style scoped lang="scss">
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
.kindsfont {
  font-size: 20px;
  font-family: 华文细黑;
}

.detailCheck {
  color: #666;
}
table {
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: auto;
}

td > span {
  color: #3399ff;
}

th {
  font-size: 20px;
}

tr {
  height: 45px;
}

.check {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
.pass,
.reject {
  width: 140px;
  height: 40px;
  border-radius: 30px;
}
.pass {
  background-color: #82c8a0;
  color: white;
  padding: 3px 25px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-bottom-color: rgba(0, 0, 0, 0.34);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.34) inset,
    0 2px 0 -1px rgba(0, 0, 0, 0.13), 0 3px 0 -1px rgba(0, 0, 0, 0.08),
    0 3px 13px -1px rgba(0, 0, 0, 0.21);
}

.reject {
  background-color: #fa5a5a;
  color: white;
  padding: 3px 25px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-bottom-color: rgba(0, 0, 0, 0.34);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.34) inset,
    0 2px 0 -1px rgba(0, 0, 0, 0.13), 0 3px 0 -1px rgba(0, 0, 0, 0.08),
    0 3px 13px -1px rgba(0, 0, 0, 0.21);
}

.card {
  color: #666;
  padding: 10px 20px 30px 40px;
  @extend %shadow;

  ul {
    @include flex;
    li {
      flex: 1;
      a {
        color: #666666;
        align-items: center;
        padding-#{$top}: 20px;
        padding-#{$bottom}: 20px;
        @include flex(column);
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
      @include flex(null, start);
      &:first-child {
        border-#{$top}: 1px solid #cccccc;
      }
      span {
      }
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
        @include flex(row, start);
        a {
          &:first-child {
            margin-#{$right}: 30px;
          }
        }
      }
    }
  }
}

img {
  width: 30px;
  height: 30px;
}
.down:hover {
  cursor: pointer;
}
.el-dialog__body {
  padding: 0 20px;
}
.back {
  float: right;
}
</style>
