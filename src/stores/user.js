import {ref, computed, watch} from 'vue'
import {defineStore} from 'pinia'
import _ from "lodash";
import axios from "axios";

export function getLocalUser() {
	try {
		const localUser = localStorage.getItem('user')
		if (!_.isEmpty(localUser)) {
			return JSON.parse(localUser)
		}

	} catch (e) {
		localStorage.removeItem('user')
	}

	return null
}

export function getLocalAccessToken(){
	try {
		const localAccessToken = localStorage.getItem('access_token')
		if (!_.isEmpty(localAccessToken)) {
			return JSON.parse(localAccessToken)
		}

	} catch (e) {
		console.error(e)
		localStorage.removeItem('access_token')
	}

	return null
}

export const useUserStore = defineStore('user', () => {

	let user = ref()
	let access_token = ref()

	// 获取数据
	user.value = getLocalUser()
	access_token.value = getLocalAccessToken()

	function setUser(_user) {
		user.value = _user.user
		// 持久化
		localStorage.setItem('user', JSON.stringify(user.value))
	}

	function clearUser() {
		user.value = {}
		// 持久化
		localStorage.removeItem('user')
	}

	function setUserToken(_user) {
		access_token.value = _user.access_token
		// 持久化
		localStorage.setItem('access_token', JSON.stringify(access_token))
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token.value;
	}

	function clearUserToken() {
		access_token.value = {}
		// 持久化
		localStorage.removeItem('access_token')
	}

	return {user, access_token, setUser, setUserToken, clearUser, clearUserToken}
})

