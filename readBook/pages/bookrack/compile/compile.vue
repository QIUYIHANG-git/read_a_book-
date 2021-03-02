<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="https://api-guji.sinmore.vip/wximg/110/返回.png" mode=""></image>
			<text slot='text'>书架</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true" v-if="updes">
			<view class="top-mou">
				<view class="top-mou-one" @click="checkAll">
					全选
				</view>
				<view class="top-mou-tow">
					已选<text>{{checkAllNumber}}</text>本书籍
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
					<image src="https://api-guji.sinmore.vip/wximg/200/详细.png" mode=""></image>
				</view>
				<!-- 选中编辑 -->
				<!-- <view class="ori" @click="oriOd(index)">
					<image v-if="orinumber[index] == offmo[index]"  src="http://i1.fuimg.com/733036/16a9b425f47dcf13.png" ></image>
					<image v-else src="http://i1.fuimg.com/733036/ad4f2460146f9b40.png" mode=""></image>
				</view> -->
			</view>
			<!-- 推荐书籍 -->
			<view class="books" v-for="(shu,index) in lent" :key='index'>
				<view class="books-box">
					
					<view class="books-itme" v-for="(shuitme,index2) in shu.listtext" :key="index2" :style="{backgroundImage:`${shuitme.url}`}">
						<view class="text-box">
							{{shuitme.book_info.bookname}}
						</view>
						<!-- 选中编辑 -->
						<view class="ori" @click="oriOd(shu.listtext[index2],index,index2)">
							<image v-if="shuitme.mogbot" src="http://i1.fuimg.com/733036/16a9b425f47dcf13.png" ></image>
							<image v-else src="http://i1.fuimg.com/733036/ad4f2460146f9b40.png" mode=""></image>
						</view>
					</view>
				</view>
				
				<view class="books-pos" :style="{backgroundImage:`${shu.styleimg}`}">
					<view class="text-pos">
						<view class="text-itme" v-for="(shutext,index3) in shu.listtext" :key="index3">
							{{shutext.book_info.bookname}}
						</view>
					</view>
				</view>
			</view>
			<!-- 删除显示-->
			<u-popup v-model="moveOff" mode="center"  width="560rpx" height="640rpx" :closeable="false" >
				<view style="background-color: rgb(234,234,234);color: #fff;width: 100%;height: 100%;font-family: PingFang SC;position: relative;box-sizing: border-box;">
					<view style="width: 480rpx;
					text-align: center;color: rgb(0,0,0);
					font-size: 36rpx;font-weight: bold;
					margin: 0 auto;
					padding:39rpx 0 46rpx 0;
					border-bottom: 1rpx solid #E5E5E5;
					">
						移动分组
					</view>
					<scroll-view scroll-y="true" style="height: 400rpx;">
						<view style="
						color:#000000;width:480rpx;
						font-size: 32rpx;margin:0 auto;
						padding-bottom: 35rpx;
						border-bottom: 1rpx solid #E5E5E5; padding: 40rpx 0;
						display: flex;
						justify-content: space-between;
						align-items: center;
						"
						v-for="(listUrl,index) in listTow"
						:key="index"
						@click="goGroupingClick(index)"
						>
							<view>
								{{listUrl.name}}
							</view>
							<view style="display: flex;justify-content: center;align-items: center;">
								<!--  -->
								<image v-if="goGroupingOff == index" style="width: 40rpx;height: 40rpx;" src="http://i1.fuimg.com/733036/16a9b425f47dcf13.png" mode=""></image>
								<image v-else style="width: 40rpx;height: 40rpx;" src="http://i1.fuimg.com/733036/ad4f2460146f9b40.png" mode=""></image>
							</view>
						</view>
					</scroll-view>
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
		</scroll-view>
		<view class="botton-box">
			<view class="botton-itme" @click="moveClick">
				<image src="http://i1.fuimg.com/733036/eb3255301745147f.png" mode=""></image><text style="color: #A1814C;margin-left: 14rpx;">移动至</text>
			</view>
			<view class="botton-itme">
				<image src="http://i1.fuimg.com/733036/b4b77ca4fecc3173.png" mode=""></image><text style="color: #742121;margin-left: 14rpx;" @click="deleteClick">删除</text>
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
				// 
				moveOff:false,
				// 选中几本书
				checkAllNumber:0,
				// orinumber
				orinumber:[],
				goGroupingOff:0,
				updes:true,
				// 
				offmo:[],
				// 
				listTow:[],
				// 书籍一
				shuList: [
				],
				// 选中书对象
				shuobj:null,
				// 选中书数组
				shuobjList:[],
				// 移动到那个对象
				goGrouping:null,
				// 背景
				styleimg:'url(http://i1.fuimg.com/733036/ac0d7b103ba414e6.png)',
				// 书架长度
				lent:[],
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
				for(let i=0;i<this.lent.length;i++){
					for(let j=0;j<this.lent[i].listtext.length;j++){
						this.$set(this.lent[i].listtext[j],'mogbot',false)
					}
				}
				this.$forceUpdate()
				this.shuobjList = []
				this.checkAllNumber = this.shuobjList.length
			},
			//选事件
			oriOd(row,index1,index2){
				console.log(row)
				console.log(index1)
				console.log(index2)
				this.shuobj = this.lent[index1].listtext[index2]
				let statc = 0
				if(this.lent[index1].listtext[index2].mogbot === false){
					this.$set(this.lent[index1].listtext[index2],'mogbot',true)
					this.shuobjList.push(this.shuobj)
				}else{
					this.$set(this.lent[index1].listtext[index2],'mogbot',false)
						for(let i=0;i<this.shuobjList.length;i++){
							if(this.shuobjList[i].book_info.bookguid == this.shuobj.book_info.bookguid){
								console.log('标记重复值')
								statc = i
							}
						}
						statc==0?this.shuobjList.splice(statc,1):this.shuobjList.splice(statc,statc)
						
				}
				console.log(this.shuobjList)
				this.checkAllNumber = this.shuobjList.length
				this.$forceUpdate()
			
			},
			// 全选中
			checkAll(){
				this.shuobjList = []
				
				for(let i=0;i<this.lent.length;i++){
					for(let j=0;j<this.lent[i].listtext.length;j++){
						this.$set(this.lent[i].listtext[j],'mogbot',true)
						this.shuobjList.push(this.lent[i].listtext[j])
					}
				}
				this.checkAllNumber = this.shuobjList.length
				console.log(this.shuobjList)
				this.$forceUpdate()
			},
			// 书籍请求方法
			shuListf(page,perPageNumber){
				// 书籍
				this.$ureq({
					url:'api/bookshelf',
					method:'GET',
					data:{
						page:page,
						per_page:perPageNumber
					},
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res => {
					console.log('请求成功',res)
					let indexs = parseInt(page)-1
					console.log(indexs)
					let koumd = this.lent[indexs].listtext
					console.log('成功了',koumd)
					console.log(	res.data.length)
					if(res.data.length < 1){
						this.lent[indexs].listtext = res.data
						// this.styleimg = ''
						return
					}
					this.lent[indexs].listtext = res.data
					// this.styleimg = 'url(http://i1.fuimg.com/733036/ac0d7b103ba414e6.png)'
					for(let i in this.lent[indexs].listtext){
						this.lent[indexs].listtext[i].mogbot = false
					}
					if(this.lent[indexs].listtext.length == 1){
						this.lent[indexs].listtext[0].url = 'url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png)'
					}else if (this.lent[indexs].listtext.length == 2){
						this.lent[indexs].listtext[0].url = 'url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png)'
						this.lent[indexs].listtext[1].url = 'url(http://i1.fuimg.com/733036/1ef9ed57bdb18d55.png)'
					}else{
						this.lent[indexs].listtext[0].url = 'url(http://i1.fuimg.com/733036/90ddcafb6b2377f7.png)'
						this.lent[indexs].listtext[1].url = 'url(http://i1.fuimg.com/733036/1ef9ed57bdb18d55.png)'
						this.lent[indexs].listtext[2].url = 'url(http://i1.fuimg.com/733036/b6a91f6bb5db7669.png)'
					}
					console.log('赋值了',koumd)
					let ki = this.lent
					this.lent = []
					this.lent = ki
				})
				.catch(err => {
					console.log('请求失败',err)
				})
			},
			// 显示移动窗口
			moveClick(){
				if(this.shuobjList.length < 1){
					uni.showToast({
						title:'请选择要移动的书籍',
						icon:'none',
						duration:3000
					})
				}else{
					this.moveOff = true
				}
				console.log('移动事件')
			},
			// 移动选中
			goGroupingClick(index){
				this.goGroupingOff = index
				this.goGrouping = this.listTow[index]
				console.log('选择的分组数据',this.listTow[index]); 
			},
			// 移动确定
			goGroupingConfig(){
				this.moveOff = false
				console.log(this.goGrouping,this.shuobjList)
				let shelfId = String(this.goGrouping.id) 
				console.log(shelfId)
				let groupIds = []
				groupIds.length = this.shuobjList.length
				for(let n in this.shuobjList){
					groupIds[n] = this.shuobjList[n].id
				}
				console.log('处理选中ID',groupIds)
				this.$ureq({
					url:'api/bookshelf/group',
					method:'POST',
					data:{
						// 书架书籍id 数组
						bookshelf_ids:groupIds,
						// 书架分组id
						bookgroup_id:shelfId
					},
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res =>{
					this.customf()
					this.bokse()
					this.shuobjList = []
					for(let i in this.lent){
						for(let j in this.lent[i].listtext){
							this.$set(this.lent[i].listtext[j],'mogbot',false)
							this.$forceUpdate()
						}
					}
					uni.showToast({
						title:'移动书籍成功',
						icon:'success',
						duration:1000
					})
				}).catch(err => {
					console.log(err)
				})
			},
			// 删除事件	
			deleteClick(){
				let groupIds = []
				let _this = this
				groupIds.length = this.shuobjList.length
				for(let n in this.shuobjList){
					groupIds[n] = this.shuobjList[n].bookguid
				}
				console.log('处理选中ID',groupIds)
				// 删除方法
				this.$ureq({
					url:'api/bookshelf',
					method:'DELETE',
					data:{
						// 书架书籍id 数组
						bookguids:groupIds
					},
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res =>{
					_this.bokse()	
					this.shuobjList.length = 0	
					uni.showToast({
						title:'删除成功',
						icon:'success',
						duration:1000
					})	
					console.log('删除处理选中ID',groupIds)
					console.log('------------>',res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 自定义列表方法
			customf(){
				this.$ureq({
					url:'api/bookgroup',
					method:'GET',
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res =>{
					this.listTow = res.data
					for(let i in this.listTow){
						// url 书单
						this.listTow[i].url = 'url(http://i1.fuimg.com/733036/858a6e0a012d3a88.png)'
					}
					// 默认选中分组
					this.goGrouping= this.listTow[0]
				})
				.catch(err => {
					console.log(err)
				})
			},
			// 网络请求书方法
			bokse(){
				this.$ureq({
					url:'api/bookshelf',
					method:'GET',
					data:{
						page:'1',
						per_page:'1000'
					},
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res => {
					if(res.data.length%3==0){
						this.lent.length = parseInt(res.data.length/3)
					}else{
						this.lent.length = parseInt(res.data.length/3)+1
					}
					for(let i=0;i<this.lent.length;i++){
						this.lent[i] = {listtext:[],styleimg:'url(http://i1.fuimg.com/733036/ac0d7b103ba414e6.png)'}
						let hu = String(i+1)
						this.shuListf(hu,'3')
					}				
					console.log(this.lent)
				}).catch(err => {
					console.log(err)
				})
			}
		},
		mounted() {
			// 登录自定义列表ff
			this.customf()
			
		},
		onLoad() {
			// 书籍请求方法
			
			// console.log('获取默认id',this.listTow)
			this.bokse()
			console.log(this.shuList)
			
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
			background-image: url(https://api-guji.sinmore.vip/wximg/200/书单.png);
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
			margin-top: 60rpx;
			.books-box {
		
				display: flex;
				justify-content: left;
				align-items: center;
				padding: 0 29rpx;
				box-sizing: border-box;
		
				.books-itme {
					width: 206rpx;
					height: 296rpx;
					margin-right: 44rpx;
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
						height: 190rpx;
						padding: 5rpx 18rpx;
						box-sizing: border-box;
						color: #333333;
						font-family: PingFang SC;
						overflow: hidden;
					}
				}
			}
		
			.books-pos {
				position: absolute;
				z-index: -1;
				bottom: -80rpx;
				height: 118.5rpx;
				width: 100%;
				
				background-size: 100% 100%;
				background-repeat: no-repeat;
				
				.text-pos{
					position: relative;
					top: 50rpx;
					width: 100%;
					height: 34rpx;
					display: flex;
					justify-content: left;
					align-items: center;
					padding: 0 29rpx;
					box-sizing: border-box;
					.text-itme{
						margin-right: 44rpx;
						width: 206rpx;
						height: 34rpx;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #000;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
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
