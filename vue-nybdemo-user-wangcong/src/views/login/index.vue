<template>
  <div id="login">
    <div class="loginConbox">
      <div class="header">
        <!--<div class="logo">-->
        <!--<img src="../../assets/logo.png">-->
        <!--</div>-->
      </div>
      <div class="loginBox">
        <div class="loginCon">
          <p class="title">展会申报系统用户端</p>
<!--          <p class="title">vue + springboot</p>-->
          <el-card shadow="always" class="login-module" v-if="smdl">
            <div slot="header" class="clearfix formTitlt">
              <span>密码登录</span>
              <span class="titIconbox"> </span>
            </div>
            <el-form
              :model="loginForm"
              status-icon
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item>
                <el-input
                  type="text"
                  v-model="loginForm.meetAddr"
                  auto-complete="off"
                  placeholder="请输入登录账号"
                  @keyup.enter.native="submitForm"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入登录密码"
                  @keyup.enter.native="submitForm"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" v-on:click="submitForm"
                  >登录</el-button
                >
              </el-form-item>
              <p class="smalltxt"></p>
            </el-form>
          </el-card>

          <el-card shadow="always" class="login-module" v-else>
            <div slot="header" class="clearfix formTitlt">
              <i class="iconfont xu-mimadenglu1 fa-lg iconcolor"></i>
              <i
                class="iconfont xu-imagevector el-icon--right fa-lg pointer"
                @click="smdl = !smdl"
              ></i>
            </div>
            <div class="ewmbox">
              <div class="ewm">
                <img
                  src="https://img.alicdn.com/tfscom/TB1ivYYyHvpK1RjSZFqwu3XUVXa.png"
                />
              </div>
              <p class="smalltxt">
                <router-link class="a" to="#">免费注册</router-link>
              </p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetailExhiState, getEasyExhiState, getAllFirstFontData, getAllNotFirstFontData} from "../../network/exhiState"
export default {
  data() {
    return {
      smdl: true,
      loginForm: {
        meetAddr: "",
        password: "",
      },
    };
  },
  created() {
  },
  methods: {
    submitForm() {
      // let that = this
      // that.$store.dispatch("setToken", that.loginForm.id).then(() => {
      //   that.$router.push({path: "/"})
      // }).catch(res => {
      //   that.$message({
      //     showClose: true,
      //     message: res,
      //     type: "error"
      //   })
      // })
      let that = this;
      if (this.loginForm.meetAddr === "" || this.loginForm.password === "") {
        this.$message({
          showClose: true,
          message: "账号或密码不能为空",
          type: "error",
        });
        return false;
      } else {
        this.$axios
          .post("/login/user", {
            meetAddr: this.loginForm.meetAddr,
            password: this.loginForm.password,
          })
          .then((successResponse) => {
            console.log(successResponse.data.data);
            // getAllNotFirstFontData(successResponse.data.data.meetAddr).then(res=>{
            //   console.log(res);})
            // getAllFirstFontData(successResponse.data.data.meetAddr).then(res => {
            //   console.log(res.data);
            //   if (res.data.length === 0) {
            //     console.log("首次");
            //     that.$store.dispatch("setIsFirstFont", true)
            //     that.$store.dispatch("setHasCurrentFont", false)
            //   } else {
            //     for (let item of res.data) {
            //       if (item.checkState === 3) {
            //         that.$store.dispatch("setIsFirstFont", false)
            //         getAllNotFirstFontData(successResponse.data.data.meetAddr).then(res => {
            //           console.log(res.data);
            //           if (res.data.length === 0) {
            //             that.$store.dispatch("setHasCurrentFont", false)
            //           } else {
            //             for (let item of res.data) {
            //               if (item.checkState === 0 || item.checkState === 1 || item.checkState === 2 || item.checkState === 9){
            //                 that.$store.dispatch("setHasCurrentFont", true)
            //                 that.$store.dispatch("setCurrentFont", item)
            //               }
            //             }
            //           }
            //         })
            //         break
            //       } else {
            //         that.$store.dispatch("setIsFirstFont", true)
            //         if (item.checkState === 0 || item.checkState === 1 || item.checkState === 2 || item.checkState === 9){
            //           that.$store.dispatch("setHasCurrentFont", true)
            //           that.$store.dispatch("setCurrentFont", item)
            //         }
            //       }
            //     }
            //   }
            // })
            if (successResponse.data.code === 0) {
              if (successResponse.data.data.isFreeze) {
                this.$message.error("该账号已被冻结，请联系管理人员进行处理");
              } else {
                that.$store.dispatch(
                  "setUserKind",
                  successResponse.data.data.kind
                );
                that.$store.dispatch("setFlash", false);
                that.$store.dispatch("setUserId", successResponse.data.data.id)
                that.$store.dispatch("setMeetName", successResponse.data.data.name)
                // 将 id 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
                that.$store
                  .dispatch("setToken", that.loginForm.meetAddr)
                  .then(() => {
                    that.$router.push({ path: "/" });
                  })
                  .catch((res) => {
                    that.$message({
                      showClose: true,
                      message: res,
                      type: "error",
                    });
                  });
              }
            } else {
              this.$message({
                showClose: true,
                message: "账号或密码错误！",
                type: "error",
              });
            }
          })
          .catch((failResponse) => {});
      }
    },
  },
  mounted() {
    // this.message()
  },
};
</script>
<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  .loginConbox {
    background: #2d3a4b;
  }
  .header {
    height: 60px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
    .logo {
      margin-left: 30px;
      width: 500px;
      float: left;
      height: 40px;
      padding-top: 10px;
      img {
        height: 100%;
      }
    }
  }
  .loginBox {
    .iconcolor {
      color: #409eff;
    }
    padding: 74px 0 118px;
    .loginCon {
      width: 990px;
      margin: auto;
      position: relative;
      height: 388px;
      .el-card__header {
        border-bottom: 0px;
      }
      .title {
        font-size: 48px;
        font-weight: 600;
        color: #ffffff;
        width: 500px;
        float: left;
        margin-top: 50px;
        &:first-child {
          font-size: 48px;
          margin-top: 50px;
          margin-bottom: 30px;
          line-height: 300px;
        }
      }
      .login-module {
        width: 380px;
        height: 325px;
        margin-top: 60px;
        border: none;
        position: absolute;
        right: 0;
        .formTitlt {
          font-size: 18px;
          font-weight: 400;
          .titIconbox {
            float: right;
            .pointer {
              cursor: pointer;
            }
          }
        }
        .smalltxt {
          text-align: right;
          .a {
            text-decoration: none;
            color: #999999;
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }
      .el-form-item__content {
        margin-left: 0px !important;
        .subBtn {
          width: 100%;
        }
      }
    }
    .el-input__inner,
    .el-button,
    .el-card,
    .el-message {
      border-radius: 0px !important;
    }
    .el-form-item__content .ico {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 999;
      width: 40px;
      height: 39px;
      text-align: center;
      border-right: 1px solid #ccc;
    }
    .ewmbox {
      width: 100%;
      height: 240px;
      margin-top: -25px;
      .ewm {
        width: 140px;
        height: 140px;
        margin: 20px auto;
        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }
      .ewmicon {
        width: 140px;
        margin: 20px auto 0;
        .iconfont {
          float: left;
        }
        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }
    }
  }
}
</style>
