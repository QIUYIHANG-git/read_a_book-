<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>书架</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="read-box">
				<view class="read-box-one">
					本周阅读<text>1980</text>分钟
				</view>
				<view class="read-box-tow">
					<view class="search-itme" @click="csearchClick">
						<image src="http://i1.fuimg.com/733036/9e98775c16b2b2e8.png" mode=""></image>
						<!-- <input placeholder-style="color: #B9A798;" placeholder="搜索"type="text" value="" /> -->
						<text>搜索</text>
					</view>
				</view>
				<view class="read-box-therr">
					<image src="http://i1.fuimg.com/733036/f4cebf350195b2cb.png" mode="" @click="offOn"></image>
					<view v-show="offpos" class="read-box-therr-pos">
						<view class="text-itme" @click="grouping">
							新建分组
						</view>
						<view class="text-itme" @click="compile">
							编辑
						</view>
						<view class="text-itme" @click="pattern">
							切换模式
						</view>
					</view>
				</view>
			</view>
			<view v-if="modelOne==0">
				<!-- 默认分组 -->
				<view class="img-itme" v-for="(list,index) in listUrl" :key="index" :style="{backgroundImage:`${list.url}`}" @click="defaultGrouping(listUrl[index])">
					<view class="text-number">
						{{list.text}}<text>[{{list.number}}]</text>
					</view>
					<view class="in-detail">
						<image src="../../static/icon/bookrack/详细.png" mode=""></image>
					</view>
				</view>
			</view>
			<view v-else-if="modelOne==1">
				<!-- 自定义分组 -->
				<view class="img-itme-tow" v-for="(listUrl,index) in listTow" :key="index" :style="{backgroundImage:`${listUrl.url}`}" @click="customGrouping(listTow[index])" @longpress="logGrouping(listTow[index])">
					<view class="text-number">
						{{listUrl.name}}<text>[{{listUrl.book_count}}]</text>
					</view>
					<view class="in-detail">
						<image src="../../static/icon/bookrack/详细.png" mode=""></image>
					</view>
				</view>
				<!-- 推荐书籍 -->
				<view class="books" v-for="(shu,index) in lent" :key='index'>
					<view class="books-box">
						<view class="books-itme" v-for="(shuitme,index2) in shu.listtext" :key="index2" :style="{backgroundImage:`${shuitme.url}`}" @click="pitchOk(shu.listtext[index2],index,index2)">
							<view class="text-box">
								{{shuitme.book_info.bookname}}
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
			</view>
			<!-- 新建分组显示-->
			<u-popup v-model="okConfigOff" mode="center" border-radius="14" width="560rpx" height="450rpx" :closeable="false" >
				<view style="background-color: rgb(234,234,234);color: #fff;width: 100%;height: 100%;display: flex;
				align-items: flex-end;flex-wrap: wrap;font-family: PingFang SC;">
					<view style="width: 100%;text-align: center;color: rgb(0,0,0);font-size: 36rpx;font-weight: bold;">
						新建分组
					</view>
					<view style="color: #999999;width:480rpx;font-size: 32rpx;margin:0 auto; border-bottom: 1rpx solid #E5E5E5; padding: 40rpx 0;">
						<input v-model="groupingName" type="text" value="" placeholder="请输入分组名称(限10字)" style-placeholder="color: #999999" />
					</view>
					<view style="background-color: #A1814C;width: 100%;padding: 20rpx 0;text-align: center;font-size: 32rpx;font-weight: 400;" @click="succeedConfig">
						确定
					</view>
				</view>
			</u-popup>
			<!-- 删除显示-->
			<u-popup v-model="deleteOff" mode="center" border-radius="14" width="560rpx" height="400rpx" :closeable="false" >
				<view style="background-color: rgb(234,234,234);color: #fff;width: 100%;height: 100%;display: flex;
				align-items: flex-end;flex-wrap: wrap;font-family: PingFang SC;">
					<view style="width: 100%;text-align: center;color: rgb(0,0,0);font-size: 36rpx;font-weight: bold;">
						删除分组
					</view>
					<view style="color: #999999;width:480rpx;font-size: 32rpx;margin:0 auto; border-bottom: 1rpx solid #E5E5E5; padding: 40rpx 0;text-align: center;">
						确定删除<text style="color: #f00;">{{textdelete}}</text>分组？
					</view>
					<view style="background-color: #A1814C;width: 100%;padding: 20rpx 0;text-align: center;font-size: 32rpx;font-weight: 400;" @click="deleteConfig">
						确定
					</view>
				</view>
			</u-popup>
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
				// 书架长度
				lent:[],
				// 菜单
				offpos: false,
				// 模式状态
				modelOne: 0,
				// 
				orinumber:[0,1],
				// 添加分组
				okConfigOff:false,
				//  添加分组名字
				groupingName:'',
				//删除的时候显示 
				textdelete:'',
				// 删除显示
				deleteOff:false,
				deleteId:null,
				// 模式0分组
				listUrl: [{
						text: '經部',
						number: 10,
						id:null,
						url: 'url(http://i1.fuimg.com/733036/efdd3523da44179a.png)'
					},
					{
						text: '史部',
						number: 4,
						id:null,
						url: 'url(http://i1.fuimg.com/733036/861f1c925c3f033a.png)'
					},
					{
						text: '子部',
						number: 10,
						id:null,
						url: 'url(http://i1.fuimg.com/733036/b6a50ea69c19fedb.png)'
					},
					{
						text: '集部',
						number: 4,
						id:null,
						url: 'url(http://i1.fuimg.com/733036/67d5de97495fb1fe.png)'
					},
					{
						text: '叢部',
						number: 4,
						id:null,
						url: 'url(http://i1.fuimg.com/733036/d365f55a606d93f9.png)'
					}
				],
				// 模式1分组
				listTow: [],
				// 书籍
				shuList: [{
						text: '周易孔義集說',
						url: 'url(http://i1.fuimg.com/733036/7dd9f2f302c81f8b.png)'
					},
					{
						text: '社司轉帖',
						url: 'url(http://i1.fuimg.com/733036/0410811b532653e4.png)'
					},
					{
						text: '修文殿禦覽存',
						url: 'url(http://i1.fuimg.com/733036/caecb6a3d8d048e6.png	)'
					}
				],
				// 书籍2
				shuListTow:[
					{
						text: '周易孔義集說',
						url: 'url(http://i1.fuimg.com/733036/7dd9f2f302c81f8b.png)'
					},
					{
						text: '修文殿禦覽存',
						url: 'url(http://i1.fuimg.com/733036/7dd9f2f302c81f8b.png)'
					},
					{
						text: '相宗絡索',
						url: 'url(http://i1.fuimg.com/733036/7dd9f2f302c81f8b.png)'
					}
				]
				
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 菜单显示与退出
			offOn() {
				if (this.offpos == false) {
					this.offpos = true
				} else {
					this.offpos = false
				}
			},
			// 新建分组方法
			grouping() {
				this.offpos = false
				this.modelOne == 1?(this.okConfigOff=true) : uni.showToast({
					title:'请切换模式再操作',
					icon:'none',
					duration:2000
				})
				console.log('新建分组')
			},
			// 编辑方法
			compile() {
				console.log('编辑')
				uni.navigateTo({
					url:'./compile/compile',
					fail(err) {
						console.log(err)
					}
				})
			},
			// 方法
			movegx(){
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
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			},
			// 切换模式方法
			pattern() {
				console.log('切换模式')
				this.offpos = false
				if (this.modelOne == 0) {
					// 登录自定义列表
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
						console.log(res)
					})
					.catch(err => {
						console.log(err)
					})
					this.modelOne = 1
				} else {
					this.modelOne = 0
				}
			},
			// 选中编辑
			oriOd(index){
				uni.navigateTo({
					url:'./compile/compile',
					fail(err) {
						console.log(err);
					}
				})
			},
			// 默认分组
			defaultGrouping(row){	
				console.log(row)
				uni.navigateTo({
					url:'./groupingBookrack/groupingBookrack?ids='+row.id+'&name='+row.text,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			// 添加分组确定
			succeedConfig(){
				this.$ureq({
					url:'api/bookgroup',
					method:'POST',
					data:{
						name:this.groupingName
					},
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res =>{
					this.okConfigOff = false
					this.movegx()
					uni.showToast({
						title:'添加成功',
						icon:'success',
						duration:2000
					})
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			},
			// 自定义分组
			customGrouping(row){
				console.log(row)
				uni.navigateTo({
					url:'./groupingBookrack/groupingBookrack?id='+row.id+'&name='+row.name,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			logGrouping(row){
				this.textdelete = row.name
				this.deleteId = row.id
				this.deleteOff = true
				console.log('-------------',row)
			},
			// 删除
			deleteConfig(){
				this.deleteOff = false
				this.$ureq({
					url:'api/bookgroup/'+this.deleteId,
					method:'DELETE',
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res => {
					console.log(res)
					this.movegx()
					uni.showToast({
						title:'删除成功',
						icon:'success',
						duration:2000
					})
				}).catch(err => {
					console.log(err)
				})
			},
			// 搜索
			csearchClick(){
				uni.navigateTo({
					url:'./search/search',
					fail(err) {
						console.log(err)
					}
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
			// 详情
			pitchOk(row,index,index2){
				console.log(row)
				console.log(index)
				console.log(index2)
				uni.navigateTo({
					url:'../home/theBookDetails/theBookDetails?id='+ row.bookguid+'&toc_id='+'1'+'&name='+row.book_info.bookname,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		},
		mounted() {
			console.log(String(this.$store.state.token))
			// 登录默认列表
			this.$ureq({
				url:'api/bookgroup/default',
				method:'GET',
				header:{
					Accept:'application/json',
					Authorization:String(this.$store.state.token) 
				}
			}).then(res =>{
				for(let i in this.listUrl){
					this.listUrl[i].text = res.data[i].name
					this.listUrl[i].id = res.data[i].id
					this.listUrl[i].number = res.data[i].book_count
				}
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
			this.$ureq({
				url:'api/bookshelf',
				method:'GET',
				data:{
					page:'1',
					per_page:'4'
				},
				header:{
					Accept:'application/json',
					Authorization:String(this.$store.state.token) 
				}
			}).then(res => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
			
		},
		onShow() {
			this.bokse()
			this.pattern()
		}
	}
</script>

<style scoped lang="less">
	.coupon {
		height: 100%;
		width: 100%;
		background: #F6F1E9;
		padding-bottom: 21rpx;
		.read-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			padding: 0 30rpx 30rpx 31rpx;

			.read-box-one {
				font-size: 28rpx;
				font-family: PingFang SC;

				text {
					color: #A1814C;
					font-size: 40rpx;
				}
			}

			.read-box-tow {
				.search-itme {
					background-color: #FFFEF7;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 64rpx;
					width: 200rpx;
					border-radius: 32rpx;

					image {
						width: 28rpx;
						height: 28rpx;
					}

					text {
						margin-left: 11rpx;
						color: #A1814C;
						font-size: 28rpx;
					}
				}
			}

			.read-box-therr {
				position: relative;

				image {
					width: 64rpx;
					height: 64rpx;
				}

				.read-box-therr-pos {
					width: 180rpx;
					height: 275rpx;
					background-image: url(../../static/icon/bookrack/弹出.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					position: absolute;
					top: 100%;
					z-index: 999;
					right: 0;
					overflow: hidden;
					animation-name: moveheigth;
					animation-duration: .5s;
					animation-timing-function: linear;

					@keyframes moveheigth {
						0% {
							height: 0;
						}

						25% {
							height: 25%;
						}

						45% {
							height: 45%;
						}

						50% {
							height: 65%;
						}

						70% {
							height: 75%;
						}

						85% {
							height: 85%;
						}

						100% {
							height: 100%;
						}
					}

					.text-itme {
						width: 100%;
						height: 91rpx;
						color: #fff;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						display: flex;
						justify-content: center;
						align-items: center;
						border-bottom: 1rpx solid #333333;
					}
				}
			}

		}

		.img-itme {
			width: 690rpx;
			height: 120rpx;
			margin: 0 auto 30rpx auto;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			display: flex;
			justify-content: space-between;
			align-items: center;

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

		.img-itme-tow {
			width: 690rpx;
			height: 120rpx;
			margin: 0 auto 30rpx auto;
			background-image: url(http://i1.fuimg.com/733036/858a6e0a012d3a88.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			.ori{
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				background-color: rgba(0,0,0,.6);
				border: 3rpx solid #fff;
				position: absolute;
				top: 0;
				image{
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
</style>
