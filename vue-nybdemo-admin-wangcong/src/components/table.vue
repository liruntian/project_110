<template>
  <div>
    <Table
      :columns="columns1"
      :data="data"
      :context="self"
      :nextPath="nextPath"
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page :total="100" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
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
  },
  data() {
    return {
      self: this,
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
                      this.removeButton(params.row);
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
      // console.log(this.nextPath)
      this.$router.push({
        path: this.nextPath,
        query: {
          item: data,
        },
      });
    },
    changePage() {
      // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
    //   this.tableData1 = this.mockTableData1();
    console.log('新的数据');
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