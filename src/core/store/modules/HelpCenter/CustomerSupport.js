import { httpDel, httpGet, httpPost } from 'boot/axios';

const store = {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {
		// VALIDATE_USER_TOKEN(context, payload) {
		// 	return new Promise((resolve, reject) => {
		// 		httpGet('core/authenticate', {
		// 			success: (response) => {
		// 				if (response.data.status === 'success') {
		// 					context.commit('SET_LOGGED_IN_USER', response.data.data.user);
		// 					context.commit('SET_SYSTEMS', response.data.data.user.permissions);
		// 				} else {
		// 					context.commit('SET_LOGGED_IN_USER', null);
		// 					context.commit('SET_BEARER_TOKEN', null);
		// 				}

		// 				resolve(response.data);
		// 			},
		// 			catch: (response) => {
		// 				context.commit('SET_LOGGED_IN_USER', null);
		// 				context.commit('SET_BEARER_TOKEN', null);

		// 				reject(response.data);
		// 			},
		// 		});
		// 	});
		// },
		INSERT_TICKET(context, payload) {
			return new Promise((resolve, reject) => {
				httpPost('core/customersupport', payload, {
					success: (response) => {
						if (response.data.status === 'success') {
						}

						resolve(response.data);
					},
					catch: (response) => {
						reject(response.data);
					},
				});
			});
		},
		// LOGOUT_USER(context, payload) {
		// 	return new Promise((resolve, reject) => {
		// 		httpDel('core/authenticate', payload, {
		// 			success: (response) => {
		// 				if (response.data.status === 'success') {
		// 					context.commit('SET_LOGGED_IN_USER', null);
		// 					context.commit('SET_BEARER_TOKEN', null);
		// 				}

		// 				resolve(response.data);
		// 			},
		// 			catch: (response) => {
		// 				reject(response.data);
		// 			},
		// 		});
		// 	});
		// },
	},
};

export default store;
