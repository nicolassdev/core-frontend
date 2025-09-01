import { mobileHeaderTitle } from 'src/core/composables/Triggers';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { organizationForm } from '../composables';
import { ValidateFields } from 'src/core/composables/UserManagement';

export default {
	setup() {
		const route = useRoute();
		const router = useRouter();

		let validEmail = ref(true);
		let validEmailRequest = ref(false);

		onMounted(() => {
			mobileHeaderTitle.value = 'Organization Account Registration'
		})

		onUnmounted(() => {
			mobileHeaderTitle.value = null
		})

		const onSubmit = () => {
			router.push('/core-org-verify-sms');
		};

		const toLogin = () => {
			router.replace('/core-login');
		};

		const emailRules = computed(() => {
			if (organizationForm.value.email_address === null || !organizationForm.value.email_address?.length) return true
			else return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(organizationForm.value.email_address)
		})

		const updateEmailValue = (value) => {
			!value.length && (organizationForm.value.preferred_verification_method = 1)
			validEmail.value = true
			if (emailRules.value && value.length) {
				validEmailRequest.value = true
				setTimeout(() => {
					validateEmail()
				}, 1000);
			}
		}

		const validateEmail = () => {
			ValidateFields({
				validate_email: {
					email: organizationForm.value.email_address
				}
			}).then((response) => {
				const status = response.status === 'success';
				status && (validEmail.value = response.data.is_email_valid === 1)
				validEmailRequest.value = false
			})
		}

		return {
			validEmail,
			validEmailRequest,
			updateEmailValue,
			emailRules,
			organizationForm,
			onSubmit,
			route,
			router,
			toLogin,
		};
	},
};
