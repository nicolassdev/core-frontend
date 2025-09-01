import { ref, onUnmounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { FetchUserDetails, SendOTP, contactNumber, userData } from '../../../composables/ForgotPassword';

export default {
	setup() {
		const $q = useQuasar();
		const router = useRouter();

		/**
		 * Function to Return to Login Page
		 */
		const returnLogin = () => {
			router.push({ name: 'core-login' });
		};

		/**
		 * Function For submitting the number for verification
		 */
		const submitFunction = () => {
			let payload = {
				validate_number: 1,
				contact_number: contactNumber.value,
			};
			FetchUserDetails(payload).then((response) => {
				let status = false;
				if (response.status === 'success' && response.data) {
					userData.value = response.data;
					status = true;
				}
				// let status = Boolean(response.status === 'success');
				if (status && userData.value !== null) {
					let payload = {
						number: `+63${contactNumber.value}`,
						message: 'CQFS LGU Iriga Forgot Password Verification Code',
						sub_message: 'Please enter the 6-digit code to complete the password change.',
					};
					SendOTP(payload)
						.then((response) => {
							// btnLoadingState.value = false;
						})
						.catch((error) => {
							// btnLoadingState.value = false;
						});
					router.push({ name: 'core-forgot-password-verify' });
				} else {
					// Send notification
					$q.notify({
						position: $q.screen.width < 767 ? 'top' : 'bottom-right',
						classes: 'core-error-notif q-px-lg q-pt-none q-pb-none',
						html: true,
						message:
							'<div class="text-bold">Failed!</div> Your contact number is not linked to any account. .',
					});
				}
			});
		};

		// onUnmounted(() => {
		// 	contactNumber.value = null;
		// });

		return {
			returnLogin,
			router,
			submitFunction,
			contactNumber,
		};
	},
};
