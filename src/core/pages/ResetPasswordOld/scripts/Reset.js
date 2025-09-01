import { useQuasar } from 'quasar';
import { LoginUser } from 'src/core/composables/Authenticate';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ForgotPasswords } from '../../../composables/ForgotPassword';
import { ResetPassword } from '../../../composables/ResetPassword';

export default {
	setup() {
		const $q = useQuasar();
		const route = useRoute();
		const router = useRouter();
		let account_id = route.query.account_id;
		let btnLoading = ref(false);
		const form = ref({
			id: parseInt(account_id),
			otp: null,
			new_password: null,
			password: null,
		});

		const onSubmit = async () => {
			btnLoading.value = true;
			// The system verifies that the users email exists in the database.
			// It generates a unique password reset link and sends it to the user email.
			// The User sees a confirmation message: "A password reset link has been sent to your email. Please check your inbox."
			if (account_id !== null) {
				ResetPassword(form.value).then((response) => {
					let status = Boolean(response.status === 'success');
					if (status) {
						btnLoading.value = false;
						router.push({
							name: 'core-login',
						});
					}

					$q.notify({
						position: $q.screen.width < 767 ? 'top' : 'bottom-right',
						classes: `${status ? 'core-success-notif' : 'core-error-notif'} q-px-lg q-pt-none q-pb-none`,
						html: true,
						message: status
							? `<div class="text-bold">Success!</div> Forgot Password Request Sent.`
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
			btnLoading,
			onSubmit,
			onReset,
		};
	},
};
