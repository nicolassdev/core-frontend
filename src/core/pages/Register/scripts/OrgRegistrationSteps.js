import { useQuasar } from 'quasar';
// import { barangays, cities, provinces, regions } from 'select-philippines-address';
import { mobileHeaderTitle } from 'src/core/composables/Triggers';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { InsertOrganizationUser, ValidateFields } from '../../../composables/UserManagement';
import {
	optionBarangay,
	optionMunicipality,
	optionProvince,
	optionRegion,
	organizationForm,
	resetForm,
	selectBarangay,
	selectMunicipality,
	selectProvince,
	selectRegion
} from '../composables';

import barangays from './../../../location/barangays.json';
import cities from './../../../location/cities.json';
import provinces from './../../../location/provinces.json';
import regions from './../../../location/regions.json';

export default {
	setup() {

		let addOrgRegForm = ref(1);
		// Checkbox before Submit
		const termsOfService = ref(false);
		const privacyPolicy = ref(false);

		const route = useRoute();
		const router = useRouter();

		const isSubmitButtonActive = computed(() => termsOfService.value && privacyPolicy.value);

		//Select Industry Option
		const selectIndustry = ref(null);
		const optionsIndustry = [
			{ label: 'Agriculture and Forestry', value: 'Agriculture and Forestry' },
			{ label: 'Automotive', value: 'Automotive' },
			{ label: 'Banking and Financial Services', value: 'Banking and Financial Services' },
			{ label: 'Chemical', value: 'Chemical' },
			{ label: 'Construction and Real Estate', value: 'Construction and Real Estate' },
			{ label: 'Consulting', value: 'Consulting' },
			{ label: 'Consumer Goods and Retail', value: 'Consumer Goods and Retail' },
			{ label: 'Education', value: 'Education' },
			{ label: 'Energy (Oil and Gas, Renewable Energy)', value: 'Energy (Oil and Gas, Renewable Energy)' },
			{ label: 'Entertainment and Media', value: 'Entertainment and Media' },
			{ label: 'Food and Beverage', value: 'Food and Beverage' },
			{ label: 'Government and Public Administration', value: 'Government and Public Administration' },
			{ label: 'Healthcare and Pharmaceuticals', value: 'Healthcare and Pharmaceuticals' },
			{ label: 'Hospitality and Tourism', value: 'Hospitality and Tourism' },
			{
				label: 'Information Technology (IT) and Software Development',
				value: 'Information Technology (IT) and Software Development',
			},
			{ label: 'Insurance', value: 'Insurance' },
			{ label: 'Manufacturing', value: 'Manufacturing' },
			{ label: 'Mining and Extraction', value: 'Mining and Extraction' },
			{ label: 'Non-profit and Social Services', value: 'Non-profit and Social Services' },
			{
				label: 'Professional Services (Legal, Accounting, Advertising, etc.)',
				value: 'Professional Services (Legal, Accounting, Advertising, etc.)',
			},
			{ label: 'Telecommunications', value: 'Telecommunications' },
			{ label: 'Transportation and Logistics', value: 'Transportation and Logistics' },
			{ label: 'Utilities (Electricity, Water, Gas)', value: 'Utilities (Electricity, Water, Gas)' },
			{ label: 'Aerospace and Defense', value: 'Aerospace and Defense' },
			{ label: 'Biotechnology and Life Sciences', value: 'Biotechnology and Life Sciences' },
			{ label: 'Chemicals and Materials', value: 'Chemicals and Materials' },
			{ label: 'E-commerce and Online Services', value: 'E-commerce and Online Services' },
			{ label: 'Fashion and Apparel', value: 'Fashion and Apparel' },
			{ label: 'Gaming and Entertainment Technology', value: 'Gaming and Entertainment Technology' },
			{ label: 'Human Resources and Recruitment', value: 'Human Resources and Recruitment' },
			{ label: 'Marketing and Advertising', value: 'Marketing and Advertising' },
			{ label: 'Printing and Publishing', value: 'Printing and Publishing' },
			{ label: 'Sports and Fitness', value: 'Sports and Fitness' },
			{ label: 'Wholesale and Distribution', value: 'Wholesale and Distribution' },
		];

		let validUsername = ref(true);
		let validateUsernameRequest = ref(false);

		let usernameRule = ref(false);

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

		onBeforeMount(() => {
			regionOptions.value.isLoading = true;
			// regionOptions.value.data.push({
			// 	code: '130000000',
			// 	name: 'NCR',
			// 	label: 'National Capital Region',
			// 	islandGroupCode: 'luzon',
			// 	psgc10DigitCode: '1300000000',
			// });
			// regions.data.forEach((region) => {
			// 	regionOptions.value.data.push(
			// 		{
			// 			label: region.regionName,
			// 			description: region.name,
			// 			code: region.code
			// 		},
			// 		// ...filteredProvince
			// 	);
			// });
			regionOptions.value.data = regions.data
			regionOptions.value.isLoading = false;
		});

		//Push data from region Library to Option Region
		onMounted(() => {
			mobileHeaderTitle.value = 'Organization Account Registration'
			// regions().then((region) => {
			// 	for (let i = 0; i < region.length; i++) {
			// 		optionRegion.value.push({
			// 			label: region[i].region_name,
			// 			value: region[i].region_code,
			// 		});
			// 	}
			// });
		});

		const fetchProvinceState = (details) => {
			organizationForm.value.region = details.regionName
			organizationForm.value.province_state = null;
			organizationForm.value.municipality_city = null;
			organizationForm.value.barangay_district = null;

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

			provinceOptions.value.isLoading = false
		}

		const fetchCitiesMunicipalities = (details) => {
			organizationForm.value.province_state = details.label;
			organizationForm.value.municipality_city = null;
			organizationForm.value.barangay_district = null;

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
			organizationForm.value.municipality_city = details.label;
			organizationForm.value.barangay_district = null;
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
			organizationForm.value.barangay_district = details.label;
		};

		//Push data from province Library to Option province
		const handleProvince = () => {
			// provinces(`${selectRegion.value}`).then((province) => {
			// 	for (let i = 0; i < province.length; i++) {
			// 		optionProvince.value.push({
			// 			label: province[i].province_name,
			// 			value: province[i].province_code,
			// 		});
			// 	}
			// });
		};

		//Push data from city Library to Option city
		const handleCity = () => {
			// cities(`${selectProvince.value}`).then((city) => {
			// 	for (let i = 0; i < city.length; i++) {
			// 		optionMunicipality.value.push({
			// 			label: city[i].city_name,
			// 			value: city[i].city_code,
			// 		});
			// 	}
			// });
		};

		//Push data from barangay Library to Option barangay
		const handleBarangay = () => {
			// barangays(`${selectMunicipality.value}`).then((barangay) => {
			// 	for (let i = 0; i < barangay.length; i++) {
			// 		optionBarangay.value.push({
			// 			label: barangay[i].brgy_name,
			// 			value: barangay[i].brgy_code,
			// 		});
			// 	}
			// });
		};

		//Submit Button Function
		const toOrgRegConfirm = () => {
			organizationForm.value.industry = selectIndustry.value;
			// organizationForm.value.region = regionName.value;
			// organizationForm.value.province_state = provinceName.value;
			// organizationForm.value.municipality_city = cityName.value;
			// organizationForm.value.barangay_district = barangayName.value;
			organizationForm.value.registration_type = 'organization';

			delete organizationForm.value.confirm_password

			InsertOrganizationUser(organizationForm.value).then((response) => {
				showNotify(response.status === 'success', response.message)
				if (response.status === 'success') {
					router.push('/core-org-registration-confirmation');
					addOrgRegForm.value = 1;
					resetForm();
				}
			});
		};

		watch(addOrgRegForm, (value) => {
			value == 1 && (mobileHeaderTitle.value = 'Organization Account Registration')
			value == 2 && (mobileHeaderTitle.value = 'Account Setup')
			value == 3 && (mobileHeaderTitle.value = 'Terms and Conditions')
			value == 4 && (mobileHeaderTitle.value = 'Address Information')
		})

		const toOrgReg = () => {
			router.push('/core-org-registration');
		};

		//Display values from form 4 and 5 in Address input field of Form 1
		let regionName = ref('');
		let provinceName = ref('');
		let cityName = ref('');
		let barangayName = ref('');
		const fullAddress = computed(() => {
			// for (let i = 0; i < optionRegion.value.length; i++) {
			// 	if (selectRegion.value === optionRegion.value[i].value) {
			// 		regionName.value = optionRegion.value[i].label;
			// 	}
			// }

			// for (let i = 0; i < optionProvince.value.length; i++) {
			// 	if (selectProvince.value === optionProvince.value[i].value) {
			// 		provinceName.value = optionProvince.value[i].label;
			// 	}
			// }

			// for (let i = 0; i < optionMunicipality.value.length; i++) {
			// 	if (selectMunicipality.value === optionMunicipality.value[i].value) {
			// 		cityName.value = optionMunicipality.value[i].label;
			// 	}
			// }

			// for (let i = 0; i < optionBarangay.value.length; i++) {
			// 	if (selectBarangay.value === optionBarangay.value[i].value) {
			// 		barangayName.value = optionBarangay.value[i].label;
			// 	}
			// }

			const addressParts = [];
			if (organizationForm.value.region) {
				addressParts.push(organizationForm.value.region);
			}
			if (organizationForm.value.province_state) {
				addressParts.push(organizationForm.value.province_state);
			}
			if (organizationForm.value.municipality_city) {
				addressParts.push(organizationForm.value.municipality_city);
			}
			if (organizationForm.value.barangay_district) {
				addressParts.push(organizationForm.value.barangay_district);
			}
			if (organizationForm.value.postal_zip_code) {
				addressParts.push(organizationForm.value.postal_zip_code);
			}
			if (organizationForm.value.lot_block_phase_house_number) {
				addressParts.push(organizationForm.value.lot_block_phase_house_number);
			}
			if (organizationForm.value.street_name) {
				addressParts.push(organizationForm.value.street_name);
			}
			if (organizationForm.value.subdivision_residence_complex) {
				addressParts.push(organizationForm.value.subdivision_residence_complex);
			}
			if (organizationForm.value.unit_room_floor_number) {
				addressParts.push(organizationForm.value.unit_room_floor_number);
			}
			if (organizationForm.value.building_name) {
				addressParts.push(organizationForm.value.building_name);
			}
			return addressParts.join(', ');
		});

		// Computed property to check if the passwords match
		const isConfirmPasswordValid = computed(() => {
			if (organizationForm.value.password !== '' && organizationForm.value.confirm_password !== '') {
				return organizationForm.value.password === organizationForm.value.confirm_password;
			}
			return true;
		});

		const $q = useQuasar();
		const showNotify = (status, message) => {
			$q.notify({
				position: $q.screen.width < 767 ? 'top' : 'bottom-right',
				classes: `${status ? 'core-success-notif' : 'core-error-notif'} q-px-lg q-pt-none q-pb-none`,
				html: true,
				message: status
					? `<div class="text-bold">Success!</div>`
					: `<div class="text-bold">Failed!</div>${message}.`,
			});
		};

		const resetAddress = () => {
			selectRegion.value = null
			selectMunicipality.value = null
			selectBarangay.value = null
			selectProvince.value = null

			organizationForm.value.barangay_district = null
			organizationForm.value.building_name = null
			organizationForm.value.lot_block_phase_house_number = null
			organizationForm.value.municipality_city = null
			organizationForm.value.postal_zip_code = null
			organizationForm.value.province_state = null
			organizationForm.value.region = null
			organizationForm.value.street_name = null
			organizationForm.value.subdivision_residence_complex = null
			organizationForm.value.unit_room_floor_number = null

			provinceOptions.value.data = cityOptions.value.data = barangayOptions.value.data = []
		}

		let passwordStrengthValidation = ref([
			{
				label: 'More than 8 characters',
				model: computed(() => {
					return organizationForm.value.password?.length > 8
				})
			},
			{
				label: 'Use uppercase letters',
				model: computed(() => {
					return /[A-Z]/.test(organizationForm.value.password)
				})
			},
			{
				label: 'Use lowercase letters',
				model: computed(() => {
					return organizationForm.value.password !== null &&
						/[a-z]/.test(organizationForm.value.password)
				})
			},
			{
				label: 'Use numbers',
				model: computed(() => {
					return /[0-9]/.test(organizationForm.value.password)
				})
			},
			{
				label: 'One special character (e.g., !,@,#,$,%,etc.)',
				model: computed(() => {
					return /[^\w\s]/.test(organizationForm.value.password)
				})
			},
		])

		const updateUsername = (value) => {
			usernameRule.value = value.trim() !== ''
			validUsername.value = true
			if (usernameRule.value) {
				validateUsernameRequest.value = true
				validateUsername()
			}
		}

		const validateUsername = () => {
			ValidateFields({
				validate_username: {
					username: organizationForm.value.username.trim()
				}
			}).then((response) => {
				const status = response.status === 'success';
				if (status) {
					const data = response.data;
					validUsername.value = data.is_username_valid === 1
				}
				validateUsernameRequest.value = false
			})
		}

		return {
			usernameRule,
			validateUsernameRequest,
			validUsername,
			updateUsername,
			passwordStrengthValidation,
			resetAddress,
			organizationForm,
			handleBarangay,
			handleCity,
			handleProvince,
			route,
			router,
			toOrgRegConfirm,
			optionsIndustry,
			selectIndustry,
			selectRegion,
			optionRegion,
			selectProvince,
			optionProvince,
			selectMunicipality,
			optionMunicipality,
			selectBarangay,
			optionBarangay,
			addOrgRegForm,
			fullAddress,
			termsOfService,
			privacyPolicy,
			isSubmitButtonActive,

			isConfirmPasswordValid,
			isPwd: ref(true),
			isConfirmPwd: ref(true),
			toOrgReg,
			resetForm,

			regionOptions,
			provinceOptions,
			cityOptions,
			barangayOptions,
			fetchProvinceState,
			fetchCitiesMunicipalities,
			fetchBarangays,
			setBarangay
		};
	},
};
