let api = 'https://api-guji.sinmore.vip/'


/***
 **网络请求
 ***/
let ureq = function uget(options = {}){
	return new Promise((resolve,reject) => {
		// const config = {
		// 	url:api + options.url,
		// 	data:options.data,
		// 	header:options.header,
		// 	method:options.method
		// }
		// if(config){
		// 	console.log("请求信息：",config)
		// 	return
		// }
		uni.request({
			url:api + options.url,
			data:options.data,
			header:options.header,
			method:options.method,
			// config,
			success(res) {
				if(res.statusCode == 200){
					resolve(res)
				}else{
					uni.showToast({
						title:res.data.errors.id[0],
						icon:'none',
						duration:3000
					})
					return
				}
				
			},
			fail(err) {
				uni.showToast({
					title:'网络请求失败',
					icon:'none',
					duration:3000
				})
				reject(err)
			}
		})
	})
} 
export default ureq