/**
 * In this form only the mobile number and password are allowed to be updated by the user
 */

import { useQuasar } from 'quasar';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { copyText } from 'vue3-clipboard';
import CoreDialog from './../../../components/CoreDialog.vue';
import UploadImage from './../components/UploadImage.vue';
import PasswordResetConfirmation from './../../Settings/pages/UserManagement/components/PasswordResetConfirmation';
import { UpdateProfile, ActiveModal } from './../../../composables/Profile';
import { FetchUserDetails, UserDetails } from './../../../composables/UserManagement';
import MainDialog from '../../../components/MainDialog.vue';
import { ToggleMainDialogState } from '../../../composables/Triggers';
import ChangePassword from '../components/ChangePassword.vue';

export default {
	components: {
		MainDialog,
		CoreDialog,
		UploadImage,
		ChangePassword,
		PasswordResetConfirmation,
	},
	setup() {
		const $q = useQuasar();
		const store = useStore();
		const route = useRoute();

		let profileForm = ref(null);
		let isPasswordReset = ref(false);
		let isPwd = ref(true);
		let btnLoadingState = ref(false);

		let form = ref({
			id: null,
			level: null,
			contact_number: null,
			password: null,
			first_name: null,
			middle_name: null,
			last_name: null,
			address: null,
		});

		let User = computed(() => {
			try {
				return UserDetails.value;
			} catch (error) {
				return {
					photo: null,
					sex: null,
				};
			}
		});

		// Readable user role
		const role = ref(['Super Admin', 'Registrar', 'Human Resource Management', 'Employee']);
		// Fetch user details
		FetchUserDetails({ id: route.params.id, is_profile: 1 }).then((response) => {
			form.value = {
				id: UserDetails.value.id,
				level: UserDetails.value.level,
				contact_number: UserDetails.value.contact_number,
				is_profile: 1,
				first_name: UserDetails.value.first_name,
				middle_name: UserDetails.value.middle_name,
				last_name: UserDetails.value.last_name,
				address: UserDetails.value.address,
			};
		});

		// Validate mobile number
		const isMobileValid = (val) => {
			return Number(val[0]) !== 0 || '';
		};

		// Update request
		const saveChanges = () => {
			profileForm.value.validate().then((success) => {
				if (success) {
					// Remove unnecessary payload
					delete form.value.password;
					UpdateProfile(form.value).then((response) => {
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
								? `<span>Success,</span> Profile updated successfully!`
								: `<span>Failed,</span> ${response.message}`,
						});
					});
				}
			});
		};

		// Copy to clip board
		let isPasswordCopied = ref(false);

		const changePassword = (val) => {
			ActiveModal.value = val;
			ToggleMainDialogState();
		};

		const editPicture = (val) => {
			ActiveModal.value = val;
			ToggleMainDialogState();
		};

		return {
			isPasswordCopied,
			isPasswordReset,
			btnLoadingState,
			UserDetails,
			profileForm,
			ActiveModal,
			isPwd,
			role,
			form,
			User,

			editPicture,
			changePassword,
			isMobileValid,
			saveChanges,
		};
	},
};
