<template>
  <div style="height: 100%">
    <div class="card1 bbxx" style="width: 100%">
        <div class="function-btns">
          <el-button @click="returnMainIndex()" type="primary">返回</el-button>
          <el-button @click="clearForm()" type="danger">重填</el-button>
          <el-button class="subBtn" type="success" v-on:click="declareFormed">提交</el-button>
        </div>
      <div class="modify-font-form">
        <el-form :model="declareForm" ref="fontForm" status-icon label-width="30px" class="demo-ruleForm" style="padding-right: 30px;background-color: #ffffff" enctype='multipart/form-data'>
          <div class="helpinfo">
            <span>本申报适用于已加入展会计划的申报！请认真填写展会活动登记表，提交后未经审核无法修改!所需上传的文件均为.pdf格式，且大小在10MB以内!</span>
          </div>
          <el-collapse @change="collapseChange">
            <el-collapse-item name="1">
              <template slot="title">
                <span>一、基础信息</span>
                <span style="color: red;margin-left: 20px;font-family: 宋体" v-show="collapse[0]">还有必填项未填写!</span>
              </template>
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="name">
                    <label class="xrequired">展会名称</label>
                    <el-input type="text" ref="name" v-model="declareForm.name" disabled auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item prop="fundComp">
                    <label class="xrequired">承办单位</label>
                    <el-input type="text" ref="fundComp" v-model="declareForm.fundComp" auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item prop="orderComp">
                    <label>指导单位</label>
                    <el-input type="text" ref="orderComp" v-model="declareForm.orderComp" auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="hostComp">
                    <label class="xrequired">主办单位</label>
                    <el-input type="text" ref="hostComp" v-model="declareForm.hostComp" auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item prop="supportComp">
                    <label>协办单位</label>
                    <el-input type="text" ref="supportComp" v-model="declareForm.supportComp" auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <span>二、办展依据</span>
                <span style="color: red;margin-left: 20px;font-family: 宋体" v-show="collapse[1]">还有必填项未填写!</span>
              </template>
              <div class="attention-tips">
                <p >
                  注：省部主办展会须提供全国清理和规范庆典研讨会论坛活动工作领导小组的批文；事业单位主办展会须提供行业主管司局审核意见；境外组团参展须提供国际合作司审核意见
                </p>
              </div>
<!--              <div class="attention">-->
<!--                <p><font class="hptext">注：省部主办展会须提供全国清理和规范庆典研讨会论坛活动工作领导小组的批文；事业单位主办展会须提供行业主管司局审核意见；境外组团参展须提供国际合作司审核意见</font></p>-->
<!--              </div>-->
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="authObj">
                    <label class="xrequired">批准单位</label>
                    <el-input type="text" ref="authObj" v-model="declareForm.authObj" auto-complete="off"
                              placeholder="请填写数字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="authNum">
                    <label>批准文号（选填）</label>
                    <el-input type="text" ref="authNum" v-model="declareForm.authNum" auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item enctype="multipart/form-data">
                <div class="authorizeFile">
                  <label class="xrequired">
                    <span v-if="isFirstFont">批准审核文件</span>
                    <span v-else>去年审批文件</span>
                  </label><br />
                  <input type="file" ref="authorizeFile" accept=".pdf" name="authorizeFile"></input>
                </div>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template slot="title">
                <span>三、举办计划</span>
                <span style="color: red;margin-left: 20px;font-family: 宋体" v-show="collapse[2]">还有必填项未填写!</span>
              </template>
              <el-row>
                <label class="xrequired" style="margin-left: 30px">举办地点</label>
                <!--                  <div  style="display: flex;width: 100%">-->
                <div  style="display: flex">
                  <el-form-item prop="chooseCity" style="width: 100%">
                    <el-cascader
                      v-model="declareForm.chooseCity"
                      :options="provinceAndCityData"
                    >
                    </el-cascader>
                  </el-form-item>
                  <el-form-item prop="place" style="width: 100%">
                    <el-input type="text" ref="place" v-model="declareForm.place" auto-complete="off" placeholder="具体举办地点，如xx展览中心"></el-input>
                  </el-form-item>
                </div>
              </el-row>
              <el-row>
                <el-col :span="12">

