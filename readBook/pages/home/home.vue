<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>书城</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="" @click="login">
				<u-button @click="reqde">按钮</u-button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import taber from '../../comments/common/taber/taber.vue'
	export default {
		components: {
			taber
		},
		data() {
			return {
				matop: ''
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			reqde(){
				// 网络请求模板
				// this.$ureq({
				// 	url:'/post',
				// 	data:{
				// 	},
				// 	method:'POST',
				// 	header:{
						
				// 	}
				// }).then((res)=>{
				// 	console.log(res)
				// })
				// .catch((err)=>{
				// 	console.log(err)
				// })
			}
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #fff;
	}
</style>
