<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image src="http://i1.fuimg.com/733036/c51090a6f01cc19e.png" mode=""></image>
			<text slot='text'>搜索</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="search-box">
				<view class="search-itme">
					<image src="http://i1.fuimg.com/733036/9e98775c16b2b2e8.png" mode=""></image><input placeholder-style="color: #B9A798;" placeholder="请输入书名/正文内容"
					 type="text" value="" />
				</view>
				<view class="text-itme">
					搜索
				</view>
			</view>
			<!--  -->
			<view class="search-history-box">
				<view class="tiele-text">
					搜索历史
				</view>
				<view class="delete-text">
					清空
				</view>
			</view>
			<!--  -->
			<view class="search-content">
				<image src="http://i1.fuimg.com/733036/ec5461f93fd1a8f0.png" ></image> <text>嘿嘿</text>
			</view>
			<view class="search-content">
				<image src="http://i1.fuimg.com/733036/ec5461f93fd1a8f0.png" ></image> <text>呵呵呵</text>
			</view>
			<view class="search-content">
				<image src="http://i1.fuimg.com/733036/ec5461f93fd1a8f0.png" ></image> <text>无语了</text>
			</view>
			<view class="search-content">
				<image src="http://i1.fuimg.com/733036/ec5461f93fd1a8f0.png" ></image> <text>嘿嘿</text>
			</view>
		</scroll-view>
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
				matop: ''
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			}
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #fff;
		.search-box {
			background-color: #A1814C;
			height: 94rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 10rpx 0 20rpx 0;
			display: flex;
			justify-content: left;
			align-items: center;
			.search-itme {
				// margin: 0 auto;
				margin-left: 30rpx;
				height: 64rpx;
				border-radius: 30rpx;
				width: 600rpx;
				background-color: #fff;
				display: flex;
				justify-content: left;
				align-items: center;
		
				image {
					margin-left: 20rpx;
					width: 28rpx;
					height: 28rpx;
				}
		
				input {
					margin-left: 11rpx;
					font-size: 27rpx;
					height: 27rpx;
					width: 264rpx;
					color: #B9A798;
				}
			}
			.text-itme{
				margin-left: 33rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #fff;
			}
		}
		// 搜索历史标题
		.search-history-box{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-weight: 500;
			font-family: PingFang SC;
			padding: 44rpx 30rpx;
			box-sizing: border-box;
			
			.tiele-text{
				color: #000;
				
			}
			.delete-text{
				color: #A1814C;
			}
		}
		.search-content{
			display: flex;
			justify-content: left;
			align-items: center;
			width: 690rpx;
			margin: 0 auto;
			padding: 0 0 30rpx 0;
			margin-bottom: 37rpx;
			border-bottom: 1rpx solid #E5E5E5;
			image{
				width: 26rpx;
				height: 26rpx;
					
			}
			text{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #000;
				margin-left: 21rpx;
			}
		}
	}
</style>

