<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="https://api-guji.sinmore.vip/wximg/110/返回.png" mode=""></image>
			<text slot='text'>推荐书籍</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true" @scrolltolower="shclick">
			<!-- 书籍说明 -->
			<view class="books-information" v-for="(itme,index) in recommendedReading" :key="index">
				<view class="books-ba" @click="recommReading(recommendedReading[index])">
					<view class="pos-ba">
						{{itme.documentName}}
					</view>
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
	import taber from '../../../comments/common/taber/taber.vue'
	export default {
		components: {
			taber
		},
		data() {
			return {
				matop: '',
				recommendedReading:[],
				listReceive:[],
				pages:1
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 书籍方法
			shuList(page){
				this.$ureq({
						url: 'api/book/recommend',
						method: 'GET',
						data: {
							page: String(page),
							per_page: '10'
						}
					})
					.then((res) => {
						console.log('推荐阅读请求:', res)
						this.listReceive = res.data
						this.recommendedReading = [...this.recommendedReading,...this.listReceive]
					})
					.catch((err) => {
						console.log(err)
					})
			},
			shclick(){
				this.pages += 1
				this.shuList(this.pages)
				console.log('到底了')
			},
			// 书籍内容
			recommReading(row) {
				console.log(row)
				uni.navigateTo({
					url: '../theBookDetails/theBookDetails?id=' + row.bookguid + '&toc_id=' + '1' + '&name=' + row.documentName,
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
			}
		},
		onLoad() {
			this.shuList(1)
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #F6F1E9;
		font-family: PingFang SC;
		// 书籍信息
		.books-information {
			display: flex;
			justify-content: left;
			align-items: center;
			margin-top: 49rpx;
			margin-bottom: 54rpx;
			position: relative;
			z-index: 999;
		
		
			.books-ba {
				width: 185rpx;
				height: 266rpx;
				margin-left: 31rpx;
				background-image: url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png);
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
					font-size: 32rpx;
					color: #000;
					font-weight: 500;
				}
		
				.books-text-tow {
					margin-top: 15rpx;
				}
		
				.books-text-therr {
					margin-top: 15rpx;
				}
		
				.books-text-four {
					margin-top: 15rpx;
				}
		
				.books-text-fove {
					margin-top: 15rpx;
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
