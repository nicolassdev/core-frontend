<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="core-registration flex justify-center items-center full-width column">
			<div v-if="$q.screen.width > 767">
				<h1 class="text-28 text-semibold q-my-none text-center">Personal Account Registration</h1>
			</div>
			<div class="form-container">
				<div class="text-13">
					Before you can proceed with the registration, we need to verify <br />
					your identity. Please provide the following information:
				</div>
				<div class="text-13 q-mt-lg q-mb-xs">Last Name <span class="text-negative">*</span></div>
				<q-form @submit="onSubmit">
					<q-input
						v-model="personalForm.last_name"
						dense
						borderless
						placeholder="Enter Last Name"
						:rules="[(val) => (val !== null && val.trim() !== '') || '']"
						hide-bottom-space
						class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
					/>
					<div class="text-13 q-mt-lg required-field q-mb-xs">
						First Name<span class="text-negative q-pl-xs">*</span>
					</div>
					<q-input
						v-model="personalForm.first_name"
						dense
						borderless
						placeholder="Enter First Name"
						:rules="[(val) => (val !== null && val.trim() !== '') || '']"
						hide-bottom-space
						class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
					/>
					<div class="text-13 q-mt-lg required-field q-mb-xs">Middle Name</div>
					<q-input
						v-model="personalForm.middle_name"
						dense
						borderless
						placeholder="Enter Middle Name"
						hide-bottom-space
						class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
					/>
					<div class="text-13 q-mt-lg required-field q-mb-xs">Suffix Name</div>
					<q-input
						v-model="personalForm.suffix_name"
						dense
						borderless
						placeholder="Enter Suffix Name"
						hide-bottom-space
						class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
					/>
					<div class="text-13 q-mt-lg required-field q-mb-xs">Email Address <span class="text-negative q-pl-xs">*</span></div>
					<q-input
						v-model="personalForm.email_address"
						dense
						borderless
						placeholder="Enter Email Address"
						no-error-icon
						@update:model-value="updateEmailValue"
						:rules="[
							(val) => emailRules || 'Enter a valid email',
							(val) => validEmail || 'Email is already registered',
              (val) => (val !== null && val.trim() !== '') || '',
						]"
						debounce="2000"
						@input="emailRules && (validEmailRequest = true)"
						bottom-slots
						input-class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
					>
						<template #hint>
							<div v-if="!validEmail" class="text-negative">Email is already registered</div>
						</template>
						<div class="absolute-right full-height items-center flex q-mr-sm">
							<q-spinner v-if="validEmailRequest" color="grey-7" size="sm"></q-spinner>
							<q-icon
								v-if="!emailRules || !validEmail"
								name="error"
								class="text-negative"
								size="sm"
							></q-icon>
						</div>
					</q-input>
					<div class="text-13 q-mt-sm required-field q-mb-xs">
						Contact Number<span class="text-negative q-pl-xs">*</span>
					</div>
					<q-input
						v-model="personalForm.contact_number"
						dense
						mask="###-####-###"
						borderless
						unmasked-value
						placeholder="Enter Contact Number"
						:rules="[
							(val) => (!!val && String(val).trim() !== '') || '',
							(val) => /^9[0-9]{9}$/.test(val) || '',
						]"
						hide-bottom-space
						class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
					>
						<template #prepend>
							<div class="text-black text-18">+63</div>
						</template>
					</q-input>
					<div
						:class="`q-mt-xl full-width flex ${
							$q.screen.width > 767 ? 'justify-end row q-gutter-x-md' : 'column reverse full-width'
						} `"
					>
						<q-btn
							dense
							flat
							no-caps
							label="Back"
							@click="toLogin"
							rounded
							:class="`q-px-xl ${$q.screen.width < 768 && 'border-radius-10 bg-grey-4 q-mt-sm'}`"
						/>
						<q-btn
							dense
							flat
							no-caps
							type="submit"
							label="Next"
							rounded
							:loading="validEmailRequest || btnLoadingState"
							:disable="validEmailRequest"
							:class="`text-white bg-violet-0 q-px-xl standard ${
								$q.screen.width < 768 && 'border-radius-10'
							}`"
						/>
					</div>
				</q-form>
			</div>
		</div>
	</transition>
</template>

<script src="./scripts/Registration.js"></script>

<style lang="scss" scoped>
@import './styles/Registration.scss';
</style>
