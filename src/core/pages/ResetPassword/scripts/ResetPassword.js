import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ResetPassword } from '../../../composables/ResetPassword';
import { userEmail, ValidateOTP } from '../../../composables/ForgotPassword';

export default {
	setup() {
		const $q = useQuasar();
		const route = useRoute();
		const router = useRouter();
		let account_id = route.query.account_id;
		let btnLoading = ref(false);
		let reset_password = ref(false);
		const form = ref({
			id: parseInt(account_id),
			email: userEmail.value,
			otp: null,
		});

		const passwordForm = ref({
			id: null,
			new_password: null,
			password: null,
		});

		let showPassword = ref(false);

		const verifyOTP = async () => {
			btnLoading.value = true;
			// The system verifies that the users email exists in the database.
			// It generates a unique password reset link and sends it to the user email.
			// The User sees a confirmation message: "A password reset link has been sent to your email. Please check your inbox."
			if (account_id !== null) {
				ResetPassword(form.value).then((response) => {
					let status = Boolean(response.status === 'success');
					if (status) {
						btnLoading.value = false;
						reset_password.value = true;
						console.log(response.data);
						passwordForm.value.id = response.data.id;
					}

					$q.notify({
						position: $q.screen.width < 767 ? 'top' : 'bottom-right',
						classes: `${status ? 'core-success-notif' : 'core-error-notif'} q-px-lg q-pt-none q-pb-none`,
						html: true,
						message: status
							? `<div class="text-bold">Success!</div> OTP Verified.`
							: `<div class="text-bold">Failed!</div>${response.message}.`,
					});
				});
			}
		};

		const onSubmit = async () => {
			btnLoading.value = true;
			// The system verifies that the users email exists in the database.
			// It generates a unique password reset link and sends it to the user email.
			// The User sees a confirmation message: "A password reset link has been sent to your email. Please check your inbox."
			if (account_id !== null) {
				ResetPassword(passwordForm.value).then((response) => {
					let status = Boolean(response.status === 'success');
					if (status) {
						btnLoading.value = false;
						reset_password.value = true;
						router.push({
							name: 'core-login',
						});
					}

					$q.notify({
						position: $q.screen.width < 767 ? 'top' : 'bottom-right',
						classes: `${status ? 'core-success-notif' : 'core-error-notif'} q-px-lg q-pt-none q-pb-none`,
						html: true,
						message: status
							? `<div class="text-bold">Password updated Successfully!</div> Account’s password has been updated.`
							: `<div class="text-bold">Failed!</div>${response.message}.`,
					});
				});
			}
		};

		const onReset = () => {
			form.value = null;
		};

		return {
			form,
			passwordForm,
			btnLoading,
			onSubmit,
			verifyOTP,
			onReset,
			showPassword,
			reset_password,
		};
	},
};
