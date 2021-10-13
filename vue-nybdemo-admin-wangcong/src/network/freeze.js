import {request} from "./request.js"
export function getAllUsers () {
  return request({
	  url: "/search/allUser",
	  method: "post"
  })
}
export function freeze (meetAddr) {
  return request({
	  url: "/manage/freeze",
	  method: "post",
    data: {
      meetAddr: meetAddr
    }
  })
}
export function unFreeze (meetAddr) {
  return request({
	  url: "/manage/unfreeze",
	  method: "post",
    data: {
      meetAddr: meetAddr
    }
  })
}
