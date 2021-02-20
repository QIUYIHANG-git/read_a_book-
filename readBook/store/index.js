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
		tokenType:'',
		row:{
			id:'',
			index:0
		}
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
		},
		// 分类
		classadd(state,payload){
			state.row.id = payload.id
			state.row.index = payload.index
		},
		// 清空分类id
		elimiclass(state){
			state.row.id = ''
			state.row.index = 0
		}
		
	},
	actions: {},
	modules: {}
})
