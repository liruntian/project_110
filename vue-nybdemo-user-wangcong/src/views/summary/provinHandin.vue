<template>
  <div style="height: 100%; width: 100%">
    <div class="card bbxx" style="height: 100%; width: 100%">
      <el-row>
        <el-col :span="11" style="margin: 0 50px">
          <div class="helpinfo">
            <p><font class="hptext">请企事业单位认真填写展会活动登记表，所有选项均为必填，没有请填无，提交后无法修改!</font></p>
            <p><font class="hptext">所需上传的文件均为.pdf格式，且大小在10MB以内!</font></p>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="function-btns">
            <el-button round @click="returnMainIndex()" type="primary">返回</el-button>
            <el-button round @click="clearForm('summaryForm')" type="danger" style="margin: 0 50px">重填</el-button>
<!--            <el-button @click="newFont()" type="primary">暂存</el-button>-->
            <el-button round class="subBtn" type="success" v-on:click="declareFormed">提交</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="40" style="margin: 0">
        <el-form :model="declareForm" ref="summaryForm" status-icon label-width="30px" class="demo-ruleForm" style="padding-right: 30px" enctype='multipart/form-data'>
          <el-col :span="11">
<!--            <el-form-item prop="detailId">-->
<!--              <label class="xrequired">展会名称</label>-->
<!--              <el-input type="text" ref="detailId" v-model="declareForm.detailId"-->
<!--                        auto-complete="off"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item prop="area">
              <label class="xrequired">展览面积（㎡）</label>
              <el-input type="number" ref="area" v-model="declareForm.area" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="countryNum">
              <label class="xrequired">参展国家和地区数量</label>
              <el-input type="number" ref="countryNum" v-model="declareForm.countryNum" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="buyerNum">
              <label class="xrequired">采购商数量</label>
              <el-input type="number" ref=" buyerNum" v-model="declareForm.buyerNum" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="displayObj">
              <label class="xrequired">参展产品数量</label>
              <el-input type="number" ref=" displayObj" v-model="declareForm.displayObj" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="mediaNum">
              <label class="xrequired">宣传媒体数</label>
              <el-input type="text" ref="mediaNum" v-model="declareForm.mediaNum" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="onlineTurnover">
              <label class="xrequired">线上成交额（万元）</label>
              <el-input type="number" ref="onlineTurnover" v-model="declareForm.onlineTurnover" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="onlineViewer">
              <label class="xrequired">线上参展人数</label>
              <el-input type="number" ref="onlineViewer" v-model="declareForm.onlineViewer" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="meetHighlight">
              <label class="xrequired">展会亮点(200字以内)</label>
              <el-input type="textarea" ref="meetHighlight" :maxlength="200" v-model="declareForm.meetHighlight" auto-complete="off"
                        placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="nextWorkPlan">
              <label class="xrequired">下一步工作计划(200字以内)</label>
              <el-input type="textarea" ref="nextWorkPlan" :maxlength="200" v-model="declareForm.nextWorkPlan" auto-complete="off"
                        placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="department">
              <label class="xrequired">责任处室</label>
              <el-input type="text" ref="department" v-model="declareForm.department" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item prop="teleNum">
              <label class="xrequired">负责人手机号</label>
              <el-input type="number" ref="teleNum" v-model="declareForm.teleNum" auto-complete="off" oninput="if(value.length > 11) value = value.slice(0,11)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="companyNum">
              <label class="xrequired">参展企业数量</label>
              <el-input type="number" ref="companyNum" v-model="declareForm.companyNum" auto-complete="off" placeholder=""></el-input>
            </el-form-item>

            <el-form-item prop="checkedCities">
              <label class="xrequired">参展省市自治区情况</label>
              <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item prop="turnover">
              <label class="xrequired">线下成交额（含意向）（万元）</label>
              <el-input type="number" ref="turnover" v-model="declareForm.turnover" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="viewerNum">
              <label class="xrequired">线下参展人数</label>
              <el-input type="number" ref="viewerNum" v-model="declareForm.viewerNum" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="activityNum">
              <label class="xrequired">同期活动数量</label>
              <el-input type="number" ref="activityNum" v-model="declareForm.activityNum" auto-complete="off" placeholder=""></el-input>
            </el-form-item>
            <el-form-item prop="writeObject">
              <label class="xrequired">填报单位</label>
              <el-input type="text" ref="writeObject" v-model="declareForm.writeObject" auto-complete="off"></el-input>
            </el-form-item>
              <el-form-item prop="charger">
              <label class="xrequired">处室负责人</label>
              <el-input type="text" ref="charger" v-model="declareForm.charger" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="padding-bottom:30px">
              <div style="float:left">
                <label class="xrequired">总结报告全文</label><br/>
                <input type="file" ref="summaryFile" style="width: 200px" accept=".pdf" name="summaryFile"></input>
              </div>
              <div style="float:right">
                <label class="xrequired">单位主要负责同志签发页</label><br/>
                <input type="file" ref="hosterSignFile" style="width: 200px" accept=".pdf" name="hosterSignFile"></input>
              </div>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { warningOpen, errorOpen, successOpen } from "../../utils/message";
