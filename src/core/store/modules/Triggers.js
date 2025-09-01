import { LocalStorage } from 'quasar';
const store = {
	namespaced: true,
	state: {
		isLoading: true,
		openLeftDrawer: false,
		darkMode: LocalStorage.getItem('_DarkMode') ? true : false,
		showDeleteDialog: false,
		showCoreDialog: false,
	},
	getters: {
		GET_LOADING_STATE: (state) => {
			return state.isLoading;
		},
		GET_LEFT_DRAWER_STATE: (state) => {
			return state.openLeftDrawer;
		},
		GET_DARK_MODE_STATE: (state) => {
			return state.darkMode;
		},
		GET_DELETE_DIALOG_STATE: (state) => {
			return state.showDeleteDialog;
		},
		GET_CORE_DIALOG_STATE: (state) => {
			return state.showCoreDialog;
		},
	},
	mutations: {
		TOGGLE_LOADING_STATE(state, payload) {
			state.isLoading = !state.isLoading;
		},
		TOGGLE_LEFT_DRAWER_STATE(state, payload) {
			state.openLeftDrawer = !state.openLeftDrawer;
		},
		TOGGLE_DARK_MODE_STATE(state, payload) {
			state.darkMode = !state.darkMode;
			LocalStorage.set('_DarkMode', state.darkMode);
		},
		TOGGLE_DELETE_DIALOG_STATE(state, payload) {
			state.showDeleteDialog = !state.showDeleteDialog;
		},
		TOGGLE_CORE_DIALOG_STATE(state, payload) {
			state.showCoreDialog = !state.showCoreDialog;
		},
	},
};

export default store;
