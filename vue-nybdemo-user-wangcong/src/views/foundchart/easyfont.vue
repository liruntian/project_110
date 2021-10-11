<template>
  <div style="height: 100%">
    <div class="card1 bbxx" style="width: 100%; height: 100%">
      <div class="chartUser">
        <div class="helpinfo">
          <p><span class="wrtext">本申报适用于已加入展会计划的申报！</span></p>
          <p><font class="hptext">请认真填写展会活动登记表，提交后未经审核无法修改</font></p>
        </div>
        <div class="function-btns">
          <el-button round @click="returnMainIndex()" type="primary" style="margin-left: 50px">返回</el-button>
          <el-button round @click="clearForm()" type="danger" style="margin: 0 50px">重填</el-button>
<!--          <el-button @click="newFont()" type="primary">暂存</el-button>-->
          <el-button round class="subBtn" type="success" v-on:click="declareFormed">提交</el-button>
        </div>
      </div>
      <div>
        <el-form :model="declareForm" ref="fontForm" status-icon label-width="30px" class="demo-ruleForm" style="padding-right: 30px;background-color: #ffffff" enctype='multipart/form-data'>
          <el-collapse>
            <el-collapse-item name="1">
              <template slot="title">
                <span>一、基础信息</span>
              </template>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item style="margin-top: 20px" prop="name">
                    <label class="xrequired">展会名称</label>
                    <el-input type="text" ref="name" v-model="declareForm.name" auto-complete="off"
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
                  <el-form-item style="margin-top: 20px" prop="hostComp">
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
              </template>
              <div class="attention">
                <p><font class="hptext">注：省部主办展会须提供全国清理和规范庆典研讨会论坛活动工作领导小组的批文；事业单位主办展会须提供行业主管司局审核意见；境外组团参展须提供国际合作司审核意见</font></p>
              </div>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item prop="authObj">
                    <label class="xrequired">批准单位</label>
                    <el-input type="text" ref="authObj" v-model="declareForm.authObj" auto-complete="off"
                              placeholder=""></el-input>
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
              </template>
              <el-row :gutter="40">
                <el-col :span="12">
                  <label class="xrequired" style="margin-left: 30px">举办地点</label>
                  <div  style="display: flex;width: 100%">
                    <el-form-item prop="chooseCity" style="width: 50%">
                      <el-cascader
                        v-model="declareForm.chooseCity"
                        :options="provinceAndCityData"
                        @change="handleChange"
                      >
                      </el-cascader>
                    </el-form-item>
                    <el-form-item prop="place" style="width: 50%">
                      <el-input type="text" ref="place" v-model="declareForm.place" auto-complete="off" placeholder="具体举办地点，如xx展览中心"></el-input>
                    </el-form-item>
                  </div>
<!--                  <el-form-item >-->


<!--&lt;!&ndash;                    <div style="display:flex">&ndash;&gt;-->
<!--&lt;!&ndash;                      <div style="width: 70%">&ndash;&gt;-->
<!--&lt;!&ndash;                        <choose-city ref='chooseCity' :cityData = 'this.chooseCityTag'></choose-city>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->

