import {request} from "./request";

export function getDetailExhiState(userId) {
  return request({
    url: '/message/detailState',
    method: "post",
    data: {
      meetAddr: userId
  }
  })
}
export function getEasyExhiState(userId) {
  return request({
    url: '/message/easyState ',
    method: "post",
    data: {
      meetAddr: userId
  }
  })
}
// 获取所有状态下首次申报的数据
export function getAllFirstFontData (meetAddr) {
  return request({
    url: "/search/getDetailByMeetAddr",
    method: "post",
    data: {
      meetAddr
    }
  })
}
// 获取所有状态下再次申报的数据
export function getAllNotFirstFontData (meetAddr) {
  return request({
    url: "/search/getEasyByMeetAddr",
    method: "post",
    data: {
      meetAddr
    }
  })
}
// 首次申报状态变更，用于撤销申报
/* 传递的参数
* id：申报ID
* adminId：用户ID
* checkState 要改成的状态，这里撤销是状态4
* */
export function changeDetailCheckState (cancelForm) {
  return request({
    url: "/check/detail",
    method: "post",
    data: {
      ...cancelForm
    }
  })
}
// 再次申报状态变更，用于撤销申报
/* 传递的参数
* id：申报ID
* adminId：用户ID
* checkState 要改成的状态，这里撤销是状态4
* */
export function changeEasyCheckState (cancelForm) {
  return request({
    url: "/check/easy",
    method: "post",
    data: {
      ...cancelForm
    }
  })
}

// 根据ID查找指定申报的信息
export function getEasyFontById (id) {
  return request({
    url: "/search/getEasyById",
    method: "post",
    data: {
      id
    }
  })
}
export function getDetailFontById (id) {
  return request({
    url: "/search/getDetailById",
    method: "post",
    data: {
      id
    }
  })
}
//查找最近总结用于回填
export function getLatestSummary (meetId) {
  return request({
    url: "/search/latestSummary",
    method: "post",
    data: {
      meetId
    }
  })
}
// 获取申报处理记录
export function getHandleRecord (id) {
  return request({
    url: "/search/checkInfo",
    method: "post",
    data: {
      id
    }
  })
}
// 文件下载
export function downloadFile (fileId) {
  return request({
    url: "/check/downloadFile",
    method: "post",
    responseType: "blob",
    data: {
      fileId
    }
  })
}
