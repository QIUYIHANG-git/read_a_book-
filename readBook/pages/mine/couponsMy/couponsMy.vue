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
			<view class="discounts-box" :style="{backgroundImage:`${itme.url}`}" v-for="(itme,index) in listDiscounts" :key="index">
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
							待使用
						</view>
					</view>
					<view class="tiele-tow">
						使用日期：<text>{{itme.created_at.slice(0,10)}}</text>至<text>{{itme.expired_at}}</text>
					</view>
				</view>
			</view>
			<view class="pos-text" @click="moveOff = true">
				兑换优惠券
			</view>
			<!-- 显示-->
			<u-popup v-model="moveOff" mode="center"  width="560rpx" height="440rpx" :closeable="false" >
				<view style="background-color: rgb(234,234,234);color: #fff;width: 100%;height: 100%;font-family: PingFang SC;position: relative;box-sizing: border-box;">
					<view style="color: #000000;font-weight: 500;font-size: 36rpx;text-align: center;padding: 39rpx;">
						兑换优惠券
					</view>
					<view style="width: 418rpx;height: 103rpx;margin: 58rpx auto;color: #333333;font-size: 28rpx;font-weight: 400;">
						
						<view style="padding-bottom: 38rpx;border-bottom: 1rpx solid #E5E5E5;">
							<input type="text" v-model="redeemCode" value="" placeholder="请输入您的兑换码" />
						</view>
					</view>
					<view style="background-color: #A1814C;
					width: 100%;
					padding: 20rpx 0;
					text-align: center;
					font-size: 32rpx;
					font-weight: 400;
					position: absolute;
					bottom: 0;
					"
					 @click="goGroupingConfig">
						确定
					</view>
				</view>
			</u-popup>
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
				listDiscounts:[],
				url:'url(http://i2.tiimg.com/733036/900bb364bd5677c1.png)',
				redeemCode:'',
				moveOff:false,
				Year:0,
				Month:0,
				Datali:0,
				stacko:0
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			timedata(){
				let myDate = new Date();
				this.Year = myDate.getFullYear();
				this.Month = myDate.getMonth();
				this.Datali = myDate.getDate();
				// let ju
				// let ku
				// Month<10?(ju = '0'+Month):ju = Month
				// Datali<10?(ku = '0'+Datali):ku = Datali
				// console.log(Year,ju,ku)
			},
			goGroupingConfig(){
				this.moveOff = false
				this.$ureq({
					url: 'api/marketing/getcoupon',
					method: 'POST',
					data:{
						code:this.redeemCode
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				})
				.then(res => {
					this.redeemCode = ''
					uni.showToast({
						title:'兑换成功',
						icon:'success',
						duration:1000
					})
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onLoad() {
			this.timedata()
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
				for(let i =0;i<this.listDiscounts.length;i++){
					this.listDiscounts[i].url = 'url(http://i2.tiimg.com/733036/900bb364bd5677c1.png)'
					if(parseInt(this.listDiscounts[i].expired_at.slice(0,4))>=this.Year){
						if(parseInt(this.listDiscounts[i].expired_at.slice(5,7))>=this.Month){
							if(parseInt(this.listDiscounts[i].expired_at.slice(8,10))>=this.Datali){
								
							}else{
								this.listDiscounts[i].url = 'url(http://i1.fuimg.com/733036/64557a6fa53d8d9a.png)'
							}
						}else{
							this.listDiscounts[i].url = 'url(http://i1.fuimg.com/733036/64557a6fa53d8d9a.png)'
						}
					}else{
						console.log('过期了')
						this.listDiscounts[i].url = 'url(http://i1.fuimg.com/733036/64557a6fa53d8d9a.png)'
					}
				  
				}
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
		position: relative;
		.pos-text{
			position: fixed;
			left: 55rpx;
			bottom: 80rpx;
			width: 640rpx;
			height: 88rpx;
			background-color: #A3834F;
			font-size: 32rpx;
			font-weight: 500;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.discounts-box{
			width: 690rpx;
			height: 200rpx;
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
						// border: 1rpx solid #FFE1AE;
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
