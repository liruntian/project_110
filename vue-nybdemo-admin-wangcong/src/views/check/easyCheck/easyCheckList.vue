<!--  -->
<template>
<div class='easyCheckList'>
    <bea-table :data="easyForm" :nextPath="nextPath"></bea-table>
    <!-- <easy-check-item v-for="(item,index) in easyForm" :key="index" :item="item"/> -->
     <!-- <easy-check-item />
     <easy-check-item />
     <easy-check-item /> -->


</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import easyCheckItem from "./easyCheckItem"
import { getEasyFormdata } from "../../../network/easyCheck"
import beaTable from "../../../components/table"
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    easyCheckItem,
    beaTable
},
data() {
//这里存放数据
return {
    // isshow: true,
    easyForm: [],
    nextPath: "/easyCheck/",

};
},
//监听属性 类似于data概念
computed: {
    isshow(){
        return !this.easyForm.length
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    getEasyFormdata().then(res => {
      this.easyForm = res.data
    // this.easyForm['hostComp'] = this.easyForm[]
    for(let item of this.easyForm){
        item.checkState = item.checkState == 0 ? '待审核': '已通过'
      }
    })

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.morenzanshi{
    height: 100px;
    width: 200px;
    color: grey;


}
</style>