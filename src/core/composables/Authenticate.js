import { httpGet, httpPost, httpPut, httpDel } from 'boot/axios';
import { ref, readonly } from 'vue';
import { LocalStorage } from 'quasar';
// import { SetUserInformation as PM_SetUserInformation } from 'src/resources/ProjectManagement/composables/UserManagement';

let SetSystems = ref([]);
let GetSystems = readonly(SetSystems);

let SetLoggedInUser = ref({
	photo: null,
	sex: null,
});
let GetLoggedInUser = readonly(SetLoggedInUser);

const ValidateUserToken = () => {
	return new Promise((resolve, reject) => {
		httpGet('core/authenticate', {
			success: (response) => {
				if (response.data.status === 'success') {
					SetLoggedInUser.value = response.data.data.user;
					SetSystems.value = response.data.data.user.permissions;
				} else {
					// PM_SetUserInformation.value = null;
					SetBearerToken(null);
				}

				resolve(response.data);
			},
			catch: (response) => {
				SetLoggedInUser.value = null;
				SetBearerToken(null);

				reject(response.data);
			},
		});
	});
};
/**
 * This function authenticates username and password
 * @param {*} object
 */
const LoginUser = (payload) => {
	return new Promise((resolve, reject) => {
		httpPost('core/authenticate', payload, {
			success: (response) => {
				if (response.data.status === 'success') {
					SetLoggedInUser.value = response.data.data.user;
					SetSystems.value = response.data.data.user.permissions;
					SetBearerToken(response.data.data.token);
				}
				resolve(response.data);
			},
			catch: (response) => {
				reject(response.data);
			},
		});
	});
};

const LogoutUser = (payload) => {
	return new Promise((resolve, reject) => {
		httpDel('core/authenticate', payload, {
			success: (response) => {
				if (response.data.status === 'success') {
					SetLoggedInUser.value = { photo: null, sex: null };
					SetSystems.value = [];
					SetBearerToken(null);
					// PM_SetUserInformation.value = null;
				}

				resolve(response.data);
			},
			catch: (response) => {
				reject(response.data);
			},
		});
	});
};

const SetBearerToken = (token) => {
	if (token !== null) {
		LocalStorage.set('Bearer', token);
	} else {
		LocalStorage.remove('Bearer');
	}
};

export { ValidateUserToken, LoginUser, LogoutUser, GetSystems, SetLoggedInUser, GetLoggedInUser };
