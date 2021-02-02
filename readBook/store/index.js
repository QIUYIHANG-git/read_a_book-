import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		//账号信息 
		info: {
			userName: '',
			userImg: ''
		},
		token:'',
		tokenType:''
	},
	mutations: {
		// 账号信息
		infoMessage(state,payload){
			state.info.userName = payload.name
			state.info.userImg = payload.img
		},
		// 清空账号信息
		eliminateInfo(state) {
			state.info.userName = ''
			state.info.userImg = ''
		},
		// 清空token
		eliminateToken(state){
			state.token = ''
		},
		// 清空tokenType
		eliminateTokenType(state){
			state.tokenType = ''
		}
	},
	actions: {},
	modules: {}
})
