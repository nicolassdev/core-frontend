import { httpDel, httpGet, httpPost } from 'boot/axios';

const store = {
	namespaced: true,
	state: {
		searchResult: [],
	},
	getters: {
		GET_SEARCH_RESULT: (state) => {
			return state.searchResult;
		},
	},
	mutations: {
		SET_SEARCH_RESULT(state, payload) {
			state.searchResult = payload;
		},
	},
	actions: {
		SEARCH(context, payload) {
			return new Promise((resolve, reject) => {
				httpGet(
					payload.path,
					{
						success: (response) => {
							if (response.data.status === 'success') {
								context.commit('SET_SEARCH_RESULT', response.data.data);
							}
							resolve(response.data);
						},
						catch: (response) => {
							reject(response.data);
						},
					},
					payload.params
				);
			});
		},
	},
};

export default store;
