import {request} from "./request"

export async function getdetailFormdata () {
  return request({
    // url: '/check/detailList  ',
    url: "/search/allDetailMeet  ",
    method: "post"
    // responseType: 'blob',
  })
}
export function getdetailFile (fileId) {
  return request({
    url: "/check/downloadFile",
    method: "post",
    responseType: "blob",
    data: {
      fileId: fileId
    }

  })
}

export function checkPassDetail (id, adminId, checkState) {
  return request({
    url: "/check/detail",
    method: "post",
    data: {
      id: id,
      adminId: adminId,
      checkState: checkState
    }
  })
}

export function historyHandles (id) {
  return request({
    url: "/search/checkInfo",
    method: "post",
    data: {
      id: id
    }
  })
}
export function getSummary (meetId) {
  return request({
    url: "/search/latestSummary",
    method: "post",
    data: {
      meetId: meetId
    }
  })
}

export async function getDeatilByMeetName (meetName) {
  return request({
    url: "/search/getDetailByMeetName",
    method: "post",
    data: {
      meetName: meetName
    }
  })
}
export async function getDeatilByMeetAddr (meetAddr) {
  return request({
    url: "/search/getDetailByMeetAddr",
    method: "post",
    data: {
      meetAddr: meetAddr
    }
  })
}
export async function getDeatilById (id) {
  return request({
    url: "/search/getDetailById",
    method: "post",
    data: {
      id: id
    }
  })
}


