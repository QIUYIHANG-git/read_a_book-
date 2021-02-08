<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>鼎秀古籍</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<!-- 搜索盒子 -->
			<view class="search-box">
				<view class="search-itme">
					<image src="../../static/icon/home/aso.png" mode=""></image><input placeholder-style="color: #B9A798;" placeholder="请输入书名/正文内容"
					 type="text" value="" />
				</view>
			</view>
			<!-- 轮播图 -->
			<view class="Banner">
				<u-swiper :list="BannerList" name="asset" mode="rect" height="280rpx" border-radius="0"></u-swiper>
			</view>
			<!-- 标题 -->
			<view class="title-box">
				<view class="title-itme">
					<view class="text-title">正在阅读</view>
				</view>
				<view class="go-bookrack" @click="goBookrack">
					<text>去书架</text><image src="../../static/icon/home/去书架.png" mode=""></image>
				</view>
			</view>
			<!-- 正在看书籍 -->
			<view class="books">
				<view class="books-box">
					<view class="books-itme" v-for="(shuitme,index) in shuList" :key="index" :style="{backgroundImage:`${shuitme.url}`}">
						<view class="text-box">
							{{shuitme.text}}
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
			<!-- 分类 -->
			<view class="text-classify">
				<view class="text-classify-one">
					<view class="text-classify-one-itme">
						<view class="itme-img">
							<image src="http://i1.fuimg.com/733036/9562348daa8754b0.png" mode=""></image>
						</view>
						<view class="itme-text">
							总库
						</view>
					</view>
					<view class="text-classify-one-itme">
						<view class="itme-img">
							<image src="http://i1.fuimg.com/733036/7e147a5b84a16058.png" mode=""></image>
						</view>
						<view class="itme-text">
							經部
						</view>
					</view>
					<view class="text-classify-one-itme">
						<view class="itme-img">
							<image src="http://i1.fuimg.com/733036/aadc1469fa043b55.png" mode=""></image>
						</view>
						<view class="itme-text">
							史部
						</view>
					</view>
				</view>
				<view class="text-classify-one">
					<view class="text-classify-one-itme">
						<view class="itme-img">
							<image src="http://i1.fuimg.com/733036/b26bb68f1360316e.png" mode=""></image>
						</view>
						<view class="itme-text">
							子部
						</view>
					</view>
					<view class="text-classify-one-itme">
						<view class="itme-img">
							<image src="http://i1.fuimg.com/733036/e0dac046bba7d2cf.png" mode=""></image>
						</view>
						<view class="itme-text">
							集部
						</view>
					</view>
					<view class="text-classify-one-itme">
						<view class="itme-img">
							<image src="http://i1.fuimg.com/733036/894160d42d45c96d.png" mode=""></image>
						</view>
						<view class="itme-text">
							叢部
						</view>
					</view>
				</view>
			</view>
			<!-- 广告 -->
			<view class="advertising-member">
				<image src="http://i1.fuimg.com/733036/16a850f04e35a834.png" mode=""></image>
			</view>
			<view class="advertising-red-packet">
			 	<image src="http://i1.fuimg.com/733036/771b3fc2134cd137.png" mode=""></image>
			</view>
			<!-- 推荐 -->
			<view class="recommend-box">
				<view class="recommend-itme">
					<view class="text-title">推荐书籍</view>
				</view>
				<view class="go-bookrack" @click="moreOff">
					<text>更多</text><image src="../../static/icon/home/去书架.png" mode=""></image>
				</view>
			</view>
			<!-- 书籍说明 -->
			<view class="books-information" v-for="(itme,index) in recommendedReading" :key="index" >
				<view class="books-ba" @click="recommReading(recommendedReading[index])">
					<view class="pos-ba">
						{{itme.documentName}}
					</view>
				</view>
				<view class="ba-pos">
					
				</view>
				<view class="books-text">
					<view class="books-text-one">
						{{itme.documentName}}
					</view>
					<view class="books-text-tow">
						作者：{{itme.author}}
					</view>
					<view class="books-text-therr">
						<text>朝代：</text>{{itme.dynasty}}
					</view>
					<view class="books-text-four">
						<text>版本：</text>{{itme.version}}
					</view>
					<view class="books-text-fove">
						<text>卷数：</text>{{itme.volumeName}}卷
					</view>
				</view>
				<view class="books-go" @click="addRecommReading(recommendedReading[index])">
					加入书架
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
				// 轮播数组
				BannerList: [],
				// 推荐阅读
				recommendedReading:[],
				// 书籍
				shuList: [{
						text: '周易孔義集說',
						url: 'url(http://i1.fuimg.com/733036/019f1db278c77445.png)'
					},
					{
						text: '社司轉帖',
						url: 'url(http://i1.fuimg.com/733036/0410811b532653e4.png)'
					},
					{
						text: '修文殿禦覽存',
						url: 'url(http://i1.fuimg.com/733036/caecb6a3d8d048e6.png)'
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
			// 去书架
			goBookrack(){
				uni.switchTab({
					url:'../bookrack/bookrack',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 更多事件
			moreOff(){
				console.log('点击了更多')
			},
			// 书籍内容
			recommReading(row){
				console.log(row)
				uni.navigateTo({
					url:'./theBookDetails/theBookDetails?id='+ row.bookguid+'&toc_id='+'1'+'&name='+row.documentName,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
				
				console.log('点击')
			},
			//加入书架
			addRecommReading(row){
				console.log(row)
				this.$ureq({
					url:'api/bookshelf',
					method:'POST',
					data:{
						bookguid:row.bookguid,
						dynastyname:row.dynasty
					},
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res => {
					console.log(res)
					uni.showToast({
						title:'加入书架成功',
						icon:'success',
						duration:2000
					})
				})
				.catch(err => {
					console.log(err)
				})
				console.log('加入书架')
			 }
		},
		onLoad() {
			this.$ureq({
				url:'common/banner',
				method:'GET'
			})
			.then( (res)=> {
				console.log(res)
				this.BannerList = res.data
			})
			.catch((err) => {
				console.log(err)
			})
		},
		onShow() {
			// 推荐阅读
			this.$ureq({
				url:'api/book/recommend',
				method:'GET',
				data:{
					page:'1',
					per_page:'5'
				}
			})
			.then( (res)=> {
				console.log('推荐阅读请求:',res)
				this.recommendedReading = res.data
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
		background-color: rgb(250,248,243);

		.search-box {
			background-color: #A1814C;
			height: 94rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 10rpx 0 20rpx 0;

			.search-itme {
				margin: 0 auto;
				height: 64rpx;
				border-radius: 30rpx;
				width: 690rpx;
				background-color: #fff;
				display: flex;
				justify-content: left;
				align-items: center;

				image {
					margin-left: 20rpx;
					width: 28rpx;
					height: 28rpx;
				}

				input {
					margin-left: 11rpx;
					font-size: 27rpx;
					height: 27rpx;
					width: 264rpx;
					color: #B9A798;
				}
			}

		}
		// 轮播图盒子
		.Banner {
			height: 280rpx;
			width: 690rpx;
			margin: 29rpx auto 0 auto;
		}
		//标题 
		.title-box{
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			.title-itme{
				width: 371.3rpx;
				height: 104rpx;
				margin-top: 39rpx;
				background-image: url(../../static/icon/home/title.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				.text-title{
					padding-top: 43rpx;
					margin-left: 31rpx;
					width: 141rpx;
					height: 34rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
					// line-height: 60rpx;
				}
			}
			
			.go-bookrack{
				font-size: 26rpx;
				color: #999999;
				font-family: PingFang SC;
				font-weight: 400;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					margin: 0 30rpx 0 11rpx;
					width:14rpx ;
					height: 24rpx;
				}
			}
		}
		// 正在阅读
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
				background-image: url(../../static/icon/home/推荐书籍.png);
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
		// 分类
		.text-classify{
			width: 100%;
			// height: 200rpx;
			margin-top: 148rpx;
			font-family: PingFang SC;
			
			.text-classify-one{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 40rpx;
				box-sizing: border-box;
				margin-bottom: 50rpx;
				.text-classify-one-itme{
					width: 150rpx;
					.itme-img{
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 150rpx;
							height: 154rpx;
						}
					}
					.itme-text{
						width: 100%;
						text-align: center;
						font-size: 32rpx;
						font-weight: 500;
						letter-spacing: 10rpx;
						color: #000;
					}
				}
			}
		}
		// 广告
		.advertising-member{
			width: 690rpx;
			height: 160rpx;
			margin: 0 auto;
			image{
				width: 690rpx;
				height: 160rpx;
			}
		}
		.advertising-red-packet{
			width: 690rpx;
			height: 100rpx;
			margin: 30rpx auto;
			image{
				width: 690rpx;
				height: 100rpx;
			}
		}
		//推荐书籍
		.recommend-box{
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			margin-bottom: 15rpx;
			.recommend-itme{
				width: 371.3rpx;
				height: 104rpx;
				margin-top: 39rpx;
				background-image: url(../../static/icon/home/title.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				.text-title{
					padding-top: 43rpx;
					margin-left: 31rpx;
					width: 141rpx;
					height: 34rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
					// line-height: 60rpx;
				}
			}
			
			.go-bookrack{
				font-size: 26rpx;
				color: #999999;
				font-family: PingFang SC;
				font-weight: 400;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					margin: 0 30rpx 0 11rpx;
					width:14rpx ;
					height: 24rpx;
				}
			}
		}
		// 书籍信息
		.books-information{
			display: flex;
			justify-content: left;
			align-items: center;
			margin-bottom: 54rpx;
			position: relative;
			z-index: 999;
			.ba-pos{
				width: 207rpx;
				height: 32rpx;
				z-index: -1;
				background-image: url(http://i1.fuimg.com/733036/b57cb98258cd9e2a.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				position: absolute;
				bottom: -18rpx;
				left: 20rpx;
			}
			.books-ba{
				width: 185rpx;
				height: 266rpx;
				margin-left: 31rpx;
				background-image: url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				.pos-ba{
					width: 41rpx;
					height: 171rpx;
					margin-top: 26rpx;
					margin-left: 21rpx;
					overflow: hidden;
					text-align: center;
				}
					
			}
			.books-text{
				width: 310rpx;
				height: 266rpx;
				margin-left: 29rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				color: #666666;
				font-weight: 400;
				.books-text-one{
					margin-top: 29rpx;
					font-size: 32rpx;
					color: #000;
					font-weight: 500;
				}
				.books-text-tow{
					margin-top: 15rpx;
				}
				.books-text-therr{
					margin-top: 15rpx;
				}
				.books-text-four{
					margin-top: 15rpx;
				}
				.books-text-fove{
					margin-top: 15rpx;
				}
			}
			
			.books-go{
				background-color: #A3834F;
				width: 140rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #fff;
				margin-left: 25rpx;
			}
		}
	}
</style>
