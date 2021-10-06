<template>
  <div>
    <div class="search-content">
      <h3 style="margin-right: 16px">展会名称</h3>
      <el-input
        v-model="exportName"
        placeholder="请输入展会名称"
        style="width: 200px; margin-right: 48px"
      ></el-input>
      <h3 style="margin-right: 16px">展会简称</h3>
      <el-input
        v-model="hostComp"
        placeholder="请输入展会简称"
        style="width: 200px"
      ></el-input>
      <div class="search-button">
        <el-button type="primary" icon="el-icon-search" size="small"
          >查询</el-button
        >
        <el-button size="small">重置</el-button>
      </div>
    </div>

    <Table border :columns="columns7" :data="data6"></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="data.length"
          :current="1"
          show-total
          show-sizer
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsers, freeze } from "../../network/freeze";

export default {
  data() {
    return {
      exportName: "",
      hostComp: "",
      pageSize: 10,
      columns7: [
        {
          title: "展会名称",
          key: "name",
        },
        {
          title: "处室负责人",
          key: "charger",
        },
        {
          title: "联系人手机",
          key: "teleNum",
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.frozen(params.row.meetAddr);
                    },
                  },
                },
                "冻结"
              ),
            ]);
          },
        },
      ],
      data: [],
      data6: [
        {
          exhiName: "John Brown",
          charger: "汪聪",
          teleNum: "13051578190",
        },
      ],
    };
  },
  created() {
    getAllUsers().then((res) => {
      console.log("allusers", res.data);
      this.data = res.data;
      this.changePage(1);
    });
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`,
      });
    },
    frozen(meetAddr) {
      console.log(meetAddr);
      freeze(meetAddr).then(res => {
        console.log('res',res);
      })
    },
    changePageSize(size) {
      this.pageSize = size;
      this.changePage(1);

    },
    changePage(res) {
      // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
      //   this.tableData1 = this.mockTableData1();
      this.data6 = this.data.slice((res - 1) * this.pageSize, res * this.pageSize);
      console.log("新的数据", res);
    },
  },
};
</script>

<style  lang='scss' scoped>
.search-content {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.search-button {
  margin-left: 16px;
}
</style>
