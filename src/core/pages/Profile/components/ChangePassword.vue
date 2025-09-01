<template>
	<div class="q-my-md">
		<p class="title text-16 text-center q-mt-md">
			The password must be at least 8 characters long, include a combination of uppercase and lowercase letters,
			numbers and symbols and the password must be different from any passwords used in the past.
		</p>
		<q-form @submit="savePassword">
			<div class="text-16 text-left q-mt-md">Current Password</div>
			<q-input
				hide-bottom-space
				dense
				v-model="form.current_password"
				borderless
				:type="!isCurrentPwdVisible ? 'password' : 'text'"
				class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm bg-white"
				input-style="color: black"
				:rules="[(val) => !!val || 'Current password is required']"
				@update:model-value="passwordBehavior"
				:loading="btnLoadingState"
			>
				<template v-slot:append>
					<q-icon
						color="violet"
						:name="!isCurrentPwdVisible ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						@click="isCurrentPwdVisible = !isCurrentPwdVisible"
					/>
				</template>
			</q-input>
			<div class="text-16 text-red">{{ errorMessage }}</div>

			<div class="text-16 text-left q-mt-md">New Password</div>
			<q-input
				hide-bottom-space
				dense
				v-model="form.password"
				borderless
				:disable="isDisable"
				:type="!isNewPwdVisible ? 'password' : 'text'"
				:class="
					isDisable
						? 'core-input-field border-radius-10 border-violet-5 q-pl-md q-pr-md q-mt-sm bg-white'
						: 'core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm bg-white'
				"
				input-style="color: black"
				:rules="[
					(val) => !!val || 'New password is required',
					(val) => val.length >= 8 || 'Password must be at least 8 characters',
					(val) => /[a-z]/.test(val) || 'Include at least one lowercase letter',
					(val) => /[A-Z]/.test(val) || 'Include at least one uppercase letter',
					(val) => /[0-9]/.test(val) || 'Include at least one number',
					(val) => /[!@#$%^&*(),.?:{}|<>]/.test(val) || 'Must include symbols',
					(val) =>
						val !== form.current_password || 'New password must be different from the current password',
				]"
			>
				<template v-slot:append>
					<q-icon
						:name="!isNewPwdVisible ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						@click="isNewPwdVisible = !isNewPwdVisible"
						color="violet"
					/>
				</template>
			</q-input>
			<div class="text-16 text-left q-mt-md">Confirm Password</div>
			<q-input
				hide-bottom-space
				dense
				v-model="confirm_password"
				borderless
				:disable="isDisable"
				:type="!isConfirmPwdVisible ? 'password' : 'text'"
				:class="
					isDisable
						? 'core-input-field border-radius-10 border-violet-5 q-pl-md q-pr-md q-mt-sm bg-white'
						: 'core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm bg-white'
				"
				input-style="color: black"
				:rules="[
					(val) => !!val || 'Please confirm your password',
					(val) => val === form.password || 'Passwords do not match',
				]"
			>
				<template v-slot:append>
					<q-icon
						:name="!isConfirmPwdVisible ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						@click="isConfirmPwdVisible = !isConfirmPwdVisible"
						color="violet"
					/>
				</template>
			</q-input>

			<div class="flex justify-between q-mt-md row">
				<q-btn
					flat
					rounded
					no-caps
					outline
					dense
					primary
					@click="closeDialog()"
					class="col border-violet-2 q-py-xs q-mr-md cursor-pointer text-14 q-mt-md"
					>Cancel</q-btn
				>
				<q-btn
					flat
					outline
					rounded
					dense
					no-caps
					:disable="isDisable || isPasswordSame"
					class="col q-py-none cursor-pointer text-14 q-mt-md"
					:class="isDisable ? 'bg-violet-4' : 'bg-violet-0'"
					color="white"
					label="Submit"
					type="submit"
				/>
			</div>
		</q-form>
	</div>
</template>

<script>
import { useStore } from 'vuex';
import { ToggleMainDialogState } from '../../../composables/Triggers';
import { UserDetails } from './../../../composables/UserManagement';
import { useQuasar } from 'quasar';
import { ref, computed } from 'vue';
import { debounce } from 'lodash-es';
import { LoginUser } from './../../../composables/Authenticate';
import { ResetPassword } from './../../../composables/Profile';
import { useRouter } from 'vue-router';
export default {
	setup() {
		const $q = useQuasar();
		const store = useStore();
		const router = useRouter();

		const isCurrentPasswordValid = ref(false);
		const isCurrentPwdVisible = ref(false);
		const isConfirmPwdVisible = ref(false);
		const isNewPwdVisible = ref(false);

		let btnLoadingState = ref(false);
		let isDisable = ref(true);
		let error = ref(false);

		let confirm_password = ref('');
		let errorMessage = ref(null);

		let form = ref({
			password: '',
			current_password: '',
		});

		const isPasswordSame = computed(() => form.value.password === form.value.current_password);

		const closeDialog = () => {
			ToggleMainDialogState();
		};

		const savePassword = () => {
			ResetPassword({
				password: form.value.current_password,
				new_password: form.value.password,
				id: UserDetails.value.id,
			}).then((response) => {
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

				if (status) {
					form.value = {
						password: '',
						current_password: '',
					};
					confirm_password.value = null;
					ToggleMainDialogState();
				}
			});
		};

		// validate first the password inputted
		const passwordBehavior = debounce(async () => {
			btnLoadingState.value = true;
			if (!form.value.current_password) {
				isCurrentPasswordValid.value = false;
				return;
			}
			try {
				await LoginUser({
					id: UserDetails.value.id,
					current_password: form.value.current_password,
					username: UserDetails.value.username,
				})
					.then((response) => {
						if (response.status === 'success') {
							isDisable.value = false;
							errorMessage.value = null;
						} else {
							error.value = true;
							errorMessage.value = "Sorry, that password isn't right.";
							isDisable.value = true;
						}
						btnLoadingState.value = false;
					})
					.catch((error) => {
						console.log(error);
						btnLoadingState.value = false;
						errorMessage.value = 'Something went wrong!';
					})
					.finally(() => {
						$q.loading.hide();
					});
			} catch (error) {
				isCurrentPasswordValid.value = false;
				console.error('Password validation error:', error);
			}
		}, 2000);

		return {
			isCurrentPasswordValid,
			isCurrentPwdVisible,
			isConfirmPwdVisible,
			confirm_password,
			btnLoadingState,
			isNewPwdVisible,
			isPasswordSame,
			errorMessage,
			isDisable,
			error,
			form,

			passwordBehavior,
			savePassword,
			closeDialog,
		};
	},
};
</script>

<style scoped lang="scss">
.title {
	width: 250px;
}
</style>
