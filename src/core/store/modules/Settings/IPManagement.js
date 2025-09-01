import { httpDel, httpGet, httpPost, httpPut } from 'boot/axios';

const store = {
	namespaced: true,
	state: {
		ip_white_block: [],
		ip_realtime_access: [],
	},
	getters: {
		GET_IPS: (state) => {
			return state.systems;
		},
	},
	mutations: {
		SET_IPS(state, payload) {
			state.ips = payload;
		},
	},
	actions: {
		FETCH_IPS(context, payload) {
			return new Promise((resolve, reject) => {
				httpGet(
					`core/ipTables`,
					{
						success: (response) => {
							if (response.data.status === 'success') {
								context.commit('SET_IPS', response.data.data);
							}
							resolve(response.data);
						},
						catch: (response) => {
							reject(response.data);
						},
					},
					payload
				);
			});
		},
		FETCH_REALTIME_ACCESS_IPS(context, payload) {
			return new Promise((resolve, reject) => {
				httpGet(
					`core/ipRealtimeAccess`,
					{
						success: (response) => {
							if (response.data.status === 'success') {
								context.commit('SET_IPS', response.data.data);
							}
							resolve(response.data);
						},
						catch: (response) => {
							reject(response.data);
						},
					},
					payload
				);
			});
		},
	},
};

export default store;
