<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="https://api-guji.sinmore.vip/wximg/110/返回.png" mode=""></image>
			<text slot='text'>{{listData.title}}</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<!-- <view style="text-align: center;margin-top: 49rpx;">
				{{listData.title}}
			</view> -->
			<view style="margin: 0 31rpx 0 31rpx ;margin-top: 49rpx;">
				<u-parse :html="listData.content" :selectable="true"></u-parse>
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
				matop: '',
				listData: {},
				editorCtx:'',
				title:'协议'
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
		onShow() {
			
		},
		onLoad(op) {
			this.$ureq({
					url: 'common/single',
					data: {
						id: op.id
					},
					method: 'GET'
				}).then((res) => {
					console.log(res)
					this.listData = res.data
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
	}
</style>
