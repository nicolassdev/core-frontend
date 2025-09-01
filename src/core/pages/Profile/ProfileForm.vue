<template>
	<div class="edit-profile">
		<div :class="`flex justify-between items-center ${!isPasswordReset && 'q-mb-lg'}`">
			<div class="flex items-center gt-xs">
				<q-btn flat size="sm" round @click="$router.go(-1)" class="core-text-primary" icon="arrow_back" />
				<h4
					:class="`core-text-primary text-26 text-semibold q-my-none text-capitalize ${
						!isPasswordReset && 'q-ml-lg'
					}`"
				>
					Edit Profile
				</h4>
			</div>
		</div>
		<div class="content flex justify-start q-my-lg q-ml-sm">
			<div class="border profile four avatar overflow-hidden relative-position">
				<q-img v-if="User.photo" width="100" height="100" :src="`data:image/png;base64, ${User.photo}`" />
				<q-img
					v-else
					class="fit"
					:src="require(`./../../assets/${!User.sex ? 'male' : 'female'}-avatar.svg`)"
				/>
				<div class="absolute-bottom camera q-py-xs flex justify-center">
					<q-icon
						@click="editPicture('upload-profile')"
						name="edit"
						color="grey"
						size="sm"
						class="cursor-pointer"
					/>
				</div>
			</div>
			<div class="q-ml-md q-mt-sm">
				<div class="q-mt-lg text-semibold text-24">{{ User.full_name }}</div>
				<div class="">{{ User.email_address }}</div>
			</div>
		</div>

		<q-form ref="profileForm" class="row" autocomplete="on">
			<div class="col-12 col-sm-5 col-md-4 col-xl-3 q-ml-sm">
				<div class="text-weight-medium">First Name</div>
				<q-input
					hide-bottom-space
					dense
					v-model="form.first_name"
					borderless
					class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
				/>
				<div class="text-weight-medium q-mt-md">Middle Name</div>
				<q-input
					hide-bottom-space
					dense
					v-model="form.middle_name"
					borderless
					class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
				/>
				<div class="text-weight-medium q-mt-md">Last Name</div>
				<q-input
					hide-bottom-space
					dense
					v-model="form.last_name"
					borderless
					class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
				/>

				<div class="text-weight-medium q-mt-md">Address</div>
				<q-input
					hide-bottom-space
					dense
					v-model="form.address"
					borderless
					class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
				/>

				<div class="text-weight-medium q-mt-md">Mobile Number</div>
				<q-input
					v-model="form.contact_number"
					:rules="[(val) => !!val || '', isMobileValid]"
					hide-bottom-space
					dense
					borderless
					mask="####-###-###"
					unmasked-value
					placeholder="####-###-###"
					class="core-input-field border-radius-10 border-violet-2 q-pl-lg q-pr-md q-mt-sm"
				>
					<template v-slot:prepend>
						<q-icon class="core-text-primary q-mr-md" size="13px">(+63)</q-icon>
					</template>
				</q-input>
				<div
					@click="changePassword('change-password')"
					class="col-12 col-sm-3 text-violet-4 q-mt-lg cursor-pointer"
				>
					Change my password
				</div>
			</div>
		</q-form>
		<div>
			<q-btn
				@click="saveChanges()"
				:loading="btnLoadingState"
				:class="`q-mt-xl ${$q.screen.width < 768 && 'full-width border-radius-10 q-mb-xl q-mt-xl'}`"
				flat
				:rounded="$q.screen.width < 768 ? false : true"
				dense
				no-caps
				class="bg-violet-0 q-py-sm q-px-xl text-white q-ml-sm"
				label="Save Changes"
			/>
		</div>
		<CoreDialog v-if="ActiveModal === 'reset-password'" :content="$options.components.PasswordResetConfirmation" />
		<MainDialog v-if="ActiveModal === 'change-password'" :content="$options.components.ChangePassword" />
		<MainDialog v-if="ActiveModal === 'upload-profile'" :content="$options.components.UploadImage" />
	</div>
</template>

<script src="./script/ProfileForm.js"></script>
<style lang="scss" scoped>
.core-profile {
	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border-color: $violet-0;
		.camera {
			transition: 0.2s;
			background: rgba(0, 0, 0, 0.5);
			&:hover {
				background: rgba(98, 0, 234, 0.5);
			}
		}
	}
}
</style>
