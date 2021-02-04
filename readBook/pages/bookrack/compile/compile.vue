<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>书架</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true" v-if="updes">
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

			<!-- 自定义分组 -->
			<view class="img-itme-tow" v-for="(listUrl,index) in listTow" :key="index" :style="{backgroundImage:`${listUrl.url}`}">
				<view class="text-number">
					{{listUrl.name}}<text>[{{listUrl.book_count}}]</text>
				</view>
				<view class="in-detail">
					<image src="http://i1.fuimg.com/733036/dac9aea73f67ec95.png" mode=""></image>
				</view>
				<!-- 选中编辑 -->
				<!-- <view class="ori" @click="oriOd(index)">
					<image v-if="orinumber[index] == offmo[index]"  src="http://i1.fuimg.com/733036/16a9b425f47dcf13.png" ></image>
					<image v-else src="http://i1.fuimg.com/733036/ad4f2460146f9b40.png" mode=""></image>
				</view> -->
			</view>
			<!-- 推荐书籍 -->
			<view class="books">
				<view class="books-box">
					<view class="books-itme" v-for="(shuitme,index) in shuList" :key="index" :style="{backgroundImage:`${shuitme.url}`}">
						<view class="text-box">
							{{shuitme.text}}
						</view>
						<!-- 选中编辑 -->
						<view class="ori" @click="oriOd(index)">
							<image v-if="orinumber[index] == offmo[index]"  src="http://i1.fuimg.com/733036/16a9b425f47dcf13.png" ></image>
							<image v-else src="http://i1.fuimg.com/733036/ad4f2460146f9b40.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="books-pos">
					<view class="text-pos">
						<view class="text-itme" v-for="(shutext,index) in shuList" :key="index">
							{{shutext.text}}
						</view>
					</view>
				</view>
			</view>
			<!-- 推荐书籍二 -->
			<view class="books" style="margin-top: 90rpx; ">
				<view class="books-box">
					<view class="books-itme" v-for="(shuitme,index) in shuListTow" :key="index" :style="{backgroundImage:`${shuitme.url}`}">
						<view class="text-box">
							{{shuitme.text}}
						</view>
					</view>
				</view>
				<view class="books-pos">
					<view class="text-pos">
						<view class="text-itme" v-for="(shutext,index) in shuListTow" :key="index">
							{{shutext.text}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="botton-box">
			<view class="botton-itme">
				<image src="http://i1.fuimg.com/733036/eb3255301745147f.png" mode=""></image><text style="color: #A1814C;margin-left: 14rpx;">移动至</text>
			</view>
			<view class="botton-itme">
				<image src="http://i1.fuimg.com/733036/b4b77ca4fecc3173.png" mode=""></image><text style="color: #742121;margin-left: 14rpx;" @click="deletefa">删除</text>
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
				// selectedUrl:'http://i1.fuimg.com/733036/16a9b425f47dcf13.png',
				// unselectedUrl:'http://i1.fuimg.com/733036/ad4f2460146f9b40.png',
				// orinumber
				orinumber:[],
				updes:true,
				// 
				offmo:[],
				// 
				listTow:[],
				// 
				shuList: [{
						text: '周易孔義集說',
						url: 'url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png)'
					},
					{
						text: '社司轉帖',
						url: 'url(http://i1.fuimg.com/733036/1ef9ed57bdb18d55.png)'
					},
					{
						text: '修文殿禦覽存',
						url: 'url(http://i1.fuimg.com/733036/b6a91f6bb5db7669.png)'
					}
				],
				shuListTow: [{
						text: '周易孔義集說',
						url: 'url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png)'
					},
					{
						text: '修文殿禦覽存',
						url: 'url(http://i1.fuimg.com/733036/b6a91f6bb5db7669.png)'
					},
					{
						text: '相宗絡索',
						url: 'url(http://i1.fuimg.com/733036/b6a91f6bb5db7669.png)'
					}
				],
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
			cancelOff() {
				uni.navigateBack({
					delta: 1
				});
			},
			//选事件
			oriOd(index){
				console.log(this.listTow[index])
				this.updes = false
				let statc = 0
				for(let i=0;i<this.offmo.length;i++){
					if(this.offmo[i] == index){
						console.log('进去了')
						statc = 1
					}
				}
				statc == 0 ? (this.offmo[index]=index) : this.offmo[index] = null
				setImmediate(()=>{
					this.updes = true
				},10)
			},
			// 删除分组
			deletefa(){
				this.$ureq({
					url:'api/bookgroup/',
					method:'DELETE',
					data:{
						id:id
					},
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				})
			}
		},
		mounted() {
			// 登录自定义列表
			this.$ureq({
				url:'api/bookgroup',
				method:'GET',
				header:{
					Accept:'application/json',
					Authorization:String(this.$store.state.token) 
				}
			}).then(res =>{
				this.listTow = res.data
				this.orinumber.length = this.listTow.length
				this.offmo.length = this.listTow.length
				// for(){
					
				// }
				for(let i in this.listTow){
					// url 书单
					this.listTow[i].url = 'url(http://i1.fuimg.com/733036/858a6e0a012d3a88.png)',
					this.orinumber[i] = Number(i)
					// this.orinumber[i] = 1
				}
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
		},
		onLoad() {
			this.$ureq({
				url:'api/bookshelf',
				method:'GET',
				data:{
					page:'1',
					per_page:'6'
				},
				header:{
					Accept:'application/json',
					Authorization:String(this.$store.state.token) 
				}
			}).then(res => {
				console.log('请求成功',res)
			})
			.catch(err => {
				console.log('请求失败',err)
			})
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		height: calc(100% - 98rpx);
		width: 100%;
		background-color: #F6F1E9;

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

				text {
					margin: 0 15rpx;
				}
			}

			.top-mou-therr {}
		}

		.img-itme-tow {
			width: 690rpx;
			height: 120rpx;
			margin: 44rpx auto 30rpx auto;
			background-image: url(http://i1.fuimg.com/733036/858a6e0a012d3a88.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;

			.ori {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				position: absolute;
				top: 0;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.text-number {
				font-size: 32rpx;
				color: #ffffff;
				font-family: PingFang SC;
				margin-left: 151rpx;
			}

			.in-detail {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 30rpx;

				image {
					width: 38rpx;
					height: 38rpx;
				}
			}
		}
		
		.books {
			position: relative;
			padding-top: 28rpx;
			width: 100%;
			height: 296rpx;
			z-index: 999;
		
			.books-box {
		
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 29rpx;
				box-sizing: border-box;
		
				.books-itme {
					width: 206rpx;
					height: 296rpx;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					position: relative;
					.ori {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						position: absolute;
						top: 0;
					
						image {
							width: 40rpx;
							height: 40rpx;
						}
					}
		
					.text-box {
						font-size: 24rpx;
						margin-top: 28rpx;
						margin-left: 18rpx;
						width: 55rpx;
						height: 200rpx;
						padding: 5rpx 18rpx;
						box-sizing: border-box;
						color: #333333;
						font-family: PingFang SC;
					}
				}
			}
		
			.books-pos {
				position: absolute;
				z-index: -1;
				bottom: -80rpx;
				height: 118.5rpx;
				width: 100%;
				background-image: url(http://i1.fuimg.com/733036/ac0d7b103ba414e6.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				
				.text-pos{
					position: relative;
					top: 50rpx;
					width: 100%;
					height: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 29rpx;
					box-sizing: border-box;
					.text-itme{
						width: 206rpx;
						height: 100%;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #000;
					}
				}
			}
		}
	}
	//
	.botton-box{
		width: 750rpx;
		height: 98rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		background-color: #fff;
		display: flex;
		justify-content: left;
		align-items: center;
		.botton-itme{
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36rpx;
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>
