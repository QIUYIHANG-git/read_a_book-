<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="http://i1.fuimg.com/733036/c51090a6f01cc19e.png" mode=""></image>
			<text slot='text'>VIP</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<view class="coupon" scroll-y="true">
			<scroll-view scroll-x="true" class="scroll-vipbox" >
				<view class="vip-svip">
					<view :class="offvip==index?'vip':'svip'" v-for="(itme,index) in listVIP" :key="index" @click="Clickvip(index)">
						<view class="vip-one">
							<view class="title">
								{{itme.title}}
							</view>
							<view class="cifing">
								开通
							</view>
						</view>
						<view class="vip-tow">
							{{itme.text}}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 月卡 -->
			<view class="month-box">
				<view :class="offmoth==index?'month-box-tow':'month-box-one'" v-for="(itme,index) in monthlist" :key="index" @click="mothCilck(monthlist[index],index)">
					<view class="">
						<view class="month">
							{{itme.month}}
						</view>
						<view class="money">
							<text>￥</text><text>{{itme.money}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 剩余时间 -->
			<view style="padding: 40rpx 30rpx;font-size: 24rpx;font-weight: 400;font-family: PingFang SC;color: #333333;">
				*您的VIP剩余时间可抵扣<text style="color: #A3834F;">￥10</text>
			</view>
			<!-- 第二个 -->
			<view class="tow">
				<view class="itme"  @click="itmeTow()">
					<view class="itme-let">
						优惠券
					</view>
					<view class="itme-rigth">
						<view class="itme-rigth-one">
							
							<text>暂无可用</text>
						</view>
						<view class="itme-rigth-tow">
							<image src="http://i1.fuimg.com/733036/2dcc5d08d0f440e7.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view style="padding: 40rpx 30rpx;font-size: 24rpx;font-weight: 400;font-family: PingFang SC;color: #333333;">
				<text style="color: #999999;">查看</text> <text style="color: #A3834F;" @click="agreement">《会员服务协议》</text>
			</view>
			<!-- 支付 -->
			<view class="money-box">
				<view class="money-box-one">
					应付：<text style="color: #A3834F;font-size: 40rpx;">￥24</text>
				</view>
				<view class="money-box-tow">
					立即支付
				</view>
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
				offvip:0,
				offmoth:0,
				listVIP:[
					{
						text:'可使用小程序端全部功能',
						title:'VIP会员'
					},
					{
						text:'可使用PC端/小程序端全部功能',
						title:'SVIP会员'
					}
				],
				monthlist:[
					{
						month:'1个月',
						money:'12'
					},
					{
						month:'连续包月',
						money:'10/月'
					},
					{
						month:'包年',
						money:'100'
					}
				]
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
			Clickvip(index){
				this.offvip = index
			},
			// 选中月份
			mothCilck(row,index){
				this.offmoth = index
				console.log(index)
			},
			agreement(){
				uni.navigateTo({
					url:'../../login/agreement/agreement?id='+2,
					fail(err) {
						console.log(err)
					}
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
		position: relative;
		.scroll-vipbox{
			height: 180rpx;
			padding: 40rpx 0;
			width: 750rpx;
			.vip-svip{
				width: 1000rpx;
				padding: 0 30rpx;
				height: 180rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.vip{
					width: 480rpx;
					height: 180rpx;
					background-image: url(http://i1.fuimg.com/733036/ea7699c5dabd287e.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					font-family: PingFang SC;
					padding: 48rpx 30rpx;
					box-sizing: border-box;
					.vip-one{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.title{
							font-size: 36rpx;
							font-weight: 500;
							color: #2F1F0B;
						}
						.cifing{
							padding: 8rpx 11rpx;
							background-color: #EAD5B4;
							font-size: 24rpx;
							color: #635133;
						}
					}
					.vip-tow{
						margin-top: 10rpx;
						font-size: 28rpx;
						color: #2F1F0B;
						font-weight: 400;
					}
				}
				.svip{
					width: 480rpx;
					height: 180rpx;
					background-image: url(http://i1.fuimg.com/733036/9dd8ca6f2c3d449e.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					font-family: PingFang SC;
					padding: 48rpx 30rpx;
					box-sizing: border-box;
					.vip-one{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.title{
							font-size: 36rpx;
							font-weight: 500;
							color: #2F1F0B;
						}
						.cifing{
							padding: 8rpx 11rpx;
							background-color: #EAD5B4;
							font-size: 24rpx;
							color: #635133;
						}
					}
					.vip-tow{
						margin-top: 10rpx;
						font-size: 28rpx;
						color: #2F1F0B;
						font-weight: 400;
					}
				}
			}
		}
		// 月卡
		.month-box{
			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx;
			display: flex;
			justify-content: left;
			align-items: center;
			font-family: PingFang SC;
			.month-box-one{
				width: 210rpx;
				height: 240rpx;
				margin-right: 30rpx;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				.month{
					font-size: 29rpx;
					font-weight: 500;
					color: #333;
					text-align: center;
				}
				.money{
					margin-top: 10rpx;
					font-size: 38rpx;
					color: #A3834F;
					font-weight: 600;
				}
			}
			.month-box-tow{
				width: 210rpx;
				height: 240rpx;
				margin-right: 30rpx;
				background-color: #F0E2D0;
				border: 2rpx solid #715E40;
				display: flex;
				justify-content: center;
				align-items: center;
				.month{
					font-size: 29rpx;
					font-weight: 500;
					color: #333;
					text-align: center;
				}
				.money{
					margin-top: 10rpx;
					font-size: 38rpx;
					color: #A3834F;
					font-weight: 600;
				}
			}
		}
		.tow{
			width: 690rpx;
			background-color: #FFFEFC;
			padding: 0 31rpx;
			margin: 0 auto;
			box-sizing: border-box;
			
			.itme{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				.itme-let{
					font-size:30rpx ;
					color: #333;
					font-weight: 400;
				}
				.itme-rigth{
					display: flex;
					justify-content: left;
					align-items: center;
					.itme-rigth-one{
						font-size:30rpx ;
						color: #999;
						font-weight: 400;
						image{
							width: 80rpx;
							height: 80rpx;
						}
					}
					.itme-rigth-tow{
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							margin-left: 14rpx;
							width: 17rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
		.money-box{
			width: 750rpx;
			height: 110rpx;
			position: fixed;
			bottom: 0;
			background-color: #fff;
			display:flex;
			justify-content: space-between;
			align-items: center;
			.money-box-one{
				font-size: 28rpx;
				color: #333;
				font-weight: 400;
			}
			.money-box-tow{
				color: #2F1F0B;
				font-size: 32rpx;
				font-weight: 500;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 280rpx;
				height: 100%;
				background-image: linear-gradient(to right,#C29A64,#E9CA9A);
			}
		}
	}
</style>
