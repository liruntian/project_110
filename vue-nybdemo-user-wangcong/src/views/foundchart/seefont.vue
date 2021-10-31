<template>
  <div class="see-font">
    <div class="content">
      <table border="1px" cellspacing="0">
        <colgroup span="8" width="200px"></colgroup>
        <tr>
          <th colspan="8">展会申报信息</th>
        </tr>
        <tr>
          <td>展会名称</td>
          <td colspan="7">{{ detailForm.name }}</td>
        </tr>
        <tr>
          <td>主办单位</td>
          <td>{{ detailForm.hostComp }}</td>
          <td>承办单位</td>
          <td>{{ detailForm.fundComp }}</td>
          <td>协办单位</td>
          <td>{{ detailForm.supportComp }}</td>
          <td>指导单位</td>
          <td>{{ detailForm.orderComp }}</td>
        </tr>
        <tr>
          <td>批准单位</td>
          <td>{{ detailForm.authObj }}</td>
          <td>批准文号</td>
          <td>{{ detailForm.authNum }}</td>
          <td>展览面积（㎡）</td>
          <td>{{ detailForm.area }}</td>
          <td>举办周期（年）</td>
          <td>{{ detailForm.cycle }}</td>
        </tr>
        <tr>
          <td>举办时间</td>
          <td>{{ detailForm.startTime }}&nbsp;至</br>&nbsp;{{
              detailForm.endTime }}</td>
          <td>举办地点</td>
          <td>{{ detailForm.chooseCity }}</br>
            {{ detailForm.place }}
          </td>
          <td>
            是否邀请境外有
            </br>
            关机构及参展商
          </td>
          <td>
            {{ detailForm.foreign ? "是" : "否"}}
          </td>
          <td>观众构成</td>
          <td>
            是否有参展商：<span>{{ detailForm.view1 ? "是" : "否"}}</span>
            </br>
            是否有消费者：<span>{{ detailForm.view2 ? "是" : "否"}}</span>
          </td>
        </tr>
        <tr>
          <td>填报单位</td>
          <td>{{ detailForm.writeObject }}</td>
          <td>
            责任处室</td>
          <td>{{ detailForm.department }}</td>
          <td>处室负责人</td>
          <td>{{ detailForm.charger }}</td>
          <td>负责人手机号</td>
          <td>{{ detailForm.teleNum }}</td>
        </tr>
        <tr style="height: 100px">
          <td>展会基本情况</td>
          <td colspan="3">{{ detailForm.meetState }}</td>
          <td>同期活动</td>
          <td colspan="3">{{ detailForm.activityBrief }}</td>
        </tr>
        <tr>
          <td>经费来源</td>
          <td colspan="7">
            财政资金：<span>{{ detailForm.finanFund }}</span>&nbsp;万元
            </br>
            自筹资金：<span>{{ detailForm.selfFund }}</span>&nbsp;万元
          </td>
        </tr>
        <tr>
          <td>领导出席情况</td>
          <td colspan="7">
            是否邀请党和国家领导人出席：&nbsp;<span>{{ leaderState.slice(0,1) == 1 ? "是" : "否" }}</span></br>
            有关司局和事业单位负责人：&nbsp;<span>{{ leaderState.slice(1,2) == 1 ? "是" : "否" }}</span></br>
            省部级以上领导：&nbsp;<span>{{ leaderState.slice(2,3) == 1 ? "是" : "否" }}</span></br>
            国家级行业协会负责人：&nbsp;<span>{{ leaderState.slice(3,4) == 1 ? "是" : "否" }}</span></br>
            是否有国外政府官员含驻华使馆：&nbsp;<span>{{ leaderState.slice(4,5) == 1 ? "是" : "否" }}</span>
          </td>
        </tr>
        <tr>
          <td v-if="detailForm.isFirstFont">批准审核文件</td>
          <td v-else>去年审批文件</td>
          <td colspan="7" style="position:relative;">
            <a @click="downloadFile(detailForm.authFileId, '批准审核文件',0)">
              <img :src="downloadIcon" alt="">
              <span>点击下载</span>
            </a>
            <span v-show="isDownloading[0]" style="position: absolute;left: 580px;top: 15px; color: #79bbff">正在下载文件...</span>
          </td>
        </tr>
        <tr>
          <td>展会工作方案文档</td>
          <td colspan="7" style="position:relative;">
            <a @click="downloadFile(detailForm.meetPlanFileId, '展会工作方案文档', 1)">
              <img :src="downloadIcon" alt="">
              <span>点击下载</span>
            </a>
            <span v-show="isDownloading[1]" style="position: absolute;left: 580px;top: 15px; color: #79bbff">正在下载文件...</span>
          </td>
        </tr>
        <tr>
          <td>招展招商方案文档</td>
          <td colspan="7" style="position:relative;">
            <a @click="downloadFile(detailForm.investmentPlanFileId, '招展招商方案文档', 2)">
              <img :src="downloadIcon" alt="">
              <span>点击下载</span>
            </a>
            <span v-show="isDownloading[2]" style="position: absolute;left: 580px;top: 15px; color: #79bbff">正在下载文件...</span>
          </td>
        </tr>
        <tr v-show="detailForm.isFirstFont">
          <td>可行性报告文档</td>
          <td colspan="7" style="position:relative;">
            <a @click="downloadFile(detailForm.feasibilityFileId, '可行性报告文档', 3)">
              <img :src="downloadIcon" alt="">
              <span>点击下载</span>
            </a>
            <span v-show="isDownloading[3]" style="position: absolute;left: 580px;top: 15px; color: #79bbff">正在下载文件...</span>
          </td>
        </tr>
        <tr v-show="detailForm.isFirstFont">
          <td>承办单位办展条件说明</td>
          <td colspan="7" style="position:relative;">
            <a @click="downloadFile(detailForm.conditionStateFileId, '承办单位办展条件说明', 4)">
              <img :src="downloadIcon" alt="">
              <span>点击下载</span>
            </a>
            <span v-show="isDownloading[4]" style="position: absolute;left: 580px;top: 15px; color: #79bbff">正在下载文件...</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import Vue from "vue"
import { getDetailFontById, getEasyFontById, downloadFile } from "../../network/exhiState"
export default {
  name: "seefont",
  data () {
    return {
      id: '',
      isFirstFont: false,
      downloadIcon: require('../../assets/icons/file.svg'),
      detailForm: {},
      isDownloading: [false, false, false, false, false]
    }
  },
  created () {
    this.detailForm = this.$route.query.item
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
    }
  },
  methods: {
    downloadFile (fileId, TheFileName, index) {
      Vue.set(this.isDownloading, index, true)
      downloadFile(fileId).then((res) => {
        console.log(res)
        const blob = new Blob([res]); //处理文档流
        const fileName = this.detailForm.name + "的" + TheFileName + ".pdf";
        const elink = document.createElement("a");
        elink.setAttribute("download", decodeURIComponent(fileName));
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
        Vue.set(this.isDownloading, index, false)
      }).catch(() => {
        Vue.set(this.isDownloading, index, false)
        this.$message.error("下载失败，请重试！")
      })
    }
  }
}
</script>

<style scoped lang="scss">
.see-font{
  width: 100%;
  background-color: #ffffff;
}
.content{
  height: 100%;
  width: 100%;
  padding: 40px 50px;
}
table {
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: auto;
}
th {
  font-size: 20px;
}
tr {
  height: 45px;
  :nth-child(odd){
    font-weight: bold;
  }
}
td > span {
  color: #3399ff;
}
td{
  text-align: center;
  padding: 5px 0;
  img{
    height: 30px;
    width: 30px;
  }
}
</style>
