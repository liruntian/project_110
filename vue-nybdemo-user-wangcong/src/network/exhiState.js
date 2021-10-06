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
export function getAllFirstFontData (meetAddr) {
  return request({
    url: "/search/getDetailByMeetAddr",
    method: "post",
    data: {
      meetAddr
    }
  })
}

export function getAllNotFirstFontData (meetAddr) {
  return request({
    url: "/search/getEasyByMeetAddr",
    method: "post",
    data: {
      meetAddr
    }
  })
}
