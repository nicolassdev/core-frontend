import { httpPut, httpFileUpload } from 'boot/axios';
import { ref } from 'vue';
import { User } from './UserManagement';
import { SetLoggedInUser } from './Authenticate';
/**
 * This function accepts parameters of an object then
 * updates the Profile specific data based on the id passed in the object.
 * @param {*} object
 */

let UpdateProfile = (payload) => {
	return new Promise((resolve, reject) => {
		httpPut(`core/accounts/${payload.id}`, payload, {
			success: (response) => {
				response.data.status === 'success';
				resolve(response.data);
			},
			catch: (response) => {
				reject(response.data);
			},
		});
	});
};

let ResetPassword = (payload) => {
	return new Promise((resolve, reject) => {
		httpPut(`core/resetpassword/${payload.id}`, payload, {
			success: (response) => {
				response.data.status === 'success';
				resolve(response.data);
			},
			catch: (response) => {
				reject(response.data);
			},
		});
	});
};

/**
 * This function accepts parameters of an object then
 * updates the user Profile Image.
 * @param {*} object
 */
let ActiveModal = ref(null);
let UpdateProfileImage = (payload) => {
	return new Promise((resolve, reject) => {
		httpFileUpload(`core/accounts/${payload.id}`, payload, {
			success(response) {
				if (response.data.status === 'success') {
					User.value.photo = response.data.data.base64;
					SetLoggedInUser.value.photo = User.value.photo;
				}

				resolve(response.data);
			},
			catch(response) {},
		});
	});
};

export { UpdateProfile, UpdateProfileImage, ActiveModal, ResetPassword };
