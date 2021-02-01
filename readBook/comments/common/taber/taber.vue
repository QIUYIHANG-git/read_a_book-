<template>
	<view class="bar-view">
		<view class="bar-view-to" :style="{
				height: `${titleBarHeight}`,
				top:`${padd}`,
				backgroundColor:`${backgroundColor}`
			}">
			<view class="bar-view-left" >
				<view class="" @click="whoreReturn">
					<slot name="img"></slot>
				</view>
				<view class="" @click="homeCilck">
					<slot name="imgtow"></slot>
				</view>
			</view>
			<view class="bar-view-center">
				<slot name="text"></slot>
			</view>
			<view class="bar-view-right">
				<slot name="kou"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			backgroundColor: {
				type: String,
				default () {
					return 'rgb(163,131,79)'
				}
			}
		},
		data() {
			return {
				statusBarHeight: 0, //状态栏初始化
				titleBarHeight: 0, //标题栏初始化
				padd: 0
			};
		},
		created() {
			var that = this
			uni.getSystemInfo({
				success: function(res) {
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 44 + 'px'
						that.matop = (res.statusBarHeight + 44) + 'px'
						that.$emit('child-event', that.matop)
					} else {
						that.titleBarHeight = 48 + 'px'
						that.matop = (res.statusBarHeight + 48) + 'px'
						that.$emit('child-event', that.matop)
					}
					that.padd = res.statusBarHeight + 'px'
				}
			})
		},
		methods: {
			whoreReturn() {
				uni.navigateBack({
					delta: 1
				});
			},
			homeCilck(){
				uni.switchTab({
					url:'../../../pages/home/home',
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.bar-view {
		width: 750rpx;
		// height: 100rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		margin-bottom: 200px;
		font-size: 32rpx;
		.bar-view-to {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width:100%;
			position:absolute;
			.bar-view-left {
				width: 104rpx;
				height: 42rpx;
				margin-left: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				image {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 42rpx;
					height: 42rpx;
				}
			}

			.bar-view-center {
				text {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #fff;
					font-size: 34rpx;
				}
			}

			.bar-view-right {
				width: 42rpx;
				height: 42rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>
