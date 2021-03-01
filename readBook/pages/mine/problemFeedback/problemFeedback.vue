<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="http://i2.tiimg.com/733036/c51090a6f01cc19e.png" mode=""></image>
			<text slot='text'>问题反馈</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<!-- 反馈内容 -->
		<view class="coupon" scroll-y="true">
			<view class="feed">
				反馈内容
			</view>
			<view class="input-box">
				<u-input v-model="valueone" placeholder="请输入您的意见与建议" :maxlength='300' :trim='true' type="textarea"  />
			</view>
			<!-- 手机号 -->
			<view class="feed">
				手机号
			</view>
			<view class="input-box-tow">
				<u-input v-model="valuetow" placeholder="请输入" style='width: 100%;' :trim='true' type="text"  />
			</view>
			<view class="text-box" @click="submit">
				提交
			</view>
		</view>
		
	</view>
</template>

<script>
	import taber from '../../../comments/common/taber/taber.vue'
	export default {
		components: {
			taber
		},
		data() {
			return {
				matop: '',
				valueone:'',
				valuetow:''
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 
			submit(){
				console.log('提交事件')
				console.log(this.valueone)
				console.log(this.valuetow)
				this.$ureq({
					url: 'api/user/feedback',
					method: 'POST',
					data:{
						content:this.valueone,
						contact:this.valuetow
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					uni.showToast({
						title:'提交成功',
						icon:'success',
						duration:1000
					})
					this.valueone=''
					this.valuetow = ''
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #F6F1E9;
			
		.feed{
			padding: 30rpx;
			font-size: 30rpx;
			color: #333333;
			font-weight: 500;
		}
		
		.input-box{
			width: 690rpx;
			height: 360rpx;
			padding: 30rpx;
			box-sizing: border-box;
			margin: 0 auto;
			background-color: #FFFEFC;
		}
		.input-box-tow{
			width: 690rpx;
			padding:0 30rpx;
			box-sizing: border-box;
			height: 110rpx;
			margin: 0 auto;
			background-color: #FFFEFC;
			display:flex;
			justify-content: left;
			align-items: center;
			
		}
		.text-box{
			width: 690rpx;
			height: 88rpx;
			background-color: #A3834F;
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: 400;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 80rpx auto;
		}
	}
</style>
