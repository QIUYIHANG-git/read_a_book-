<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="../../../static/icon/min/fanx.png" mode=""></image>
			<text slot='text'>中文</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true" @click="onSet">
			<view class="show-top" v-if="offTitle">
				<view class="one">
					<view v-for="(itme,index) in listText" :key="" class="show-top-text" >
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
					
				</view>
				<view class="bottom-text">
					
				</view>
			</view>
			<view class="parse-box"  >
				<!-- <u-parse :html="listData.html" :selectable="true" @longpress="logGrouping"></u-parse> -->
				<editor id="editor" style="height: 100%;" @ready="onEditorReady" @statuschange="staclo" :read-only='true'></editor>
				<!-- <rich-text :nodes="listData.html"  class='ctext' bindlongpress="copy" :data-text="listData.html" selectable="true"></rich-text> -->
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
				listData: {},
				// 触摸时间
				touchStartTime:0,
				// 
				listText:['文字阅读','页面阅览','混合阅览'],
				offText:0,
				// 
				offTitle:false,
				// 
				optionId :'',
				optiontocId :'',
				editorCtx:''
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
			textCilck(index){
				this.offText  = index
				console.log(this.offText)
			},
			// copy(e) {
			// 	var that = this;
			// 	var text = e.currentTarget.dataset.text;
			// 	console.log(e);
			// 	uni.setClipboardData({
			// 		data: text,
			// 		success: function (res) {
			// 			// wx.hideToast();    //打开可不显示提示框
			// 			uni.getClipboardData({
			// 				success (res) {
			// 					console.log(res.data) // data
			// 				}
			// 			})
			// 		} 
			// 	});
			// },
			// 富文本加载事件
			onEditorReady(){
				let that = this 
				
				console.log('----->内容',that.listData.html)
				
			},
			staclo(e){
				console.log(e)
			},
			onSet(e) {
				//console.log(new Date().getTime())
				if (this.touchStartTime == 0) {
					this.touchStartTime = new Date().getTime()
				} else {
					if (new Date().getTime() - this.touchStartTime <= 300) {
						// this.setMeau = true
						if(this.offTitle == true){
							this.offTitle = false
						}else{
							this.offTitle = true
						}
						console.log('这是双击')
					}
					this.touchStartTime = 0
				}

			},
			logGrouping(){
				console.log('监听成功')
			}
		},
		mounted() {
			let that = this 
			this.$ureq({
				url:'api/book/html',
				method:'GET',
				data:{
					bookguid:String(that.optionId),
					toc_id:String(that.optiontocId)
				},
				header:{
					Accept:'application/json',
					Authorization:String(that.$store.state.token) 
				}
			}).then(res =>{
				that.listData = res.data
				uni.createSelectorQuery().select('#editor').context((res) => {
				    that.editorCtx = res.context
					that.editorCtx.setContents({
					html:String(that.listData.html),
					success:(res)=> {
						console.log('---->1',res)
					},
					fail:(res)=> {
						console.log('------>2',res)
						},
					})
					that.editorCtx.format('backgroundColor','#ff0000')
					console.log(res)
				}).exec()
				console.log(that.listData)
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
		},
		onLoad(option) {
			console.log(option)
			this.optionId = option.id
			this.optiontocId = option.toc_id
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		height: 100%;
		width: 100%;
		background-color: rgb(250,248,243);
		position: relative;
		.parse-box{
			margin: 0 auto;
			padding-top: 49rpx;
			box-sizing: border-box;
			width: 86%;
		}
		.show-top{
			position: absolute;
			top: 0;
			width: 750rpx;
			height: 100rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 30rpx;
			font-size: 28rpx;	
			font-family: PingFang SC;
			font-weight: 400;
			.one{
					display: flex;
					justify-content: left;
					align-items: center;
				.show-top-text{
					display: flex;
					justify-content: left;
					align-items: center;
					.text-one{
						padding-bottom: 20rpx;
						border-bottom: 2rpx solid #A3834F;
						margin-right: 61rpx;
						color: #A3834F;
					}
					.text-tow{
						padding-bottom: 20rpx;
						border-bottom: 2rpx solid #fff;
						margin-right: 61rpx;
						color: #999;
					}
				}
			}
			.tow{
				image{
					width: 64rpx;
					height: 64rpx;
				}
			}
			
		}
		.show-bottom{
			position: absolute;
			bottom: 0;
			width: 750rpx;
			height: 305rpx;
			background-color: #fff;
			
			.top-text{
				margin-top: 30rpx;
				text-align: center;
				font-size: 28rpx;
				color: #666666;
				font-weight: 400;	
				font-family: PingFang SC;
			}
			.cencer-text{
				padding: 38rpx 20rpx;
				background-color: #ff0000;
			}
			.bottom-text{
				padding: 38rpx 20rpx;
				background-color: #55ff7f;
			}
		}
	}
</style>
