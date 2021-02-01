let api = 'http://192.168.168.185:13005/admin'


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
				// if(res.code != 0){
				// 	uni.showToast({
				// 		title:res.msg,
				// 		icon:'none',
				// 		duration:3000
				// 	})
				// 	return
				// }
				resolve(res)
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
// ureq.interceptor.request = (config => {
	
// })
// ureq.interceptor.response = (response) => {
//     //判断返回状态 执行相应操作
// 	console.log(response)
//     return response;
// }
// ureq.interceptors.request.use = (config) => {
// 	console.log(config)
// 	return config
// }
export default ureq