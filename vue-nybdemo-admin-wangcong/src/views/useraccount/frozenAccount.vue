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
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns7: [
        {
          title: "展会名称",
          key: "exhiName",
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
                      this.frozen(params.index);
                    },
                  },
                },
                "冻结"
              ),
            ]);
          },
        },
      ],
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
    this.data6 = res.data;
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`,
      });
    },
    frozen(index) {
      // this.data6.splice(index, 1);
      alert(this.data6[index].exhiName);
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
