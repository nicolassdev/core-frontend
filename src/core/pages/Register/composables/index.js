import { ref } from 'vue';

let personalForm = ref({
	// Personal Account Registration
	first_name: null,
	last_name: null,
	middle_name: null,
	suffix_name: null,
	email_address: null,
	contact_number: null,
	preferred_verification_method: 1,
	// Form 1-4
	birthdate: null,
	gender: null,
	special_status: null,
	id_number: null,

	region: null,
	province_state: null,
	municipality_city: null,
	barangay_district: null,
	postal_zip_code: null,
	unit_room_floor_number: null,
	building_name: null,
	lot_block_phase_house_number: null,
	street_name: null,
	subdivision_residence_complex: null,

	username: null,
	password: null,
	confirm_password: null
});

let organizationForm = ref({
	// Organization Account Registration
	organization_name: null,
	email_address: null,
	contact_persons_name: null,
	contact_number: null,

	other_relevant_details: null,
	industry: null,

	preferred_verification_method: null,

	// Form 1-4
	region: null,
	province_state: null,
	municipality_city: null,
	barangay_district: null,
	postal_zip_code: null,
	unit_room_floor_number: null,
	building_name: null,
	lot_block_phase_house_number: null,
	subdivision_residence_complex: null,
	street_name: null,

	username: null,
	password: null,
	confirm_password: null
});

const resetForm = () => {
	Object.keys(organizationForm.value).forEach((key) => organizationForm.value[key] = null);
	organizationForm.value.preferred_verification_method = 1

	Object.keys(personalForm.value).forEach((key) => personalForm.value[key] = null);
	personalForm.value.preferred_verification_method = 1

	selectRegion.value = null;
	selectProvince.value = null;
	selectMunicipality.value = null;
	selectBarangay.value = null;

	optionMunicipality.value = [];
	optionProvince.value = [];
	optionRegion.value = [];
	optionBarangay.value = [];
};


let selectRegion = ref(null);
let selectProvince = ref(null);
let selectMunicipality = ref(null);
let selectBarangay = ref(null);

let optionMunicipality = ref([]);
let optionProvince = ref([]);
let optionRegion = ref([]);
let optionBarangay = ref([]);

export {
	optionBarangay, optionMunicipality,
	optionProvince,
	optionRegion, organizationForm,
	personalForm,
	resetForm, selectBarangay, selectMunicipality, selectProvince, selectRegion
};
