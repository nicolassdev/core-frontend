import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import addRegForm from '../RegistrationSteps.vue';
import addOrgRegForm from '../RegistrationSteps.vue';

export default {
	setup() {
		//get image
		const getImagePath = (drafts) => {
			return require(`../../../../assets/img/${drafts}`);
		};

		//for route
		const route = useRoute();
		const router = useRouter();

		const toSteps = () => {
			addRegForm.value = 1;
			router.push('core-registration-steps');
		};

		const toOrgStepOne = () => {
			addOrgRegForm.value = 1;
			router.push({ name: 'core-org-registration-steps' });
		};

		const toEmail = () => {
			window.location.reload();
		};

		return {
			route,
			getImagePath,
			toSteps,
			toOrgStepOne,
			router,
			toEmail,
		};
	},
};
