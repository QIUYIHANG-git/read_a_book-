<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>我的</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="top-img">
				<view class="itme" @click="userinfo()">
					<view class="img-itme">
						<view class="">
							<image :src="userImg" mode=""></image>
						</view>
						<view class="img-text">
							<view class="name">
								<text>{{userName}}</text>
								<image v-if="memberState==2" src="http://i1.fuimg.com/733036/e74c025b672761b8.png" mode=""></image>
								<image v-else-if="memberState==3" src="http://i1.fuimg.com/733036/e74c025b672761b8.png" mode=""></image>
							</view>
							<view v-if="memberState == 1" class="hint-tow">
								首次完善个人信息送基础会员
							</view>
							<view v-else class="hint-one">
								编辑个人信息
							</view>
						</view>
					</view>
					<view class="img-fan">
						<image src="http://i1.fuimg.com/733036/2dcc5d08d0f440e7.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="pos-box">
				<view v-if="memberState==1" class="pos-img" @click="memberClick()">
					<image src="http://i1.fuimg.com/733036/16a850f04e35a834.png" mode=""></image>
				</view>
				<view class="white-box">
					<view class="white-box-itme" v-for="(itme,index) in listContent" :key="index" @click="itmeindex(index)">
						<view class="itme-left">
							<view class="itme-left-img">
								<image :src="itme.url" mode=""></image>
							</view>
							<view class="itme-left-text">
								{{itme.text}}
							</view>
						</view>
						<view class="itme-rigth">
							<image src="http://i1.fuimg.com/733036/2dcc5d08d0f440e7.png" mode=""></image>
						</view>
					</view>
				</view>
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
				offIf: false,
				userName: '',
				userImg: 'http://i1.fuimg.com/733036/9d6e434cfc171905.png',
				memberState:2,
				listContent:[
					{
						text:'我的优惠卷',
						url:'http://i1.fuimg.com/733036/9446330a5e3c8d83.png'
					},
					{
						text:'问题反馈',
						url:'http://i1.fuimg.com/733036/3d880e504c6ba8be.png'
					},
					{
						text:'关于我们',
						url:'http://i1.fuimg.com/733036/4b730ee857a4ab52.png'
					},
					{
						text:'帮助',
						url:'http://i1.fuimg.com/733036/dbd6f154fdbf445d.png'
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
			// 个人信息
			userinfo(){
				uni.navigateTo({
					url:'./userinfo/userinfo',
					fail(err) {
						console.log(err)
					}
				})
			},
			itmeindex(index){
				console.log(index)
				if(index ==0){
					uni.navigateTo({
						url:'./couponsMy/couponsMy',
						fail(err) {
							console.log(err)
						}
					})
				}else if(index == 1){
					uni.navigateTo({
						url:'./problemFeedback/problemFeedback',
						fail(err) {
							console.log(err)
						}
					})
				}else if(index == 2){
					uni.navigateTo({
						url:'../login/agreement/agreement?id='+3,
						fail(err) {
							console.log(err)
						}
					})
				}else{
					uni.navigateTo({
						url:'../login/agreement/agreement?id='+4,
						fail(err) {
							console.log(err)
						}
					})
				}
			},
			// 点击开通会员
			memberClick(){
				uni.navigateTo({
					url:'./member/member',
					fail(err) {
						console.log(err)
					}
				})
			}
		},
		onLoad() {
			// 用户信息
			this.$ureq({
					url: 'api/user/info',
					method: 'GET',
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					this.userName = res.data.name
					this.userImg = res.data.avatar
					this.memberState = res.data.vip_type
					console.log('用户信息',res)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		height: 100%;
		width: 100%;
		background-color: #F6F1E9;
		position: relative;

		.top-img {
			width: 100%;
			height: 300rpx;
			background-image: url(http://i1.fuimg.com/733036/c78414689eac31c3.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			box-sizing: border-box;
			padding: 30rpx;

			.itme {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.img-itme {
					display: flex;
					justify-content: left;
					align-items: center;

					image {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}

					.img-text {
						margin-left: 30rpx;
						font-family: PingFang SC;

						.name {
							font-size: 36rpx;
							font-weight: 500;
							color: #333333;
							image{
								margin-left: 12rpx;
								width: 39rpx;
								height: 32rpx;
							}
						}

						.hint-one {
							margin-top: 5rpx;
							font-size: 24rpx;
							color: #999999;
							font-weight: 400;
						}

						.hint-tow {
							margin-top: 5rpx;
							font-size: 24rpx;
							color: #8B262B;
							font-weight: 400;
						}
					}
				}

				.img-fan {
					image {
						width: 17rpx;
						height: 28rpx;
					}
				}
			}

		}

		.pos-box {
			width: 750rpx;
			padding: 30rpx;
			box-sizing: border-box;
			position: absolute;
			top: 160rpx;

			.pos-img {
				image {
					width: 690rpx;
					height: 160rpx;
				}
			}
			
			.white-box{
				margin-top: 30rpx;
				padding:0 30rpx;
				background-color: #FFFEFC;
				.white-box-itme{
					padding: 41rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #E6E6E6;
					font-size: 30rpx;
					color: #333;
					font-weight: 400;
					font-family: PingFang SC;
					.itme-left{
						display: flex;
						justify-content: left;
						align-items: center;
						.itme-left-img{
							display: flex;
							justify-content: center;
							align-items: center;
							image{
								width: 30rpx;
								height: 30rpx;
							}
						}
						.itme-left-text{
							margin-left: 26rpx;
						}
					}
					
					.itme-rigth{
						image{
							width: 17rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
	}
</style>
