<!--  -->
<template>
  <div class='handin'>
    <!--  0对应省部级展会  -->
    <provin-handin :id="id" v-if="kind==0"></provin-handin>
    <!--  1对应事业单位  -->
    <firm-handin :id="id" v-if="kind == 1"></firm-handin>
    <!--    2对应涉外展会-->
    <foreign-handin :id="id" v-if="kind == 2"></foreign-handin>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import provinHandin from './provinHandin';
import firmHandin from './firmHandin';
import foreignHandin from './foreignHandin';
import ForeignHandin from './foreignHandin.vue';
export default {
//import引入的组件需要注入到对象中才能使用

components: {
  provinHandin,
  firmHandin,
  foreignHandin

},
data() {
//这里存放数据
return {
  // kind : 1
  id: ""
};
},
//监听属性 类似于data概念
computed: {
  kind () {
    return this.$store.getters.userKind
  }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  console.log(this.$route.params.id)
  this.id = this.$route.params.id
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
.handin{
  width: 100%;
}

</style>
