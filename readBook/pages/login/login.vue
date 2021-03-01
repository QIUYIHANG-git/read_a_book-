<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>鼎秀古籍</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<view class="coupon" scroll-y="true">
			<view class="content-text">
				<view class="text-one">
					<view class="content-text-img">
						<image src="../../static/icon/jgx.png" mode=""></image>
					</view>
					<view style="color: rgb(109,109,109);text-align: center;margin-top: 20rpx;">
						需要登录才可继续操作
					</view>
					<view class="content-text-winxin">
						<button style="border-radius: 24rpx 24rpx 0 0; border: 2rpx solid #000;" open-type="getUserInfo" @click="loginWinxin">微信授权登录</button>
					</view>
					<view class="content-text-onifon">
						<button style="border-radius: 24rpx 24rpx 0 0; border: 2rpx solid #000;" type="default" @click="onLogin">暂不登录</button>
					</view>
					<view class="title-vip">
						*新用户登录既送30天VIP会员特权
					</view>
				</view>
			</view>

			<view class="pos">
				<checkbox-group @change="judgeOff">
					<label style="color: rgb(133,133,133);display: flex;justify-content: left;align-items: center;font-size: 32rpx;">
						<checkbox value="cb" :checked="judgeChecked" color="rgb(133,133,133)" style="transform:scale(0.7)"> 注册登录既视为同意《<text style="color: #ff0000;"
							 @click="agreement">用户服务协议及政策</text>》
						</checkbox>
					</label>
				</checkbox-group>
			</view>
			<!-- 提示窗口 -->
			<view v-if="okConfigOff" style="
			background-color: #fff;
			width: 80%;
			height: 200rpx;
			border: 1rpx solid rgb(36,162,176);
			border-radius: 24rpx 24rpx 0 0 ;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 40%;
			left: 10%;
			">
				<view >
					<view style="color: rgb(51,51,51);font-size: 38rpx;font-weight: bold;text-align: center;">
						登录成功
					</view>
					<view style="margin-top: 30rpx;">
						{{oneTime}}
					</view>
				</view>
			</view>
			<!-- 登录失败 -->
			<view v-if="onConfigOff" style="
			background-color: #fff;
			width: 80%;
			height: 400rpx;
			border: 1rpx solid #000;
			border-radius: 24rpx 24rpx 0 0 ;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 40%; 
			left: 10%;
			">
				<view >
					<view style="color: rgb(51,51,51);font-size: 38rpx;font-weight: bold;text-align: center;">
						<image style="height: 100rpx;width: 100rpx;" src="../../static/icon/jgx.png" mode=""></image>
					</view>
					<view style="margin-top: 30rpx;text-align: center;color: rgb(184,184,184);">
						您的账号处于冻结状态
					</view>
					<view style="margin-top: 10rpx;text-align: center;color: rgb(184,184,184);">
						无法登录，请联系管理员解冻
					</view>
					
					<view style="margin: 30rpx auto 0 auto;">
						<button style="border-radius: 24rpx 24rpx 0 0; border: 1rpx solid #000;" type="default" @click="dispose">立即处理</button>
					</view>
				</view>
			</view>
		</view>
		
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
				checked: true,
				// 
				code: '',
				// 登录成功提示窗口
				okConfigOff:false,
				// 登录冻结提示窗口
				onConfigOff:false,
				// 第一次登录显示
				oneTime:'恭喜您获得30天VIP特权',
				// 协议
				judgeChecked:false
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 微信授权登录
			loginWinxin() {
				this.showAccredit = false;
				console.log('-----------')
				let that = this;
				var p = this.getSetting();
				p.then(function(isAuth) {
					console.log('是否已经授权', isAuth);
					// 判断授权是否成功
					if (isAuth) {
						uni.showToast({
							title: '已成功授权',
							icon: 'success',
							duration: 500
						})
						uni.login({
							provider: 'weixin',
							success(res) {
								console.log(res.code)
								that.code = res.code
								uni.getUserInfo({
									provider: 'weixin',
									lang:'zh_CN',
									success(res) {
										console.log('----用户基本信息------：', res)
										that.$store.commit('infoMessage',{name:res.userInfo.nickName,img:res.userInfo.avatarUrl})
										uni.showToast({
											title:'登录中...',
											icon:'loading',
											duration:500
										}).then(()=>{
											console.log('进去了')
											that.$ureq({
													url: 'api/miniprogram-login',
													data: {
														code: that.code,
														encryptedData: res.encryptedData,
														iv: res.iv
													},
													method: 'POST'
												}).then((res) => {
													console.log(res)
													if(res.errMsg == 'request:ok'){
														that.okConfigOff = true
														setTimeout(() =>{
															that.okConfigOff = false
															uni.switchTab({
																url:'../home/home',
																fail(err) {
																	console.log(err)
																}
															})
														},1500)
														console.log('状态值',res.data.first_login)
														if (res.data.first_login == 1) {
															console.log(res.data.first_login)
														} else {
															that.oneTime = ''
															console.log(res.data.first_login)
														}
														that.$store.state.token ='Bearer ' + res.data.token
														that.$store.state.tokenType = res.data.token_type
														that.$store.commit('climemberState',{memberState:res.data.first_login})
													}else{
														that.onConfigOff = true
													}
												})
												.catch((err) => {
													console.log(err)
												})
										})
									},
									fail(err) {
										console.log(err)
									}
								})
							},
							fail(err) {
								console.log(err)
							}
						});
					} else {
						uni.showToast({
							title: '授权失败，请确认授权已开启',
							mask: true,
							icon: 'none'
						})
					}
				});
			},
			// 判断微信是否授权
			getSetting() {
				return new Promise((resolve, reject) => {
						uni.getSetting({
							success(res) {
								console.log(res)
								if (res.authSetting['scope.userInfo']) {
									console.log('存在')
									resolve(true);
								} else {
									console.log('不存在')
									resolve(false)
								}
							}
						})
					})
					.catch((err) => {
						console.log(err)
					});
			},
			// 用户协议
			agreement() {
				console.log('用户协议')
				uni.navigateTo({
					url:'./agreement/agreement?id='+1,
					fail(err) {
						console.log(err)
					}
				})
			},
			// 选中
			judgeOff(e){
				if(this.judgeChecked== false){
					this.judgeChecked = true
					console.log(this.judgeChecked)
				}else{
					this.judgeChecked = false
					console.log(this.judgeChecked)
				}
			},
			// 问题反馈页面
			dispose(){
				this.onConfigOff = false
				uni.navigateTo({
					url:'../mine/problemFeedback/problemFeedback',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 暂不登录
			onLogin(){
				uni.switchTab({
					url:'../home/home',
					success() {
						uni.showToast({
							title:'请完成登录操作',
							icon:'none',
							duration:2000
						})
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		height: 100%;
		width: 100%;
		background-color: #fff;
		position: relative;
		.content-text {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.text-one {
				width: 84%;
				margin: 0rpx auto 0 auto;
				height: 50%;

				.content-text-img {
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 248rpx;
						height: 248rpx;
					}
				}

				.content-text-winxin {
					width: 80%;
					margin: 40rpx auto 0 auto;
					border-radius: 24rpx 24rpx 0 0;
				}

				.content-text-onifon {
					width: 80%;
					margin: 40rpx auto 0 auto;
					border-radius: 24rpx 24rpx 0 0;
				}
				
				.title-vip{
					width: 80%;
					margin: 40rpx auto 0 auto;
					color: rgb(217,0,17);
					font-size: 27rpx;
				}
			}
		}

		.pos {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 50rpx;
		}
	}
</style>
