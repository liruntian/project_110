import {request} from "./request.js"

export async function getEasyFormdata(){
	return request({
		// url: '/check/easyList',
		url: 'search/allEasyMeet',
		methods:"post"
	})
}
export function getEasyFile(fileId) {
	return request({
	  url: '/check/detailFile',
	  method: "post",
	  responseType:'blob',
	  data:{
		fileId : fileId,
	  }
	  
  
	})
  }

  export function checkPassEasy(id,adminId,checkState) {
	return request({
	  url: '/check/easy',
	  method: "post",
	  data:{
		id : id,
		adminId:adminId,
		checkState:checkState
  
  
	  }
  
	})
  }

  export async function getEasyByMeetName(meetName) {
	return request({
	  url: '/search/getEasyByMeetName',
	  method: "post",
	  data:{
		meetName : meetName,
	  }
	})
  }
  export async function getEasyByMeetAddr(meetAddr) {
	return request({
	  url: '/search/getEasyByMeetAddr',
	  method: "post",
	  data:{
		meetAddr : meetAddr,
	  }
	})
  }
  export async function getEasyById(id) {
	return request({
	  url: '/search/getEasyById',
	  method: "post",
	  data:{
		id : id,
	  }
	})
  }