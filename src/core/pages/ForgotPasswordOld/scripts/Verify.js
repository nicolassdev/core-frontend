import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import addOrgRegForm from '../OrgRegistrationSteps.vue';
// import addRegForm from '../RegistrationSteps.vue';
import { ValidateOTP, SendOTP, contactNumber } from 'src/core/composables/ForgotPassword';
import { useQuasar } from 'quasar';
// import { personalForm } from '../composables/index';

export default {
	setup() {
		//get image
		const getImagePath = (drafts) => {
			return require(`../../../../assets/image/${drafts}`);
		};
		const $q = useQuasar();

		//for otp
		let otp = ref({
			otp0: '',
			otp1: '',
			otp2: '',
			otp3: '',
			otp4: '',
			otp5: '',
		});
		let one_time_pin = ref([]);
		const codeInputs = ref([]);

		const handleInput = (digitIndex, value) => {
			if (value === '') {
				// If the input is empty, delete the previous digit when backspace is pressed
				if (digitIndex > 1) {
					otp.value[`otp${digitIndex - 1}`] = '';
					codeInputs.value[digitIndex - 2].focus();
				}
				errorOccured.value = false;
			} else if (/^\d$/.test(value)) {
				if (value.length > 1) {
					otp.value[`otp${digitIndex - 1}`] = value[1];
				} else {
					otp.value[`otp${digitIndex - 1}`] = value;
				}

				if (digitIndex < codeInputs.value.length) {
					codeInputs.value[digitIndex].focus();
				} else {
				}
			} else {
				otp.value[`otp${digitIndex - 1}`] = '';
			}

			one_time_pin.value = [];
			for (const key in otp.value) {
				if (otp.value[key]) {
					one_time_pin.value.push(otp.value[key]);
				}
			}

			one_time_pin.value.length === 6 && toSteps();
		};

		//for route
		const router = useRouter();
		const route = useRoute();

		let errorOccured = ref(false);
		const toSteps = () => {
			// addRegForm.value = 1;
			let otp = one_time_pin.value.join('');
			ValidateOTP({ one_time_pin: otp })
				.then((response) => {
					if (response.status === 'success') {
						// Send notification
						$q.notify({
							position: $q.screen.width < 767 ? 'top' : 'bottom-right',
							classes: 'core-success-notif q-px-lg q-pt-none q-pb-none',
							html: true,
							message: '<div class="text-bold">One-Time Password (OTP) has been Validated.</div>',
						});
						router.push({ name: 'core-change-password-form' });
					} else {
						errorOccured.value = true;
					}
				})
				.catch((error) => {
					errorOccured.value = true;
				});
		};

		// const toOrgStepOne = () => {
		//   addOrgRegForm.value = 1;
		//   router.replace('core-org-registration-steps');
		// };

		const wrongNumber = () => {
			router.go(-1);
		};

		// for timer related setup
		const timer = ref(60);
		// const timerExpired = ref(false);
		let countdownInterval;

		// const startTimer = () => {
		//   countdownInterval = setInterval(() => {
		//     if (timer.value > 0) {
		//       timer.value--;
		//     } else {
		//       // Timer reached 0, reset the inputs and clear the interval
		//       timerExpired.value = true;
		//       resetInputs();
		//       clearInterval(countdownInterval);
		//     }
		//   }, 1000);
		// };

		const resetInputs = () => {
			otp.value.otp1 = '';
			otp.value.otp2 = '';
			otp.value.otp3 = '';
			otp.value.otp4 = '';
			otp.value.otp5 = '';
			otp.value.otp6 = '';

			// Clear the input fields
			codeInputs.value.forEach((input) => (input = ''));
			// Set focus to the first input
			codeInputs.value[0]?.focus();
		};

		onMounted(() => {
			// startTimer(); // Start the timer when the component is mounted
			codeInputs.value[0]?.focus(); // Set focus on the first input when the page displays
			document.querySelectorAll('input[type="number"]').forEach((input) => {
				input.oninput = () => {
					if (input.value.length > input.maxLength) {
						input.value = input.value.slice(0, input.maxLength);
					}
				};
			});
		});

		let resendBtnLoadingState = ref(false);
		const resendOTP = () => {
			resendBtnLoadingState.value = true;
			let payload = {
				number: `+63${contactNumber.value}`,
				message: 'CQFS LGU Iriga Verification Code',
				sub_message: 'Please enter the 6-digit code to complete your registration.',
			};
			SendOTP(payload)
				.then((response) => {
					resendBtnLoadingState.value = false;
				})
				.catch((error) => {
					resendBtnLoadingState.value = false;
				});
		};

		// Computed property to check if all OTP fields are filled
		// const isOtpFilled = computed(() => {
		//   for (let i = 1; i < 6; i++) {
		//     if (!otp.value[`otp${i}`]) {
		//       return false;
		//     }
		//   }
		//   // If the timer has expired, do not proceed to "toSteps"
		//   if (timerExpired.value) {
		//     return false;
		//   }

		//   toSteps()
		//   return true;
		// });

		return {
			getImagePath,
			otp,
			toSteps,
			// toOrgStepOne,
			wrongNumber,
			router,
			route,
			codeInputs,
			handleInput,
			timer,
			resetInputs,
			// isOtpFilled,
			// timerExpired,
			errorOccured,
			resendOTP,
			resendBtnLoadingState,
		};
	},
};