<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                  </el-form-item>-->
                  <el-form-item prop="area">
                    <label  class="xrequired">展览面积（m²）</label>
                    <el-input type="number" ref="area" v-model="declareForm.area" auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item prop="meetState">
                    <label  class="xrequired">展会基本情况(100字以内)</label>
                    <el-input type="textarea" ref="meetState" :maxlength="100" v-model="declareForm.meetState" auto-complete="off"
                              placeholder="主题、主要内容、展区规划等"></el-input>
                  </el-form-item>
                  <el-form-item prop="foreign">
                    <p><label>是否邀请境外有关机构及参展商</label>
                      <input style="vertical-align:middle;" ref="foreign" type="checkbox" v-model="declareForm.foreign" name="views" auto-complete="off"
                             placeholder=""></input>
                    </p>
                  </el-form-item>
                  <div style="display: flex; flex-direction: row; width: 100%">
                    <p style="padding-left: 30px"><label  class="xrequired">观众构成</label></p>
                    <el-form-item style="width: 30%;margin:5px 0 0 0" prop="view1">
                      <label style="vertical-align:middle;">是否有采购商参加</label>
                      <input style="vertical-align:middle;" ref="view1" type="checkbox" v-model="declareForm.view1" name="views" auto-complete="off"
                             placeholder=""></input>
                    </el-form-item>
                    <el-form-item style="width: 30%;margin:5px 0 0 0" prop="view2">
                      <label style="vertical-align:middle;">是否有消费者参加</label>
                      <input style="vertical-align:middle;" ref="view2" type="checkbox" v-model="declareForm.view2" name="views" auto-complete="off"
                             placeholder=""></input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
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
                    <label class="xrequired">举办周期（年）</label>
                    <el-input type="number" ref="cycle" v-model="declareForm.cycle" auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>

                  <el-form-item prop="activityBrief">
                    <label  class="xrequired">同期活动(200字以内)</label>
                    <el-input type="textarea" ref="activityBrief" :maxlength="200" v-model="declareForm.activityBrief" auto-complete="off"
                              placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template slot="title">
                <span>四、经费来源</span>
              </template>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item prop="finanFund">
                    <label>财政金额（万元）</label>
                    <el-input type="number" ref="finanFund" v-model="declareForm.finanFund" auto-complete="off"
                              oninput="if(value.length > 8) value = value.slice(0,8)"
                              placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="selfFund">
                    <label>自筹金额（万元）</label>
                    <el-input type="number" ref="selfFund" v-model="declareForm.selfFund" auto-complete="off"
                              oninput="if(value.length > 8) value = value.slice(0,8)"
                              placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="5">
              <template slot="title">
                <span>五、拟邀请领导情况</span>
              </template>
              <el-form-item style="margin-bottom: 0" prop="leaderN">
                <p><label>领导出席情况</label></p>
                  <p style="font-size: 10px">
                    <label style="vertical-align:middle;">党和国家领导人</label>
                    <input style="vertical-align:middle;" ref="leaderN" type="checkbox" v-model="declareForm.leaderN" name="leaderN" auto-complete="off"
                           placeholder=""></input>
                  </p>
              </el-form-item>
              <el-form-item style="margin-bottom: 0" prop="leaderD">
                  <p style="font-size: 10px">
                    <label style="vertical-align:middle;">有关司局和事业单位负责人</label>
                    <input style="vertical-align:middle;" ref="leaderD" type="checkbox" v-model="declareForm.leaderD" name="leaderD" auto-complete="off"
                           placeholder=""></input>
                  </p>
              </el-form-item>
              <el-form-item style="margin-bottom: 0" prop="leaderP">
                  <p style="font-size: 10px">
                    <label style="vertical-align:middle;">省部级以上领导</label>
                    <input style="vertical-align:middle;" ref="leaderP" type="checkbox" v-model="declareForm.leaderP" name="leaderP" auto-complete="off"
                           placeholder=""></input>
                  </p>
              </el-form-item>
              <el-form-item style="margin-bottom: 0" prop="leaderA">
                  <p style="font-size: 10px">
                    <label style="vertical-align:middle;">国家级行业协会负责人</label>
                    <input style="vertical-align:middle;" ref="leaderA" type="checkbox" v-model="declareForm.leaderA" name="leaderA" auto-complete="off"
                           placeholder=""></input>
                  </p>
              </el-form-item>
              <el-form-item style="margin-bottom: 0" prop="leaderF">
                  <p style="font-size: 10px">
                    <label style="vertical-align:middle;">是否有国外政府官员含驻华使馆</label>
                    <input style="vertical-align:middle;" ref="leaderF" type="checkbox" v-model="declareForm.leaderF" name="leaderF" auto-complete="off"
                           placeholder=""></input>
                  </p>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item name="6">
              <template slot="title">
                <span>六、填报单位信息</span>
              </template>
              <el-row :gutter="40">
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
                    <el-input type="number" ref="teleNum" v-model="declareForm.teleNum" auto-complete="off"
                              oninput="if(value.length > 11) value = value.slice(0,11)"></el-input>
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
import Vue from "vue"
import { getAllFirstFontData, getAllNotFirstFontData } from "../../network/exhiState"
import chooseCity from "../../components/common/chooseCity/chooseCity";
export default {
  name: "easyfont",
  data() {
    return {
      chooseCityTag: "",
      provinceAndCityData: [],
      pickedProvinceAndCityData: [],
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
      },
    };
  },
  components: {
    chooseCity,
  },
  created () {
    Vue.set(this.declareForm,"name", this.$store.state.meetName)
    this.getPrefillFont()
    this.getProvinceAndCityData()
  },
  computed: {
    leaderPresent() {
      return (
        (this.declareForm.leaderN ? 1 : 0).toString() +
        (this.declareForm.leaderD ? 1 : 0).toString() +
        (this.declareForm.leaderP ? 1 : 0).toString() +
        (this.declareForm.leaderA ? 1 : 0).toString() +
        (this.declareForm.leaderF ? 1 : 0).toString()
      );
    },
    isFirstFont () {
      return typeof (this.$store.state.isFirstFont) === "string" ? JSON.parse(this.$store.state.isFirstFont):this.$store.state.isFirstFont
    },
  },
  methods: {
    getPrefillFont () {
      getAllFirstFontData(this.$store.state.token).then(res => {
        console.log(res.data);
        // this.declareForm = res.data[1]
      })
      // getAllNotFirstFontData(this.$store.state.token).then()
    },
    getProvinceAndCityData () {
      const axios = require("axios")
      axios.get('https://restapi.amap.com/v3/config/district',{
        params: {
          key: '214287d2088bc4992cd28103cb4eea7c',
          subdistrict: 3
        }
      }).then(res => {
        console.log(res.data.districts[0])
        console.log(res.data.districts[0].districts)
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
    handleChange() {
      console.log(this.declareForm.chooseCity)
      console.log(this.declareForm.chooseCity.join("-"))
    },
    returnMainIndex() {
      this.$router.back()
    },
    declareFormed () {
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
      if (!this.declareForm.cycle) {
        this.$message({
          showClose: true,
          message: "请填写举办周期！",
          type: "error",
        });
        this.$refs.cycle.focus();
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
      if (!(this.declareForm.finanFund || this.declareForm.selfFund)) {
        this.$message({
          showClose: true,
          message: "请填写经费来源！",
          type: "error",
        });
        this.$refs.finanFund.focus();
        return false;
      }
      if (!this.declareForm.writeObject) {
        warningOpen("请填写填报单位");
        this.$refs.writeObject.focus();
        return false;
      }
      if (!this.declareForm.department) {
        warningOpen("请填写责任处室");
        this.$refs.department.focus();
        return false;
      }
      if (!this.declareForm.charger) {
        warningOpen("请填写处室负责人");
        this.$refs.charger.focus();
        return false;
      }
      if (!this.declareForm.teleNum) {
        warningOpen("请填写负责人手机号");
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
            message: "请填写批准审核文件！",
            type: "error",
          });
          this.$refs.authorizeFile.focus();
          return false;
        }
      } else {
        if (!ip0.files[0]) {
          this.$message({
            showClose: true,
            message: "请填写去年审批文件！",
            type: "error",
          });
          this.$refs.authorizeFile.focus();
          return false;
        }
      }
      if (!ip1.files[0]) {
        this.$message({
          showClose: true,
          message: "请填写展会工作方案！",
          type: "error",
        });
        this.$refs.inputFile1.focus();
        return false;
      }
      if (!ip2.files[0]) {
        this.$message({
          showClose: true,
          message: "请填写招展招商方案！",
          type: "error",
        });
        this.$refs.inputFile2.focus();
        return false;
      }
      if (this.isFirstFont) {
        if (!ip3.files[0]) {
          this.$message({
            showClose: true,
            message: "请填写可行性报告！",
            type: "error",
          });
          this.$refs.inputFile3.focus();
          return false;
        }
        if (!ip4.files[0]) {
          this.$message({
            showClose: true,
            message: "请填写承办单位办展条件说明！",
            type: "error",
          });
          this.$refs.inputFile4.focus();
          return false;
        }
      }
      //展会简称
      formdata.append("meetAddr", this.$store.getters.token);
      // 财政资金的拨款金额
      formdata.append("finanFund", this.declareForm.finanFund);
      // 其他来源的拨款金额
      // formdata.append("otherFund", this.declareForm.otherfond);
      // 展会面积
      formdata.append("area", this.declareForm.area);
      // 是否邀请国外参展商
      formdata.append("foreign", this.declareForm.foreign);
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
      // formdata.append("chooseCity", this.$refs.chooseCity.getChoosedCity());
      formdata.append("chooseCity", this.declareForm.chooseCity.join("-"));
      // 举办场所
      formdata.append("place", this.declareForm.place);
      // 举办周期
      formdata.append("cycle", this.declareForm.cycle);
      //开始时间
      formdata.append("startTime", this.declareForm.Times[0]);
      //结束时间
      formdata.append("endTime", this.declareForm.Times[1]);
      // 展会内容
      formdata.append("meetState", this.declareForm.meetState);
      // 财政资金数额
      formdata.append("finanFund", this.declareForm.finanFund);
      // 自筹资金数额
      formdata.append("selfFund", this.declareForm.selfFund);
      //出席领导情况
      formdata.append("leaderState", this.leaderPresent.toString());
      //同期活动
      formdata.append("activityBrief", this.declareForm.activityBrief);
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
      //是否采购商参加
      formdata.append("view1", this.declareForm.view1);
      //是否消费者参加
      formdata.append("view2", this.declareForm.view2);
      console.log(this.leaderPresent);
      console.log(typeof this.leaderPresent);
      console.log(formdata);
      // console.log(formdata);
      // console.log(formdata.get("finanFrom"));

      // sendEasy(formdata)
      //   .then((successResponse) => {
      //     if (successResponse.data.code === 0) {
      //       this.$router.push("/").catch(() => {});
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         message: "提交失败！",
      //         type: "error",
      //       });
      //     }
      //   })
      //   .catch((failResponse) => {});

      var axios = require("axios");
      if (this.isFirstFont){
        axios.post("http://8.140.21.128:8445/api/handin/detail", formdata)
          .then((successResponse) => {
            if (successResponse.data.code === 0) {
              this.$router.push("/").catch(() => {});
              this.$message.success("提交成功")
            } else {
              this.$message({
                showClose: true,
                message: "提交失败！",
                type: "error",
              });
            }
          })
          .catch((failResponse) => {});
      }else {
        axios.post("http://8.140.21.128:8445/api/handin/easy", formdata)
          .then((successResponse) => {
            if (successResponse.data.code === 0) {
              this.$router.push("/").catch(() => {});
              this.$message.success("提交成功")
            } else {
              this.$message({
                showClose: true,
                message: "提交失败！",
                type: "error",
              });
            }
          })
          .catch((failResponse) => {});
      }
    },
    clearForm () {
      this.$refs["fontForm"].resetFields()
      this.$refs.authorizeFile.value = ""
      this.$refs.inputFile1.value = ""
      this.$refs.inputFile2.value = ""
      if (this.$refs.inputFile3.value){
        this.$refs.inputFile3.value = ""
      }
      if (this.$refs.inputFile4.value){
        this.$refs.inputFile4.value = ""
      }
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
  margin-left: 50px;
  height: 120px;
  //background-color: green;
}
.helpinfo {
  background-color: rgba(70, 130, 180, 0.1);
  transform: translateY(24%);
  margin: 10px;
  padding: 10px;
  //width: 70%;
}
.function-btns{
  height: 100px;
  line-height: 100px;
  margin: 10px 0 10px 50px;
  z-index: 999999;
  right: 100px;
}
.el-collapse{
  margin: 30px 0 40px 0px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  .el-collapse-item{
    margin-left: 40px;
  }
  span{
    font-size: 24px;
  }
}
.el-input{
  width: 40%;
}
.attention {
  background-color: rgba(70, 130, 180, 0.1);
  transform: translateY(24%);
  margin: 0px 10px 10px 30px;
  padding: 10px ;
  width: 100% !important;
}
.hptext {
  color: rgba(70, 130, 180, 0.9);
}

.wrtext {
  color: rgba(255, 38, 38, 0.9);
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
</style>

