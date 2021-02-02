<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>鼎秀古籍</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<!-- 搜索盒子 -->
			<view class="search-box">
				<view class="search-itme">
					<image src="../../static/icon/home/aso.png" mode=""></image><input placeholder-style="color: #B9A798;" placeholder="请输入书名/正文内容"
					 type="text" value="" />
				</view>
			</view>
			<!-- 轮播图 -->
			<view class="Banner">
				<u-swiper :list="BannerList" name="asset" mode="rect" height="280rpx" border-radius="0"></u-swiper>
			</view>
			<!-- 标题 -->
			<view class="title-itme">
				<view class="text-title">正在阅读</view>
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
				matop: '',
				// 轮播数组
				BannerList: []
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			}
		},
		onLoad() {
			this.$ureq({
				url:'common/banner',
				method:'GET'
			})
			.then( (res)=> {
				console.log(res)
				this.BannerList = res.data
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		height: 100%;
		width: 100%;
		background-color: #fff;

		.search-box {
			background-color: #A1814C;
			height: 94rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 10rpx 0 20rpx 0;

			.search-itme {
				margin: 0 auto;
				height: 64rpx;
				border-radius: 30rpx;
				width: 690rpx;
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

		}
		// 轮播图盒子
		.Banner {
			height: 280rpx;
			width: 690rpx;
			margin: 29rpx auto 0 auto;
		}
		//标题 
		.title-itme{
			width: 371.3rpx;
			height: 104rpx;
			margin-top: 39rpx;
			background-image: url(../../static/icon/home/title.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.text-title{
				padding-top: 43rpx;
				margin-left: 31rpx;
				width: 141rpx;
				height: 34rpx;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #000000;
				// line-height: 60rpx;
			}
		}
	}
</style>
