<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>书架</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="top-mou">
				<view class="top-mou-one">
					全选
				</view>
				<view class="top-mou-tow">
					已选<text>2</text>本书籍
				</view>
				<view class="top-mou-therr" @click="cancelOff">
					取消
				</view>
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
			},
			// 取消事件
			cancelOff(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		height: 100%;
		width: 100%;
		background-color: #fff;

		.top-mou {
			width: 100%;
			height: 80rpx;
			background-color: #A3834F;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			box-sizing: border-box;
			padding: 0 33rpx 0 31rpx;

			.top-mou-one {
				margin-top: 27rpx;
			}

			.top-mou-tow {
				font-size: 32rpx;
				text{
					margin: 0 15rpx;
				}
			}

			.top-mou-therr {}
		}


	}
</style>
