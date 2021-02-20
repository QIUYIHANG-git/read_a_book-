<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="../../../static/icon/min/fanx.png" mode=""></image>
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
					if(this.indexs == 0){
						this.avatar = this.userinfo
					}else if(this.indexs == 1){
						this.name = this.userinfo
					}else if(this.indexs == 2){
						this.name = this.userinfo
					}else if(this.indexs == 3){
						this.sex = this.userinfo
					}else if(this.indexs == 4){
						this.birthday = this.userinfo
					}else if(this.indexs == 5){
						this.country = this.userinfo
					}else {
						this.city = this.userinfo
					}
					console.log('状态1执行')
				}else if(this.stact==1){
					if(this.indexs == 0){
						this.education = this.userinfo
					}else if(this.indexs == 1){
						this.discipline = this.userinfo
					}else{
						this.job = this.userinfo
					}
					console.log('状态2执行')
				}else{
					if(this.indexs == 0){
						this.company = this.userinfo
					}else if(this.indexs == 1){
						this.tel = this.userinfo
					}else{
						this.email = this.userinfo
					}
					console.log('状态3执行')
				}
				this.$ureq({
					url: 'api/user/info',
					method: 'POST',
					data:{
						avatar:this.avatar,
						name:this.name,
						mobile:this.mobile,
						sex:this.sex,
						birthday:this.birthday,
						country:this.country,
						province:this.province,
						city:this.city,
						area:this.area,
						education:this.education,
						discipline:this.discipline,
						job:this.job,
						company:this.company,
						tel:this.tel,
						email:this.email
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				})
				.then(res => {
					console.log('用户信息',res)
				})
				.catch(err => {
					console.log(err)
				})
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
