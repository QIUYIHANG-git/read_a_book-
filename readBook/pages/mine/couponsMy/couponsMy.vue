<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="http://i2.tiimg.com/733036/c51090a6f01cc19e.png" mode=""></image>
			<text slot='text'>我的优惠卷</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="discounts-box" v-for="(itme,index) in listDiscounts" :key="index">
				<view class="discounts-box-one">
					<view class="text-one">
						<text style="font-size: 32rpx;">¥</text><text style="font-size:64rpx;line-height: 64rpx;padding: 0;">{{parseInt(itme.amount)}}</text>
					</view>
					<view class="text-tow">
						满{{parseInt(itme.option_amount)}}元可用
					</view>
				</view>
				<view class="discounts-box-tow">
					<view class="tiele-one">
						<view class="get-text">
							{{itme.name}}
						</view>
						<view class="get-discounts" @click="getDiscounts(listDiscounts[index],index)">
							领取
						</view>
					</view>
					<view class="tiele-tow">
						使用日期：<text>{{itme.created_at.slice(0,10)}}</text>至<text>{{itme.expired_at}}</text>
					</view>
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
				matop: '',
				listDiscounts:[]
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
				url: 'api/user/mycoupon',
				method: 'GET',
				data:{
					page:'1',
					per_page:'6'
				},
				header: {
					Accept: 'application/json',
					Authorization: String(this.$store.state.token)
				}
			}).then(res => {
				console.log('我的优惠劵',res)
				this.listDiscounts = res.data
			})
			.catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #fff;
		.discounts-box{
			width: 690rpx;
			height: 200rpx;
			background-image: url(http://i2.tiimg.com/733036/900bb364bd5677c1.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			margin: 30rpx auto;
			display: flex;
			justify-content: left;
			align-items: center;
			.discounts-box-one{
				border-right: 1rpx solid #EBA992;
				padding: 0 34rpx 0 47rpx;
				.text-one{
					text-align: center;
					color: #FFE1AE;
				}
				.text-tow{
					margin-top: 19rpx;
					font-size: 22rpx;
					line-height: 22rpx;
					padding: 0;
					color: #FFE1AE;
				}
			}
			.discounts-box-tow{
				margin-left: 30rpx;
				.tiele-one{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.get-text{
						font-size: 32rpx;
						color:#FFE1AE;
					}
					.get-discounts{
						// margin-left: 103rpx;
						padding: 13rpx 26rpx;
						color:#FFE1AE;
						border: 1rpx solid #FFE1AE;
						font-size: 24rpx;
					}
				}
				.tiele-tow{
					margin-top: 19rpx;
					font-size: 24rpx;
					color: #FFC9AD;
					font-weight: 400;
				}
			}
		}
	}
</style>
