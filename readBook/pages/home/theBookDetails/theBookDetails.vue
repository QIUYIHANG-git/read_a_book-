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
		.parse-box{
			margin: 0 auto;
			padding-top: 49rpx;
			box-sizing: border-box;
			width: 86%;
		}
	}
</style>