<!--                  </div>-->
                  <el-form-item prop="Times">
                    <div style="display: flex;flex-direction: column">
                      <label class="xrequired">举办时间</label>
                      <el-date-picker
                        ref="Times"
                        v-model="declareForm.Times"
                        type="datetimerange"
                        size = 'large'
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['8:00:00', '18:00:00']">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                  <el-form-item prop="cycle">
                    <label>举办周期</label>
                    <el-input type="number" ref="cycle" v-model="declareForm.cycle" auto-complete="off"
                              placeholder="">
                      <template slot="append">年</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="foreign">
                    <p><label>是否邀请境外有关机构及参展商</label>
                      <input style="vertical-align:middle;" ref="foreign" type="checkbox" v-model="declareForm.foreign" name="views" auto-complete="off"
                             placeholder=""></input>
                    </p>
                  </el-form-item>
                  <div style="display: flex; flex-direction: row; width: 100%">
                    <p style="padding-left: 30px"><label  class="xrequired">观众构成</label></p>
                    <div class="viewers">
                      <el-form-item style="margin:5px 0 0 0" prop="view1">
                        <label style="vertical-align:middle;">是否有采购商参加</label>

                        <input style="vertical-align:middle;" ref="view1" type="checkbox" v-model="declareForm.view1" name="views" auto-complete="off"
                               placeholder=""></input>
                      </el-form-item>
                      <el-form-item style="margin:5px 0 0 0" prop="view2">
                        <label style="vertical-align:middle;">是否有消费者参加</label>
                        <input style="vertical-align:middle;" ref="view2" type="checkbox" v-model="declareForm.view2" name="views" auto-complete="off"
                               placeholder=""></input>
                      </el-form-item>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="area">
                    <label  class="xrequired">展览面积</label>
                    <el-input type="number" ref="area" v-model="declareForm.area" auto-complete="off"
                              placeholder="">
                      <template slot="append">m²</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="meetState">
                    <label  class="xrequired">展会基本情况(100字以内)</label>
                    <el-input
                      type="textarea"
                      ref="meetState"
                      :maxlength="100"
                      show-word-limit
                      v-model="declareForm.meetState"
                      auto-complete="off"
                      placeholder="主题、主要内容、展区规划等"></el-input>
                  </el-form-item>
                  <el-form-item prop="activityBrief">
                    <label  class="xrequired">同期活动(200字以内)</label>
                    <el-input
                      type="textarea"
                      ref="activityBrief"
                      :maxlength="200"
                      show-word-limit
                      v-model="declareForm.activityBrief"
                      auto-complete="off"
                      placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <span>四、经费来源</span>
                <span style="color: red;margin-left: 20px;font-family: 宋体" v-show="collapse[3]">还有必填项未填写!</span>
              </template>
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="finanFund">
                    <label class="xrequired">财政金额</label>
                    <el-input type="number" ref="finanFund" v-model="declareForm.finanFund" auto-complete="off"
                              oninput="if(value.length > 8) value = value.slice(0,8)"
                              placeholder="填写数字，没有请填0">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="selfFund">
                    <label class="xrequired">自筹金额</label>
                    <el-input type="number" ref="selfFund" v-model="declareForm.selfFund" auto-complete="off"
                              oninput="if(value.length > 8) value = value.slice(0,8)"
                              placeholder="填写数字，没有请填0">
                      <template slot="append">万元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <span>五、拟邀请领导情况</span>
                <span style="color: red;margin-left: 20px;font-family: 宋体" v-show="collapse[4]">还有必填项未填写!</span>
              </template>
              <p><label class="xrequired">领导出席情况</label></p>
              <div style="display: flex; flex-direction: row">
                <el-form-item style="margin-bottom: 0" prop="leaderN">
                      <label style="vertical-align:middle;">党和国家领导人</label>
                      <input style="vertical-align:middle;" ref="leaderN" type="checkbox" @click="leaderClick()" v-model="declareForm.leaderN" name="leaderN" auto-complete="off"
                             placeholder=""></input>
                  </el-form-item>
                <el-form-item style="margin-bottom: 0" prop="leaderF">
                  <label style="vertical-align:middle;">是否有国外政府官员含驻华使馆</label>
                  <input style="vertical-align:middle;" ref="leaderF" type="checkbox" @click="leaderClick()" v-model="declareForm.leaderF" name="leaderF" auto-complete="off"
                         placeholder=""></input>
                </el-form-item>

                <el-form-item style="margin-bottom: 0" prop="leaderP">
                      <label style="vertical-align:middle;">省部级以上领导</label>
                      <input style="vertical-align:middle;" ref="leaderP" type="checkbox" @click="leaderClick()" v-model="declareForm.leaderP" name="leaderP" auto-complete="off"
                             placeholder=""></input>
                </el-form-item>
              </div>
              <div style="display: flex; flex-direction: row">
                <el-form-item style="margin-bottom: 0" prop="leaderA">
                      <label style="vertical-align:middle;">国家级行业协会负责人</label>
                      <input style="vertical-align:middle;" ref="leaderA" type="checkbox" @click="leaderClick()" v-model="declareForm.leaderA" name="leaderA" auto-complete="off"
                             placeholder=""></input>
                </el-form-item>
                <el-form-item style="margin-bottom: 0" prop="leaderD">
                  <label style="vertical-align:middle;">有关司局和事业单位负责人</label>
                  <input style="vertical-align:middle;" ref="leaderD" type="checkbox" @click="leaderClick()" v-model="declareForm.leaderD" name="leaderD" auto-complete="off"
                         placeholder=""></input>
                </el-form-item>
                <el-form-item style="margin-bottom: 0" prop="leaderNull">
                    <label style="vertical-align:middle;color: #Ff0000"">无</label>
                    <input style="vertical-align:middle;" ref="leaderNull" type="checkbox" @click="leaderNullClick()" v-model="declareForm.leaderNull" name="leaderNull" auto-complete="off"
                           placeholder=""></input>
                </el-form-item>
              </div>
            </el-collapse-item>
            <el-collapse-item name="6">
              <template slot="title">
                <span>六、填报单位信息</span>
                <span style="color: red;margin-left: 20px;font-family: 宋体" v-show="collapse[5]">还有必填项未填写!</span>
              </template>
              <el-row>
                <el-col :span="12">
                  <el-form-item prop="writeObject">
                    <label class="xrequired">填报单位</label>
                    <el-input type="text" ref="writeObject" v-model="declareForm.writeObject" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item prop="charger">
                    <label class="xrequired">处室负责人</label>
                    <el-input type="text" ref="charger" v-model="declareForm.charger" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="department">
                    <label class="xrequired">责任处室</label>
                    <el-input type="text" ref="department" v-model="declareForm.department" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item prop="teleNum">
                    <label class="xrequired">负责人手机号</label>
                    <el-input type="number" ref="teleNum" v-model="declareForm.teleNum" auto-complete="off"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item enctype="multipart/form-data">
                    <div class="inputFile1">
                      <label class="xrequired">展会工作方案</label><br />
                      <input type="file" ref="inputFile1" accept=".pdf" name="preExpoFile"></input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item enctype="multipart/form-data">
                    <div class="inputFile2">
                      <label class="xrequired">招展招商方案</label><br/>
                      <input type="file" ref="inputFile2"  accept=".pdf" name="investmentPlanFile"></input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-show="isFirstFont">
                  <el-form-item enctype="multipart/form-data">
                    <div class="inputFile3" >
                      <label class="xrequired">可行性报告</label><br />
                      <input type="file" ref="inputFile3" accept=".pdf" name=""></input>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-show="isFirstFont">
                  <el-form-item enctype="multipart/form-data">
                    <div class="inputFile4" >
                      <label class="xrequired">承办单位办展条件说明</label><br />
                      <input type="file" ref="inputFile4" accept=".pdf" name=""></input>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { BASE_URL } from "../../utils/constant";
  import { getAllFirstFontData, getAllNotFirstFontData, getEasyFontById, getDetailFontById } from "../../network/exhiState"
