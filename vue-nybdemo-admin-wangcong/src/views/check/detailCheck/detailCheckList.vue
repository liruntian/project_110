<!--  -->
<template>
  <div class="easyCheckList">
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
      <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
      <el-button size="small">重置</el-button>
    </div>
        <div class="filter-state">
      <h3 class="title">状态</h3>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="首次申报待审批"></el-checkbox>
        <el-checkbox label="再次申报待审批"></el-checkbox>
        <el-checkbox label="待修改"></el-checkbox>
        <el-checkbox label="待总结"></el-checkbox>
        <el-checkbox label="已完成"></el-checkbox>
      </el-checkbox-group>
    </div>

    <bea-table :data="detailForm" :nextPath="nextPath"></bea-table>
    <!-- <easy-check-item v-for="(item,index) in easyForm" :key="index" :item="item"/> -->
    <!-- <easy-check-item />
     <easy-check-item />
     <easy-check-item /> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getdetailFormdata } from "../../../network/detailCheck";
import beaTable from "../../../components/table";
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
      hostComp: "",
      exportName: "",
      checkList: ["复选框 A"],
      nextPath: "/detailCheck/",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    getdetailFormdata().then((res) => {
      console.log(res);
      this.detailForm = res.data;

      for (let item of this.detailForm) {
        item.checkState =
          item.checkState == 0 ? "待审核" : "已通过，展会计划待过会";
      }
    });
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
.filter-state {
  display: flex;
  align-items: center;
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
</style>