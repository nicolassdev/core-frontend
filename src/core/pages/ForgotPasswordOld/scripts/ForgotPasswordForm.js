import { useQuasar } from 'quasar';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userData, UpdateUserPassword, contactNumber } from '../../../composables/ForgotPassword';
export default {
	setup() {
		let newPassword = ref(null);
		let confirmPassword = ref(null);
		let isPwd = ref(true);
		let isConfirmPwd = ref(true);
		const $q = useQuasar();
		const router = useRouter();
		let btnLoading = ref(false);

		// Computed property to check if the passwords match
		const isConfirmPasswordValid = computed(() => {
			if (newPassword.value !== '' && confirmPassword.value !== '') {
				return newPassword.value === confirmPassword.value;
			}
			return newPassword.value != null && newPassword.value.trim() == '';
		});

		/**
		 * Function to Return to Login Page
		 */
		const goToRegister = () => {
			router.push({ name: 'core-registration' });
		};

		/**
		 * THis Function is for updating the password of user
		 */
		let submitPassword = () => {
			btnLoading.value = true;
			if (userData.value) {
				let payload = {
					forgot_password: 1,
					id: userData.value.id,
					level: userData.value.level,
					new_password: newPassword.value,
				};
				UpdateUserPassword(payload).then((response) => {
					let status = Boolean(response.status === 'success');

					// Send notification
					$q.notify({
						position: $q.screen.width < 767 ? 'top' : 'bottom-right',
						classes: `${status ? 'core-success-notif' : 'core-error-notif'} q-px-lg q-pt-none q-pb-none`,
						html: true,
						message: status
							? `<div class="text-bold">Password Reset Successfully.</div>`
							: `<div class="text-bold">Failed!</div> ${response.message}.`,
					});

					if (status) {
						userData.value = null;
						contactNumber.value = null;
						router.push({ name: 'core-login' });
					}
					btnLoading.value = false;
				});
			}
		};

		return {
			newPassword,
			confirmPassword,
			isConfirmPwd,
			isPwd,
			isConfirmPasswordValid,
			submitPassword,
			btnLoading,
			goToRegister,
		};
	},
};
