<template>
<div class="notRead">
  asdaosidasijoi
  <p>{{this.msgList}}</p>
  <!-- <beaTable></beaTable> -->
</div>


</template>

<script>
import beaTable from "../../components/table"
import { getNotLook } from 'network/message.js';
export default {
  name: "notread",
  components:{
    beaTable
  },
  data() {
  //这里存放数据
  return {
      // isshow: true,
      msgList: [],

  };
  },
  created(){
    console.log(this.msgList)
    getNotLook(this.$store.getters.token).then(res => {
      this.msgList = res.data
      console.log(this.msgList)
    })
    console.log(this.msgList)
  }
}
</script>

<style scoped>
  .notRead{
    background-color: red;
  }
</style>
