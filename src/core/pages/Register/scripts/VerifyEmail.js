import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { default as addOrgRegForm, default as addRegForm } from '../RegistrationSteps.vue';
import ResendVerificationEmail from '../components/ResendVerificationEmail.vue';
import { personalForm } from '../composables/index';

export default {
	components: {
		ResendVerificationEmail
	},
	setup() {
		let resendDialogRef = ref(false);

		//get image
		const getImagePath = (drafts) => {
			return require(`../../../../assets/img/${drafts}`);
		};

		//for route
		const route = useRoute();
		const router = useRouter();

		const toSteps = () => {
			addRegForm.value = 1;
			router.push({ name: 'core-registration-steps' });
		};

		const toOrgStepOne = () => {
			addOrgRegForm.value = 1;
			router.push({ name: 'core-org-registration-steps' });
		};

		const toEmail = () => {
			window.location.reload();
		};

		const email = route.query.email || '';

		const verifyEmail = () => {
			resendDialogRef.value = false
		}

		return {
			resendDialogRef,
			verifyEmail,
			getImagePath,
			toSteps,
			toOrgStepOne,
			route,
			router,
			toEmail,
			email,
			personalForm,
		};
	},
};
