<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<text slot='text'>分类</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<!-- 顶级分类 -->
			<view class="column-box">
				<view :class="figure == index?'one':'tow'" v-for="(itme,index) in listClass" :key="index" @click="classClick(listClass[index],index)">
					<view class="">
						{{itme.catagoryName}}
					</view>
					<view class="">
						<text>[</text>{{itme.categoryCount}}<text>]</text>
					</view>
				</view>
			</view>
			<view style="height: calc(100% - 200rpx);width: 100%;display: flex;align-items: center;justify-content: left;">
				<scroll-view class="column-left-box" scroll-y="true" >
					<view :class="figureOff ==index?'one':'tow'" v-for="(itme,index) in towListClass" :key="index" @click="columnLeft(towListClass[index],index)">
						<text class="text-lo">{{itme.catagoryName}}</text> 
						<text>
							<text>[</text>
							{{itme.categoryCount}}
							<text>]</text>
						</text>
					</view>
				</scroll-view>
				<scroll-view class="column-rigth-box" scroll-y="true" >
					<view class="" v-for="(itme,index) in therrListClass" :key="index">
						<view class="background-box" @click="backgroundClick(therrListClass[index],index)">
							{{itme.catagoryName}} <text style="margin-left: 10rpx;">[{{itme.categoryCount}}]</text>
						</view>
					</view>
				</scroll-view>
			</view>
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
				// 一级
				figure:0,
				// 二级
				figureOff:0,
				// 一级类别
				listClass:[],
				// 二级类别
				towListClass:[],
				// 三级类别
				therrListClass:[]
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 点击顶级分类
			classClick(row,index){
				this.figure = index
				console.log(row)
				this.$ureq({
					url:'api/book/category',
					method:'GET',
					data:{
						parentId:row.id
					}
				})
				.then( (res)=> {
					this.towListClass = res.data
					console.log('-------catagoryCode------>',this.towListClass[0].catagoryCode)
					this.$ureq({
						url:'api/book/category',
						method:'GET',
						data:{
							parentId:this.towListClass[0].id,
							categoryCode:this.towListClass[0].catagoryCode
						}
					})
					.then( (res)=> {
						this.therrListClass = res.data
						console.log('三级分类',res)
					})
					.catch((err) => {
						console.log(err)
					})
					console.log(this.towListClass)
					console.log('二级分类',res)
				})
				.catch((err) => {
					console.log(err)
				})
			},
			// 选中二级分类
			columnLeft(row,index){
				this.figureOff = index
				console.log(row)
				console.log(index)
				this.$ureq({
					url:'api/book/category',
					method:'GET',
					data:{
						parentId:row.id,
						categoryCode:row.catagoryCode
					}
				})
				.then( (res)=> {
					this.therrListClass = res.data
					console.log('三级分类',res)
				})
				.catch((err) => {
					console.log(err)
				})
			},
			// 选中三级
			backgroundClick(row,index){
				console.log(row) 
				console.log(index)
				uni.navigateTo({
					url:'./listOfBooks/listOfBooks?catagoryCode='+row.catagoryCode+'&text='+row.catagoryName+'&categoryCount='+ row.categoryCount,
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
			
		},
		onShow() {
			this.figure = this.$store.state.row.index
			console.log(this.$store.state.row)
			// 分类
			this.$ureq({
				url:'api/book/category',
				method:'GET'
			})
			.then( (res)=> {
				this.listClass = res.data
				console.log('分类',res)
				this.$ureq({
					url:'api/book/category',
					method:'GET',
					data:{
						parentId:this.listClass[this.figure].id
					}
				})
				.then( (res)=> {
					this.towListClass = res.data
					this.$ureq({
						url:'api/book/category',
						method:'GET',
						data:{
							parentId:this.listClass[this.figure].id,
							catagoryCode:this.towListClass[this.figure].catagoryCode
						}
					})
					.then( (res)=> {
						this.therrListClass = res.data
						console.log('三级分类',res)
					})
					.catch((err) => {
						console.log(err)
					})
				})
				.catch((err) => {
					console.log(err)
				})
			})
			.catch((err) => {
				console.log(err)
			})
		},
		onHide() {
			this.$store.commit('elimiclass')
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #FFFDF6;
		.column-box{
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 200rpx;
			width: 750rpx;
			text-align: center;
			.one{
				font-size: 32rpx;
				font-family: PingFang SC;
				color: #fff;
				background-image: url(http://i1.fuimg.com/733036/a1f7acc2afb0839b.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				padding: 19rpx 31rpx;
				font-weight: 500;
			}
			.tow{
				font-size: 28rpx;
				color: #666;
				padding: 19rpx 31rpx;
				font-family: PingFang SC;
				font-weight: 400;
			}
		}
		
		.column-left-box{
			width: 320rpx;
			height: 100%;
			background-color: #F5EFE6;
			.one{
				background-color: #FFFDF6;
				color: #A3834F;
				padding: 28rpx 0;
				font-size: 28rpx;
				.text-lo{
					padding-left: 22rpx;
					border-left: 6rpx solid #A3834F;
				}
			}
			.tow{
				background-color: #F5EFE6;
				color: #666666;
				font-size: 28rpx;
				padding: 28rpx;
			}
		}
		
		.column-rigth-box{
			width: 370rpx;
			height: 100%;
			margin-left: 30rpx;
			.background-box{
				width: 100%;
				height: 120rpx;
				margin-bottom: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-image: url(http://i1.fuimg.com/733036/8ded2f9896905900.png);
				background-size: 100%;
				background-repeat: no-repeat;
				font-size: 28rpx;
				color: #333333;
				font-family: PingFang SC;
			}
		}
	}
</style>
