<template>
  <div class="detailCheckList">
    <el-card >
      <div class="search-area">
        <div class="search-content">
          <h3 style="margin-right: 16px">展会名称</h3>
          <el-input
            v-model="exportName"
            placeholder="请输入展会名称"
            @keyup.enter.native="search"
            style="width: 200px; margin-right: 48px"
          ></el-input>
          <h3 style="margin-right: 16px">展会简称</h3>
          <el-input
            v-model="exportAddr"
            placeholder="请输入展会简称"
            @keyup.enter.native="search"
            style="width: 200px; margin-right: 48px"
          ></el-input>
        </div>
        <div class="search-button">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
            >查询</el-button
          >
          <el-button @click="reset">重置</el-button>
          </div>
      </div>
      <div class="filter-state">
        <h3 class="title">申报状态</h3>
        <div>
          <el-checkbox-group
            v-model="checkList"
            @change="checkListChange"
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
        <el-checkbox-group
          v-model="checkTypeList"
          size="small"
          @change="checkTypeChange">
          <el-checkbox :label="true">首次申报</el-checkbox>
          <el-checkbox :label="false">再次申报</el-checkbox>
        </el-checkbox-group>
        <div class="export">
          <el-button type="primary" v-show="selectionLength === 0" disabled  @click="exportCsv">
            导出选中的
            <span>{{ selectionLength }}</span>
            条记录
          </el-button>
          <el-button type="primary" v-show="selectionLength > 0"  @click="exportCsv">
            导出选中的
            <span>{{ selectionLength }}</span>
            条记录
          </el-button>
          <el-button type="success" v-show="showDataList.length === 0" disabled @click="exportAllRecord">
            导出所有
            <span>{{ showDataList.length }}</span>
            条记录
          </el-button>
          <el-button type="success" v-show="showDataList.length > 0" @click="exportAllRecord">
            导出所有
            <span>{{ showDataList.length }}</span>
            条记录
          </el-button>
        </div>
      </div>
    </el-card>
<!-- 展示在页面上的表格子组件-->
    <bea-table
      :data="showDataList"
      :nextPath="nextPath"
      :checkType="checkType"
      @selectionChange="getselectionLength"
      ref = "bee_table"
    ></bea-table>