import { getLatestSummary } from "../../network/exhiState"

const cityOptions = ["北京市", "河北省", "山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","重庆市","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区","台湾省","香港特别行政区","澳门特别行政区"];
export default {
  name: "provinceHandin",
  components: {},
  props: {
    id: ""
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      declareForm: {
        meetId: "",
        detailId: "",
        meetHighlight:'',
        nextWorkPlan:'',
        countryNum: "",
        activityNum: "",
        viewerNum:'',
        displayObj: "",
        companyNum: "",
        area: "",
        buyerNum: "",
        mediaNum: "",
        visitorNum: "",
        //线上参展人数
        onlineViewer:'',
        turnover: "",
        //线上成交额
        onlineTurnover:'',
        lightSpot: "",
        //填报单位
        writeObject: "",
        //负责处室
        department: "",
        //处室负责人
        charger: "",
        //手机号
        teleNum: "",
      },
    };
  },
  created() {
    this.getLatestSummaryData(this.id)
  },
  methods: {
    getLatestSummaryData (id) {
      getLatestSummary(id).then(res => {
        console.log(res);
      })
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    declareFormed() {
      // if (!this.declareForm.detailId) {
      //   this.$message.error("请填写展会名称");
      //   this.$refs.detailId.focus();
      //   return false;
      // }
      if (!this.declareForm.area) {
        this.$message.error("请填写展览面积");
        this.$refs.area.focus();
        return false;
      }
      if (!this.declareForm.countryNum) {
        this.$message.error("请填写参展国家和地区数量");
        this.$refs.countryNum.focus();
        return false;
      }
      if (!this.checkedCities.length) {
        this.$message.error("请填写参展省市自治区情况");
        this.$refs.checkedCities.focus();
        return false;
      }
      if (!this.declareForm.companyNum) {
        this.$message.error("请填写参展企业数量");
        this.$refs.companyNum.focus();
        return false;
      }
      if (!this.declareForm.buyerNum) {
        this.$message.error("请填写采购商数量");
        this.$refs.buyerNum.focus();
        return false;
      }
      if (!this.declareForm.displayObj) {
        this.$message.error("请填写参展产品数量");
        this.$refs.displayObj.focus();
        return false;
      }
      if (!this.declareForm.activityNum) {
        this.$message.error("请填写同期活动数量");
        this.$refs.activityNum.focus();
        return false;
      }
      if (!this.declareForm.mediaNum) {
        this.$message.error("请填写宣传媒体数");
        this.$refs.mediaNum.focus();
        return false;
      }
      if (!this.declareForm.turnover) {
        this.$message.error("请填写线下成交额");
        this.$refs.turnover.focus();
        return false;
      }
      if (!this.declareForm.onlineTurnover) {
        this.$message.error("请填写线上成交额");
        this.$refs.onlineTurnover.focus();
        return false;
      }
      if (!this.declareForm.viewerNum) {
        this.$message.error("请填写线下参展人数");
        this.$refs.viewerNum.focus();
        return false;
      }
      if (!this.declareForm.onlineViewer) {
        this.$message.error("请填写线上参展人数");
        this.$refs.onlineViewer.focus();
        return false;
      }
      if (!this.declareForm.meetHighlight) {
        this.$message.error("请填写展会亮点");
        this.$refs.meetHighlight.focus();
        return false;
      }
      if (!this.declareForm.nextWorkPlan) {
        this.$message.error("请填写下一步工作计划");
        this.$refs.nextWorkPlan.focus();
        return false;
      }
      if (!this.declareForm.writeObject) {
        this.$message.error("请填写填报单位");
        this.$refs.writeObject.focus();
        return false;
      }
      if (!this.declareForm.department) {
        this.$message.error("请填写责任处室");
        this.$refs.department.focus();
        return false;
      }
      if (!this.declareForm.charger) {
        this.$message.error("请填写处室负责人");
        this.$refs.charger.focus();
        return false;
      }
      if (!this.declareForm.teleNum) {
        this.$message.error("请填写负责人手机号");
        this.$refs.teleNum.focus();
        return false;
      }
      if (this.declareForm.teleNum.length !== 8 && this.declareForm.teleNum.length !== 11) {
        this.$message.error("负责人手机号请填写8或11位数字");
        this.$refs.teleNum.focus();
        return false;
      }
      let ip1 = this.$refs.summaryFile;
      let ip2 = this.$refs.hosterSignFile;
      var formdata = new FormData();
      if (!ip1.files[0]) {
        this.$message.error("请提交总结报告全文文件");
        this.$refs.summaryFile.focus();
        return false;
      }
      if (ip1.files[0].size/1024/1024 > 10){
        this.$message({
          showClose: true,
          message: "上传的文件过大，请重新上传！",
          type: "error",
        });
        this.$refs.summaryFile.focus();
        return false;
      }
      if (!ip2.files[0]) {
        this.$message.error("请提交单位主要负责同志签发页");
        this.$refs.hosterSignFile.focus();
        return false;
      }
      if (ip2.files[0].size/1024/1024 > 10){
        this.$message({
          showClose: true,
          message: "上传的文件过大，请重新上传！",
          type: "error",
        });
        this.$refs.hosterSignFile.focus();
        return false;
      }
      formdata.append("meetId", this.id);
      //总结类型（事业单位提交[0]，省部级提交[1]，涉外展会负责单位提交[2]）
      formdata.append("kind", this.$store.getters.userKind);
      formdata.append("detailId", this.declareForm.detailId);
      formdata.append("meetAddr", this.$store.getters.token);

      // 参展国家数量
      formdata.append("countryNum", this.declareForm.companyNum);
      // 参展省市自治区情况
      formdata.append("provinceState", this.checkedCities);
      // 参展商数量
      formdata.append("companyNum", this.declareForm.companyNum);
      // 展会面积
      formdata.append("area", this.declareForm.area);
      // 参展产品
      formdata.append("displayObj", this.declareForm.displayObj);
      //展会商数量
      formdata.append("buyerNum", this.declareForm.buyerNum);
      // 参展媒体数
      formdata.append("mediaNum", this.declareForm.mediaNum);
      // 最终成交额（含意向）
      formdata.append("turnover", this.declareForm.turnover);
      //线上参展人数
      formdata.append("onlineViewer", this.declareForm.onlineViewer);
      //线上成交额
      formdata.append("onlineTurnover", this.declareForm.onlineTurnover);
      formdata.append("viewerNum", this.declareForm.viewerNum);
      // 同期活动数量
      formdata.append("activityNum", this.declareForm.activityNum);
      //展会亮点
      formdata.append("meetHighlight", this.declareForm.meetHighlight);
      //下一步工作计划
      formdata.append("nextWorkPlan", this.declareForm.nextWorkPlan);
      //填报单位
      formdata.append("writeObject", this.declareForm.writeObject);
      //负责处室
      formdata.append("department", this.declareForm.department);
      //处室负责人
      formdata.append("charger", this.declareForm.charger);
      //手机号
      formdata.append("teleNum", this.declareForm.teleNum);
      //总结报告
      formdata.append("summaryFile", ip1.files[0]);
      //单位主要负责同志签发页
      formdata.append("hosterSignFile", ip2.files[0]);

      console.log(this.checkedCities);

      var axios = require("axios");
      axios
        .post("http://8.140.21.128:8445/api/handin/summary", formdata)
        .then((successResponse) => {
          if (successResponse.data.code === 0) {
            this.$router.push("/").catch(() => {});
            this.$message.success("提交成功")
          } else if (successResponse.data.code === 6001) {
            this.$message({
              showClose: true,
              message: "展会信息id有误！",
              type: "error",
            });
            this.$refs.detailId.focus();
          }
        })
        .catch((failResponse) => {});
    },
    returnMainIndex() {
      this.$router.back()
    },
    clearForm (formName) {
      this.$refs[formName].resetFields()
      this.checkAll = false
      this.checkedCities = []
      this.$refs.summaryFile.value = ""
      this.$refs.hosterSignFile.value = ""
    }
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

.kindsfont {
  font-size: 20px;
  font-family: 华文细黑;
}

.helpinfo {
  background-color: rgba(70, 130, 180, 0.1);
  transform: translateY(24%);
  margin: 10px 10px 50px 0px;
  padding: 10px;
  width: 556px;
}
.hptext {
  color: rgba(80, 144,53, 1);
  font-family: 微软雅黑;
}

.wrtext {
  color: rgba(255, 38, 38, 0.9);
}

.card {
  color: #666;
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

.chartArea {
  margin-bottom: 15px;
}
.inputFile1 {
  float: left;
}
.inputFile2 {
  float: right;
}
.el-dropdown-linkk {
  cursor: pointer;
  color: #409eff;
  padding: 6px;
  background-color: rgb(247, 243, 243);
  border-radius: 7px;
  margin-left: 20px;
}
label.xrequired:after {
content: "*";
color: red;
font-size: 25px;
position: relative;
top: 8px;
margin-left: 3px;

}
</style>

