<template>
  <div class="see-font">
    <div class="content">
      <table border="1px" cellspacing="0">
        <colgroup span="8" width="200px"></colgroup>
        <tr>
          <th colspan="8">展会申报总结信息</th>
        </tr>
<!--        <tr>-->
<!--          <td>展会名称</td>-->
<!--          <td colspan="7">{{ detailForm.name }}</td>-->
<!--        </tr>-->
        <tr>
          <td>展览面积（㎡）</td>
          <td>{{ detailForm.area }}</td>
          <td>参展企业数量</td>
          <td>{{ detailForm.companyNum }}</td>
          <td>采购商数量</td>
          <td>{{ detailForm.buyerNum }}</td>
          <td>参展产品数量</td>
          <td>{{ detailForm.displayObj }}</td>
        </tr>
        <tr>
          <td>同期活动数量</td>
          <td>{{ detailForm.activityNum }}</td>
          <td>宣传媒体数量</td>
          <td>{{ detailForm.mediaNum }}</td>
          <td>线下成交额（含意向）（万元）</td>
          <td>{{ detailForm.turnover }}</td>
          <td>线上成交额（万元）</td>
          <td>{{ detailForm.onlineTurnover }}</td>
        </tr>
        <tr>
          <td>线上参展人数</td>
          <td colspan="3">{{ detailForm.onlineViewer }}&nbsp;</td>
          <td>线下参展人数</td>
          <td colspan="3">{{ detailForm.viewerNum }}</td>
        </tr>
        <tr>
          <td>参展省市自治区情况</td>
          <td colspan="7">{{ detailForm.provinceState }}</td>
        </tr>
        <tr style="height: 100px">
          <td>下一步工作计划</td>
          <td colspan="3">{{ detailForm.nextWorkPlan }}</td>
          <td>展会亮点</td>
          <td colspan="3">{{ detailForm.meetHighlight }}</td>
        </tr>
        <tr>
          <td>填报单位</td>
          <td>{{ detailForm.writeObject }}</td>
          <td>责任处室</td>
          <td>{{ detailForm.department }}</td>
          <td>处室负责人</td>
          <td>{{ detailForm.charger }}</td>
          <td>负责人手机号</td>
          <td>{{ detailForm.teleNum }}</td>
        </tr>
        <tr>
          <td>总结报告全文</td>
          <td colspan="7">
            <a @click="downloadFile(detailForm.summaryFileId, '总结报告全文')">
              <img :src="downloadIcon" alt="">
              <span>点击下载</span>
            </a>
          </td>
        </tr>
        <tr>
          <td>单位主要负责同志签发页</td>
          <td colspan="7">
            <a @click="downloadFile(detailForm.hosterSignFileId, '单位主要负责同志签发页')">
              <img :src="downloadIcon" alt="">
              <span>点击下载</span>
            </a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { getLatestSummary, downloadFile } from "../../network/exhiState"
export default {
  name: "seesummary",
  data () {
    return {
      fontId: "",
      downloadIcon: require('../../assets/icons/file.svg'),
      detailForm: {}
    }
  },
  created () {
    this.fontId = this.$route.query.id
    getLatestSummary (this.fontId).then(res => {
      console.log(res.data)
      this.detailForm = res.data
    })
  },
  methods: {
    downloadFile (fieId, TheFileName) {
      downloadFile(fieId).then((res) => {
        const blob = new Blob([res]); //处理文档流
        const fileName = this.$store.state.meetName + "的" + TheFileName + ".pdf";
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
