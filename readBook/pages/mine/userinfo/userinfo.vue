<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="https://api-guji.sinmore.vip/wximg/110/返回.png" mode=""></image>
			<text slot='text'>个人信息</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<u-calendar v-model="showStop" mode="date" max-date="2050-12-30" @change="calendarChangeStop"></u-calendar>
		<u-picker mode="region" v-model="showregion" @confirm="regionconfirm"></u-picker>
		<u-picker mode="selector" v-model="showselector"  :default-selector="[0]" :range="selector" @confirm="selectorconfirm"></u-picker>
		<!-- 显示-->
		<u-popup v-model="showpopup" mode="center"  width="560rpx" height="440rpx" :closeable="false" >
			<view style="background-color: rgb(234,234,234);color: #fff;width: 100%;height: 100%;font-family: PingFang SC;position: relative;box-sizing: border-box;">
				<view style="color: #000000;font-weight: 500;font-size: 36rpx;text-align: center;padding: 39rpx;">
					请选择性别
				</view>
				<view style="width: 418rpx;height: 103rpx;margin: 28rpx auto;color: #333333;font-size: 28rpx;font-weight: 400; display: flex;justify-content: space-between;align-items: center;">
					<u-radio-group width ='200rpx' style="display: flex;justify-content: space-between;align-items: center;" v-model="groupvalue" @change="radioGroupChange">
						<u-radio 
							@change="radioChange" 
							v-for="(item, index) in list" :key="index" 
							:name="item.name"
							:disabled="item.disabled"
							
						>
							{{item.name}}
						</u-radio>
					</u-radio-group>
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
		<scroll-view class="coupon" scroll-y="true">
			<!-- 第一个 -->
			<view class="one">
				<view class="itme" v-for="(itme,index) in userinfoOne" :key="index" @click="itmeOne(index)">
					<view class="itme-let">
						{{itme.text}}
					</view>
					<view class="itme-rigth">
						<view class="itme-rigth-one">
							<image v-if="itme.img" :src="itme.img" mode=""></image>
							<text v-else>{{itme.title}}</text>
						</view>
						<view class="itme-rigth-tow">
							<image src="https://api-guji.sinmore.vip/wximg/400/右箭头.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 第二个 -->
			<view class="tow">
				<view class="itme" v-for="(itme,index) in userinfoTow" :key="index" @click="itmeTow(index)">
					<view class="itme-let">
						{{itme.text}}
					</view>
					<view class="itme-rigth">
						<view class="itme-rigth-one">
							<image v-if="itme.img" :src="itme.img" mode=""></image>
							<text v-else>{{itme.title}}</text>
						</view>
						<view class="itme-rigth-tow">
							<image src="https://api-guji.sinmore.vip/wximg/400/右箭头.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 第三个 -->
			<view class="therr">
				<view class="itme" v-for="(itme,index) in userinfoTherr" :key="index" @click="itmeTherr(index)">
					<view class="itme-let">
						{{itme.text}}
					</view>
					<view class="itme-rigth">
						<view class="itme-rigth-one">
							<image v-if="itme.img" :src="itme.img" mode=""></image>
							<text v-else>{{itme.title}}</text>
						</view>
						<view class="itme-rigth-tow">
							<image src="https://api-guji.sinmore.vip/wximg/400/右箭头.png" mode=""></image>
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
				showregion:false,
				showpopup:false,
				showselector:false,
				selector:['博士','研究生','本科','大专','中专','高中','初中','小学'],
				list: [
					{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				groupvalue: '男',
				userinfoOne:[
					{
						text:'头像',
						img:'https://api-guji.sinmore.vip/wximg/410/默认头像.png',
						title:''
					},
					{
						text:'昵称',
						img:'',
						title:'诗人李白'
					},
					{
						text:'姓名',
						img:'',
						title:'李白'
					},
					{
						text:'性别',
						img:'',
						title:'男'
					},
					{
						text:'出生日期',
						img:'',
						title:'1989-12-01'
					},
					{
						text:'国家',
						img:'',
						title:'中国'
					},
					{
						text:'省份/城市',
						img:'',
						title:'北京'
					}
				],
				userinfoTow:[
					{
						text:'学历',
						img:'',
						title:'本科'
					},
					{
						text:'专业',
						img:'',
						title:'古典艺术'
					},
					{
						text:'职业',
						img:'',
						title:'书法老师'
					}
				],
				userinfoTherr:[
					{
						text:'单位名称',
						img:'',
						title:'新墨（北京）科技有限公司'
					},
					{
						text:'电话',
						img:'',
						title:'15810961102'
					},
					{
						text:'邮箱',
						img:'',
						title:'hsl@sinmore.com.cn'
					}
				],
				showStop:false,
				// 
				calendarStop:'',
				// 性别
				sex:1
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			},
			// 日历确定选择事件
			calendarChangeStop(event){
				this.showStop = false
				this.calendarStop = event.result
				this.$ureq({
					url: 'api/user/info',
					method: 'POST',
					data:{
						birthday:this.calendarStop,
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				})
				.then(res => {
					this.infoimg()
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
				console.log('结束日历:',event.result)
			},
			// 城市确定事件
			regionconfirm(event){
				console.log(event)
				this.$ureq({
					url: 'api/user/info',
					method: 'POST',
					data:{
						province:event.area.label,
						city:event.city.label,
						area:event.province.label
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				})
				.then(res => {
					this.infoimg()
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			},
			radioGroupChange(event){
				console.log(event)
			},
			radioChange(event){
				console.log(event)
				if(event == '男'){
					this.sex = 1 
				}else{
					this.sex = 2
				}
			},
			// 性别确定
			goGroupingConfig(){
				
				this.$ureq({
					url: 'api/user/info',
					method: 'POST',
					data:{
						sex:this.sex,
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				})
				.then(res => {
					this.infoimg()
					this.showpopup = false
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			},
			itmeOne(index){
				console.log(this.userinfoOne[index])
				console.log(index)
				let that = this
				if(index == 0){
					// 从相册选择1张图
					uni.chooseImage({
					    count: 1,
					    sizeType: ['original', 'compressed'],
					    sourceType: ['album'],
					    success: function(res) {
							console.log(res.tempFilePaths[0])
									 // 预览图片
							let filePath = res.tempFilePaths[0]
							const uploadTask = uni.uploadFile({
								 url:'https://api-guji.sinmore.vip/common/upload', // 这里加上图片上传的地址
								 filePath:res.tempFilePaths[0],
								 name: 'file',
								 success: (uploadFileRes) => {
									 let datas=JSON.parse(uploadFileRes.data); //这里面就是后台返回来的图片路径
									 console.log(datas)
									 that.$ureq({
									 	url: 'api/user/info',
									 	method: 'POST',
									 	data:{
									 		avatar:datas.url,
									 	},
									 	header: {
									 		Accept: 'application/json',
									 		Authorization: String(that.$store.state.token)
									 	}
									 })
									 .then(res => {
										that.infoimg()
									 	console.log('编辑成功',res)
									 })
									 .catch(err => {
									 	console.log(err)
									 })
								 },
								 fail:(err)=>{
									 uni.hideLoading();
									 uni.showToast({
										title:"网络已断开",
										icon:"none"
									 })
								 }
							});
					    }
					    });
				}else if(index == 3){
					this.showpopup = true
				}
				else if(index == 4){
					this.showStop = true
					
				}else if(index == 6){
					this.showregion = true
				}
				else{
					uni.navigateTo({
						url:'../mineCompile/mineCompile?text='+this.userinfoOne[index].text+'&index='+index+'&stasc=' + 0,
						fail(err) {
							console.log(err)
						}
					})
				}
				
			},
			
			itmeTow(index){
				console.log(this.userinfoTow[index])
				if(index==0){
					this.showselector = true
				}else{
					uni.navigateTo({
						url:'../mineCompile/mineCompile?text='+this.userinfoTow[index].text+'&index='+index+'&stasc=' + 1,
						fail(err) {
							console.log(err)
						}
					})
				}
				
				console.log(index)
			},
			// 学历确定
			selectorconfirm(e){
				console.log(this.selector[e])
				this.$ureq({
					url: 'api/user/info',
					method: 'POST',
					data:{
						education:this.selector[e],
					},
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				})
				.then(res => {
					this.infoimg()
					this.showpopup = false
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
			},
			itmeTherr(index){
				console.log(this.userinfoTherr[index])
				uni.navigateTo({
					url:'../mineCompile/mineCompile?text='+this.userinfoTherr[index].text+'&index='+index+'&stasc=' + 2,
					fail(err) {
						console.log(err)
					}
				})
				console.log(index)
			},
			infoimg(){
				// 用户信息
				this.$ureq({
					url: 'api/user/info',
					method: 'GET',
					header: {
						Accept: 'application/json',
						Authorization: String(this.$store.state.token)
					}
				})
				.then(res => {
					this.userinfoOne[0].img = res.data.avatar
					this.userinfoOne[1].title = res.data.name
					this.userinfoOne[2].title = res.data.real_name
					this.userinfoOne[3].title = res.data.sex
					if(this.userinfoOne[3].title == 1){
						this.userinfoOne[3].title = '男'
					}else{
						this.userinfoOne[3].title = '女'
					}
					this.userinfoOne[4].title = res.data.birthday
					if(this.userinfoOne[4].title == null){
						this.userinfoOne[4].title = ''
					}else{
						this.userinfoOne[4].title = res.data.birthday
					}
					this.userinfoOne[5].title = res.data.country
					this.userinfoOne[6].title = res.data.area+' '+res.data.city+' '+ res.data.province 
					
					this.userinfoTow[0].title = res.data.education
					this.userinfoTow[1].title = res.data.discipline
					this.userinfoTow[2].title = res.data.job
					
					this.userinfoTherr[0].title = res.data.company
					this.userinfoTherr[1].title = res.data.tel
					this.userinfoTherr[2].title = res.data.email
					console.log('用户信息',res)
				})
				.catch(err => {
					console.log(err)
				})
			}
		},
		onShow() {
			this.infoimg()
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #F6F1E9;	
		font-family: PingFang SC;
		.one{
			width: 100%;
			background-color: #FFFEFC;
			padding: 0 31rpx;
			box-sizing: border-box;
			
			.itme{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #E5E5E5;
				.itme-let{
					font-size:30rpx ;
					color: #333;
					font-weight: 400;
				}
				.itme-rigth{
					display: flex;
					justify-content: left;
					align-items: center;
					.itme-rigth-one{
						font-size:30rpx ;
						color: #999;
						font-weight: 400;
						image{
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
						}
					}
					.itme-rigth-tow{
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							margin-left: 14rpx;
							width: 17rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
		
		.tow{
			width: 100%;
			background-color: #FFFEFC;
			margin-top: 20rpx;
			padding: 0 31rpx;
			box-sizing: border-box;
			
			.itme{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #E5E5E5;
				.itme-let{
					font-size:30rpx ;
					color: #333;
					font-weight: 400;
				}
				.itme-rigth{
					display: flex;
					justify-content: left;
					align-items: center;
					.itme-rigth-one{
						font-size:30rpx ;
						color: #999;
						font-weight: 400;
						image{
							width: 80rpx;
							height: 80rpx;
						}
					}
					.itme-rigth-tow{
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							margin-left: 14rpx;
							width: 17rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
		.therr{
			width: 100%;
			background-color: #FFFEFC;
			margin-top: 20rpx;
			margin-bottom: 60rpx;
			padding: 0 31rpx;
			box-sizing: border-box;
			
			.itme{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx 0;
				border-bottom: 1rpx solid #E5E5E5;
				.itme-let{
					font-size:30rpx ;
					color: #333;
					font-weight: 400;
				}
				.itme-rigth{
					display: flex;
					justify-content: left;
					align-items: center;
					.itme-rigth-one{
						font-size:30rpx ;
						color: #999;
						font-weight: 400;
						image{
							width: 80rpx;
							height: 80rpx;
						}
					}
					.itme-rigth-tow{
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							margin-left: 14rpx;
							width: 17rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
	}
</style>
