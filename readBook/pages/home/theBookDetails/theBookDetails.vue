<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="../../../static/icon/min/fanx.png" mode=""></image>
			<text slot='text'>{{nametext}}</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true" @click="onSet" :style="{
			height: `calc(100% - ${heibotom})`,
			paddingTop: `${scrrotop}`
			}">
			<view class="show-top" v-if="offTitle">
				<view class="one">
					<view v-for="(itme,index) in listText" :key="index" class="show-top-text">
						<text :class="offText==index?'text-one':'text-tow'" @click="textCilck(index)">{{itme}}</text>
					</view>
				</view>
				<view class="tow">
					<image src="http://i1.fuimg.com/733036/95f1c9951a4f3220.png" mode=""></image>
				</view>
			</view>
			<view class="show-bottom" v-if="offTitle">
				<view class="top-text">
					前言
				</view>
				<view class="cencer-text">
					<view class="img-text">
						<text style="margin-right: 30rpx;">字号:</text>
						<image style="margin-right: 35rpx;" src="http://i2.tiimg.com/733036/25e24c50e3454252.png" mode="" @click="addfontSizeNuber"></image>
						<text style="margin-right: 35rpx;">{{fontSizeNuber}}</text>
						<image src="http://i2.tiimg.com/733036/71ad455b07c265a6.png" mode="" @click="subtractfontSizeNuber"></image>
					</view>
					<view class="page-number-box">
						<text style="margin-right: 32rpx;">跳转:</text> 
						<view style="width:100rpx;height: 48rpx;border: 2rpx solid; #333;text-align: center;margin-right: 32rpx;">
							<input v-model="pageNumber" type="number" value="" @blur="pageCilck"/>
						</view>
						<text>页</text>
					</view>
				</view>
				<view class="bottom-text">
					<view class="bottom-itme" @click="catalogue()">
						<image src="http://i2.tiimg.com/733036/3af87905f80426ae.png" mode=""></image>
						<text>目录</text>
					</view>
					<view class="bottom-itme">
						<image src="http://i2.tiimg.com/733036/f15e1650459b3664.png" mode=""></image>
						<text>书签</text>
					</view>
					<view class="bottom-itme">
						<image src="http://i2.tiimg.com/733036/511345981cd3f8f6.png" mode=""></image>
						<text>笔记</text>
					</view>
					<view class="bottom-itme">
						<image src="http://i2.tiimg.com/733036/d80e480f6fcd2a77.png" mode=""></image>
						<text>加入书架</text>
					</view>
				</view>
			</view>
			
			<view v-if="offText==0" class="parse-box" @longpress="logGrouping" style="text-align: left;" :style="{fontSize:`${fontSizeNuber}rpx`}">
				<u-parse :html="listData.html" :selectable="true" ></u-parse>
			</view>
			<view v-else-if="offText==1" style="height: 100%;">
				<scroll-view  scroll-X="true" style="height: 100%;">
					<image style="width: 2000rpx;height: 100%;" :src="imgurl" mode=""></image>
				</scroll-view>
			</view>
			<view v-else style="height: 100%;text-align: center;" :style="{fontSize:`${fontSizeNuber}rpx`}">
					<scroll-view style="height: 50%;" scroll-y="true" >
						<u-parse :html="listData.html" :selectable="true" ></u-parse>
					</scroll-view>
					<scroll-view style="height: 49%; width: 88%;margin: 10rpx auto;" scroll-X="true" >
						<image style="width: 1000rpx;height: 100%;" :src="imgurl" mode=""></image>
					</scroll-view>
			</view>
			<u-popup v-model="showmo" mode='bottom' height="80%" width="100%">
				<view class="show-box-title">
					<view :class="numbershow == index?'show-one':'show-tow'" v-for="(itme,index) in listmode" :key="index" @click="showmode(listmode[index],index)">
						{{itme}}
					</view>
				</view>
				<view v-if="numbershow == 0" >
					<view class="catalogue-box" v-for="(itme,index) in catalogueList" :key="index">
						<view class="title-itme" @click="itmename(catalogueList[index],index)">
							{{itme.name}}
						</view>
					</view>
				</view>
				<view v-else-if="numbershow == 1">
					
				</view>
				<view v-else>
					
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
				listData: {},
				// 
				nametext:'正文',
				// 触摸时间
				touchStartTime: 0,
				// 
				listText: ['文字阅读', '页面阅览', '混合阅览'],
				// 目录数千笔记
				listmode:['目录', '书签', '笔记'],
				offText: 0,
				// 
				offTitle: false,
				// 
				fontSizeNuber:32,
				// 
				pageNumber:1,
				// 
				optionId: '',
				optiontocId: '',
				editorCtx: '',
				heibotom:'0rpx',
				scrrotop:'0rpx',
				// 图片阅读
				imgurl:'',
				// 
				showmo:false,
				// 
				numbershow:0,
				// 目录列表
				catalogueList:[]
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 
			textCilck(index) {
				this.offText = index
				let that = this
				if(this.offText == 0){
					console.log('状态1')
				}else if(this.offText == 1) {
					console.log('状态2')
					this.$ureq({
						url: 'api/book/imgurl',
						method: 'GET',
						data: {
							bookguid: String(that.optionId),
							toc_id: String(that.optiontocId)
						},
						header: {
							Accept: 'application/json',
							Authorization: String(that.$store.state.token)
						}
					}).then(res => {
						this.imgurl = res.data.img_url
						console.log(res)
					}).catch(err => {
						console.log(err)
					})
				}else {
					this.$ureq({
						url: 'api/book/imgurl',
						method: 'GET',
						data: {
							bookguid: String(that.optionId),
							toc_id: String(that.optiontocId)
						},
						header: {
							Accept: 'application/json',
							Authorization: String(that.$store.state.token)
						}
					}).then(res => {
						this.imgurl = res.data.img_url
						console.log(res)
					}).catch(err => {
						console.log(err)
					})
				}
				console.log(this.offText)
			},
			addfontSizeNuber(){
				this.fontSizeNuber += 1
			},
			subtractfontSizeNuber(){
				this.fontSizeNuber -= 1
			},
			pageCilck(){
				console.log(this.pageNumber)
			},
			// 富文本加载事件
			onEditorReady() {
				let that = this

				console.log('----->内容', that.listData.html)

			},
			staclo(e) {
				console.log(e)
			},
			onSet(e) {
				//console.log(new Date().getTime())
				if (this.touchStartTime == 0) {
					this.touchStartTime = new Date().getTime()
				} else {
					if (new Date().getTime() - this.touchStartTime <= 300) {
						// this.setMeau = true
						if (this.offTitle == true) {
							this.offTitle = false
							this.heibotom = '0rpx'
							this.scrrotop = '0rpx'
						} else {
							this.offTitle = true
							this.heibotom = '405rpx'
							this.scrrotop = '102rpx'
						}
						console.log('这是双击')
					}
					this.touchStartTime = 0
				}

			},
			logGrouping() {
				console.log('长按监听成功')
			},
			// 目录
			catalogue(){
				this.showmo = true
				let that = this
				this.$ureq({
					url: 'api/book/toc',
					method: 'GET',
					data: {
						bookguid: String(that.optionId)
					},
					header: {
						Accept: 'application/json',
						Authorization: String(that.$store.state.token)
					}
				}).then(res => {
					console.log('目录',res)
					this.catalogueList =  res.data
				}).catch(err => {
					console.log(err)
				})
				console.log('--------------')
			},
			showmode(row,index){
				this.numbershow = index
			}
		},
		mounted() {
			let that = this
			this.$ureq({
				url: 'api/book/html',
				method: 'GET',
				data: {
					bookguid: String(that.optionId),
					toc_id: String(that.optiontocId)
				},
				header: {
					Accept: 'application/json',
					Authorization: String(that.$store.state.token)
				}
			}).then(res => {
				that.listData = res.data
				// uni.createSelectorQuery().select('#editor').context((res) => {
				// 	that.editorCtx = res.context
				// 	that.editorCtx.setContents({
				// 		html: String(that.listData.html),
				// 		success: (res) => {
				// 			console.log('---->1', res)
				// 		},
				// 		fail: (res) => {
				// 			console.log('------>2', res)
				// 		},
				// 	})
				// 	console.log(res)
				// }).exec()
				console.log(that.listData)
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
		},
		onLoad(option) {
			console.log(option)
			this.optionId = option.id
			this.optiontocId = option.toc_id
			this.nametext = option.name
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		width: 100%;
		background-color: rgb(250, 248, 243);
		position: relative;

		.parse-box {
			margin: 0 auto;
			box-sizing: border-box;
			width: 86%;
			font-size: 32rpx;
			text-align: left;
			color: #333;
			line-height: 56rpx;
			font-family: PingFangSC-Regular;
		}

		.show-top {
			position: fixed;
			top: 125rpx;
			width: 750rpx;
			height: 100rpx;
			background-color: #fff;
			z-index: 999;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 30rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;

			.one {
				display: flex;
				justify-content: left;
				align-items: center;

				.show-top-text {
					display: flex;
					justify-content: left;
					align-items: center;

					.text-one {
						padding-bottom: 20rpx;
						border-bottom: 2rpx solid #A3834F;
						margin-right: 61rpx;
						color: #A3834F;
					}

					.text-tow {
						padding-bottom: 20rpx;
						border-bottom: 2rpx solid #fff;
						margin-right: 61rpx;
						color: #999;
					}
				}
			}

			.tow {
				image {
					width: 64rpx;
					height: 64rpx;
				}
			}

		}

		.show-bottom {
			position: fixed;
			bottom: 0;
			width: 750rpx;
			height: 305rpx;
			background-color: #fff;

			.top-text {
				margin-top: 30rpx;
				text-align: center;
				font-size: 28rpx;
				color: #666666;
				font-weight: 400;
				font-family: PingFang SC;
			}

			.cencer-text {
				padding: 40rpx 29rpx;
				color: #333333;	
				font-family: PingFang SC;
				border-bottom: 1rpx solid #E6E6E6;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.img-text{
					display: flex;
					justify-content: left;
					align-items: center;
					image{
						width: 80rpx;
						height: 48rpx;
					}
				}
				.page-number-box{
					display: flex;
					justify-content: left;
					align-items: center;
				}
			}

			.bottom-text {
				padding: 46rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.bottom-itme{
					font-size: 30rpx;
					font-weight:500 ;
					font-family: PingFang SC;
					color: #333;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
		
		.show-box-title{
			height: 100rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 108rpx;
			font-size: 38rpx;
			font-weight: 500;
			border-bottom: 1rpx solid rgba(0,0,0,.1);
			.show-one{
				color:#A3834F;
				padding-bottom: 32rpx;
				border-bottom: 4rpx solid #A3834F;
			}
			.show-tow{
				color:#999;
				padding-bottom: 32rpx;
				border-bottom: 4rpx solid #fff;
			}
		}
		.catalogue-box{
			padding: 0 31rpx;
			box-sizing: border-box;
			.title-itme {
				padding: 41rpx 0;
				color: #010101;
				font-weight: 400;
				font-family: PingFang SC;
				border-bottom: 1rpx solid #E6E6E6;
			}
		}
	}
</style>
