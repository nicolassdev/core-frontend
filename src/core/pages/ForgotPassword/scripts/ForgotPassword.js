import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ForgotPassword, userEmail } from '../../../composables/ForgotPassword';

export default {
	setup() {
		const $q = useQuasar();
		const router = useRouter();
		const route = useRoute();
		const form = ref({
			emails: null,
		});
		let btnLoading = ref(false);

		const onSubmit = () => {
			// The system verifies that the users email exists in the database.
			// It generates a unique password reset link and sends it to the user email.
			// The User sees a confirmation message: "A password reset link has been sent to your email. Please check your inbox."
			btnLoading.value = true;
			if (form.value.emails) {
				ForgotPassword({ email: form.value.emails }).then((res) => {
					let status = Boolean(res.status === 'success');
					if (status) {
						btnLoading.value = false;
						userEmail.value = form.value.emails;
						router.push({
							name: 'core-reset-password',
							query: { account_id: res.data.account_id },
						});
					} else {
						btnLoading.value = false;
					}

					$q.notify({
						position: $q.screen.width < 767 ? 'top' : 'bottom-right',
						classes: `${status ? 'core-success-notif' : 'core-error-notif'} q-px-lg q-pt-none q-pb-none`,
						html: true,
						message: status
							? `<div class="text-bold">Success!</div> Your Email Has Been Successfully Verified.`
							: `<div class="text-bold">Failed!</div>${res.message}.`,
					});
				});
			}

			// // Handle form submission logic
			// $q.notify({ type: 'positive', message: 'Password reset link sent!' });
		};

		const onReset = () => {
			form.value = null;
		};

		return {
			form,
			onSubmit,
			onReset,
			btnLoading,
			userEmail,
		};
	},
};
