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
					<image src="https://api-guji.sinmore.vip/wximg/100/a10搜索.png" mode=""></image><input @focus="search" placeholder-style="color: #B9A798;" placeholder="请输入书名/正文内容"
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
					<text>去书架</text>
					<image src="https://api-guji.sinmore.vip/wximg/100/去书架.png" mode=""></image>
				</view>
			</view>
			<!-- 正在看书籍 -->
			<view class="books">
				<view class="books-box">
					<view class="books-itme" v-for="(shuitme,index) in shuList" :key="index" :style="{backgroundImage:`${shuitme.url}`}" @click="shujiyd(shuList[index])">
						<view class="text-box">
							{{shuitme.book_info.bookname}}
						</view>
					</view>
				</view>
				<view class="books-pos">
					<view class="text-pos">
						<view class="text-itme" v-for="(shutext,index) in shuList" :key="index">
							{{shutext.book_info.bookname}}
						</view>
					</view>
				</view>
			</view>
			<!-- 分类 -->
			<view class="text-classify">
				<view class="text-classify-one">
					<view class="text-classify-one-itme" @click="pool()">
						<view class="itme-img">
							<image src="https://api-guji.sinmore.vip/wximg/100/总库.png" mode=""></image>
						</view>
						<view class="itme-text">
							总库
						</view>
					</view>
					<view class="text-classify-one-itme" v-for="(itme,index) in listClass" :key="index" @click="topClassification(listClass[index],index)">
						<view class="itme-img">
							<image :src="itme.url" mode=""></image>
						</view>
						<view class="itme-text">
							{{itme.catagoryName}}
						</view>
					</view>
				</view>
			</view>
			<!-- 广告 -->
			<view v-if="memberState == 1" class="advertising-member" @click="addmember()">
				<image src="https://api-guji.sinmore.vip/wximg/100/会员.png" mode=""></image>
			</view>
			<view class="advertising-red-packet" @click="discounts()">
				<image src="https://api-guji.sinmore.vip/wximg/100/红包.png" mode=""></image>
			</view>
			<!-- 推荐 -->
			<view class="recommend-box">
				<view class="recommend-itme">
					<view class="text-title">推荐书籍</view>
				</view>
				<view class="go-bookrack" @click="moreOff">
					<text>更多</text>
					<image src="https://api-guji.sinmore.vip/wximg/100/去书架.png" mode=""></image>
				</view>
			</view>
			<!-- 书籍说明 -->
			<view class="books-information" v-for="(itme,index) in recommendedReading" :key="index">
				<view class="books-ba" :style="{backgroundImage:`${itme.url}`}" @click="recommReading(recommendedReading[index])">
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
				recommendedReading: [],
				// 分类
				listClass: [],
				// 书籍
				shuList: [{
						text: '周易孔義集說',
						url: 'url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png)'
					},
					{
						text: '社司轉帖',
						url: 'url(http://i1.fuimg.com/733036/238573e6794ffa31.png)'
					},
					{
						text: '修文殿禦覽存',
						url: 'url(http://i1.fuimg.com/733036/6a2fba295b0f7cc1.png)'
					}
				],
				// 用户权限
				memberState:1
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			addmember(){
				uni.navigateTo({
					url:'../mine/addVIP/addVIP',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 搜索事件
			search(){
				uni.navigateTo({
					url:'../bookrack/search/search',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 去书架
			goBookrack() {
				uni.switchTab({
					url: '../bookrack/bookrack',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 更多事件
			moreOff() {
				console.log('点击了更多')
				uni.navigateTo({
					url:'./recommend/recommend',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 书籍内容
			recommReading(row) {
				console.log(row)
				uni.navigateTo({
					url: './theBookDetails/theBookDetails?id=' + row.bookguid + '&toc_id=' + '1' + '&name=' + row.documentName+'&dynastyname='+row.dynasty,
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
			addRecommReading(row) {
				console.log(row)
				this.$ureq({
					url: 'api/bookshelf',
					method: 'POST',
					data: {
						bookguid: row.bookguid,
						dynastyname: row.dynasty
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					console.log(res)
					uni.showToast({
						title: '加入书架成功',
						icon: 'success',
						duration: 2000
					})
				})
				.catch(err => {
					console.log(err)
				})
				console.log('加入书架')
			},
			// 总库
			pool() {
				this.$store.commit('elimiclass')
				uni.switchTab({
					url: '../classify/classify',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 顶级分类
			topClassification(row,index){
				this.$store.commit('classadd',{id:row.id,index:index})
				uni.switchTab({
					url: '../classify/classify',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 限时优惠
			discounts(){
				uni.navigateTo({
					url:'./discounts/discounts',
					fail(err){
						console.log(err)
					}
				})
			},
			// 正在阅读
			being(){
				this.$ureq({
					url: 'api/bookshelf/recently',
					method: 'GET',
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					console.log('正在阅读',res)
					this.shuList = res.data
					if(this.shuList.length == 1){
						this.shuList[0].url = 'url(https://api-guji.sinmore.vip/wximg/100/经部封面.png)'
					}else if(this.shuList.length == 2){
						this.shuList[0].url = 'url(https://api-guji.sinmore.vip/wximg/100/经部封面.png)'
						this.shuList[1].url = 'url(https://api-guji.sinmore.vip/wximg/100/史部封面.png)'
					}else if(this.shuList.length == 3){
						this.shuList[0].url = 'url(https://api-guji.sinmore.vip/wximg/100/经部封面.png)'
						this.shuList[1].url = 'url(https://api-guji.sinmore.vip/wximg/100/史部封面.png)'
						this.shuList[2].url = 'url(https://api-guji.sinmore.vip/wximg/100/子部封面.png)'
					}else{
						
					}
					
				})
				.catch(err => {
					console.log(err)
				})
			},
			shujiyd(row){
				console.log(row)
				uni.navigateTo({
					url: './theBookDetails/theBookDetails?id=' + row.bookguid + '&toc_id=' + row.default_group + '&name=' + row.book_info.bookname,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			ueseinfo(){
				// 用户信息
				this.$ureq({
						url: 'api/user/info',
						method: 'GET',
						header: {
							Accept: 'application/json',
							Authorization: String(this.$store.state.token)
						}
					}).then(res => {
						this.$store.commit('climemberState',{memberState:res.data.vip_type})
						this.memberState = this.$store.state.memberState
						console.log(this.$store.state.memberState)
						console.log('用户信息',res)
					})
					.catch(err => {
						console.log(err)
					})
			},
			classdo(){
				// 顶级分类
				this.$ureq({
						url: 'api/book/category',
						method: 'GET'
					})
					.then((res) => {
						this.listClass = res.data
						// console.log('分类',res)
						this.listClass[0].url = 'https://api-guji.sinmore.vip/wximg/100/經部.png'
						this.listClass[1].url = 'https://api-guji.sinmore.vip/wximg/100/史部.png'
						this.listClass[2].url = 'https://api-guji.sinmore.vip/wximg/100/子部.png'
						this.listClass[3].url = 'https://api-guji.sinmore.vip/wximg/100/集部.png'
						this.listClass[4].url = 'https://api-guji.sinmore.vip/wximg/100/叢部.png'
						console.log('------------>', this.listClass)
					})
					.catch((err) => {
						console.log(err)
					})
			}
		},
		onLoad() {
			this.ueseinfo()
			
			this.$ureq({
					url: 'common/banner',
					method: 'GET'
				})
				.then((res) => {
					console.log(res)
					this.BannerList = res.data
				})
				.catch((err) => {
					console.log(err)
				})
			
		},
		onShow() {
			// 正在阅读
			this.being()
			this.classdo()
			// 推荐阅读
			this.$ureq({
					url: 'api/book/recommend',
					method: 'GET',
					data: {
						page: '1',
						per_page: '5'
					}
				})
				.then((res) => {
					console.log('推荐阅读请求:', res)
					this.recommendedReading = res.data
					this.recommendedReading.length = res.data.length
					this.recommendedReading[0].url='url(https://api-guji.sinmore.vip/wximg/100/经部封面-列表.png)'
					this.recommendedReading[1].url='url(https://api-guji.sinmore.vip/wximg/100/史部封面-列表.png)'
					this.recommendedReading[2].url='url(https://api-guji.sinmore.vip/wximg/100/集部封面-列表.png)'
					this.recommendedReading[3].url='url(https://api-guji.sinmore.vip/wximg/100/丛部封面-列表.png)'
					this.recommendedReading[4].url='url(https://api-guji.sinmore.vip/wximg/100/子部封面-列表.png)'
					// for(let i=0;i<res.data.length;i++){
						
					// }
				})
				.catch((err) => {
					console.log(err)
				})
		},
		onHide() {
			console.log('离开了')
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		height: 100%;
		width: 100%;
		background-color: rgb(250, 248, 243);

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
		.title-box {
			display: flex;
			justify-content: space-between;
			align-items: baseline;

			.title-itme {
				width: 371.3rpx;
				height: 104rpx;
				margin-top: 39rpx;
				background-image: url(https://api-guji.sinmore.vip/wximg/100/标题装饰.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.text-title {
					padding-top: 43rpx;
					margin-left: 31rpx;
					width: 150rpx;
					height: 34rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
					// line-height: 60rpx;
				}
			}

			.go-bookrack {
				font-size: 26rpx;
				color: #999999;
				font-family: PingFang SC;
				font-weight: 400;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					margin: 0 30rpx 0 11rpx;
					width: 14rpx;
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
				justify-content: left;
				align-items: center;
				// padding: 0 29rpx;
				box-sizing: border-box;

				.books-itme {
					width: 206rpx;
					height: 296rpx;
					margin-left: 38rpx;
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
						overflow: hidden;
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
				background-image: url(https://api-guji.sinmore.vip/wximg/100/推荐书籍.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.text-pos {
					position: relative;
					top: 50rpx;
					width: 100%;
					height: 30rpx;
					display: flex;
					justify-content: left;
					align-items: center;
					// padding: 0 29rpx;
					box-sizing: border-box;

					.text-itme {
						width: 206rpx;
						height: 122%;
						font-size: 28rpx;
						margin-left: 38rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #000;
						overflow: hidden;
					}
				}
			}
		}

		// 分类
		.text-classify {
			width: 100%;
			// height: 200rpx;
			margin-top: 148rpx;
			font-family: PingFang SC;

			.text-classify-one {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				padding: 0 40rpx;
				box-sizing: border-box;
				margin-bottom: 50rpx;

				.text-classify-one-itme {
					width: 150rpx;
					margin-right: 22rpx;
					margin-bottom: 50rpx;

					.itme-img {
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 150rpx;
							height: 154rpx;
						}
					}

					.itme-text {
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
		.advertising-member {
			width: 690rpx;
			height: 160rpx;
			margin: 0 auto;

			image {
				width: 690rpx;
				height: 160rpx;
			}
		}

		.advertising-red-packet {
			width: 690rpx;
			height: 100rpx;
			margin: 30rpx auto;

			image {
				width: 690rpx;
				height: 100rpx;
			}
		}

		//推荐书籍
		.recommend-box {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			margin-bottom: 15rpx;

			.recommend-itme {
				width: 371.3rpx;
				height: 104rpx;
				margin-top: 39rpx;
				background-image: url(https://api-guji.sinmore.vip/wximg/100/标题装饰.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.text-title {
					padding-top: 43rpx;
					margin-left: 31rpx;
					width: 150rpx;
					height: 34rpx;
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
					// line-height: 60rpx;
				}
			}

			.go-bookrack {
				font-size: 26rpx;
				color: #999999;
				font-family: PingFang SC;
				font-weight: 400;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					margin: 0 30rpx 0 11rpx;
					width: 14rpx;
					height: 24rpx;
				}
			}
		}

		// 书籍信息
		.books-information {
			display: flex;
			justify-content: left;
			align-items: center;
			margin-bottom: 54rpx;
			position: relative;
			z-index: 999;

			.ba-pos {
				width: 207rpx;
				height: 32rpx;
				z-index: -1;
				background-image: url(https://api-guji.sinmore.vip/wximg/100/书架.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				position: absolute;
				bottom: -18rpx;
				left: 20rpx;
			}

			.books-ba {
				width: 185rpx;
				height: 266rpx;
				margin-left: 31rpx;
				// background-image: url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;

				.pos-ba {
					width: 41rpx;
					height: 171rpx;
					margin-top: 26rpx;
					margin-left: 21rpx;
					overflow: hidden;
					text-align: center;
				}

			}

			.books-text {
				width: 310rpx;
				height: 266rpx;
				margin-left: 29rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				color: #666666;
				font-weight: 400;

				.books-text-one {
					// margin-top: 29rpx;
					font-size: 32rpx;
					color: #000;
					font-weight: 500;
					width: 100%;
					height: 38rpx;
					overflow: hidden;
				}

				.books-text-tow {
					margin-top: 15rpx;
					width: 100%;
					height: 36rpx;
					overflow: hidden;
				}

				.books-text-therr {
					margin-top: 15rpx;
					width: 100%;
					height: 36rpx;
					overflow: hidden;
				}

				.books-text-four {
					margin-top: 15rpx;
					width: 100%;
					height: 36rpx;
					overflow: hidden;
				}

				.books-text-fove {
					margin-top: 15rpx;
					width: 100%;
					height: 36rpx;
					overflow: hidden;
				}
			}

			.books-go {
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
