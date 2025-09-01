import { httpGet, httpPost, httpPut } from 'boot/axios';
import { readonly, ref } from 'vue';

let UserForm = ref({
	last_name: null,
	first_name: null,
	middle_name: null,
	suffix_name: null,
	age: null,
	// sex: null,
	gender: null,
	birthdate: null,
	contact_number: null,
	email_address: null,
	password: null,
	role: null,
	level: null,
	invitation: false,
	allowed_functions: [],
});

let AllowedFunctions = ref([]);
let ModuleFunctions = ref([]);
let Systems = ref([]);
let isPermissionsEdited = ref([]);

const resetUserForm = () => {
	UserForm.value = {
		last_name: null,
		first_name: null,
		middle_name: null,
		suffix_name: null,
		age: null,
		// sex: null,
		gender: null,
		birthdate: null,
		contact_number: null,
		email_address: null,
		password: null,
		role: null,
		level: null,
		invitation: false,
		allowed_functions: [],
	};
	AllowedFunctions.value = [];
	isPermissionsEdited.value = [];
};

let User = ref({
	id: null,
	full_name: null,
	last_name: null,
	first_name: null,
	middle_name: null,
	suffix_name: null,
	age: null,
	gender: null,
	birthdate: null,
	contact_number: null,
	email_address: null,
	password: null,
	role: null,
	level: null,
	invitation: false,
	allowed_functions: [],
	photo: null,
});
let UserDetails = readonly(User);

let FetchUserDetails = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			'core/accounts',
			{
				success(response) {
					response.data.status === 'success' && (User.value = response.data.data[0]);
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

const FetchAllowedFunctions = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			`core/accounts`,
			{
				success: (response) => {
					if (response.data.status === 'success') {
						response.data.data.length &&
							(UserForm.value.allowed_functions = response.data.data[0].allowed_functions);
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
};

const UpdateAllowedFunctions = (context, payload) => {
	return new Promise((resolve, reject) => {
		httpPut(`core/accounts/${payload.id}`, payload, {
			success: (response) => {
				resolve(response.data);
			},
			catch: (response) => {
				reject(response.data);
			},
		});
	});
};

let PersonalQRCode = ref(null);
const InsertPersonalUser = (payload) => {
	return new Promise((resolve, reject) => {
		httpPost('core/registration/', payload, {
			success(response) {
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

const InsertOrganizationUser = (payload) => {
	return new Promise((resolve, reject) => {
		httpPost('core/registration/', payload, {
			success(response) {
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

const ValidateFields = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			'core/registration/',
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

export {
	AllowedFunctions,
	FetchAllowedFunctions,
	FetchUserDetails,
	InsertOrganizationUser,
	InsertPersonalUser,
	ModuleFunctions,
	PersonalQRCode,
	Systems,
	UpdateAllowedFunctions,
	User,
	UserDetails,
	UserForm,
	ValidateFields,
	isPermissionsEdited,
	resetUserForm,
};
