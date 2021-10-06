<template>
  <div>
    <Table
      :columns="columns1"
      :data="data"
      :context="self"
      :nextPath="nextPath"
      size="large"
    ></Table>
    <!-- <Modal
      v-model="showHandleHistory"
      title="审核历史记录查看"
      cancel-text="返回"
      ok-text=''

    >
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal> -->
    <el-dialog
      title="审核历史记录查看"
      :visible.sync="showHandleHistory"
      width="30%"
    >
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in handleRecords"
          :key="index"
          placement="top"
          :color = "color"
          :timestamp="activity.createTime"
        >
          <el-card>
            <h4>{{ activity.adminId }}: 干了什么操作</h4>
            <p>{{ activity.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showHandleHistory = false">返 回</el-button>
      </span>
    </el-dialog>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page :total="100" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { historyHandles } from "../network/detailCheck";
export default {
  name: "beaTable",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    nextPath: {
      type: String,
      default() {
        return "/";
      },
    },
    checkType: {
      type: String,
      default() {
        return "1";
      },
    },
  },
  data() {
    return {
      color:'#0bbd87',
      self: this,
      showHandleHistory: false,
      handleRecords: [],
      state: 1,
      columns1: [
        {
          title: "展会ID",
          key: "id",
        },
        {
          title: "申报日期",
          key: "createTime",
        },
        {
          title: "展会名称",
          key: "name",
        },
        {
          title: "举办地",
          key: "chooseCity",
        },
        {
          title: "主办方",
          key: "hostComp",
        },
        {
          title: "审核状态",
          key: "checkState",
          //   className: "demo-table-info-column",
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 280,
          align: "center",
          render: (h, params) => {
            return h("div", [
              this.state == 1
                ? h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small",
                      },
                      style: {
                        marginRight: "5px",
                      },
                      on: {
                        click: () => {
                          this.check(params.row);
                        },
                      },
                    },
                    "审批"
                  )
                : h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small",
                      },
                      style: {
                        marginRight: "5px",
                      },
                      on: {
                        click: () => {
                          this.check(params.row);
                          // this.editorButton(params.row)
                          console.log(params);
                        },
                      },
                    },
                    "查看"
                  ),
              this.state == 3
                ? h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small",
                      },
                      style: {
                        marginRight: "5px",
                      },
                      on: {
                        click: () => {
                          // this.editorButton(params.row)
                          console.log(params);
                        },
                      },
                    },
                    "驳回"
                  )
                : null,
              this.state == 4
                ? h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small",
                      },
                      style: {
                        marginRight: "5px",
                      },
                      on: {
                        click: () => {
                          // this.editorButton(params.row)
                          console.log(params);
                        },
                      },
                    },
                    "查看总结"
                  )
                : null,
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.removeButton(params.row);
                    },
                  },
                },
                "导出表单"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.getHandleRecords(params.row.id);
                    },
                  },
                },
                "处理历史"
              ),
            ]);
          },
        },
      ],
      data1: [{ id: "1111", name: "weqe", checkState: "审核中" }],
      //   @on-row-click="check"
    };
  },
  methods: {
    check(data) {
      console.log("data", data);
      this.$router.push({
        path: this.nextPath,
        query: {
          item: data,
          checkType: this.checkType,
        },
      });
    },
    getHandleRecords(id) {
      this.showHandleHistory = true;
      historyHandles(id).then((res) => {
        // console.log("res", res.data);
        this.handleRecords = res.data;
      });
    },
    changePage() {
      console.log("新的数据");
    },
  },
};
</script>

<style>
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
</style>