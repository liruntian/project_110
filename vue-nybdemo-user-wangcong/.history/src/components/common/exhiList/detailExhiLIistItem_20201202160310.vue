<template>
<div class="exhi_list_item">
    <div class="item">
        <!--<div class="iid">{{exhiListItem.iid}}</div>-->
        <div class="iid">{{exhiListItem.id}}</div>
        <div class="name">{{exhiListItem.name}}</div>
        <div class="state">{{getCheckState}}</div>
    </div>

</div>
</template>

<script>
export default {
    name: "exhiListItem",
    props: {
        exhiListItem: {
            type: Object,
            default () {
                return {
                    id: "12312312",
                    name: "全国农业大会",
                    state: "审核中"
                };
            },
        }
    },
    data() {
        return {}
    },
    created() {
        console.log(this.itemInfo)
    },
    computed:{
        getCheckState(){
            if(this.exhiListItem.checkState == 0){return '审核中' }
            if(this.exhiListItem.checkState == 1){return '展会计划待过会' }
            if(this.exhiListItem.checkState == 2){return '展会计划已印发' }
            if(this.exhiListItem.checkState == 3){return '未通过，重新提交' }
        }
    },
    method: {

    }

}
</script>

<style scoped>
.exhi_list_item {
    width: 320px;
    display: flex;
    border-bottom: 1px solid #666;
    text-align:center;
    align-items: center;
    margin-left: 8px;
    font-size: 8px;
    

}

.item {
    width: 340px;
    white-space: nowrap;
    text-overflow: ellipsis;
    

}

.item .iid {
    display: inline-block;
    width: 90px;
    padding: 10px;
    text-align: center;
    

}

.item .name {
    display: inline-block;
    width: 100px;
    padding: 1px;
    overflow:unset;

    text-align: center;

}

.item .state {
    display: inline-block;
    width: 90px;
    padding: 1px;
    /* margin-left: 5px; */

    text-align: center;
}
</style>
