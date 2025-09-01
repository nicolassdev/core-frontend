import Navigation from '../components/Navigation';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
export default {
	components: {
		Navigation,
	},
	setup() {
		const $q = useQuasar();
		let store = useStore();
		let GET_DARK_MODE_STATE = computed(() => store.getters['Core/Triggers/GET_DARK_MODE_STATE']);
		let form = ref({
			subject: null,
			title: null,
			description: null,
			contact_number: null,
			email_address: null,
		});
		let rules = ref({
			email_address: [
				(val) => {
					if (!val) {
						return ''; // Field is required
					} else {
						// Validate email format
						const email =
							/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
						if (!email.test(val)) {
							return ''; // Invalid email format
						}
					}
				},
			],
		});
		let btnLoadingState = ref(false);
		let options = ref([
			{ label: 'Technical Support', value: 1 },
			{ label: 'Billing', value: 2 },
			{ label: 'Account Access', value: 3 },
			{ label: 'Request a Feature', value: 4 },
		]);

		const customerSupportForm = ref(null);
		let submitTicket = () => {
			customerSupportForm.value.validate().then((success) => {
				if (success) {
					btnLoadingState.value = true;
					store.dispatch('Core/CustomerSupport/INSERT_TICKET', form.value).then((response) => {
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
								? `<span>Success,</span> Your ticket has been submitted.`
								: `<span>Failed,</span> ${response.message}`,
						});
						btnLoadingState.value = false;
					});
				}
			});
		};
		return {
			form,
			rules,
			options,
			customerSupportForm,
			submitTicket,
			btnLoadingState,

			// getters
			GET_DARK_MODE_STATE,
		};
	},
};
