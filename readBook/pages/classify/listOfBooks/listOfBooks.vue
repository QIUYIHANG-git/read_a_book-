<template>
	<view class="coupon-box" :style="{height:`calc(100vh - ${matop})`}">
		<taber @child-event='parevent'>
			<image slot="img" src="http://i2.tiimg.com/733036/c51090a6f01cc19e.png" mode=""></image>
			<text slot='text'>{{titleText}}</text>
		</taber>
		<view class="id" :style="{
			marginTop: `${matop}`
		}">
		</view>
		<scroll-view class="coupon" scroll-y="true">
			<view class="" @click="login">
				暂无数据
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
				titleText:''
			}
		},
		methods: {
			// 自定义事件
			parevent(data) {
				console.log(data)
				this.matop = data
				console.log(this.matop)
			}
		},
		onLoad(op) {
			console.log(op)
			this.titleText = op.text
			this.$ureq({
				url:'api/book/search',
				method:'GET',
				data:{
					page:'1',
					per_page:'1000',
					catagoryCode:op.categoryCode
				}
			})
			.then( (res)=> {
				console.log('书籍',res)
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
</script>

<style scoped lang="less">
	.coupon{
		height:100%;
		width: 100%;
		background-color: #fff;
	}
</style>

