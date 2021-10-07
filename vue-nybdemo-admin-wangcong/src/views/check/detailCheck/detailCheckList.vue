<!--  -->
<template>
  <div class="detailCheckList">
    <div class="search-content">
      <h3 style="margin-right: 16px">展会名称</h3>
      <el-input
        v-model="exportName"
        placeholder="请输入展会名称"
        style="width: 200px; margin-right: 48px"
      ></el-input>
      <h3 style="margin-right: 16px">主办方</h3>
      <el-input
        v-model="hostComp"
        placeholder="请输入主办方"
        style="width: 200px"
      ></el-input>
    </div>
    <div class="search-button">
      <el-button type="primary" icon="el-icon-search" size="small" @click="search"
        >查询</el-button
      >
      <el-button size="small" @click="reset">重置</el-button>
    </div>
    <div class="filter-state">
      <h3 class="title">状态</h3>
      <div>
        <el-checkbox-group
          v-model="checkList"
          @change="checkListChange"
          :min="1"
        >
          <el-checkbox label="待审核"></el-checkbox>
          <el-checkbox label="待修改"></el-checkbox>
          <el-checkbox label="待总结"></el-checkbox>
          <el-checkbox label="已完成"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="check-type">
      <h3 style="margin-right: 16px">申报类型</h3>
      <el-radio-group
        v-model="checkType"
        size="small"
        @change="checkTypeChange"
      >
        <el-radio label="1" border>首次申报</el-radio>
        <el-radio label="2" border>再次申报</el-radio>
      </el-radio-group>
    </div>
    <bea-table
      :data="datalist"
      :nextPath="nextPath"
      :checkType="checkType"
    ></bea-table>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getdetailFormdata } from "../../../network/detailCheck";
import { getEasyFormdata } from "../../../network/easyCheck";
import beaTable from "../../../components/table";
const statesOptions = ["待审核", "待修改", "待总结", "已完成"];
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    beaTable,
  },
  data() {
    //这里存放数据
    return {
      // isshow: true,
      detailForm: [],
      easyForm: [],
      datalist: [],
      allAdataList: [],
      hostComp: "",
      exportName: "",
      checkList: ["待审核"],
      checkType: 1,
      checkAll: true,
      isIndeterminate: true,
      nextPath: "/detailCheck/",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async getdetailList() {
      await getdetailFormdata().then((res) => {
        this.detailForm = res.data;
        this.checkStateToString(this.detailForm);
      });
    },
    async getEasyList() {
      await getEasyFormdata().then((res) => {
        this.easyForm = res.data;
        this.checkStateToString(this.easyForm);
      });
    },
    checkTypeChange(v) {
      if (v == 1) {
        this.allAdataList = this.detailForm;
      } else {
        this.allAdataList = this.easyForm;
      }
      this.datalist = this.allAdataList;
    },
    checkListChange(value) {
       this.datalist = [];
      for(let item of this.checkList) {
        this.datalist = this.datalist.concat(this.allAdataList.filter(v => v.checkState == item));
      }
    },
    checkStateToString(items) {
      for (let item of items) {
        switch (item.checkState) {
          case 0:
            item.checkState = "待审核";
            break;
          case 1:
            item.checkState = "待总结";
            break;
          case 2:
            item.checkState = "待修改";
            break;
          case 3:
            item.checkState = "已完成";
            break;
          case 5:
            item.checkState = "已驳回";
            break;
        }
      }
    },
    search() {
      this.checkList=['待审核'];
    },
    reset() {
      this.exportName = '';
      this.hostComp = '';
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.checkType = this.$route.query.value ? this.$route.query.value : "1";
    await this.getdetailList();
    await this.getEasyList();
    if (this.checkType == 1) {
      this.allAdataList = this.detailForm;
      console.log('allAdataList',this.allAdataList);
    } else {
      console.log("this.datalist", this.datalist);
      this.allAdataList = this.easyForm;
    }
    this.datalist = this.allAdataList.filter(v => v.checkState == '待审核');
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.morenzanshi {
  height: 100px;
  width: 200px;
  color: grey;
}
.detailCheckList {
  background-color: #fff;
  padding: 20px;
}
.filter-state {
  display: flex;
  align-items: baseline;
  margin-bottom: 16px;
  .title {
    margin-right: 16px;
  }
}
.search-content {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.search-button {
  margin-bottom: 16px;
}
.check-type {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
</style>