<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="https://api-guji.sinmore.vip/wximg/110/返回.png" mode=""></image>
			<text slot='text'>编辑{{text}}</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="input-box">
				<view style="width: 88%;height: 50%;">
					<input v-model="userinfo" placeholder="请输入" type="text" value="" />
				</view>
				
			</view>
			<view class="ok-click" @click="confirm">
				确定
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
				text:'',
				//参数
				avatar:'',
				name:'',
				real_name:'',
				mobile:'',
				sex:'',
				birthday:'',
				country:'',
				province:'',
				city:'',
				area:'',
				education:'',
				discipline:'',
				job:'',
				company:'',
				tel:'',
				email:'',
				userinfo:'',
				// 状态
				stact:0,
				// 下
				indexs:0
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 确定事件
			confirm(){
				if(this.stact==0){
					if(this.indexs == 1){
						this.$ureq({
							url: 'api/user/info',
							method: 'POST',
							data:{
								name:this.userinfo,
							},
							header: {
								Accept: 'application/json',
								Authorization: String(this.$store.state.token)
							}
						})
						.then(res => {
							uni.showToast({
								title:'编辑名称成功',
								icon:'success',
								duration:1000
							})
							console.log('用户信息',res)
						})
						.catch(err => {
							console.log(err)
						})
						
					}else if(this.indexs == 2){
						this.$ureq({
							url: 'api/user/info',
							method: 'POST',
							data:{
								real_name:this.userinfo,
							},
							header: {
								Accept: 'application/json',
								Authorization: String(this.$store.state.token)
							}
						})
						.then(res => {
							uni.showToast({
								title:'编辑姓名成功',
								icon:'success',
								duration:1000
							})
							console.log('用户信息',res)
						})
						.catch(err => {
							console.log(err)
						})
					}else if(this.indexs == 5){
						this.$ureq({
							url: 'api/user/info',
							method: 'POST',
							data:{
								country:this.userinfo,
							},
							header: {
								Accept: 'application/json',
								Authorization: String(this.$store.state.token)
							}
						})
						.then(res => {
							uni.showToast({
								title:'编辑国家成功',
								icon:'success',
								duration:1000
							})
							console.log('用户信息',res)
						})
						.catch(err => {
							console.log(err)
						})
					}else {
						this.city = this.userinfo
					}
					console.log('状态1执行')
				}else if(this.stact==1){
					if(this.indexs == 1){
						this.$ureq({
							url: 'api/user/info',
							method: 'POST',
							data:{
								discipline:this.userinfo,
							},
							header: {
								Accept: 'application/json',
								Authorization: String(this.$store.state.token)
							}
						})
						.then(res => {
							uni.showToast({
								title:'编辑专业成功',
								icon:'success',
								duration:1000
							})
							console.log('用户信息',res)
						})
						.catch(err => {
							console.log(err)
						})
					}else{
						this.$ureq({
							url: 'api/user/info',
							method: 'POST',
							data:{
								job:this.userinfo,
							},
							header: {
								Accept: 'application/json',
								Authorization: String(this.$store.state.token)
							}
						})
						.then(res => {
							uni.showToast({
								title:'编辑职业成功',
								icon:'success',
								duration:1000
							})
							console.log('用户信息',res)
						})
						.catch(err => {
							console.log(err)
						})
					}
					console.log('状态2执行')
				}else{
					if(this.indexs == 0){
						this.$ureq({
							url: 'api/user/info',
							method: 'POST',
							data:{
								company:this.userinfo,
							},
							header: {
								Accept: 'application/json',
								Authorization: String(this.$store.state.token)
							}
						})
						.then(res => {
							uni.showToast({
								title:'编辑单位名称成功',
								icon:'success',
								duration:1000
							})
							console.log('用户信息',res)
						})
						.catch(err => {
							console.log(err)
						})
					}else if(this.indexs == 1){
						this.$ureq({
							url: 'api/user/info',
							method: 'POST',
							data:{
								tel:this.userinfo,
							},
							header: {
								Accept: 'application/json',
								Authorization: String(this.$store.state.token)
							}
						})
						.then(res => {
							uni.showToast({
								title:'编辑电话号码成功',
								icon:'success',
								duration:1000
							})
							console.log('用户信息',res)
						})
						.catch(err => {
							console.log(err)
						})
					}else{
						this.$ureq({
							url: 'api/user/info',
							method: 'POST',
							data:{
								email:this.userinfo,
							},
							header: {
								Accept: 'application/json',
								Authorization: String(this.$store.state.token)
							}
						})
						.then(res => {
							uni.showToast({
								title:'编辑邮箱成功',
								icon:'success',
								duration:1000
							})
							console.log('用户信息',res)
						})
						.catch(err => {
							console.log(err)
						})
					}
					console.log('状态3执行')
				}
				uni.navigateBack({
					delta: 1
				});
			}
		},
		onLoad(op) {
			console.log(op)
			this.text = op.text
			this.stact = op.stasc
			this.indexs = op.index
			this.$ureq({
				url: 'api/user/info',
				method: 'GET',
				header: {
					Accept: 'application/json',
					Authorization: String(this.$store.state.token)
				}
			})
			.then(res => {
				this.avatar= res.data.avatar
				this.name= res.data.name
				this.mobile= res.data.mobile
				this.sex= res.data.sex
				this.birthday= res.data.birthday
				this.country= res.data.country
				this.province= res.data.province
				this.city= res.data.city
				this.area= res.data.area
				this.education= res.data.education
				this.discipline= res.data.discipline
				this.job= res.data.job
				this.company= res.data.company
				this.tel= res.data.tel
				this.email= res.data.email
				console.log('用户信息',res)
			})
			.catch(err => {
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
		.input-box{
			background-color: #fff;
			width: 690rpx;
			height: 110rpx;
			margin: 60rpx auto;
			display: flex;
			justify-content: center;
			align-items: center;
			input{
				width: 100%;
				height: 100%;
			}
		}
		.ok-click{
			font-size: 36rpx;
			color: #fff;
			font-weight: 400;
			width: 690rpx;
			height: 88rpx;
			background-color: #A3834F;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
