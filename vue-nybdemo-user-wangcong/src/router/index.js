import en from "../i18n/lang/en"
import Vue from "vue"
import store from "../vuex"
import Router from "vue-router"
import Login from "@/views/login/index"
import Layout from "@/views/layout/layout"
import userfontview from "@/views/foundchart/userfontview"
import easyfontview from "@/views/foundchart/easyfontview"
import HomeMain from "@/views/index/mainIndex"
// import HaveRead from "@/views/message/haveread"
// 不是必须加载的组件使用懒加载
import {getDetail} from '../network/getForm';
import easyfont from "../views/foundchart/easyfont"
import userfont from "@/views/foundchart/userfont"
import modifyfont from "../views/foundchart/modifyfont";
import seefont from "../views/foundchart/seefont";
const NotFound = () => import("@/views/page404")

// const UserFond = () => import("@/views/foundchart/userfont")
// const EasyFond = () => import("@/views/foundchart/easyfont")

const Handin = () => import("@/views/summary/handin")

// const msgRead = () => import("@/views/message/msgRead")
// const HaveRead = () => import("@/views/message/haveread")
// const NotRead = () => import("@/views/message/notread")
// const Update = () => import("@/views/useraccount/update")
const setPassword = () => import("@/views/setPassword")



/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)
let routeName = en.routeName
let defaultRouter = [
  { path: "/",
    redirect: "/index",
    hidden: true,
    children: []
  },
  {
    path: "/login",
    component: Login,
    name: "",
    hidden: true,
    children: []
  },
  {
    path: "/index",
    iconCls: "fa fa-dashboard", // 图标样式class
    name: routeName.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/index",
        iconCls: "fa fa-dashboard", // 图标样式class
        name: "申报中心",
        component: HomeMain,
        children: []
      }
    ]
  },
  // {
  //   path: "/detafond",
  //   iconCls: "fa fa-wpforms", // 图标样式class
  //   name: routeName.detafond,
  //   component: Layout,
  //   hidden: store.getters.checkState == 2,
  //   alone: true,
  //   children: [
  //     {
  //       path: "/detafond",
  //       name: routeName.detafond,
  //       component: UserFond,
  //       hidden: true,
  //       children: [],
  //     }
  //   ]
  //
  // },
  // {
  //   path: "/easyfond",
  //   iconCls: "fa fa-leanpub", // 图标样式class
  //   name:  routeName.easyfond,
  //   component: Layout,
  //   hidden: store.getters.checkState != 2,
  //   alone: true,
  //   children: [
  //     {
  //       path: "/easyfond",
  //       name:  routeName.easyfond,
  //       component: EasyFond,
  //       hidden: true,
  //       children: [],
  //     }
  //   ]
  //
  // },
  //
  // {
  //   path: "/handin",
  //   iconCls: "fa fa-file-word-o", // 图标样式class
  //   name: routeName.summary,
  //   component: Layout,
  //   alone: true,
  //   children: [
  //     {
  //       path: "/handin",
  //       name: routeName.summary,
  //       component: Handin,
  //       hidden: true,
  //       children: [],
  //     }
  //
  //   ]
  // },
  {
    path: "/setPassword",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.setPassword,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/setPassword",
        name: routeName.setPassword,
        component: setPassword,
        hidden: true,
        children: [],
      }

    ]
  },
  {
    path: "/easyfont",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.easyfond,
    component: Layout,
    alone: true,
    hidden: true,
    children: [
      {
        path: "/easyfont",
        name: routeName.easyfond,
        component: easyfont,
        hidden: false,
        children: [],
      }

    ]
  },
  {
    path: "/userfont",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.userfond,
    component: Layout,
    alone: true,
    hidden: true,
    children: [
      {
        path: "/userfont",
        name: routeName.userfond,
        component: userfont,
        hidden: false,
        children: [],
      }

    ]
  },
  {
    path: "/modifyfont",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.modifyfont,
    component: Layout,
    alone: true,
    hidden: true,
    children: [
      {
        path: "/modifyfont/:id",
        name: routeName.modifyfont,
        component: modifyfont,
        hidden: false,
        children: [],
      }

    ]
  },
  {
    path: "/seefont",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.seefont,
    component: Layout,
    alone: true,
    hidden: true,
    children: [
      {
        path: "/seefont",
        name: routeName.seefont,
        component: seefont,
        hidden: false,
        children: [],
      }

    ]
  },
  {
    path: "/easyfontview",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.easyfontview,
    component: Layout,
    alone: true,
    hidden: true,
    children: [
      {
        path: "/easyfontview",
        name: routeName.easyfontview,
        component: easyfontview,
        hidden: false,
        children: [],
      }

    ]
  },
  {
    path: "/userfontview",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.userfontview,
    component: Layout,
    alone: true,
    hidden: true,
    children: [
      {
        path: "/userfontview",
        name: routeName.userfontview,
        component: userfontview,
        hidden: false,
        children: [],
      }

    ]
  },
  {
    path: "/handin",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.handIn,
    component: Layout,
    alone: true,
    hidden: true,
    children: [
      {
        path: "/handin/:id",
        name: routeName.userfond,
        component: Handin,
        hidden: false,
        children: [],
      }

    ]
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  }
]

let addRouter = [

  // {
  //   path: "/",
  //   iconCls: "fa fa-check-square-o", // 图标样式class
  //   name: routeName.userfond,
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/detafond",
  //       iconCls: "fa fa-wpforms", // 图标样式class
  //       name: routeName.detafond,
  //       component: UserFond,
  //       children: [],
  //     },
  //     {
  //       path: "/easyfond",
  //       iconCls: "fa fa-leanpub", // 图标样式class
  //       name: routeName.easyfond,
  //       component: EasyFond,
  //       children: []
  //     },
  //   ]
  // },

  // {
  //   path: "/",
  //   iconCls: "fa fa-file-word-o", // 图标样式class
  //   name: routeName.summary,
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/handin",
  //       iconCls: "fa fa-caret-square-o-up", // 图标样式class
  //       name: routeName.handIn,
  //       component: Handin,
  //       children: [],
  //     },

  //   ]
  // },

  // {
  //   path: "/",
  //   iconCls: "fa fa-file-text", // 图标样式class
  //   name: routeName.message,
  //   component: Layout,
  //   children: [
  //     {
  //       path: "/haveread",
  //       iconCls: "fa fa-envelope-open", // 图标样式class
  //       name: routeName.haveRead,
  //       component: HaveRead,
  //       children: [],
  //     },
  //     {
  //       path: "/notread",
  //       iconCls: "fa fa-envelope-o", // 图标样式class
  //       name: routeName.notRead,
  //       component: NotRead,
  //       children: []
  //     },
      // {
      //   path: "/msgRead",
      //   iconCls: "fa fa-envelope-open", // 图标样式class
      //   name: routeName.haveRead,
      //   component: msgRead,
      //   hidden: true,
      //   children: [],
      // },
    // ]
  // },





  { path: "*",
    redirect: "/404",
    hidden: true,
    component: NotFound
  }

]




export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
