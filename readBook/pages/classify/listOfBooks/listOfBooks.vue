<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="http://i2.tiimg.com/733036/c51090a6f01cc19e.png" mode=""></image>
			<text slot='text'>{{titleText}}</text>
		</taber>
		<view  :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<!-- 书籍说明 -->
			<view class="books-information" v-for="(itme,index) in recommendedReading" :key="index">
				<view class="books-ba" @click="recommReading(recommendedReading[index])">
					<view class="pos-ba">
						{{itme.sim_bookname}}
					</view>
				</view>
				<view class="books-text">
					<view class="books-text-one">
						{{itme.sim_bookname}}
					</view>
					<view class="books-text-tow">
						作者：{{itme.tra_author}}
					</view>
					<view class="books-text-therr">
						<text>朝代：</text>{{itme.tra_dynastyname}}
					</view>
					<view class="books-text-four">
						<text>版本：</text>{{itme.tra_version}}
					</view>
					<view class="books-text-fove">
						<text>卷数：</text>{{itme.sim_volumename}}卷
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
				titleText:'',
				recommendedReading:[]
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			recommReading(row){
				console.log(row)
				uni.navigateTo({
					url: '../../home/theBookDetails/theBookDetails?id=' + row.bookguid + '&toc_id=' + '1' + '&name=' + row.sim_bookname,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			addRecommReading(row){
				console.log(row)
				this.$ureq({
						url: 'api/bookshelf',
						method: 'POST',
						data: {
							bookguid: row.bookguid, 
							dynastyname: row.sim_dynastyname
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
							duration: 1000
						})
					})
					.catch(err => {
						console.log(err)
					})
				console.log('加入书架')
			}
		},
		onLoad(op) {
			console.log(op)
			this.titleText = op.text
			// op.categoryCount
			this.$ureq({
				url: 'api/book/search',
				method: 'GET',
				data: {
					page:'1',
					per_page: op.categoryCount,
					catagoryCode:op.catagoryCode
				}
			})
			.then( (res) => {
				console.log('书籍',res)
				this.recommendedReading = res.data
			})
			.catch((err) => {
				console.log(err)
			})
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
					width: 310rpx;
					height: 38rpx;
					font-size: 32rpx;
					color: #000;
					font-weight: 500;
					overflow: hidden;
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

