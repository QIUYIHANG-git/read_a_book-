<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="../../../static/icon/min/fanx.png" mode=""></image>
			<text slot='text'>限时优惠</text>
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
			},
			getDiscounts(row,index){
				console.log(row)
				console.log(index)
				let that = this
				this.$ureq({
					url: 'api/marketing/getcoupon',
					method: 'POST',
					data: {
						code:row.id
					},
					header: {
						Accept: 'application/json',
						Authorization: String(that.$store.state.token)
					}
				})
				.then(res =>{
					console.log(res)
					uni.showToast({
						title:'领取'+row.name+'优惠卷成功',
						icon:'success',
						duration:1000
					})
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onLoad() {
			this.$ureq({
				url:'api/marketing/coupon',
				data:{
					page:'1',
					per_page:'100'
				},
				method:'GET'
			})
			.then( res => {
				this.listDiscounts = res.data
				for(let i in this.listDiscounts){
					// this.listDiscounts[i].created_at.
				}
				console.log(res)
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
		background-color: #FFFDF6;
		font-family: PingFang SC;
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
