<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="../../../static/icon/min/fanx.png" mode=""></image>
			<text slot='text'>个人信息</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
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
							<image src="http://i1.fuimg.com/733036/2dcc5d08d0f440e7.png" mode=""></image>
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
							<image src="http://i1.fuimg.com/733036/2dcc5d08d0f440e7.png" mode=""></image>
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
							<image src="http://i1.fuimg.com/733036/2dcc5d08d0f440e7.png" mode=""></image>
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
				userinfoOne:[
					{
						text:'头像',
						img:'http://i1.fuimg.com/733036/9d6e434cfc171905.png',
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
			itmeOne(index){
				console.log(this.userinfoOne[index])
				console.log(index)
				uni.navigateTo({
					url:'../mineCompile/mineCompile?text='+this.userinfoOne[index].text+'&index='+index+'&stasc=' + 0,
					fail(err) {
						console.log(err)
					}
				})
			},
			itmeTow(index){
				console.log(this.userinfoTow[index])
				uni.navigateTo({
					url:'../mineCompile/mineCompile?text='+this.userinfoTow[index].text+'&index='+index+'&stasc=' + 1,
					fail(err) {
						console.log(err)
					}
				})
				console.log(index)
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
			}
		},
		onLoad() {
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
				this.userinfoOne[2].title = res.data.name
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
				this.userinfoOne[6].title = res.data.province
				
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
