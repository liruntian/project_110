<template>
<div class="notRead">
  <my-table :data1='this.msgList'></my-table>
</div>


</template>

<script>
import myTable from "../../components/table/myTable"
import { getNotLook } from 'network/message.js';
export default {
  name: "notread",
  components:{
    myTable
  },
  data() {
  //这里存放数据
  return {
      // isshow: true,
      msgList: [],

  };
  },
  created(){
    console.log(this.$store.getters.token);
    getNotLook(this.$store.getters.token).then(res => {
      console.log(res);
      if(res.data == null){
        this.msgList = [];
      }else {
        this.msgList = res.data;
      };
      console.log(this.msgList)

    })

  }
}
</script>

<style lang='scss' scoped>

</style>
