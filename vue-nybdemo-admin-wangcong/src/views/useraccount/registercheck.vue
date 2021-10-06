<template>
  <div class="register">
    <el-form :model="formInline" class="demo-ruleForm">
      <el-form-item label="展会名称:">
        <el-input v-model="formInline.name" placeholder="展会名称"></el-input>
      </el-form-item>
      <el-form-item label="展会简称:">
        <el-input
          v-model="formInline.meetAddr"
          placeholder="展会首字母小写"
        ></el-input>
      </el-form-item>
      <el-form-item label="展会类型:">
        <el-radio-group v-model="formInline.kindInput">
          <el-radio-button label="事业单位"></el-radio-button>
          <el-radio-button label="省部级"></el-radio-button>
          <el-radio-button label="海外机构"></el-radio-button>
        </el-radio-group>
        <!-- <el-input v-model="formInline.kindInput" placeholder="事业单位 或 省部级 或 海外机构" ></el-input> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser } from "../../network/addUser";
export default {
  inject: ["reload"],
  data() {
    return {
      formInline: {
        name: "",
        meetAddr: "",
        kind: 0,
        kindInput: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (!this.formInline.kindInput) {
        this.$message({
          showClose: true,
          message: "请填写展会类型！",
          type: "error",
        });
        return false;
      }

      if (!this.formInline.name) {
        this.$message({
          showClose: true,
          message: "请填写展会名称！",
          type: "error",
        });
        return false;
      }

      if (!this.formInline.meetAddr) {
        this.$message({
          showClose: true,
          message: "请填写展会简称！",
          type: "error",
        });
        return false;
      }

      if (this.formInline.kindInput === "事业单位") {
        this.formInline.kind = 0;
      } else if (this.formInline.kindInput === "省部级") {
        this.formInline.kind = 1;
      } else if (this.formInline.kindInput === "海外机构") {
        this.formInline.kind = 2;
      } else {
        this.$message({
          showClose: true,
          message: "请填写正确的类型！",
          type: "error",
        });
        return false;
      }

      addUser(
        this.formInline.name,
        this.formInline.meetAddr,
        this.formInline.kind
      ).then((successResponse) => {
        console.log(successResponse);
        if (successResponse.code === 0) {
          this.$Notice.success({
            title: "添加成功",
          });
          this.reload();
        } else {
          this.$Notice.error({
            title: "添加失败",
            desc: successResponse.msg ? successResponse.msg : "添加失败",
          });
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.register {
  background-color: #ffffff;
  height: 100%;
  padding: 25px;
}
</style>
