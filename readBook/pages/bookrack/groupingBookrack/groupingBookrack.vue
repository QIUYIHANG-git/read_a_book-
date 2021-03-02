<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="https://api-guji.sinmore.vip/wximg/110/返回.png" mode=""></image>
			<text slot='text'>{{textName}}</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="text-book">
				本书单共<text style="margin: 0 10rpx;color: #A1814C;">{{textNumber}}</text>本书
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
				// 列表名称
				textName:'',
				// 自定义列表ID
				textId:'',
				// 默认ID
				NnberId:'',
				// 几本书
				textNumber:0,
				// 列表书籍
				lent:[]
				
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 网络请求书方法
			bokse(){
				this.$ureq({
					url:'api/bookshelf',
					method:'GET',
					data:{
						page:'1',
						per_page:'1000',
						default_group:this.NnberId,
						bookgroup_id:this.textId
					},
					header:{
						Accept:'application/json',
						Authorization:String(this.$store.state.token) 
					}
				}).then(res => {
					this.textNumber = res.data.length
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
						per_page:perPageNumber,
						default_group:this.NnberId,
						bookgroup_id:this.textId
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
					url:'../../home/theBookDetails/theBookDetails?id='+ row.bookguid+'&toc_id='+(this.textId?this.textId:this.NnberId)+'&name='+row.book_info.bookname+'&dynastyname='+row.book_info.dynastyname,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log(err)
					}
				})
			}
		},
		onLoad(op) {
			console.log(op)
			let that = this
			this.textName = op.name
			this.textId = op.id?op.id:''
			this.NnberId = op.ids?op.ids:''
			this.bokse()
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #fff;
		.text-book{
			padding: 32rpx;
			color: #999999;
			font-size: 28rpx;
			font-family: PingFang SC;
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

