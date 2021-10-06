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
* emeetId：申报ID
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
* emeetId：申报ID
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
