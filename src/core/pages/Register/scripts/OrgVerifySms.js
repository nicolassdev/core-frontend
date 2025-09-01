import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import addOrgRegForm from '../OrgRegistrationSteps.vue';
import addRegForm from '../RegistrationSteps.vue';
import { organizationForm } from '../composables';

export default {
	setup() {
		//get image
		const getImagePath = (drafts) => {
			return require(`../../../../assets/image/${drafts}`);
		};

		//for otp
		let sms = ref({
			id: null,
			otpOne: '',
			otpTwo: '',
			otpThree: '',
			otpFour: '',
			otpFive: '',
			otpSix: '',
		});
		const codeInputs = ref([]);

		const handleInput = (digitIndex, value) => {
			if (value === '') {
				// If the input is empty, delete the previous digit when backspace is pressed
				if (digitIndex > 1) {
					sms[`otp${digitIndex - 1}`] = '';
					codeInputs.value[digitIndex - 2].focus();
				}
			} else if (/^\d$/.test(value)) {
				if (value.length > 1) {
					sms.value[`otp${digitIndex - 1}`] = value[1];
				} else {
					sms.value[`otp${digitIndex - 1}`] = value;
				}

				if (digitIndex < codeInputs.value.length) {
					codeInputs.value[digitIndex].focus();
				}
			} else {
				sms.value[`otp${digitIndex - 1}`] = '';
			}
		};

		//for route
		const router = useRouter();
		const route = useRoute();

		const toSteps = () => {
			addRegForm.value = 1;
			router.replace('core-registration-steps');
		};

		const toOrgStepOne = () => {
			addOrgRegForm.value = 1;
			router.replace('core-org-registration-steps');
		};

		const toSms = () => {
			window.location.reload();
		};

		// for timer related setup
		const timer = ref(60);
		const timerExpired = ref(false);
		let countdownInterval;

		const startTimer = () => {
			countdownInterval = setInterval(() => {
				if (timer.value > 0) {
					timer.value--;
				} else {
					// Timer reached 0, reset the inputs and clear the interval
					timerExpired.value = true;
					resetInputs();
					clearInterval(countdownInterval);
				}
			}, 1000);
		};

		const resetInputs = () => {
			sms.value.otpOne = '';
			sms.value.otpTwo = '';
			sms.value.otpThree = '';
			sms.value.otpFour = '';
			sms.value.otpFive = '';
			sms.value.otpSix = '';

			// Clear the input fields
			codeInputs.value.forEach((input) => (input = ''));
			// Set focus to the first input
			codeInputs.value[0]?.focus();
		};

		onMounted(() => {
			startTimer(); // Start the timer when the component is mounted
			codeInputs.value[0]?.focus(); // Set focus on the first input when the page displays
			document.querySelectorAll('input[type="number"]').forEach((input) => {
				input.oninput = () => {
					if (input.value.length > input.maxLength) {
						input.value = input.value.slice(0, input.maxLength)
					}
				}
			})
		});

		// Computed property to check if all OTP fields are filled
		const isOtpFilled = computed(() => {
			for (let i = 1; i < 6; i++) {
				if (!sms.value[`otp${i}`]) {
					return false;
				}
			}
			// If the timer has expired, do not proceed to "toSteps"
			if (timerExpired.value) {
				return false;
			}

			setTimeout(toOrgStepOne, 1500);
			return true;
		});

		const contactNumber = route.query.contactNumber || '';

		return {
			organizationForm,
			// isOrgRegistrationPage,
			getImagePath,
			sms,
			toSteps,
			toOrgStepOne,
			toSms,
			router,
			route,
			codeInputs,
			handleInput,
			timer,
			resetInputs,
			isOtpFilled,
			contactNumber,
			timerExpired,
		};
	},
};
