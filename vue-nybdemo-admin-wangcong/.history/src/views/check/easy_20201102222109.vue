<template>
<div class="easyCkeck">
  <table border="1px" cellspacing="0">
    <colgroup span="7" width="300"></colgroup>
    <!-- <colgroup span="1" width="200"></colgroup> -->
    <tr align="center">
				<th colspan="7">展会简易申报审核</th>
		</tr>
    <tr align="center">
      <td>展会名称</td>
      <td>{{easyForm}}</td>
      <td>展会对应ID</td>
       <td>{{easyForm}}</td> 
    </tr>
    <tr  align="center">
       <td>主办单位</td>
       <td>{{easyForm}}</td>
       <td>举办时间</td>
       <td>{{easyForm}}</td>  
    </tr>
    <tr align="center">
       <td>举办地点</td>
       <td colspan="6">{{easyForm}}</td> 
    </tr>
    <tr align="center">
       <td>备注</td>
       <td colspan="6">{{easyForm}}</td> 
    </tr>
  </table>
  <br/>
<div class="check">
  <button class="pass">审核通过</button>
  <button class="reject">返回修改</button>
</div>
</div>

</template>

<script>
import { getEasyFormdata } from "../../network/easyCheck"
export default {
  name: "easy",
  data(){
    return{
      easyForm: {}

    }
  },
  created(){
    getEasyFormdata().then(res => {
      this.easyForm = res
    })

  },

}
</script>

<style scoped lang="scss">


table {
  font-size: 16px;

}

th {
  font-size: 23px;
}

tr {
  height: 60px;
}

.check {
  display: flex;
  justify-content: space-around;

  
  
}
.pass,.reject  {
  width: 120px;
  height: 40px;
  border-radius: 30px;

  
}
.pass{
  background-color:  #82c8a0;;
	color: white;	
	padding: 3px 25px;
	display: inline-block;
	border: 1px solid rgba(0,0,0,0.21);
	border-bottom-color: rgba(0,0,0,0.34);
	text-shadow:0 1px 0 rgba(0,0,0,0.15);
	box-shadow: 0 1px 0 rgba(255,255,255,0.34) inset, 
				      0 2px 0 -1px rgba(0,0,0,0.13), 
				      0 3px 0 -1px rgba(0,0,0,0.08), 
				      0 3px 13px -1px rgba(0,0,0,0.21);
}

.reject {
  background-color: #fa5a5a;
	color: white;	
	padding: 3px 25px;
	display: inline-block;
	border: 1px solid rgba(0,0,0,0.21);
	border-bottom-color: rgba(0,0,0,0.34);
	text-shadow:0 1px 0 rgba(0,0,0,0.15);
	box-shadow: 0 1px 0 rgba(255,255,255,0.34) inset, 
				      0 2px 0 -1px rgba(0,0,0,0.13), 
				      0 3px 0 -1px rgba(0,0,0,0.08), 
				      0 3px 13px -1px rgba(0,0,0,0.21);

}
	.card {
		color: #666;
		@extend %shadow;

		ul {
			@include flex;

			li {
				flex: 1;

				a {
					color: #666666;
					align-items: center;
					padding-#{$top}: 20px;
					padding-#{$bottom}: 20px;
					@include flex(column);

					span {
						height: 44px;
					}

					.num {
						line-height: 44px;
						font-size: 42px;
						color: $bluee;
						margin: 0px;
					}
				}

				.kjfs-bluee {
					color: $bluee;
				}

				.kjfs-pinkk {
					color: $pinkk;
				}

				.kjfs-yelloww {
					color: $yelloww;
				}

				.kjfs-grennn {
					color: $grennn;
				}

				.kjfs-purplee {
					color: $purplee;
				}

				.kjfs-lightBluee {
					color: $lightBluee;
				}

				&:hover {
					.kjfs-bluee {
						color: #ffffff;
						background: $bluee;
					}

					.kjfs-pinkk {
						color: #ffffff;
						background: $pinkk;
					}

					.kjfs-yelloww {
						color: #ffffff;
						background: $yelloww;
					}

					.kjfs-grennn {
						color: #ffffff;
						background: $grennn;
					}

					.kjfs-purplee {
						color: #ffffff;
						background: $purplee;
					}

					.kjfs-lightBluee {
						color: #ffffff;
						background: $lightBluee;
					}
				}
			}
		}

		/* 谷歌 */
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			appearance: none;
			margin: 0;
		}

		/* 火狐 */
		input {
			-moz-appearance: textfield;
		}

		.table {
			padding: 21px;

			p {
				height: 52px;
				line-height: 52px;
				border: 1px solid #cccccc;
				overflow: hidden;
				border-#{$top}: none;
				@include flex(null, start);

				&:first-child {
					border-#{$top}: 1px solid #cccccc;
				}

				span {}

				.tit {
					width: 180px;
					min-width: 180px;
					height: 100%;
					text-align: center;
					border-#{$right}: 1px solid #cccccc;
					margin-#{$right}: 18px;
				}

				span.gitbox {
					flex: 1;
					height: 100%;
					overflow: hidden;
					@include flex(row, start);

					a {
						&:first-child {
							margin-#{$right}: 30px;
						}
					}
				}
			}
		}
	}



</style>