// import chooseCity from "../../components/common/chooseCity/chooseCity";
import Vue from "vue"
export default {
  name: "modifyfont",
  data() {
    return {
      chooseCityTag: "",
      provinceAndCityData: [],
      pickedProvinceAndCityData: [],
      collapse: [false, false, false, false, false, false],
      declareForm: {
        name: "",
        hostComp: "",
        fundComp: "",
        guideComp: "",
        supportComp: "",
        authObj: "",
        authNum: "",
        chooseCity: "",
        place: "",
        Times: [],
        cycle: "",
        area: "",
        meetState: "",
        activityBrief: "",
        foreign: false,
        view1: false,
        view2: false,
        willInvite: "",
        capitalSource: "",
        finanfrom: "",
        orderComp: "",
        finanFund: "",
        selfFund: "",
        //填报单位
        writeObject: "",
        //负责处室
        department: "",
        //处室负责人
        charger: "",
        //手机号
        teleNum: "",
        //党和国家领导人
        leaderN: false,
        //有关司局和事业单位负责人
        leaderD: false,
        //省部级以上领导
        leaderP: false,
        // 国家级行业协会负责人
        leaderA: false,
        // 是否有国外政府官员含驻华使馆
        leaderF: false,
        leaderNull: false,
      },
      fontId: ""
    };
  },
  // components: {
  //   chooseCity,
  // },
  created () {
    console.log(this.$route.query.item)
    this.declareForm = this.$route.query.item
    Vue.set(this.declareForm,"chooseCity",this.declareForm.chooseCity.split("-"))
    Vue.set(this.declareForm,"Times",[])
    this.declareForm.Times.push(this.declareForm.startTime)
    this.declareForm.Times.push(this.declareForm.endTime)
    this.handleLeaderState()
    this.getProvinceAndCityData()
    this.$message.warning("请重新上传所有文件")
  },
  computed: {
    leaderPresent () {
      if (this.declareForm.leaderNull){
        return "00000"
      }else {
        return (
          (this.declareForm.leaderN ? 1 : 0).toString() +
          (this.declareForm.leaderD ? 1 : 0).toString() +
          (this.declareForm.leaderP ? 1 : 0).toString() +
          (this.declareForm.leaderA ? 1 : 0).toString() +
          (this.declareForm.leaderF ? 1 : 0).toString()
        );
      }
    },
    isFirstFont () {
      return typeof (this.$store.state.isFirstFont) === "string" ? JSON.parse(this.$store.state.isFirstFont):this.$store.state.isFirstFont
    },
  },
  methods: {
    getProvinceAndCityData () {
      const axios = require("axios")
      axios.get('https://restapi.amap.com/v3/config/district',{
        params: {
          key: '214287d2088bc4992cd28103cb4eea7c',
          subdistrict: 3
        }
      }).then(res => {
        for (let province of res.data.districts[0].districts){
          let provinceObj = {
            value: province.name,
            label: province.name,
            children: []
          }
          for (let city of province.districts){
            let cityObj = {
              value: city.name,
              label: city.name,
              children: []
            }
            for (let county of city.districts){
              let countyObj = {
                value: county.name,
                label: county.name
              }
              cityObj.children.push(countyObj)
            }
            provinceObj.children.push(cityObj)
          }
          this.provinceAndCityData.push(provinceObj)
        }
      })
    },
    handleLeaderState () {
      switch (this.declareForm.leaderState.toString().length){
        case 0:
          this.declareForm.leaderState = "00000" + this.declareForm.leaderState.toString();
        case 1:
          this.declareForm.leaderState = "0000" + this.declareForm.leaderState.toString();
        case 2:
          this.declareForm.leaderState = "000" + this.declareForm.leaderState.toString()
        case 3:
          this.declareForm.leaderState = "00" + this.declareForm.leaderState.toString()
        case 4:
          this.declareForm.leaderState = "0" + this.declareForm.leaderState.toString()
        default:
          this.declareForm.leaderState = this.declareForm.leaderState.toString()
      }
      this.declareForm.leaderState = this.declareForm.leaderState.split("")
      Vue.set(this.declareForm,"leaderN",Boolean(this.declareForm.leaderState[0]*1))
      Vue.set(this.declareForm,"leaderD",Boolean(this.declareForm.leaderState[1]*1))
      Vue.set(this.declareForm,"leaderP",Boolean(this.declareForm.leaderState[2]*1))
      Vue.set(this.declareForm,"leaderA",Boolean(this.declareForm.leaderState[3]*1))
      Vue.set(this.declareForm,"leaderF",Boolean(this.declareForm.leaderState[4]*1))
    },
    returnMainIndex() {
      this.$router.back()
    },
    declareFormed() {
      if (!this.declareForm.name) {
        this.$message({
          showClose: true,
          message: "请填写展会名称！",
          type: "error",
        });
        this.$refs.name.focus();
        return false;
      }
      if (!this.declareForm.hostComp) {
        this.$message({
          showClose: true,
          message: "请填写展会主办单位！",
          type: "error",
        });
        this.$refs.hostComp.focus();
        return false;
      }
      if (!this.declareForm.fundComp) {
        this.$message({
          showClose: true,
          message: "请填写承办单位！",
          type: "error",
        });
        this.$refs.fundComp.focus();
        return false;
      }
      if (!this.declareForm.authObj) {
        this.$message({
          showClose: true,
          message: "请填写批准单位！",
          type: "error",
        });
        this.$refs.authObj.focus();
        return false;
      }
      if (!this.declareForm.chooseCity) {
        this.$message({
          showClose: true,
          message: "请选择举办地点！",
          type: "error",
        });
        this.$refs.chooseCity.focus();
        return false;
      }
      if (!this.declareForm.place) {
        this.$message({
          showClose: true,
          message: "请填写举办地点！",
          type: "error",
        });
        this.$refs.place.focus();
        return false;
      }
      if (!this.declareForm.Times[0]) {
        this.$message({
          showClose: true,
          message: "请填写举办时间！",
          type: "error",
        });
        this.$refs.Times.focus();
        return false;
      }
      if (!this.declareForm.area) {
        this.$message({
          showClose: true,
          message: "请填写举办面积！",
          type: "error",
        });
        this.$refs.area.focus();
        return false;
      }
      if (!this.declareForm.meetState) {
        this.$message({
          showClose: true,
          message: "请填写展会基本情况！",
          type: "error",
        });
        this.$refs.meetState.focus();
        return false;
      }

      if (!this.declareForm.activityBrief) {
        this.$message({
          showClose: true,
          message: "请填写同期活动！",
          type: "error",
        });
        this.$refs.activityBrief.focus();
        return false;
      }
      if (!(this.declareForm.view1 || this.declareForm.view2)) {
        this.$message({
          showClose: true,
          message: "请填写观众构成！",
          type: "error",
        });
        this.$refs.view1.focus();
        return false;
      }
      if (!this.declareForm.finanFund) {
        this.$message({
          showClose: true,
          message: "请填写财政金额！",
          type: "error",
        });
        this.$refs.finanFund.focus();
        return false;
      }
      if (!this.declareForm.selfFund) {
        this.$message({
          showClose: true,
          message: "请填写自筹金额！",
          type: "error",
        });
        this.$refs.selfFund.focus();
        return false;
      }
      if (!this.declareForm.leaderNull && this.leaderPresent === "00000"){
        this.$message({
          showClose: true,
          message: "请填写拟邀请领导情况！",
          type: "error",
        });
        this.$refs.leaderA.focus();
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
      let ip0 = this.$refs.authorizeFile;
      let ip1 = this.$refs.inputFile1;
      let ip2 = this.$refs.inputFile2;
      let ip3 = {}
      let ip4 = {}
      if (this.isFirstFont) {
        ip3 = this.$refs.inputFile3;
        ip4 = this.$refs.inputFile4;
      }
      var formdata = new FormData();
      if (this.isFirstFont){
        if (!ip0.files[0]) {
          this.$message({
            showClose: true,
            message: "请提交批准审核文件！",
            type: "error",
          });
          this.$refs.authorizeFile.focus();
          return false;
        }
      } else {
        if (!ip0.files[0]) {
          this.$message({
            showClose: true,
            message: "请提交去年审批文件！",
            type: "error",
          });
          this.$refs.authorizeFile.focus();
          return false;
        }
      }
      if (ip0.files[0].size/1024/1024 > 10){
        this.$message({
          showClose: true,
          message: "上传的文件过大，请重新上传！",
          type: "error",
        });
        this.$refs.authorizeFile.focus();
        return false;
      }
      if (!ip1.files[0]) {
        this.$message({
          showClose: true,
          message: "请提交展会工作方案文件！",
          type: "error",
        });
        this.$refs.inputFile1.focus();
        return false;
      }
      if (ip1.files[0].size/1024/1024 > 10){
        this.$message({
          showClose: true,
          message: "上传的文件过大，请重新上传！",
          type: "error",
        });
        this.$refs.inputFile1.focus();
        return false;
      }
      if (!ip2.files[0]) {
        this.$message({
          showClose: true,
          message: "请提交招展招商方案文件！",
          type: "error",
        });
        this.$refs.inputFile2.focus();
        return false;
      }
      if (ip2.files[0].size/1024/1024 > 10){
        this.$message({
          showClose: true,
          message: "上传的文件过大，请重新上传！",
          type: "error",
        });
        this.$refs.inputFile2.focus();
        return false;
      }
      if (this.isFirstFont) {
        if (!ip3.files[0]) {
          this.$message({
            showClose: true,
            message: "请提交可行性报告文件！",
            type: "error",
          });
          this.$refs.inputFile3.focus();
          return false;
        }
        if (ip3.files[0].size/1024/1024 > 10){
          this.$message({
            showClose: true,
            message: "上传的文件过大，请重新上传！",
            type: "error",
          });
          this.$refs.inputFile3.focus();
          return false;
        }
        if (!ip4.files[0]) {
          this.$message({
            showClose: true,
            message: "请提交承办单位办展条件说明文件！",
            type: "error",
          });
          this.$refs.inputFile4.focus();
          return false;
        }
        if (ip4.files[0].size/1024/1024 > 10){
          this.$message({
            showClose: true,
            message: "上传的文件过大，请重新上传！",
            type: "error",
          });
          this.$refs.inputFile4.focus();
          return false;
        }
      }
      //展会ID
      formdata.append("id", this.declareForm.id);
      //展会简称
      formdata.append("meetAddr", this.$store.getters.token);
      // 展会名称
      formdata.append("name", this.declareForm.name);
      // 主办单位
      formdata.append("hostComp", this.declareForm.hostComp);
      // 承办单位
      formdata.append("fundComp", this.declareForm.fundComp);
      // 协办单位
      formdata.append("supportComp", this.declareForm.supportComp);
      // 指导单位
      formdata.append("orderComp", this.declareForm.orderComp);
      // 批准单位
      formdata.append("authObj", this.declareForm.authObj);
      // 批准文案
      formdata.append("authNum", this.declareForm.authNum);
      // 举办城市
      formdata.append("chooseCity", this.declareForm.chooseCity.join("-"));
      // 举办场所
      formdata.append("place", this.declareForm.place);
      //开始时间
      formdata.append("startTime", this.declareForm.Times[0]);
      //结束时间
      formdata.append("endTime", this.declareForm.Times[1]);
      // 财政资金的拨款金额
      formdata.append("finanFund", this.declareForm.finanFund);
      // 展会面积
      formdata.append("area", this.declareForm.area);
      // 举办周期
      formdata.append("cycle", this.declareForm.cycle);
      // 展会内容
      formdata.append("meetState", this.declareForm.meetState);
      //同期活动
      formdata.append("activityBrief", this.declareForm.activityBrief);
      // 是否邀请国外参展商
      formdata.append("foreign", this.declareForm.foreign);
      //是否采购商参加
      formdata.append("view1", this.declareForm.view1);
      //是否消费者参加
      formdata.append("view2", this.declareForm.view2);
      // 财政资金数额
      formdata.append("finanFund", this.declareForm.finanFund);
      // 自筹资金数额
      formdata.append("selfFund", this.declareForm.selfFund);
      //出席领导情况
      formdata.append("leaderState", this.leaderPresent);
      //填报单位
      formdata.append("writeObject", this.declareForm.writeObject);
      //负责处室
      formdata.append("department", this.declareForm.department);
      //处室负责人
      formdata.append("charger", this.declareForm.charger);
      //手机号
      formdata.append("teleNum", this.declareForm.teleNum);
      //展会工作方案文档
      formdata.append("meetPlanFile", ip1.files[0]);
      //招展招商方案文档
      formdata.append("investmentPlanFile", ip2.files[0]);
      if (this.isFirstFont) {
        //可行性报告文档
        formdata.append("feasibilityFile", ip3.files[0]);
        //承办单位办展条件说明
        formdata.append("conditionStateFile", ip4.files[0]);
      }
      //上级单位审核意见
      formdata.append("authFile", ip0.files[0]);
      var axios = require("axios");
      if (this.isFirstFont){
        // axios.post("http://8.140.21.128:8445/api/handin/modifyDetail", formdata)
        axios.post(`${BASE_URL}/handin/modifyDetail`, formdata)
          .then((successResponse) => {
            if (successResponse.data.code === 0) {
              this.$router.push("/").catch(() => {});
              this.$message.success("提交成功")
            } else {
              this.$message({
                showClose: true,
                message: "提交失败，请重试！",
                type: "error",
              });
            }
          })
          .catch((failResponse) => {
            console.log(failResponse)
            this.$message({
              showClose: true,
              message: "提交失败，请重试！",
              type: "error",
            });
          });
      }else {
        // axios.post("http://8.140.21.128:8445/api/handin/modifyEasy", formdata)
        axios.post(`${BASE_URL}/handin/modifyEasy`, formdata)
          .then((successResponse) => {
            if (successResponse.data.code === 0) {
              this.$router.push("/").catch(() => {});
              this.$message.success("提交成功")
            } else {
              this.$message({
                showClose: true,
                message: "提交失败，请重试！",
                type: "error",
              });
            }
          })
          .catch((failResponse) => {
            console.log(failResponse);
            this.$message({
              showClose: true,
              message: "提交失败，请重试！",
              type: "error",
            });
          });
      }
    },
    collapseChange (val) {
      if (!this.declareForm.name || !this.declareForm.hostComp || !this.declareForm.fundComp){
        Vue.set(this.collapse,0,true)
      }else {
        Vue.set(this.collapse,0,false)
      }
      if (!this.declareForm.authObj || !this.$refs.authorizeFile.files[0]){
        Vue.set(this.collapse,1,true)
      }else {
        Vue.set(this.collapse,1,false)
      }
      if (!this.declareForm.chooseCity ||
        !this.declareForm.Times ||
        !this.declareForm.area ||
        !this.declareForm.meetState ||
        !this.declareForm.activityBrief ||
        !this.declareForm.place){
        Vue.set(this.collapse,2,true)
      }else {
        Vue.set(this.collapse,2,false)
      }
      if (!this.declareForm.finanFund || !this.declareForm.selfFund){
        Vue.set(this.collapse,3,true)
      }else {
        Vue.set(this.collapse,3,false)
      }
      if (!this.declareForm.leaderNull && this.leaderPresent === "00000"){
        Vue.set(this.collapse,4,true)
      }else {
        Vue.set(this.collapse,4,false)
      }
      if (this.isFirstFont){
        if (!this.declareForm.writeObject ||
          !this.declareForm.department ||
          !this.declareForm.charger ||
          !this.declareForm.teleNum ||
          !this.$refs.inputFile1.files[0] ||
          !this.$refs.inputFile2.files[0] ||
          !this.$refs.inputFile3.files[0] ||
          !this.$refs.inputFile4.files[0]) {
          Vue.set(this.collapse,5,true)
        }else {
          Vue.set(this.collapse,5,false)
        }
      }else {
        if (!this.declareForm.writeObject ||
          !this.declareForm.department ||
          !this.declareForm.charger ||
          !this.declareForm.teleNum ||
          !this.$refs.inputFile1.files[0] ||
          !this.$refs.inputFile2.files[0]) {
          Vue.set(this.collapse,5,true)
        }else {
          Vue.set(this.collapse,5,false)
        }
      }
    },
    clearForm () {
      this.$refs.fontForm.resetFields()
      this.$refs.authorizeFile.value = ""
      this.$refs.inputFile1.value = ""
      this.$refs.inputFile2.value = ""
      if (this.$refs.inputFile3.value){
        this.$refs.inputFile3.value = ""
      }
      if (this.$refs.inputFile4.value){
        this.$refs.inputFile4.value = ""
      }
    },
    leaderClick () {
      Vue.set(this.declareForm, "leaderNull", false)
    },
    leaderNullClick () {
      Vue.set(this.declareForm, "leaderN", false)
      Vue.set(this.declareForm, "leaderD", false)
      Vue.set(this.declareForm, "leaderP", false)
      Vue.set(this.declareForm, "leaderA", false)
      Vue.set(this.declareForm, "leaderF", false)
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
.chartUser{
  display: flex;
  margin-top: 20px;
  height: 120px;
  //background-color: green;
}
.helpinfo {
  /*background-color: rgba(70, 130, 180, 0.1);*/
  transform: translateY(24%);
  margin: 10px 20px 10px 170px;
  padding: 10px 0px 10px 10px;
  span{

  }
  //width: 556px;
}
.function-btns{
  height: 200px;
  /*line-height: 100px;*/
  /*margin: 10px;*/
  z-index: 999999;
  right: 160px;
  .el-button{
    border-radius: 10px;
    font-size: 16px;
    margin-left: 0px !important;
  }
}
.el-collapse{
  margin: 30px 0 40px 0px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  .el-collapse-item{
    margin-left: 140px;
  }
  span{
    font-size: 18px;
    font-family: "黑体";
  }
}
.modify-font-form{
  .el-form{
    width: 80%;
    padding-bottom: 15px;
  }
}
.el-input{
  width: 40%;
}
.attention {
  background-color: rgba(70, 130, 180, 0.1);
  margin: 0px 10px 40px 30px;
  padding: 10px ;
  width: 100% !important;
}
.hptext {
  /*color: rgba(70, 130, 180, 0.9);*/
  color: rgba(80, 144,53, 1);
}

.wrtext {
  /*color: rgba(255, 38, 38, 0.9);*/
  /*color: #F56C6C;*/
}

.card1 {
  color: #666;
  @extend %shadow;

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
.filePlc {
  display: flex;
  flex: 1;
}
.timeMid {
  width: 20px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding-left: 10px;
}
.Context:after {
  content: "*";
  color: red;
  position: absolute;
  top: 50px;
  left: 6px;
}
label.xrequired:after {
  content: "*";
  color: red;
  font-size: 25px;
  position: relative;
  top: 8px;
  margin-left: 3px;
}
.el-cascader{
  width: 100% !important;
}
.attention-tips{
  margin: 0px 20px 0px 30px;
  padding: 10px 0px 10px 10px;
  p{
    color: rgba(80, 144,53, 1);
    letter-spacing: 2px;
    font-size: 20px;
    font-family: 微软雅黑;
    /*width: 100%;*/
  }
}

</style>

