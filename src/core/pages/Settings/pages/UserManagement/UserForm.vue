<template>
	<div class="user-form" :class="$q.screen.width < 768 ? 'core-bg-secondary' : ''">
		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<q-icon
					v-if="!isPasswordReset"
					@click="$router.go(-1)"
					class="core-text-primary cursor-pointer q-mt-sm"
					name="arrow_back"
				/>
				<h4 :class="`core-text-primary text-26 text-semibold title q-my-none ${!isPasswordReset && 'q-ml-lg'}`">
					<span v-if="!isPasswordReset">{{ route.params.id ? 'Edit' : 'Add' }} User</span>
					<span v-else>Password Reset</span>
				</h4>
			</div>
			<q-btn
				@click="isPasswordReset = false"
				v-if="isPasswordReset"
				flat
				dense
				rounded
				no-caps
				class="q-px-xl q-mt-sm height-38 core-text-secondary bg-hover-violet-0 border-violet-2"
				label="Cancel"
			/>
		</div>
		<p v-if="isPasswordReset" class="text-16 core-text-secondary">
			<span v-if="!isResetPasswordAllowed"
				>Enter your password to confirm your identity and proceed with the reset.</span
			>
			<span v-else
				>Enter
				{{ `${UserForm.last_name}, ${UserForm.first_name} ${UserForm.middle_name} ${UserForm.suffix_name}` }}'s
				new password.</span
			>
		</p>

		<div :class="$q.screen.width < 768 && 'q-px-md core-bg-white'">
			<q-form ref="userForm" class="row" autocomplete="on" @keydown.enter.prevent="saveChanges()">
				<div v-if="!isPasswordReset" class="col-12 col-sm-5 col-md-4 col-xl-3">
					<div class="text-weight-medium q-mt-md">Last Name</div>
					<q-input
						v-model="UserForm.last_name"
						:rules="[(val) => !!val || '']"
						hide-bottom-space
						dense
						borderless
						placeholder="Enter Last Name"
						class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
					/>
					<div class="text-weight-medium q-mt-md">First Name</div>
					<q-input
						v-model="UserForm.first_name"
						:rules="[(val) => !!val || '']"
						hide-bottom-space
						dense
						borderless
						placeholder="Enter First Name"
						class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
					/>
					<div class="text-weight-medium q-mt-md">Middle Name</div>
					<q-input
						v-model="UserForm.middle_name"
						hide-bottom-space
						dense
						borderless
						placeholder="Enter Middle Name"
						class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
					/>
					<div class="text-weight-medium q-mt-md">Suffix Name</div>
					<q-input
						v-model="UserForm.suffix_name"
						hide-bottom-space
						dense
						borderless
						placeholder="Enter Suffix Name"
						class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
					/>
					<div class="text-weight-medium q-mt-md">Sex</div>
					<q-field
						:model-value="UserForm.gender"
						hide-bottom-space
						borderless
						:rules="[(val) => val !== null || '']"
					>
						<q-radio
							color="deep-purple-7"
							keep-color
							v-model="UserForm.gender"
							:val="0"
							label="Male"
							class="q-mr-md"
						/>
						<q-radio color="deep-purple-7" keep-color v-model="UserForm.gender" :val="1" label="Female" />
					</q-field>

					<div class="text-weight-medium q-mt-md">Date of Birth</div>
					<q-input
						v-model="UserForm.birthdate"
						:rules="[(val) => !!val || '', isBirthdateValid]"
						hide-bottom-space
						dense
						readonly
						borderless
						placeholder="YYYY-MM-DD"
						class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
						mask="####-##-##"
					>
						<template v-slot:append>
							<q-icon name="event" class="cursor-pointer text-accent-2">
								<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
									<q-date
										class="bg-violet-2 text-white"
										minimal
										v-model="UserForm.birthdate"
										@update:model-value="() => $refs.qDateProxy.hide()"
										mask="YYYY-MM-DD"
									/>
								</q-popup-proxy>
							</q-icon>
						</template>
					</q-input>
					<div class="text-weight-medium q-mt-md">Contact number</div>
					<q-input
						v-model="UserForm.contact_number"
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
					<div class="text-weight-medium q-mt-md">Email Address</div>
					<q-input
						v-model="UserForm.email_address"
						:rules="[(val) => !!val || '', isValidEmail]"
						lazy-rules
						hide-bottom-space
						dense
						borderless
						placeholder="Enter Email Address"
						class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
					/>
					<div class="q-mt-md text-weight-medium">Role</div>
					<div class="col q-pt-xs">
						<q-select
							class="border-radius-10 border-violet-2 core-select-field"
							dense
							borderless
							v-model="UserForm.role"
							:label="UserForm.role !== null ? '' : 'Select role'"
							emit-value
							map-options
							:options="roleOptions"
							:rules="[(val) => (val !== null && val !== '') || '']"
							hide-bottom-space
							:popup-content-class="GET_DARK_MODE_STATE ? 'option-style-dark' : 'option-style-light'"
							:options-selected-class="GET_DARK_MODE_STATE ? 'selected-class' : ''"
							transition-show="scale"
							transition-hide="scale"
						/>
					</div>
					<div class="q-mt-md text-weight-medium">Level</div>
					<div class="col q-pt-xs">
						<q-select
							class="border-radius-10 border-violet-2 core-select-field"
							dense
							borderless
							v-model="UserForm.level"
							:label="UserForm.level !== null ? '' : 'Select level'"
							emit-value
							map-options
							:options="levelOptions"
							:rules="[(val) => (val !== null && val !== '') || '']"
							hide-bottom-space
							:popup-content-class="GET_DARK_MODE_STATE ? 'option-style-dark' : 'option-style-light'"
							:options-selected-class="GET_DARK_MODE_STATE ? 'selected-class' : ''"
							transition-show="scale"
							transition-hide="scale"
						/>
					</div>
				</div>

				<div class="col-12">
					<div v-if="isPasswordReset">
						<div class="text-weight-medium" :class="$q.screen.width < 1920 ? 'q-mt-md' : 'q-mt-xl'">
							Password
						</div>
						<div class="row">
							<div class="col-12 col-sm-5 col-md-4 col-xl-3">
								<q-input
									v-model="UserForm.password"
									:rules="[(val) => !!val || '']"
									hide-bottom-space
									dense
									borderless
									placeholder="Password"
									class="core-input-field border-radius-10 border-violet-2 q-pl-md q-pr-md q-mt-sm"
									:type="isPwd ? 'password' : 'text'"
									ref="password_referrence"
								>
									<template v-slot:append>
										<q-icon
											:name="isPwd ? 'visibility_off' : 'visibility'"
											class="cursor-pointer text-accent-2"
											@click="isPwd = !isPwd"
										/> </template
								></q-input>
							</div>

							<div class="col-12 col-md-4 col-xl-3">
								<div :class="$q.screen.width < 1024 && 'row'">
									<div
										v-if="!route.params.id || isResetPasswordAllowed"
										:class="$q.screen.width >= 1024 ? 'q-pl-lg ' : 'q-mt-md col-12 col-sm-5'"
									>
										<q-btn
											@click="generatePassword()"
											align="left"
											dense
											borderless
											label="Generate password"
											no-caps
											flat
											class="
												btn-full-width
												border-radius-10 border-violet-2
												q-py-sm q-pl-md q-pr-md q-mt-sm
											"
										/>
									</div>
								</div>
							</div>

							<div class="col-12 col-sm-5 col-md-4 col-xl-3">
								<div
									v-if="!route.params.id || isResetPasswordAllowed"
									:class="$q.screen.width >= 1024 ? 'q-pl-lg' : 'q-mt-md'"
								>
									<q-btn
										@click="copyToClipBoard()"
										align="left"
										dense
										borderless
										:disable="!UserForm.password"
										:label="`${isPasswordCopied ? 'Copied to clipboard' : 'Copy password'}`"
										no-caps
										flat
										class="
											btn-full-width
											border-radius-10 border-violet-2
											q-py-sm q-pl-md q-pr-md q-mt-sm
										"
									/>
								</div>
							</div>
						</div>
					</div>
					<!-- <q-checkbox
						disable
						v-if="!isPasswordReset"
						label="Send Invitation to employee via email"
						v-model="UserForm.invitation"
						keep-color
						color="deep-purple-7"
						class="margin-left-n10 q-mt-sm"
					/> -->
				</div>
				<div
					v-if="route.params.id"
					@click="isPasswordReset = true"
					class="col-12 col-sm-3 text-violet-4 q-mt-lg cursor-pointer"
				>
					Request password reset
				</div>
				<div v-if="!isPasswordReset" class="col-12 q-mt-lg">
					<div class="text-22 q-my-lg">Permissions</div>
					<div class="border-violet-2 border-radius-10 q-pa-lg">
						<q-list
							v-for="(system, index) in systems"
							:key="index"
							@click="
								$router.push({
									name: 'core-permissions',
									params: { system_name: system[0], account_id: $route.params.id },
								})
							"
							class="flex justify-start border-bottom-accent-3 bg-hover-accent-1 q-py-sm q-px-sm cursor-pointer"
						>
							<q-item-section class="max-width-30">
								<q-img :src="require(`../../../../assets/juanhr-logo.svg`)" height="30px" />
							</q-item-section>
							<q-item-section class="text-capitalize">
								<div :class="`ellipsis ${$q.screen.width < 768 && 'max-width-200'}`">
									{{ system[0] }}
								</div>
								<div
									:class="`text-12 ellipsis ${
										$q.screen.width < 768 && 'max-width-200'
									}`"
								>
									{{ system[1].description }}
								</div>
							</q-item-section>
						</q-list>
					</div>
				</div>
				<div class="col-12 q-mt-lg">
					<q-btn
						v-if="!isPasswordReset"
						@click="saveChanges()"
						:loading="btnLoadingState"
						:class="$q.screen.width < 768 ? 'full-width border-radius-10 q-mb-xl' : 'q-mt-xl'"
						flat
						:rounded="$q.screen.width < 768 ? false : true"
						dense
						no-caps
						class="bg-violet-0 q-py-sm q-px-xl text-white"
						label="Save Changes"
					/>
					<q-btn
						v-else
						flat
						dense
						rounded
						no-caps
						class="q-px-xl q-mt-sm height-38 core-text-secondary bg-hover-violet-0 border-violet-2"
						:label="!isResetPasswordAllowed ? 'Continue' : 'Change Password'"
						:loading="btnLoadingState"
						@click="resetPassword(!isResetPasswordAllowed ? 'continue' : 'change password')"
					/>
				</div>
			</q-form>
		</div>
		<CoreDialog :content="$options.components.PasswordResetConfirmation" />
	</div>
</template>

<script src="./scripts/UserForm.js"></script>

<style lang="scss">
.user-form {
	.line-height-15 {
		line-height: 15px;
	}
	.q-field__bottom {
		min-height: auto !important;
		padding: 0 !important;
	}
	.btn-full-width {
		width: 100%;
	}
	.margin-left-n10 {
		margin-left: -10px;
	}
	.max-width-30 {
		max-width: 30px;
	}
	.max-width-200 {
		max-width: 200px;
	}

	.q-field {
		.q-field__control {
			color: $white;
		}
	}
}
.core-light-mode {
	.core-bg-secondary {
		background-color: #f5f5f5 !important;
	}
	.core-bg-white {
		background-color: $white;
	}
	.q-field {
		.q-field__control {
			color: $accent-0;
		}
	}
	.bg-hover-accent-1 {
		&:hover {
			background-color: $accent-3;
		}
	}
}
</style>
