<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="../../../static/icon/min/fanx.png" mode=""></image>
			<text slot='text'>会员</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="member-img">
				<view class="member-one">
					<view class="member-one-lfet">
						<image src="http://i1.fuimg.com/733036/9d6e434cfc171905.png" mode=""></image>
					</view>
					<view class="member-one-rigth">
						<view class="member-one-rigth-one">
							诗人李白
						</view>
						<view class="member-one-rigth-tow">
							您当前未开通vip
						</view>
					</view>
				</view>
				<view class="member-tow">
					立即开通
				</view>
			</view>
			<!-- viP权益 -->
			<view class="one">
				<view class="itme" v-for="(itme,index) in memberOne" :key="index" @click="itmeOne(index)">
					<view class="itme-let">
						{{itme.text}}
					</view>
					<view class="itme-rigth">
						<view class="itme-rigth-tow">
							<image src="http://i1.fuimg.com/733036/2dcc5d08d0f440e7.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 会员开通记录 -->
			<view class="tow">
				<view class="itme" v-for="(itme,index) in memberTow" :key="index" @click="itmeOne(index)">
					<view class="itme-let">
						<view>{{itme.text}}</view>
						<view v-if="itme.title" style="color: #999999;font-size: 24rpx;margin-top: 5rpx;">
							{{itme.title}}
						</view>
					</view>
					<view class="itme-rigth">
						<view class="itme-rigth-tow">
							<image v-if="itme.img" :src="itme.img" mode=""></image>
						</view>
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
				// viP权益
				memberOne:[
					{
						text:'VIP会员权益说明'
					},
					{
						text:'会员兑换'
					}
				],
				// 会员开通记录
				memberTow:[
					{
						text:'会员开通记录',
						title:'',
						img:'http://i1.fuimg.com/733036/2dcc5d08d0f440e7.png'
					},
					{
						text:'3个月VIP',
						title:'开通时间：2020.12.11',
						img:''
					},
					{
						text:'3个月VIP',
						title:'开通时间：2020.12.11',
						img:''
					},
					{
						text:'3个月VIP',
						title:'开通时间：2020.12.11',
						img:''
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
			// 会员记录
			memberRecord(){
				this.$ureq({
					url: 'api/user/viplog',
					method: 'GET',
					data:{
						page:'1',
						per_page:'3'
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				})
				.then(res =>{
					if(res.data[0].vip_type == 1){
						this.memberTow[1].text = res.data[0].vip_time + 'VIP'
					}else{
						this.memberTow[1].text = res.data[0].vip_time + 'SVIP'
					}
					this.memberTow[1].title = '开通时间：'+res.data[0].created_at
					if(res.data[1].vip_type == 1){
						this.memberTow[2].text = res.data[1].vip_time + 'VIP'
					}else{
						this.memberTow[2].text = res.data[1].vip_time + 'SVIP'
					}
					this.memberTow[2].title = '开通时间：'+res.data[1].created_at
					if(res.data[2].vip_type == 1){
						this.memberTow[3].text = res.data[2].vip_time + 'VIP'
					}else{
						this.memberTow[3].text = res.data[2].vip_time + 'SVIP'
					}
					this.memberTow[3].title = '开通时间：'+res.data[2].created_at
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onLoad() {
			this.memberRecord()
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #F6F1E9;
		box-sizing: border-box;
		font-family: PingFang SC;
		.member-img{
			width: 690rpx;
			height: 200rpx;
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 30rpx auto;
			background-image: url(http://i1.fuimg.com/733036/a0d0805989e6f0af.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.member-one{
				display: flex;
				justify-content: left;
				align-items: center;
				.member-one-lfet{
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
				}
				.member-one-rigth{
					margin-left: 20rpx;
					.member-one-rigth-one{
						font-size: 32rpx;
						color: #563D16;
						font-weight: 500;
						padding-bottom: 10rpx;
					}
					.member-one-rigth-tow{
						font-size: 24rpx;
						color: #8D7146;
						font-weight: 400;
					}
				}
			}
			.member-tow{
				padding: 18rpx;
				background-image: linear-gradient(to right,#251807,#3D2A0B);
				color: #E1AB74;
				font-size: 24rpx;
				font-weight: 600;
			}
		}
		// vip权益
		.one{
			width: 690rpx;
			margin: 0 auto;
			background-color: #FFFEFC;
			padding: 0 31rpx;
			box-sizing: border-box;
			
			.itme{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #E5E5E5;
				.itme-let{
					font-size:30rpx ;
					color: #333;
					font-weight: 400;
				}
				.itme-rigth{
					display: flex;
					justify-content: left;
					align-items: center;
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
		// 
		// 会员开通记录
		.tow{
			width: 690rpx;
			margin: 30rpx auto;
			background-color: #FFFEFC;
			padding: 0 31rpx;
			box-sizing: border-box;
			
			.itme{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #E5E5E5;
				.itme-let{
					font-size:30rpx ;
					color: #333;
					font-weight: 400;
				}
				.itme-rigth{
					display: flex;
					justify-content: left;
					align-items: center;
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
	}
</style>
