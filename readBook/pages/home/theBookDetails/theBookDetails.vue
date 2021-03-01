<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="http://i2.tiimg.com/733036/c51090a6f01cc19e.png" mode=""></image>
			<text slot='text'>{{nametext}}</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<view class="show-top" v-if="offTitle">
			<view class="one">
				<view v-for="(itme,index) in listText" :key="index" class="show-top-text">
					<text :class="offText==index?'text-one':'text-tow'" @click="textCilck(index)">{{itme}}</text>
				</view>
			</view>
			<view class="tow" @click="sosoCilck()">
				<image src="http://i1.fuimg.com/733036/95f1c9951a4f3220.png" mode=""></image>
			</view>
			<!-- 书签功能 -->
			<view v-if="offText==0" class="pos-img" @click="bookmarks()">
				<image src="http://i2.tiimg.com/733036/8f90889b834ccd63.png" mode=""></image>
			</view>
		</view>
		<scroll-view class="coupon" scroll-y="true" @click="onSet" :style="{
			height: `calc(100% - ${heibotom})`,
			paddingTop: `${scrrotop}`
			}">
			
			
			
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
				<!-- 目录 -->
				<view v-if="numbershow == 0" >
					<view class="catalogue-box" v-for="(itme,index) in catalogueList" :key="index">
						<view class="title-itme" @click="itmename(catalogueList[index],index)">
							{{itme.name}}
						</view>
					</view>
				</view>
				
				<view v-else-if="numbershow == 1">
					<view class="bookmark-box" v-for="(itmetow,index) in bookmarkList" :key="index" @click=" bookmarkCilck(bookmarkList[index],index)">
						<view class="bookmark-one">
							{{itmetow.title}}
						</view>
						<view class="bookmark-tow">
							<view class="bookmark-tow-time">
								{{itmetow.created_at}}
							</view>
							<view class="bookmark-tow-delet" @click="deleteshu(bookmarkList[index])">
								<image src="http://i1.fuimg.com/733036/5f58c58676e7028c.png" mode=""></image>
							</view>
						</view>
					</view>
					
				</view>
				<!-- 笔记 -->
				<view v-else>
					<view style="
					width: 86%;
					margin: 0 auto;
					padding: 40rpx 0;
					border-bottom: 1rpx solid #E6E6E6;
					"
					v-for="(itmes,index) in valuenoteList" :key='index' 
					>
						<view style="font-size: 30rpx;font-weight: 500; color: #010101;">
							<text style="color: #A3834F;">笔记：</text><text>{{itmes.notes_content}}</text>
						</view>
						<view style="
						margin: 10rpx auto;
						height: 134rpx;width: 100%;font-size:24rpx;padding: 20rpx;background-color: #F6F1E9;color: #666;
						box-sizing: border-box;
						font-weight: 400;
						"
						@click="valuenoteListindex(valuenoteList[index])"
						>
							{{itmes.original_content}}
						</view>
						<view style="
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 10rpx;
						">
							<view >
								{{itmes.created_at}}
							</view>
							<view @click="palyCilck(valuenoteList[index])" >
								<image style="
								display: flex;
								justify-content: center;
								align-items: center;
								width: 27rpx;height: 28rpx;"
								 src="http://i1.fuimg.com/733036/5f58c58676e7028c.png" 
								 mode="">
								 </image>
							</view>
						</view>
					</view>
				</view>
				
			</u-popup>
			<u-popup v-model="showmoshu" mode='center' height="40%" width="80%">
				<view style="background-color: rgb(234,234,234);color: #fff;width: 100%;height: 100%;font-family: PingFang SC;position: relative;box-sizing: border-box;">
					<view  style="text-align: center;font-size: 32rpx;font-weight: 600;color: #333;padding: 30rpx 0;">
						请输入书签名
					</view>
					<view style="
					width: 80%;
					padding:0 30rpx;
					box-sizing: border-box;
					height: 110rpx;
					margin: 100rpx auto;
					background-color: #FFFEFC;
					display:flex;
					justify-content: left;
					align-items: center;
					">
						<u-input v-model="valueshu" placeholder="请输入" style='width: 100%;' :trim='true' type="text"  />
					</view>
					<view style="background-color: #A1814C;
					width: 100%;
					padding: 20rpx 0;
					text-align: center;
					font-size: 32rpx;
					font-weight: 400;
					position: absolute;
					bottom: 0;
					"
					 @click="goGroupingConfig">
						确定
					</view> 
				</view>	
			</u-popup>
			<u-popup v-model="shownote" mode='center' height="60%" width="80%">
				<view style="background-color: rgb(234,234,234);color: #fff;width: 100%;height: 100%;font-family: PingFang SC;position: relative;box-sizing: border-box;">
					<view  style="text-align: center;font-size: 32rpx;font-weight: 600;color: #333;padding: 30rpx 0;">
						请复制粘贴笔记处文字
					</view>
					<view style="
					width: 90%;
					height: 200rpx;
					padding:0 10rpx;
					box-sizing: border-box;
					margin: 30rpx auto;
					background-color: #FFFEFC;
					display:flex;
					justify-content: left;
					align-items: center;
					">
						<u-input v-model="valuenoteOne" placeholder="请复制粘贴原文" style='width: 100%;height: 100%;' :trim='true' type="textarea"  />
					</view>
					<view style="color: #333;font-size: 32rpx;width: 90%;margin: 0 auto;font-weight: 500;">
						笔记内容
					</view>
					<view style="
					width: 90%;
					height: 200rpx;
					padding:0 10rpx;
					box-sizing: border-box;
					margin: 30rpx auto;
					background-color: #FFFEFC;
					display:flex;
					justify-content: left;
					align-items: center;
					">
						<u-input v-model="valuenoteTow" placeholder="请填写您的笔记内容" style='width: 100%;height: 100%;' :trim='true' type="textarea"  />
					</view>
					<view style="background-color: #A1814C;
					width: 100%;
					padding: 20rpx 0;
					text-align: center;
					font-size: 32rpx;
					font-weight: 400;
					position: absolute;
					bottom: 0;
					"
					 @click="gonoteConfig">
						确定
					</view> 
				</view>	
			</u-popup>
		</scroll-view>
		<view class="show-bottom" v-if="offTitle">
			<view class="top-text" @click="noteclick">
				写笔记
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
						<input v-model="pageNumber" :maxlength="2" type="number" value="" @blur="pageCilck"/>
					</view>
					<text>页</text>
				</view>
			</view>
			<view class="bottom-text">
				<view class="bottom-itme" @click="catalogue(true)">
					<image src="http://i2.tiimg.com/733036/3af87905f80426ae.png" mode=""></image>
					<text>目录</text>
				</view>
				<view class="bottom-itme" @click="shubookmark()">
					<image src="http://i2.tiimg.com/733036/f15e1650459b3664.png" mode=""></image>
					<text>书签</text>
				</view>
				<view class="bottom-itme" @click="notehuclick()">
					<image src="http://i2.tiimg.com/733036/511345981cd3f8f6.png" mode=""></image>
					<text>笔记</text>
				</view>
				<view class="bottom-itme" @click="bttomAdd()">
					<image src="http://i2.tiimg.com/733036/d80e480f6fcd2a77.png" mode=""></image>
					<text>加入书架</text>
				</view>
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
				listData: {},
				// 书签名
				showmoshu:false,
				valueshu:'',
				// 所有书签名
				bookmarkList:[],
				// 写笔记
				shownote:false,
				valuenoteOne:'',
				valuenoteTow:'',
				valuenoteList:[],
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
				catalogueList:[],
				// 开始阅读id
				stascid:'',
				// 总页数
				pagesList:0,
				// 
				dynastyname:''
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 选中笔记
			bookmarkCilck(row,index){
				console.log(row)
				let that = this
				this.$ureq({
					url: 'api/book/html',
					method: 'GET',
					data: {
						bookguid: String(row.bookguid),
						toc_id: String(row.toc_id)
					},
					header: {
						Accept: 'application/json',
						Authorization: String(that.$store.state.token)
					}
				}).then(res => {
					that.listData = res.data
					console.log(res)
					this.showmo = false
				}).catch(err => {
					console.log(err)
				})
				// 图片
				this.$ureq({
					url: 'api/book/imgurl',
					method: 'GET',
					data: {
						bookguid: String(row.bookguid),
						toc_id: String(row.toc_id)
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
			},
			// 阅读模式
			textCilck(index) {
				this.offText = index
				let that = this
				if(this.offText == 0){
					console.log('状态1')
				}else if(this.offText == 1) {
					console.log('状态2')
					
				}else {
					// this.$ureq({
					// 	url: 'api/book/imgurl',
					// 	method: 'GET',
					// 	data: {
					// 		bookguid: String(that.optionId),
					// 		toc_id: String(that.optiontocId)
					// 	},
					// 	header: {
					// 		Accept: 'application/json',
					// 		Authorization: String(that.$store.state.token)
					// 	}
					// }).then(res => {
					// 	this.imgurl = res.data.img_url
					// 	console.log(res)
					// }).catch(err => {
					// 	console.log(err)
					// })
				}
				console.log(this.offText)
			},
			addfontSizeNuber(){
				this.fontSizeNuber += 1
			},
			subtractfontSizeNuber(){
				this.fontSizeNuber -= 1
			},
			// 跳转页面
			pageCilck(){
				console.log(this.pageNumber)
				if(this.pageNumber>this.pagesList){
					uni.showToast({
						title:'该书籍最大页面为'+this.pagesList,
						icon:'none',
						duration:1000
					})
				}else if(this.pageNumber>0){
					console.log(this.catalogueList[this.pageNumber-1])
					this.itmename(this.catalogueList[this.pageNumber-1],this.pageNumber-1)
				}
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
				if (this.offTitle == true) {
					this.offTitle = false
					this.heibotom = '0rpx'
					this.scrrotop = '0rpx'
				} else {
					this.offTitle = true
					this.heibotom = '405rpx'
					this.scrrotop = '102rpx'
				}
				//console.log(new Date().getTime())
				// if (this.touchStartTime == 0) {
				// 	this.touchStartTime = new Date().getTime()
				// } else {
				// 	if (new Date().getTime() - this.touchStartTime <= 300) {
				// 		// this.setMeau = true
						
				// 		console.log('这是双击')
				// 	}
				// 	this.touchStartTime = 0
				// }

			},
			logGrouping() {
				console.log('长按监听成功')
			},
			// 目录
			catalogue(off){
				this.showmo = off
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
					this.pagesList = this.catalogueList.length
				}).catch(err => {
					console.log(err)
				})
				console.log('--------------')
			},
			//选择目录，书签，笔记
			showmode(row,index){
				this.numbershow = index
				if(index == 0){
					this.$ureq({
						url: 'api/book/toc',
						method: 'GET',
						data: {
							bookguid: String(this.optionId)
						},
						header: {
							Accept: 'application/json',
							Authorization: String(this.$store.state.token)
						}
					}).then(res => {
						console.log('目录',res)
						this.catalogueList =  res.data
					}).catch(err => {
						console.log(err)
					})
				}else if(index == 1){
					this.shubookmark()
				}else {
					this.notehuclick()
				}
			},
			// 书签功能
			bookmarks(){
				this.showmoshu = true
				console.log('------------')
				
			},
			// 书签确定
			goGroupingConfig(){
				console.log('确定')
				let that = this
				this.$ureq({
					url: 'api/bookmark',
					method: 'POST',
					data: {
						bookguid: String(that.optionId),
						toc_id:String(that.optiontocId),
						title:this.valueshu
					},
					header: {
						Accept: 'application/json',
						Authorization: String(that.$store.state.token)
					}
				}).then(res => {
					that.showmoshu = false
					uni.showToast({
						title:'添加书签成功',
						icon:'success',
						duration:1000
					})
					console.log('书签',res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 所有书签
			shubookmark(){
				console.log('所有书签')
				this.showmo = true
				this.numbershow = 1,
				this.$ureq({
					url: 'api/bookmark',
					method: 'GET',
					data: {
						page: '1',
						per_page:'30'
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					this.bookmarkList = res.data
					console.log('所有书签',res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 删除书签
			deleteshu(row){
				console.log('删除书签')
				console.log(row)
				this.$ureq({
					url: 'api/bookmark/'+ row.id,
					method: 'DELETE',
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					this.shubookmark()
					uni.showToast({
						title:'删除书签成功',
						icon:'success',
						duration:1000
					})
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 选中目录
			itmename(row,index){
				console.log(row)
				console.log(index)
				this.optiontocId = row.id
				let that = this
				this.$ureq({
					url: 'api/book/html',
					method: 'GET',
					data: {
						bookguid: String(that.optionId),
						toc_id: String(this.optiontocId)
					},
					header: {
						Accept: 'application/json',
						Authorization: String(that.$store.state.token)
					}
				}).then(res => {
					that.listData = res.data
					console.log(res)
					this.showmo = false
				}).catch(err => {
					console.log(err)
				})
				// 图片
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
			},
			// 写笔记
			noteclick(){
				this.shownote = true
				console.log('写笔记')
			},
			// 确定写笔记
			gonoteConfig(){
				console.log(this.valuenoteOne)
				console.log(this.valuenoteTow)
				this.$ureq({
					url: 'api/booknote',
					method: 'POST',
					data: {
						bookguid: String(this.optionId),
						toc_id: String(this.optiontocId),
						original_content:this.valuenoteOne,
						notes_content:this.valuenoteTow
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					this.shownote = false
					uni.showToast({
						title:'添加笔记成功',
						icon:'success',
						duration:1000
					})
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 所有笔记
			notehuclick(){
				console.log('所有笔记')
				
				this.$ureq({
					url: 'api/booknote',
					method: 'GET',
					data: {
						page: '1',
						per_page: '100'
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					this.showmo = true
					this.numbershow = 2
					this.valuenoteList = res.data
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			//选中笔记
			valuenoteListindex(row){
				console.log(row)
				let that = this
				this.$ureq({
					url: 'api/book/html',
					method: 'GET',
					data: {
						bookguid: String(row.bookguid),
						toc_id: String(row.toc_id)
					},
					header: {
						Accept: 'application/json',
						Authorization: String(that.$store.state.token)
					}
				}).then(res => {
					that.listData = res.data
					console.log(res)
					this.showmo = false
				}).catch(err => {
					console.log(err)
				})
				// 图片
				this.$ureq({
					url: 'api/book/imgurl',
					method: 'GET',
					data: {
						bookguid: String(row.bookguid),
						toc_id: String(row.toc_id)
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
			},
			// 删除
			palyCilck(row){
				console.log(row)
				this.$ureq({
					url: 'api/booknote/'+row.id,
					method: 'DELETE',
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					this.notehuclick()
					uni.showToast({
						title:'删除笔记成功',
						icon:'success',
						duration:1000
					})
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 开始阅读
			stasc(){
				this.$ureq({
					url: 'api/book-pv/start',
					method: 'POST',
					data: {
						bookguid: String(this.optionId)
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					this.stascid = res.data.id
					console.log(this.stascid)
					console.log('开始阅读',res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 结束阅读
			endsc(){
				this.$ureq({
					url: 'api/book-pv/end',
					method: 'POST',
					data: {
						id: this.stascid
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				}).then(res => {
					console.log('结束阅读',res)
				}).catch(err => {
					console.log(err)
				})
			},
			sosoCilck(){
				uni.navigateTo({
					url:'../../bookrack/search/search',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 加入书架
			bttomAdd(){
				let that = this
				this.$ureq({
					url: 'api/bookshelf',
					method: 'POST',
					data: {
						bookguid: that.optionId,
						dynastyname: that.dynastyname
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
				console.log(that.listData)
				console.log(res)
			}).catch(err => {
				console.log(err)
			})
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
		},
		onLoad(option) {
			console.log('----------------->',option)
			
			this.optionId = option.id
			this.optiontocId = option.toc_id
			this.nametext = option.name
			this.dynastyname = option.dynastyname
			// 开始阅读
			this.stasc()
			this.catalogue(false)
		},
		onHide(){
			console.log('结束了')
			this.endsc()
		},
		onUnload(){
			console.log('结束了1')
			this.endsc()
		}
	}
</script>

<style scoped lang="less">
	.coupon-box{
		position: relative;
		.show-top {
			position: absolute;
			top: 0rpx;
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
			.pos-img{
				position: relative;
				top: 150rpx;
				right: 66rpx;
				image{
					width: 60rpx;
					height: 191rpx;
				}
			}
			
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
				margin-left: 50rpx;
				display: flex;  
				justify-content: center;
				align-items: center;
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
			z-index: 1000;
				
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
			.bookmark-box{
				width: 690rpx;
				margin: 0 auto;
				padding: 40rpx 0;
				border-bottom: 1rpx solid #E6E6E6;
				.bookmark-one{
					color: #010101;
					font-size: 30rpx;
					font-weight: 400;
				}
				.bookmark-tow{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 10rpx;
					.bookmark-tow-time{
						font-size: 24rpx;
						font-weight: 400;
						color: #999999;
					}
					.bookmark-tow-delet{
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 27rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
	}
	
</style>
