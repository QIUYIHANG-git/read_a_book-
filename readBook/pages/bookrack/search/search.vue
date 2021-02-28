<template>
	<view class="coupon-box" :style="{ height: `calc(100vh - ${matop})` }">
		<taber @child-event="parevent">
			<image slot="img" src="http://i1.fuimg.com/733036/c51090a6f01cc19e.png" mode=""></image>
			<text slot="text">搜索</text>
		</taber>
		<view
			class="id"
			:style="{
				marginTop: `${matop}`
			}"
		></view>
		<scroll-view class="coupon" scroll-y="true" @scrolltolower="shclick">
			<view class="search-box">
				<view class="search-itme">
					<image src="http://i1.fuimg.com/733036/9e98775c16b2b2e8.png" mode=""></image>
					<input v-model="searchTerms" placeholder-style="color: #B9A798;" placeholder="请输入书名/正文内容" type="text" value="" @blur="enterThe" />
				</view>
				<view class="text-itme" @click="soCilck">搜索</view>
			</view>
			<!--显示历史搜索  -->
			<view v-if="searchOff">
				<view class="search-history-box">
					<view class="tiele-text">搜索历史</view>
					<view class="delete-text" @click="deleteEnterThe">清空</view>
				</view>
				<!-- 缓存数据盒子 -->
				<view class="search-content" v-for="(itme, index) in recordList" :key="index" @click="cacheCilck(recordList[index])">
					<image src="http://i1.fuimg.com/733036/ec5461f93fd1a8f0.png"></image>
					<text>{{ itme }}</text>
				</view>
			</view>
			<!-- 显示搜索结果 -->
			<view class="search-shows" v-else>
				<view class="taber-box">
					<view v-for="(taitme, index) in itmeList" :key="index">
						<text @click="koouij(index)" :class="iloff == index ? 'lione' : 'litow'">{{ taitme }}</text>
					</view>
				</view>
				<!-- 书籍说明 -->
				<view class="books-information" v-for="(itme, index) in recommendedReading" :key="index">
					<view class="books-ba" @click="recommReading(recommendedReading[index])">
						<view class="pos-ba">{{ itme.sim_bookname }}</view>
					</view>
					<view class="ba-pos"></view>
					<view :class="iloff==1?'books-textsx':'books-text'">
						<view style="
						display: flex;
						justify-content: space-between;
						align-items: center;
						">
							<view>
								<view class="books-text-one">{{ itme.sim_bookname }}</view>
								<view class="books-text-tow">作者：<text :class="iloff==2?'textone':'texttow'">{{ itme.tra_author}}</text></view>
							</view>
							<view>
								<view v-if="iloff==1"  class="books-go" @click="addRecommReading(recommendedReading[index])">加入书架</view>
							</view>
						</view>
						<view v-if="iloff==1">
							<view style="background-color: #E3DCD1; padding: 20rpx;margin-top: 34rpx;">
								{{itme.tra_chapter}} <text style="color: #A3834F;text-decoration:underline;margin-left: 10rpx;" @click="allCilck(recommendedReading[index])">查看全部></text>
							</view>
						</view>
						<view v-else>
							<!-- <view class="books-text-tow">作者：<text :class="iloff==2?'textone':'texttow'">{{ itme.tra_author}}</text></view> -->
							<view class="books-text-therr">
								<text>朝代：</text>
								{{ itme.sim_dynastyname }}
							</view>
							<view class="books-text-four">
								<text>版本：</text>
								<text :class="iloff==3?'textone':'texttow'">{{ itme.sim_version }}</text>
							</view>
							<view class="books-text-fove">
								<text>卷数：</text>
								{{ itme.sim_volumename }}卷
							</view>
							
						</view>
					</view>
					<view v-if="iloff==1"></view>
					<view v-else class="books-go" @click="addRecommReading(recommendedReading[index])">加入书架</view>
				</view>
				<view  style="text-align: center;font-size: 24rpx;color: #999;">
					
					{{styoff}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import taber from '../../../comments/common/taber/taber.vue';
export default {
	components: {
		taber
	},
	data() {
		return {
			matop: '',
			// 搜索字
			searchTerms: '',
			// 存在放历史
			recordList: [],
			// 搜索显示是否
			searchOff: true,
			//
			itmeList: ['书籍', '正文', '作者', '版本'],
			//状态
			iloff: 0,
			// 书籍
			recommendedReading:[],
			onelist:[],
			page:1,
			styoff:'上拉加载更多...'
		};
	},
	methods: {
		// 自定义事件
		parevent(data) {
			console.log(data);
			this.matop = data;
			console.log(this.matop);
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
		// 搜索历史缓存
		enterThe() {
			this.recordList.push(this.searchTerms);
			uni.setStorage({
				key: 'recordkey',
				data: this.recordList,
				success(res) {
					console.log(res);
				},
				fail(err) {
					console.log(err);
				}
			});
		},
		// 缓存搜索方法
		cacheCilck(row) {
			console.log(row);
			this.searchOff = false;
			let _this = this 
			_this.$ureq({
				url: 'api/book/search',
				method: 'GET',
				data: {
					page:_this.page,
					per_page: '6',
					searchWord: row
				}
			})
				.then(res => {
					if(res.data.length<1){
						this.styoff = '已加载全部'
						return
					}
					_this.onelist = res.data
					_this.recommendedReading = [..._this.recommendedReading,..._this.onelist]
					console.log(res);
					console.log('----------->',_this.recommendedReading)
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 清空缓存
		deleteEnterThe() {
			console.log('清空缓存');
			let _this = this
			uni.setStorage({
				key: 'recordkey',
				data: [],
				success(res) {
					console.log(res);
				},
				fail(err) {
					console.log(err);
				}
			});
			uni.getStorage({
				key: 'recordkey',
				success: function(res) {
					console.log(res.data);
					_this.recordList = res.data;
					console.log(_this.recordList);
				}
			});
		},
		// 搜索事件
		soCilck() {
			this.searchOff = false;
			let _this = this 
			_this.$ureq({
				url: 'api/book/search',
				method: 'GET',
				data: {
					page:_this.page,
					per_page: '6',
					searchWord: _this.searchTerms
				}
			})
				.then(res => {
					if(res.data.length<1){
						this.styoff = '已加载全部'
						return
					}
					_this.onelist = res.data
					_this.recommendedReading = [..._this.recommendedReading,..._this.onelist]
					console.log(res);
					console.log('----------->',_this.recommendedReading)
				})
				.catch(err => {
					console.log(err);
				});
		},
		koouij(index) {
			this.iloff = index;
			console.log(this.itmeList[index]);
		},
		shclick(){
			this.page += 1
			console.log('上拉地了')
			if(this.searchOff == false){
				this.soCilck()
			}
			console.log('上拉地了')
		},
		// 加入书架
		addRecommReading(row){
			console.log(row)
			console.log(row.bookguid)
			this.$ureq({
				url:'api/bookshelf',
				data:{
					bookguid:row.bookguid,
					dynastyname:row.sim_dynastyname
				},
				header:{
					Accept:'application/json',
					Authorization:String(this.$store.state.token) 
				},
				method:'POST'
			}).then(res => {
				uni.showToast({
					title:'加入书架成功',
					icon:'success',
					duration:1000
				})
				console.log(res)
			})
		},
		// 查看全部正文
		allCilck(row){
			console.log(row)
			row.bookguid+'&toc_id='+'1',
			uni.navigateTo({
				url:'../../home/theBookDetails/theBookDetails?id='+row.bookguid+'&toc_id='+'1',
				success(res) {
					console.log(res)
				},
				fail(err) {
					console.log(err)
				}
			})
			
		}
	},
	onLoad() {
		let _this = this;
		uni.getStorage({
			key: 'recordkey',
			success: function(res) {
				console.log(res.data);
				_this.recordList = res.data;
				console.log(_this.recordList);
			}
		});
	},
	mounted() {},
	 onReachBottom(){
		 console.log('-------------')
	 }
};
</script>

<style scoped lang="less">
.coupon {
	height: 100%;
	width: 100%;
	background-color: #fff;
	.search-box {
		background-color: #a1814c;
		height: 94rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 0 20rpx 0;
		display: flex;
		justify-content: left;
		align-items: center;
		.search-itme {
			// margin: 0 auto;
			margin-left: 30rpx;
			height: 64rpx;
			border-radius: 30rpx;
			width: 600rpx;
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
				color: #b9a798;
			}
		}
		.text-itme {
			margin-left: 33rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #fff;
		}
	}
	// 搜索历史标题
	.search-history-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		font-weight: 500;
		font-family: PingFang SC;
		padding: 44rpx 30rpx;
		box-sizing: border-box;

		.tiele-text {
			color: #000;
		}
		.delete-text {
			color: #a1814c;
		}
	}
	.search-content {
		display: flex;
		justify-content: left;
		align-items: center;
		width: 690rpx;
		margin: 0 auto;
		padding: 0 0 30rpx 0;
		margin-bottom: 37rpx;
		border-bottom: 1rpx solid #e5e5e5;
		image {
			width: 26rpx;
			height: 26rpx;
		}
		text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #000;
			margin-left: 21rpx;
		}
	}
	// 搜索显示区域
	.search-shows {
		width: 100%;
		height: 100%;
		.taber-box {
			width: 100%;
			height: 80rpx;
			box-sizing: border-box;
			padding: 0 69rpx;
			color: #fff;
			background-color: #a1814c;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			.lione {
				padding-bottom: 16rpx;
				border-bottom: 4rpx solid #fff;
			}
			.litow {
				padding-bottom: 16rpx;
				border-bottom: 4rpx solid #a1814c;
			}
		}
		// 书籍信息
		.books-information{
			display: flex;
			justify-content: left;
			align-items: center;
			margin-top: 54rpx;
			margin-bottom: 54rpx;
			position: relative;
			z-index: 999;
			// .ba-pos{
			// 	width: 207rpx;
			// 	height: 32rpx;
			// 	z-index: -1;
			// 	background-image: url(http://i1.fuimg.com/733036/b57cb98258cd9e2a.png);
			// 	background-size: 100% 100%;
			// 	background-repeat: no-repeat;
			// 	position: absolute;
			// 	bottom: -18rpx;
			// 	left: 20rpx;
			// }
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
			.books-textsx{
				width: 478rpx;
				height: 266rpx;
				margin-left: 29rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				color: #666666;
				font-weight: 400;
				.books-text-one{
					margin-top: 29rpx;
					width: 310rpx;
					font-size: 32rpx;
					color: #000;
					font-weight: 500;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.books-text-tow{
					margin-top: 15rpx;
					width: 310rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					.textone{
						color: #f00;
					}
					.texttow{
						color: #666;
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
				.books-text-therr{
					margin-top: 15rpx;
				}
				.books-text-four{
					margin-top: 15rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					.textone{
						color: #f00;
					}
					.texttow{
						color: #666;
					}
				}
				.books-text-fove{
					margin-top: 15rpx;
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
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.books-text-tow{
					margin-top: 15rpx;
					.textone{
						color: #f00;
					}
					.texttow{
						color: #666;
					}
				}
				.books-text-therr{
					margin-top: 15rpx;
				}
				.books-text-four{
					margin-top: 15rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					.textone{
						color: #f00;
					}
					.texttow{
						color: #666;
					}
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
}
</style>
