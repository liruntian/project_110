import en from "../i18n/lang/en"
import Vue from "vue"
import Router from "vue-router"
import CommerViews from "@/views/commerViews"
import Login from "@/views/login/index"
import Layout from "@/views/layout/layout"
import HomeMain from "@/views/index/mainIndex"

// 不是必须加载的组件使用懒加载

const NotFound = () => import("@/views/page404")

const Detail = () => import("@/views/check/detailCheck/detailCheckList")
const DetailCheck = () => import("@/views/check/detailCheck/detail")
const Easy = () => import("@/views/check/easyCheck/easyCheckList")
const EasyCheck = () => import("@/views/check/easyCheck/easy")
const Send = () => import("@/views/message/send")
const register = () => import("@/views/useraccount/register")
const accountManagement = () => import("@/views/useraccount/accountManagement")

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
        name: "主页",
        component: HomeMain,
        children: []
      },

    ]
  },
  {
    path: "/detail",
    iconCls: "fa fa-check-square-o", // 图标样式class
    name: routeName.check,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/detail",
        iconCls: "fa fa-wpforms", // 图标样式class
        name: routeName.detail,
        component: Detail,
        children: []
      },
      {
        path: "/detailCheck",
        component: DetailCheck,
        name: "DetailCheck",
        hidden: true,
        children: []
      },
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
  {
    path: "/accountManagement",
    iconCls: "fa fa-user-circle", // 图标样式class
    name: routeName.accountManagement,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/accountManagement",
        iconCls: "fa fa-address-card-o", // 图标样式class
        name: routeName.accountManagement,
        component: accountManagement,
        children: []
      }
    ]
  },






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
