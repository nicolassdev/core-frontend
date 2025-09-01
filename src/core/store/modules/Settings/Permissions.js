import { httpDel, httpGet, httpPost, httpPut } from 'boot/axios';

const store = {
	namespaced: true,
	state: {
		systems: [],
		allowed_functions: [],
		accounts: [],
		user_form: {
			last_name: null,
			first_name: null,
			middle_name: null,
			suffix_name: null,
			age: null,
			sex: null,
			birthdate: null,
			contact_number: null,
			email_address: null,
			username: null,
			password: null,
			role: null,
			level: null,
			invitation: false,
		},
		linked_system: null,
	},
	getters: {
		GET_SYSTEMS: (state) => {
			return state.systems;
		},
		GET_ACCOUNTS: (state) => {
			return state.accounts;
		},
	},
	mutations: {
		SET_SYSTEMS(state, payload) {
			state.systems = payload;
		},
		SET_ACCOUNTS(state, payload) {
			state.accounts = payload;
		},
		JOIN_ACCOUNTS(state, payload) {
			state.accounts.push(payload);
		},
		MODIFY_ACCOUNT(state, payload) {
			let objectIndex = state.accounts.findIndex((e) => e.id === Number(payload.id));
			objectIndex !== -1 &&
				Object.keys(state.accounts[objectIndex]).forEach((key) => {
					payload[key] && (state.accounts[objectIndex][key] = payload[key]);
				});
		},
		REMOVE_ACCOUNTS(state, payload) {
			payload.forEach((id) => {
				let objectIndex = state.accounts.findIndex((e) => e.id === id);
				console.log(objectIndex);
				// if index not found (-1) delete nothing !
				objectIndex !== -1 && state.accounts.splice(objectIndex, 1);
			});
		},
	},
	actions: {
		FETCH_SYSTEMS(context, payload) {
			return new Promise((resolve, reject) => {
				httpGet(
					`core/systemFunctions`,
					{
						success: (response) => {
							if (response.data.status === 'success') {
								context.commit('SET_SYSTEMS', response.data.data);
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

		FETCH_ACCOUNT(context, payload) {
			return new Promise((resolve, reject) => {
				httpGet(
					`core/accounts`,
					{
						success: (response) => {
							response.data.status === 'success' && context.commit('SET_ACCOUNTS', response.data.data);
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
		INSERT_ACCOUNT(context, payload) {
			return new Promise((resolve, reject) => {
				httpPost('core/accounts', payload, {
					success: (response) => {
						response.data.status === 'success' && context.commit('JOIN_ACCOUNTS', response.data.data);
						resolve(response.data);
					},
					catch: (response) => {
						reject(response.data);
					},
				});
			});
		},
		UPDATE_ACCOUNT(context, payload) {
			return new Promise((resolve, reject) => {
				httpPut(`core/accounts/${payload.id}`, payload, {
					success: (response) => {
						response.data.status === 'success' && context.commit('MODIFY_ACCOUNT', response.data.data);
						resolve(response.data);
					},
					catch: (response) => {
						reject(response.data);
					},
				});
			});
		},
		DELETE_ACCOUNT(context, payload) {
			return new Promise((resolve, reject) => {
				httpDel(
					`core/accounts/${payload}`,
					{
						id: payload,
					},
					{
						success: (response) => {
							response.data.status === 'success' && context.commit('REMOVE_ACCOUNTS', payload);
							resolve(response.data);
						},
						catch: (response) => {
							reject(response.data);
						},
					}
				);
			});
		},
		UPDATE_EMPLOYEE({ commit }, payload) {
			return new Promise((resolve, reject) => {
				httpPut(payload.path, payload.params, {
					success(response) {
						/** Commit Data */
						resolve(response.data);
					},
					catch(response) {
						console.log(response);
					},
				});
			});
		},
		AUTHENTICATE_USER_PASSWORD(context, payload) {
			return new Promise((resolve, reject) => {
				httpPost('core/resetpassword', payload, {
					success: (response) => {
						resolve(response.data);
					},
					catch: (response) => {
						reject(response.data);
					},
				});
			});
		},
		RESET_PASSWORD(context, payload) {
			return new Promise((resolve, reject) => {
				httpPut(`core/resetpassword/${payload.id}`, payload, {
					success: (response) => {
						resolve(response.data);
					},
					catch: (response) => {
						reject(response.data);
					},
				});
			});
		},
	},
};

export default store;
