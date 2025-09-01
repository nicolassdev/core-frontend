import { useQuasar } from 'quasar';
// import { barangays, cities, provinces, regions } from 'select-philippines-address';
import { mobileHeaderTitle } from 'src/core/composables/Triggers';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { InsertPersonalUser, PersonalQRCode, ValidateFields } from '../../../composables/UserManagement';
import MobileCalendarDialog from '../components/MobileCalendarDialog.vue';

import barangays from './../../../location/barangays.json';
import cities from './../../../location/cities.json';
import provinces from './../../../location/provinces.json';
import regions from './../../../location/regions.json';

import {
	optionBarangay,
	optionMunicipality,
	optionProvince,
	optionRegion,
	personalForm,
	selectBarangay,
	selectMunicipality,
	selectProvince,
	selectRegion,
} from '../composables';

export default {
	components: {
		MobileCalendarDialog,
	},
	setup() {
		const router = useRouter();
		const route = useRoute();
		const $q = useQuasar();

		let calendarDialogRef = ref(false);
		// Checkbox before Submit
		const termsOfService = ref(false);
		const privacyPolicy = ref(false);
		const btnLoading = ref(false);
		const isSubmitButtonActive = computed(() => termsOfService.value && privacyPolicy.value);

		const isDateOfBirthEmpty = computed(() => {
			return !personalForm.value.birthdate;
		});

		//Select Gender Option
		const selectGender = ref(null);
		const optionsGender = [
			{ label: 'Male', value: 0 },
			{ label: 'Female', value: 1 },
			{ label: 'Transgender Male', value: 2 },
			{ label: 'Transgender Female', value: 3 },
			{ label: 'Non-Binary', value: 4 },
			{ label: 'Prefer not to say', value: 5 },
			{ label: 'Others', value: 6 },
		];

		//Select Status Option
		const selectStatus = ref(null);
		const optionStatus = [
			{ label: 'None', value: 0 },
			{ label: 'PWD', value: 1 },
			{ label: 'Senior Citizen', value: 2 },
			{ label: 'Others', value: 3 },
		];

		let addRegForm = ref(1);

		let validUsername = ref(true);
		let validateUsernameRequest = ref(false);

		let regionOptions = ref({
			isLoading: false,
			data: [],
		});

		let provinceOptions = ref({
			isLoading: false,
			data: [],
		});

		let cityOptions = ref({
			isLoading: false,
			data: [],
		});

		let barangayOptions = ref({
			isLoading: false,
			data: [],
		});

		//Push data from region Library to Option Region
		onMounted(() => {
			mobileHeaderTitle.value = 'Personal Information';
			// regions().then((region) => {
			//   for (let i = 0; i < region.length; i++) {
			//     optionRegion.value.push({
			//       label: region[i].region_name,
			//       value: region[i].region_code,
			//     });
			//   }
			// });
			regionOptions.value.data = regions.data;
		});

		onUnmounted(() => {
			mobileHeaderTitle.value = null;
		});

		watch(addRegForm, (value) => {
			value == 1 && (mobileHeaderTitle.value = 'Personal Information');
			value == 2 && (mobileHeaderTitle.value = 'Account Setup');
			value == 3 && (mobileHeaderTitle.value = 'Terms and Conditions');
			value == 4 && (mobileHeaderTitle.value = 'Address Information');
		});

		const fetchProvinceState = (details) => {
			personalForm.value.region = details.regionName;
			personalForm.value.province_state = null;
			personalForm.value.municipality_city = null;
			personalForm.value.barangay_district = null;

			provinceOptions.value.isLoading = true;

			provinceOptions.value.data = provinces.data
				.filter((item) => item.regionCode == details.code)
				.sort((a, b) => {
					const nameA = a.label.toUpperCase();
					const nameB = b.label.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});

			provinceOptions.value.isLoading = false;
		};

		const fetchCitiesMunicipalities = (details) => {
			personalForm.value.province_state = details.label;
			personalForm.value.municipality_city = null;
			personalForm.value.barangay_district = null;

			cityOptions.value.isLoading = true;

			cityOptions.value.data = cities.data
				.filter((item) =>
					item.provinceCode != false ? item.provinceCode == details.code : item.regionCode == details.code
				)
				.sort((a, b) => {
					const nameA = a.label.toUpperCase();
					const nameB = b.label.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});

			cityOptions.value.isLoading = false;
		};

		const fetchBarangays = (details) => {
			personalForm.value.municipality_city = details.label;
			personalForm.value.barangay_district = null;
			barangayOptions.value.isLoading = true;
			barangayOptions.value.data = barangays.data
				.filter((item) =>
					item.cityCode != false ? item.cityCode == details.code : item.municipalityCode == details.code
				)
				.sort((a, b) => {
					const nameA = a.label.toUpperCase();
					const nameB = b.label.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});
			barangayOptions.value.isLoading = false;
		};

		const setBarangay = (details) => {
			personalForm.value.barangay_district = details.label;
		};

		//Push data from province Library to Option province
		const handleProvince = () => {
			// provinces(`${selectRegion.value}`).then((province) => {
			//   for (let i = 0; i < province.length; i++) {
			//     optionProvince.value.push({
			//       label: province[i].province_name,
			//       value: province[i].province_code,
			//     });
			//   }
			// });
		};

		//Push data from city Library to Option city
		const handleCity = () => {
			// cities(`${selectProvince.value}`).then((city) => {
			//   for (let i = 0; i < city.length; i++) {
			//     optionMunicipality.value.push({
			//       label: city[i].city_name,
			//       value: city[i].city_code,
			//     });
			//   }
			// });
		};

		//Push data from barangay Library to Option barangay
		const handleBarangay = () => {
			// barangays(`${selectMunicipality.value}`).then((barangay) => {
			//   for (let i = 0; i < barangay.length; i++) {
			//     optionBarangay.value.push({
			//       label: barangay[i].brgy_name,
			//       value: barangay[i].brgy_code,
			//     });
			//   }
			// });
		};

		// Watcher to autofocus on ID number input when special status is selected
		watch(selectStatus, (newVal) => {
			if (newVal !== null) {
				const idNumberInput = document.getElementById('idNumberInput');
				if (idNumberInput) {
					idNumberInput.focus();
				}
			}
		});

		//Submit Button Function
		const toRegConfirm = () => {
			btnLoading.value = true;
			personalForm.value.registration_type = 'personal';
			// personalForm.value.region = regionName.value;
			// personalForm.value.province_state = provinceName.value;
			// personalForm.value.municipality_city = cityName.value;
			// personalForm.value.barangay_district = barangayName.value;

			// delete personalForm.value.confirm_password

			InsertPersonalUser(personalForm.value).then((response) => {
				btnLoading.value = false;
				let status = Boolean(response.status === 'success');
				if (status) {
					// PersonalQRCode.value = response.data.personal_qr_code;
					// router.push('core-registration-confirmation');
					router.push('core-login');
					// addRegForm.value = 1;
				}

				$q.notify({
					position: $q.screen.width < 767 ? 'top' : 'bottom-right',
					classes: `${status ? 'core-success-notif' : 'core-error-notif'} q-px-lg q-pt-none q-pb-none`,
					html: true,
					message: status
						? `<div class="text-bold">Success!</div> You have been registered.`
						: `<div class="text-bold">Failed!</div>${message}.`,
				});
			});
		};

		// Computed property to check if the passwords match
		const isConfirmPasswordValid = computed(() => {
			if (personalForm.value.password !== '' && personalForm.value.confirm_password !== '') {
				return personalForm.value.password === personalForm.value.confirm_password;
			}
			return personalForm.value.password != null && personalForm.value.password.trim() == '';
		});

		let usernameRule = ref(false);

		//Display values from form 4 and 5 in Address input field of Form 1
		let regionName = ref(null);
		let provinceName = ref(null);
		let cityName = ref(null);
		let barangayName = ref(null);
		const fullAddress = computed(() => {
			// for (let i = 0; i < optionRegion.value.length; i++) {
			//   if (selectRegion.value === optionRegion.value[i].value) {
			//     regionName.value = optionRegion.value[i].label;
			//   }
			// }

			// for (let i = 0; i < optionProvince.value.length; i++) {
			//   if (selectProvince.value === optionProvince.value[i].value) {
			//     provinceName.value = optionProvince.value[i].label;
			//   }
			// }

			// for (let i = 0; i < optionMunicipality.value.length; i++) {
			//   if (selectMunicipality.value === optionMunicipality.value[i].value) {
			//     cityName.value = optionMunicipality.value[i].label;
			//   }
			// }

			// for (let i = 0; i < optionBarangay.value.length; i++) {
			//   if (selectBarangay.value === optionBarangay.value[i].value) {
			//     barangayName.value = optionBarangay.value[i].label;
			//   }
			// }

			const addressParts = [];
			if (personalForm.value.region) {
				addressParts.push(personalForm.value.region);
			}
			if (personalForm.value.province_state) {
				addressParts.push(personalForm.value.province_state);
			}
			if (personalForm.value.municipality_city) {
				addressParts.push(personalForm.value.municipality_city);
			}
			if (personalForm.value.barangay_district) {
				addressParts.push(personalForm.value.barangay_district);
			}
			if (personalForm.value.postal_zip_code) {
				addressParts.push(personalForm.value.postal_zip_code);
			}
			if (personalForm.value.lot_block_phase_house_number) {
				addressParts.push(personalForm.value.lot_block_phase_house_number);
			}
			if (personalForm.value.street_name) {
				addressParts.push(personalForm.value.street_name);
			}
			if (personalForm.value.subdivision_residence_complex) {
				addressParts.push(personalForm.value.subdivision_residence_complex);
			}
			if (personalForm.value.unit_room_floor_number) {
				addressParts.push(personalForm.value.unit_room_floor_number);
			}
			if (personalForm.value.building_name) {
				addressParts.push(personalForm.value.building_name);
			}
			return addressParts.join(', ');
		});

		const selectDateDialog = (selectedDate) => {
			personalForm.value.birthdate = selectedDate;
			calendarDialogRef.value = false;
		};

		const resetAddress = () => {
			selectRegion.value = null;
			selectMunicipality.value = null;
			selectBarangay.value = null;
			selectProvince.value = null;

			personalForm.value.barangay_district = null;
			personalForm.value.building_name = null;
			personalForm.value.lot_block_phase_house_number = null;
			personalForm.value.municipality_city = null;
			personalForm.value.postal_zip_code = null;
			personalForm.value.province_state = null;
			personalForm.value.region = null;
			personalForm.value.street_name = null;
			personalForm.value.subdivision_residence_complex = null;
			personalForm.value.unit_room_floor_number = null;
		};

		let passwordStrengthValidation = ref([
			{
				label: 'More than 8 characters',
				model: computed(() => {
					return personalForm.value.password?.length > 8;
				}),
			},
			{
				label: 'Use uppercase letters',
				model: computed(() => {
					return /[A-Z]/.test(personalForm.value.password);
				}),
			},
			{
				label: 'Use lowercase letters',
				model: computed(() => {
					return personalForm.value.password !== null && /[a-z]/.test(personalForm.value.password);
				}),
			},
			{
				label: 'Use numbers',
				model: computed(() => {
					return /[0-9]/.test(personalForm.value.password);
				}),
			},
			{
				label: 'One special character (e.g., !,@,#,$,%,etc.)',
				model: computed(() => {
					return /[^\w\s]/.test(personalForm.value.password);
				}),
			},
		]);

		const updateSpecialStatus = (value) => {
			value === 0 && (personalForm.value.id_number = null);
		};

		const updateUsername = (value) => {
			usernameRule.value = value.trim() !== '';
			validUsername.value = true;
			// if (usernameRule.value) {
			//   validateUsernameRequest.value = true
			//   validateUsername()
			// }
		};

		const validateUsername = () => {
			ValidateFields({
				validate_username: {
					username: personalForm.value.username.trim(),
				},
			}).then((response) => {
				const status = response.status === 'success';
				if (status) {
					const data = response.data;
					validUsername.value = data.is_username_valid === 1;
				}
				validateUsernameRequest.value = false;
			});
		};

		return {
			usernameRule,
			validUsername,
			validateUsernameRequest,
			updateUsername,
			updateSpecialStatus,
			passwordStrengthValidation,
			resetAddress,
			calendarDialogRef,
			termsOfService,
			personalForm,
			privacyPolicy,
			isSubmitButtonActive,
			isDateOfBirthEmpty,
			selectGender,
			optionsGender,
			selectStatus,
			optionStatus,
			selectRegion,
			optionRegion,
			selectProvince,
			optionProvince,
			selectMunicipality,
			optionMunicipality,
			selectBarangay,
			optionBarangay,

			selectDateDialog,
			handleProvince,
			handleCity,
			handleBarangay,
			addRegForm,
			router,
			route,
			toRegConfirm,
			isConfirmPasswordValid,
			isPwd: ref(true),
			isConfirmPwd: ref(true),
			fullAddress,
			btnLoading,

			regionOptions,
			provinceOptions,
			cityOptions,
			barangayOptions,
			fetchProvinceState,
			fetchCitiesMunicipalities,
			fetchBarangays,
			setBarangay,
		};
	},
};