<!--创建的一个虚拟的表格，不在页面上展示，用来导出符合条件的申报信息-->
    <el-table
      id="allTableData"
      :data="showDataList"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="80">
        <template slot-scope="scope">
          {{ scope.$index+ 1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="isFirstFont"
        label="首次申报"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.isFirstFont">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="展会名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="申报日期">
      </el-table-column>
      <el-table-column
        prop="chooseCity"
        label="举办地">
      </el-table-column>
      <el-table-column
        prop="hostComp"
        label="主办方">
      </el-table-column>
      <el-table-column
        prop="checkState"
        label="申报状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
  import XLSX from "xlsx";
  import FileSaver from 'file-saver'
import {
  getdetailFormdata,
  getDeatilByMeetName,
  getDeatilByMeetAddr,
  getDeatilById
} from "../../../network/detailCheck"
import {
  getEasyFormdata,
  getEasyByMeetName,
  getEasyByMeetAddr,
  getEasyById
} from "../../../network/easyCheck"
import beaTable from "../../../components/table"

const statesOptions = ["待审核", "待修改", "待总结", "已完成"]
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    beaTable
  },
  data () {
    // 这里存放数据
    return {
      // selection: false,
      detailForm: [],
      easyForm: [],
      datalist: [],
      hostComp: "",
      exportName: "",
      exportAddr: "",
      checkList: ["待审核"],
      checkTypeList: [true, false],
      checkType: ["首次申报"],
      isIndeterminate: true,
      nextPath: "/detailCheck/",

      allDataList: [],
      allSearchResultData: [],
      showDataList: [],
      selectionLength: 0,
    }
  },
  // 监听属性 类似于data概念
  computed: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created () {
    console.log(this.$route.query.value)
    if (this.$route.query.value === "1") {
      this.checkTypeList = [true]
    }else if (this.$route.query.value === "2"){
      this.checkTypeList = [false]
    }
    console.log(this.checkTypeList)
    await this.getdetailList()
    await this.getEasyList()
    this.showDataList = this.allDataList.filter((item) => {
      return this.checkList.indexOf(item.checkState) > -1
    })
    this.showDataList = this.showDataList.filter((item) => {
      return this.checkTypeList.indexOf(item.isFirstFont) > -1
    })
  },
  // 监控data中的数据变化
  watch: {},

  // 方法集合
  methods: {
    // 获取子组件table传出来的选中的申报记录的数量
    getselectionLength (length){
      this.selectionLength = length
    },
    // 获取子组件table的导出申报记录的函数
    exportCsv () {
      this.$refs.bee_table.downCSV()
    },
    // 导出所有符合条件的申报记录
    exportAllRecord () {
      let xlsxData = XLSX.utils.table_to_book(document.querySelector("#allTableData"))
      let downloadData = XLSX.write(xlsxData,{ bookType: 'xlsx', bookSST: true, type: 'array' })
      FileSaver.saveAs(new Blob([downloadData], {type: "application/octet-stream"}), "汇总表格.xlsx")
      return downloadData
    },
    // 获取所有首次申报记录
    async getdetailList () {
      await getdetailFormdata().then((res) => {
        // 给每一个记录加一个是否首次申报的字段
        res.data.forEach((item) => {
          Vue.set(item,"isFirstFont", true)
        })
        this.allDataList.push(...res.data)
        this.checkStateToString(this.allDataList)
      })
    },
    // 获取所有再次申报记录
    async getEasyList () {
      await getEasyFormdata().then((res) => {
        // 给每一个记录加一个是否首次申报的字段
        res.data.forEach((item) => {
          Vue.set(item,"isFirstFont", false)
        })
        this.allDataList.push(...res.data)
        this.checkStateToString(this.allDataList)
      })
    },
    //
    checkTypeChange (value) {
      console.log(value)
      this.checkTypeList = value
      if ((this.exportName || this.exportAddr) && this.allSearchResultData.length>0){
        this.showDataList = this.allSearchResultData.filter((item) => {
          return this.checkTypeList.indexOf(item.isFirstFont) > -1
        })
        this.showDataList = this.showDataList.filter((item) => {
          return this.checkList.indexOf(item.checkState) > -1
        })
      }else {
        this.showDataList = this.allDataList.filter((item) => {
          return this.checkTypeList.indexOf(item.isFirstFont) > -1
        })
        this.showDataList = this.showDataList.filter((item) => {
          return this.checkList.indexOf(item.checkState) > -1
        })
      }
    },
    checkListChange (value) {
      if ((this.exportName || this.exportAddr) && this.allSearchResultData.length>0){
        this.showDataList = this.allSearchResultData.filter((item) => {
          return this.checkTypeList.indexOf(item.isFirstFont) > -1
        })
        this.showDataList = this.showDataList.filter((item) => {
          return this.checkList.indexOf(item.checkState) > -1
        })
      }else {
        this.showDataList = this.allDataList.filter((item) => {
          return this.checkTypeList.indexOf(item.isFirstFont) > -1
        })
        this.showDataList = this.showDataList.filter((item) => {
          return this.checkList.indexOf(item.checkState) > -1
        })
      }
    },
    checkStateToString (items) {
      for (let item of items) {
        item.createTime = item.createTime.slice(0, 10)
        switch (item.checkState) {
        case 0:
          item.checkState = "待审核"
          break
        case 1:
          item.checkState = "待总结"
          break
        case 2:
          item.checkState = "待修改"
          break
        case 3:
          item.checkState = "已完成"
          break
        case 5:
          item.checkState = "已驳回"
          break
        }
      }
    },
    async search () {
      if (!(this.exportName || this.exportAddr || this.hostComp)) {
        this.$message({
          message: "请至少输入一个查询条件",
          type: "warning"
        })
        return
      }
      // this.checkList = ["待审核"]
      this.checkList = statesOptions
      this.checkTypeList = [true, false]
      if (this.exportName && this.exportAddr) {
        this.allSearchResultData = this.allDataList.filter((item) => {
          return item.name.match(this.exportName)
        })
        this.allSearchResultData = this.allSearchResultData.filter((item) => {
          return item.meetAddr.match(this.exportAddr)
        })
        this.showDataList = this.allSearchResultData.filter((item) => {
          return this.checkList.indexOf(item.checkState) > -1
        })
        this.showDataList = this.showDataList.filter((item) => {
          return this.checkTypeList.indexOf(item.isFirstFont) > -1
        })
      } else if (this.exportName && !this.exportAddr){
        this.allSearchResultData = this.allDataList.filter((item) => {
          return item.name.match(this.exportName)
        })
        this.showDataList = this.allSearchResultData.filter((item) => {
          return this.checkList.indexOf(item.checkState) > -1
        })
        this.showDataList = this.showDataList.filter((item) => {
          return this.checkTypeList.indexOf(item.isFirstFont) > -1
        })
      }else if (!this.exportName && this.exportAddr){
        console.log(this.allDataList)
        this.allSearchResultData = this.allDataList.filter((item) => {
          return item.meetAddr.match(this.exportAddr)
        })
        console.log(this.allSearchResultData)
        this.showDataList = this.allSearchResultData.filter((item) => {
          return this.checkList.indexOf(item.checkState) > -1
        })
        this.showDataList = this.showDataList.filter((item) => {
          return this.checkTypeList.indexOf(item.isFirstFont) > -1
        })
      }
    },
    async reset () {
      this.exportName = ""
      this.exportAddr = ""
      this.hostComp = ""
      this.checkList = ["待审核"]
      this.checkTypeList = [true, false]
      this.allSearchResultData = []
      this.allDataList = []
      await this.getdetailList()
      await this.getEasyList()
      this.showDataList = this.allDataList.filter((item) => {
        return this.checkList.indexOf(item.checkState) > -1
      })
      this.showDataList = this.showDataList.filter((item) => {
        return this.checkTypeList.indexOf(item.isFirstFont) > -1
      })
    }
  },

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },

  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#allTableData{
  display: none;
}
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
.search-area {
  display: flex;
}
.search-content {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
.search-button {
  margin-left: 16px;
  line-height: 42px;
}
.check-type {
  display: flex;
  align-items: center;
  position: relative;
  // margin-bottom: 16px;
}

.el-card{
  margin-bottom: 16px;
  .el-card__body {
  padding: 6px 10px !important;
}
}
.export {
  position: absolute;
  right: 10px;
}
</style>
