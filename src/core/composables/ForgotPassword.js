import { httpGet, httpPost } from 'boot/axios';
import { ref } from 'vue';

let contactNumber = ref(null);
let userData = ref(null);
let userEmail = ref(null);
let FetchUserDetails = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			'core/authenticate',
			{
				success(response) {
					resolve(response.data);
				},
				catch(response) {
					reject(response);
				},
			},
			payload
		);
	});
};

let UpdateUserPassword = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			'core/authenticate',
			{
				success(response) {
					resolve(response.data);
				},
				catch(response) {
					reject(response);
				},
			},
			payload
		);
	});
};

/**
 * Send sms to any mobile numbers
 * @param {*} object
 */
const SendOTP = (payload) => {
	return new Promise((resolve, reject) => {
		httpPost('core/validateMobileNumber/', payload, {
			success(response) {
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

const ValidateOTP = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			`core/validateMobileNumber`,
			{
				success(response) {
					resolve(response.data);
				},
				catch(response) {
					reject(response);
				},
			},
			payload
		);
	});
};

const ForgotPassword = (payload) => {
	return new Promise((resolve, reject) => {
		httpPost(`core/forgotPassword/`, payload, {
			success(response) {
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

export {
	contactNumber,
	FetchUserDetails,
	ForgotPassword,
	SendOTP,
	UpdateUserPassword,
	userData,
	ValidateOTP,
	userEmail,
};
