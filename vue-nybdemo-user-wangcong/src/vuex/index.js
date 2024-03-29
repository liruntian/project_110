import Vue from "vue"
import Vuex from "vuex"
import Cookies from "js-cookie"
import routerData from "./modules/routerData"
import role from "./modules/role"
import layout from "./modules/layout/index"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: Cookies.get("token"),
    flash: Cookies.get("flash"),
    userId: Cookies.get("userId"),
    userKind: Cookies.get("userKind"),
    meetName: Cookies.get("meetName"),
    // checkState:null
    checkState: Cookies.get("checkState"),
    isFirstFont: Cookies.get("isFirstFont"),
    hasCurrentFont: Cookies.get("hasCurrentFont"),
    currentFont: Cookies.get("currentFont"),
    prefillFont: Cookies.get("prefillFont")
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      Cookies.set("token", token, { expires: 1 / 24 })
    },
    setUserKind (state, userKind) {
      state.userKind = userKind
      Cookies.set("userKind", userKind, { expires: 1 / 24 })
    },
    setFlash (state, flash) {
      state.flash = flash
      Cookies.set("flash", flash, { expires: 1 / 24 })
    },
    setState (state, checkState) {
      state.checkState = checkState
      Cookies.set("checkState", checkState, { expires: 1 / 24 })
    },
    setIsFirstFont (state, isFirstFont) {
      state.isFirstFont = isFirstFont
      Cookies.set("isFirstFont", isFirstFont, { expires: 1 / 24 })
    },
    setHasCurrentFont (state, hasCurrentFont) {
      state.hasCurrentFont = hasCurrentFont
      Cookies.set("hasCurrentFont", hasCurrentFont, { expires: 1 / 24 })
    },
    setCurrentFont (state, currentFont) {
      state.currentFont = currentFont
      Cookies.set("currentFont", currentFont, { expires: 1/24 })
    },
    setUserId (state, userId) {
      state.userId = userId
      Cookies.set("userId", userId, { expires: 1/24 })
    },
    setPrefillFont (state, prefillFont) {
      state.prefillFont = prefillFont
      Cookies.set("prefillFont", prefillFont, { expires: 1/24 })
    },
    setMeetName (state, meetName) {
      state.meetName = meetName
      Cookies.set("meetName", meetName, { expires: 1 / 24})
    }
  },
  actions: {
    setToken ({commit}, token) {
      return new Promise((resolve, reject) => {
        commit("setToken", token)
        resolve()
      })
    },
    setUserKind ({commit}, userKind) {
      return new Promise((resolve, reject) => {
        commit("setUserKind", userKind)
        resolve()
      })
    },
    setFlash ({commit}, flash) {
      return new Promise((resolve, reject) => {
        commit("setFlash", flash)
        resolve()
      })
    },
    setState ({commit}, checkState) {
      return new Promise((resolve, reject) => {
        commit("setState", checkState)
        resolve()
      })
    },
    setIsFirstFont ({commit}, isFirstFont) {
      return new Promise((resolve, reject) => {
        commit("setIsFirstFont", isFirstFont)
        resolve()
      })
    },
    setHasCurrentFont ({commit}, hasCurrentFont) {
      return new Promise((resolve, reject) => {
        commit("setHasCurrentFont", hasCurrentFont)
        resolve()
      })
    },
    setCurrentFont ({commit}, currentFont) {
      return new Promise((resolve, reject) => {
        commit("setCurrentFont", currentFont)
        resolve()
      })
    },
    setUserId ({commit}, userId) {
      return new Promise((resolve, reject) => {
        commit("setUserId", userId)
        resolve()
      })
    },
    setPrefillFont ({commit}, prefillFont){
      return new Promise((resolve, reject) =>{
        commit("setPrefillFont", prefillFont)
        resolve()
      })
    },
    setMeetName ({commit}, meetName) {
      return new Promise((resolve, reject) => {
        commit("setMeetName", meetName)
        resolve()
      })
    }
  },
  getters: {
    isFirstFont: state => state.isFirstFont,
    hasCurrentFont: state => state.hasCurrentFont,
    currentFont: state => state.currentFont,
    checkState: state => state.checkState,
    userId: state => state.userId,
    prefillFont: state => state.prefillFont,
    meetName: state => state.meetName,
    addRouters: state => state.routerData.addRouters,
    token: state => state.token,
    userKind: state => state.userKind,
    flash: state => state.flash,
    info: state => state.role.info,
    routers: state => state.routerData.routers,
    logoShow: state => state.layout.logoShow,
    isCollapse: state => state.layout.isCollapse,
    uniquerouter: state => state.layout.uniquerouter,
    tabnavBox: state => state.layout.tabnavBox,
    visible: state => state.layout.visible,
    left: state => state.layout.left,
    top: state => state.layout.top,
    rightNav: state => state.layout.rightNav

  },
  modules: {
    routerData,
    role,
    layout
  }
})

export default store
