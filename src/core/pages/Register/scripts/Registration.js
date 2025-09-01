import { mobileHeaderTitle } from 'src/core/composables/Triggers';
import { ValidateFields } from 'src/core/composables/UserManagement';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { personalForm, resetForm } from '../composables/index';
import { SendOTP } from 'src/core/composables/Register';

export default {
	setup() {
		const router = useRouter();
		const route = useRoute();
		const $q = useQuasar();

		const options = ref([
			{
				label: 'Email',
				value: 0,
				disable: computed(() => {
					return form.value.email == null || form.value?.email.trim() === '';
				}),
			},
			{
				label: 'SMS',
				value: 1,
			},
		]);
		let validEmail = ref(true);
		let validEmailRequest = ref(false);

		onMounted(() => {
			mobileHeaderTitle.value = 'Personal Account Registration';
		});

		onUnmounted(() => {
			mobileHeaderTitle.value = null;
		});

		let btnLoadingState = ref(false);
		const onSubmit = () => {
			router.push({ name: 'core-registration-steps' });
			// btnLoadingState.value = true;
			// if (personalForm.value.preferred_verification_method === 1) {
			//   let payload = {
			//     number: `+63${personalForm.value.contact_number}`,
			//     message: 'CQFS LGU Iriga Verification Code',
			//     sub_message: 'Please enter the 6-digit code to complete your registration.'
			//   }
			//   SendOTP(payload).then((response) => {
			//     // btnLoadingState.value = false;
			//   }).catch((error) => {
			//     // btnLoadingState.value = false;
			//   })
			//   router.push({ name: 'core-verify-sms' });
			//   // router.push({ name: 'core-registration-steps' });
			// } else {
			//   router.push({
			//     name: 'core-verify-email',
			//     params: {
			//       email: personalForm.value.email_address,
			//     },
			//   });
			// }
		};

		const toLogin = () => {
			router.push('core-login');
			resetForm();
		};

		const updateEmailValue = (value) => {
			!value.length && (personalForm.value.preferred_verification_method = 1);
			validEmail.value = true;
			if (emailRules.value && value.length) {
				validEmailRequest.value = true;
				setTimeout(() => {
					validateEmail();
				}, 1000);
			}
		};

		const emailRules = computed(() => {
			if (personalForm.value.email_address === null || !personalForm.value.email_address.length) return true;
			else return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(personalForm.value.email_address);
		});

		const validateEmail = () => {
			ValidateFields({
				validate_email: {
					email: personalForm.value.email_address,
				},
			}).then((response) => {
				const status = response.status === 'success';
				status && (validEmail.value = response.data.is_email_valid === 1);
				validEmailRequest.value = false;
			});
		};

		return {
			validEmail,
			validEmailRequest,
			emailRules,
			options,
			router,
			route,
			personalForm,
			resetForm,
			toLogin,
			onSubmit,
			updateEmailValue,
			validateEmail,
			btnLoadingState,
		};
	},
};
