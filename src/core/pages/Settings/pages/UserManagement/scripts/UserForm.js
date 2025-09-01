
import { date, useQuasar } from 'quasar';
import CoreDialog from 'src/core/components/CoreDialog';
import { AllowedFunctions, FetchUserDetails, UserForm, isPermissionsEdited } from 'src/core/composables/UserManagement';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { copyText } from 'vue3-clipboard';
import { useStore } from 'vuex';
import PasswordResetConfirmation from '../components/PasswordResetConfirmation.vue';

export default {
	components: {
		CoreDialog,
		PasswordResetConfirmation,
	},
	setup() {
		const $q = useQuasar();
		const store = useStore();
		const route = useRoute();

		let GET_DARK_MODE_STATE = computed(() => store.getters['Core/Triggers/GET_DARK_MODE_STATE']);

		let roleOptions = ref([
			{
				label: 'Super Admin',
				value: 0,
			},
			{
				label: 'Registrar',
				value: 1,
			},
			{
				label: 'Human Resource Personnel',
				value: 2,
			},
			{
				label: 'Employee',
				value: 3,
			},
		]);
		let levelOptions = ref([
			{
				label: 'Root',
				value: 0,
			},
			{
				label: 'Client Admin',
				value: 1,
			},
			{
				label: 'Human Resource Personnel',
				value: 2,
			},
			{
				label: 'Employee',
				value: 3,
			},
		]);

		let isPwd = ref(true);
		let btnLoadingState = ref(false);

		// Ref template for form
		const userForm = ref(null);

		onMounted(() => {
			getUserPermission()

			// Fetch user details if form status is update
			if (
				route.params.id &&
				Object.values(UserForm.value).every(
					value => Array.isArray(value) ? value.length === 0 : !value
				)
			) {
				FetchUserDetails({ id: route.params.id }).then((response) => {
					if (response.status === 'success' && response.data.length) {
						// Remove unnecessary properties
						delete response.data[0].full_name;
						delete response.data[0].username;
						delete response.data[0].photo;
						const data = response.data[0];
						UserForm.value = data;
						UserForm.value.gender = data.sex
						AllowedFunctions.value = data.allowed_functions;
					}
				});
			}
		});

		// Password Generator
		const generatePassword = () => {
			let length = 11,
				charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()',
				retVal = '';
			for (var i = 0, n = charset.length; i < length; ++i) {
				retVal += charset.charAt(Math.floor(Math.random() * n));
			}
			UserForm.value.password = retVal;
			isPasswordCopied.value = false;
		};

		// Copy to clip board
		let isPasswordCopied = ref(false);
		const copyToClipBoard = () => {
			UserForm.value.password &&
				copyText(UserForm.value.password, undefined, (error, event) => {
					!error && (isPasswordCopied.value = true);
				});
		};

		const isValidEmail = (val) => {
			const emailPattern =
				/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
			return emailPattern.test(val) || '';
		};

		const isBirthdateValid = (val) => {
			// calculate age
			let ageDifMs = Date.now() - new Date(val).getTime();
			let ageDate = new Date(ageDifMs); // miliseconds from epoch
			UserForm.value.age = Number(Math.abs(ageDate.getUTCFullYear() - 1970));

			return date.isValid(val) || '';
		};

		const isMobileValid = (val) => {
			return Number(val[0]) !== 0 || '';
		};

		// Bind credentils | For email sending purposes
		const bindCredentials = () => {
			UserForm.value.credentials = `<h3>Personal Information</h3><div><b>Last Name:</b> ${UserForm.value.last_name
				}</div><div><b>First Name:</b> ${UserForm.value.first_name}</div><div><b>Middle Name:</b> ${UserForm.value.middle_name
				}</div><div><b>Suffix Name:</b> ${UserForm.value.suffix_name}</div><div><b>Age:</b> ${UserForm.value.age
				}</div><div><b>Sex:</b> ${!UserForm.value.sex ? 'Male' : 'Female'
				}</div><div><b>Date of Birth:</b> ${date.formatDate(
					new Date(UserForm.value.birthdate),
					'MMM DD, YYYY'
				)}</div><div><b>Contact Number:</b> (+63) ${UserForm.value.contact_number}</div>`;
		};

		// Request user password reset
		let isPasswordReset = ref(route.params.reset && Number(route.params.reset) === 1 ? true : false);
		let isResetPasswordAllowed = ref(false);
		const resetPassword = (btn_label) => {
			userForm.value.validate().then((success) => {
				if (success) {
					btnLoadingState.value = true;
					if (btn_label === 'continue') {
						store
							.dispatch(`Core/Permissions/AUTHENTICATE_USER_PASSWORD`, {
								password: UserForm.value.password,
								level: UserForm.value.level,
							})
							.then((response) => {
								let status = Boolean(response.status === 'success');
								$q.notify({
									position: 'top-right',
									classes: 'bg-violet-0 q-px-lg q-pt-none q-pb-none',
									html: true,
									actions: [{
										icon: 'close',
										color: 'white',
									}],
									message: status
										? `<span>Success,</span> User has permission.`
										: `<span>Failed,</span> ${response.message}`,
								});
								if (status) {
									isResetPasswordAllowed.value = true;
									UserForm.value.password = null;
								}
								btnLoadingState.value = false;
							});
					} else {
						store
							.dispatch(`Core/Permissions/RESET_PASSWORD`, {
								id: route.params.id,
								new_password: UserForm.value.password,
							})
							.then((response) => {
								let status = Boolean(response.status === 'success');
								if (!status) {
									$q.notify({
										position: 'top-right',
										classes: 'bg-violet-0 q-px-lg q-pt-none q-pb-none',
										html: true,
										actions: [
											{
												icon: 'close',
												color: 'white',
											},
										],
										message: `<span>Failed,</span> ${response.message}`,
									});
								} else {
									store.commit('Core/Triggers/TOGGLE_CORE_DIALOG_STATE');
									isPasswordReset.value = false;
								}
								btnLoadingState.value = false;
							});
					}
				}
			});
		};

		/** System Applications
		 * Start --------------------------*/
		let systems = ref([]);
		/** Get user permission including system and functionalities */
		const getUserPermission = () => {
			store.dispatch('Core/Permissions/FETCH_SYSTEMS').then((response) => {
				if (response.status === 'success') {
					systems.value = Object.entries(response.data);
				}
			});
		};

		// On form submission
		let saveChanges = () => {
			// Validate required fields
			userForm.value.validate().then((success) => {
				if (success) {
					// Start save button loading
					btnLoadingState.value = true;
					// Identify the api request
					let action = !route.params.id ? 'INSERT' : 'UPDATE';
					// Remove password property
					delete UserForm.value.password;

					if (!route.params.id) {
						// Bind registrant information to crendentials property (used to send in registrant email) if request is post
						bindCredentials();
					}

					// Assign new allowed functions
					UserForm.value.allowed_functions = AllowedFunctions.value;

					// Send request to the api endpoint
					store.dispatch(`Core/Permissions/${action}_ACCOUNT`, UserForm.value).then((response) => {
						let status = Boolean(response.status === 'success');
						$q.notify({
							position: 'top-right',
							classes: 'bg-violet-0 q-px-lg q-pt-none q-pb-none',
							html: true,
							actions: [
								{
									icon: 'close',
									color: 'white',
								},
							],
							message: status
								? `<span>Success,</span> User account has been ${!route.params.id ? 'added' : 'updated'
								}.`
								: `<span>Failed,</span> ${response.message}`,
						});

						if (status && !route.params.id) {
							// // Empty form
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
								username: null,
								password: null,
								role: null,
								level: null,
								invitation: false,
								allowed_functions: [],
							};

							// Empty allowed functions
							AllowedFunctions.value = [];

							userForm.value.reset();
						}
						isPasswordCopied.value = false;
						btnLoadingState.value = false;
					});
				}
			});
		};

		return {
			route,
			UserForm,
			roleOptions,
			levelOptions,
			isPwd,
			isPasswordReset,
			resetPassword,
			isResetPasswordAllowed,
			// rules,
			isValidEmail,
			isBirthdateValid,
			isMobileValid,
			userForm,
			saveChanges,
			btnLoadingState,
			generatePassword,
			isPasswordCopied,
			copyToClipBoard,

			// sytem applications
			systems,
			getUserPermission,

			// getters
			GET_DARK_MODE_STATE,
		};
	},
};