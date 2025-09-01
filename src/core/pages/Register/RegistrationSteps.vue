<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="core-registration">
			<div class="form-container q-mx-auto">
				<!-- FORM 1 -->
				<q-form v-if="addRegForm === 1" @submit="addRegForm = 2">
					<h1 v-if="$q.screen.width > 767" class="text-28 text-semibold q-my-none text-center">
						Personal Account Registration
					</h1>

					<div class="text-center q-py-md">Step 1 of 3</div>
					<div v-if="$q.screen.width > 767" class="text-24">Personal Information</div>
					<div class="text-13">
						Now that your identity has been verified, let's proceed with setting up your account.
						<br /><br />Please provide the following information:
					</div>

					<div class="required-field q-mt-md">Date of Birth<span class="text-negative q-pl-xs">*</span></div>
					<q-input
						dense
						readonly
						borderless
						v-model="personalForm.birthdate"
						:rules="[(val) => !!val || '']"
						placeholder="DD/MM/YYYY"
						hide-bottom-space
						lazy-rules
						mask="####-##-##"
						class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-lg"
					>
						<template v-slot:append>
							<q-icon
								name="event"
								class="cursor-pointer text-grey"
								@click="$q.screen.width < 768 && (calendarDialogRef = true)"
							>
								<q-popup-proxy
									v-if="$q.screen.width > 767"
									ref="qDateProxy"
									transition-show="scale"
									transition-hide="scale"
								>
									<q-date
										minimal
										v-model="personalForm.birthdate"
										@update:model-value="() => $refs.qDateProxy.hide()"
										mask="YYYY-MM-DD"
										color="amber-6"
										text-color="accent-1"
									/>
								</q-popup-proxy>
							</q-icon>
						</template>
					</q-input>
					<div class="text-13 field-required">Address</div>
					<q-input
						v-model="fullAddress"
						readonly
						dense
						borderless
						placeholder="Enter Address"
						:rules="[(val) => (val !== null && val.trim() !== '') || '']"
						hide-bottom-space
						@click="addRegForm = 4"
						class="q-px-md standard border-accent-0 border-radius-10 q-mb-lg"
					>
						<template v-slot:append>
							<q-icon name="arrow_forward_ios" class="cursor-pointer text-grey" @click="addRegForm = 4" />
						</template>
					</q-input>

					<div class="text-13 field-required">Gender</div>
					<q-select
						class="border-radius-10 border-accent-0 core-select-field standard q-mb-lg"
						dense
						borderless
						v-model="personalForm.gender"
						:label="personalForm.gender !== null ? '' : 'Select Gender'"
						emit-value
						map-options
						:options="optionsGender"
						:rules="[(val) => (val !== null && val !== '') || '']"
						hide-bottom-space
						popup-content-class="bg-white"
						options-selected-class="selected-class"
						behavior="default"
						transition-show="scale"
						transition-hide="scale"
					/>

					<div class="text-15 field-required">Status</div>
					<q-select
						class="border-radius-10 border-accent-0 core-select-field standard q-mb-lg"
						dense
						borderless
						v-model="personalForm.special_status"
						:label="personalForm.special_status !== null ? '' : 'Select Special Status (e.g., PWD) '"
						emit-value
						map-options
						:options="optionStatus"
						hide-bottom-space
						popup-content-class="bg-white"
						options-selected-class="selected-class"
						transition-show="scale"
						transition-hide="scale"
						:rules="[(val) => val !== null]"
						@update:model-value="updateSpecialStatus"
					/>
					<div
						class="IdDetails"
						v-if="personalForm.special_status !== null && personalForm.special_status > 0"
					>
						<div class="text-15 field-required">ID Number</div>
						<q-input
							ref="idNumberInput"
							v-model="personalForm.id_number"
							dense
							borderless
							mask="####################################"
							:placeholder="
								personalForm.special_status === 'pwd'
									? 'Enter PWD ID number'
									: personalForm.special_status === 'SC'
									? 'Enter senior citizen ID number'
									: personalForm.special_status === 'others'
									? 'Enter any supporting proof or relevant details'
									: ''
							"
							:rules="[(val) => (val !== null && val.length) || '']"
							hide-bottom-space
							class="core-input-field standard q-px-md border-accent-0 border-radius-10 q-mb-lg"
						/>
					</div>
					<div
						:class="`flex ${
							$q.screen.width > 767 ? 'justify-end q-gutter-x-md' : 'column reverse full-width'
						}`"
					>
						<q-btn
							rounded
							dense
							flat
							no-caps
							label="Back"
							@click="$router.push('core-registration')"
							:class="`q-px-xl ${$q.screen.width < 768 && 'border-radius-10 bg-grey-4 q-mt-sm'}`"
						/>

						<q-btn
							flat
							dense
							no-caps
							label="Next"
							type="submit"
							rounded
							:class="`text-white bg-violet-0 q-px-xl ${$q.screen.width < 768 && 'border-radius-10'}`"
						/>
					</div>
				</q-form>

				<!-- FORM 2 -->
				<q-form
					v-if="addRegForm === 2"
					@submit="addRegForm = 3"
					:style="`${$q.screen.width < 768 && 'height: calc(100vh - 130px)'}`"
				>
					<h1 v-if="$q.screen.width > 767" class="text-28 text-semibold q-my-none text-center">
						Personal Account Registration
					</h1>

					<div class="text-center q-mb-lg">Step 2 of 3</div>
					<div v-if="$q.screen.width > 767" class="text-24 q-mb-lg">Account Setup</div>

					<div class="required-field">Username<span class="text-negative q-pl-xs">*</span></div>
					<q-input
						dense
						v-model="personalForm.username"
						borderless
						placeholder="Enter your desired username"
						:rules="[
							(val) => usernameRule || '',
							(val) => validUsername || 'Username is already registered',
							(val) => /^[a-zA-Z0-9]+$/.test(val) || 'No special characters allowed',
						]"
						maxlength="30"
						debounce="2000"
						no-error-icon
						@update:model-value="updateUsername"
						bottom-slots
						input-class="core-input-field standard border-accent-0 border-radius-10 q-px-md"
					>
						<template #hint>
							<div v-if="!validUsername" class="text-negative">Username is already registered</div>
						</template>
						<div class="absolute-right full-height items-center flex q-mr-md">
							<q-spinner v-if="validateUsernameRequest" color="grey-7" size="sm"></q-spinner>
							<q-icon
								v-if="!usernameRule || !validUsername"
								name="error"
								class="text-negative"
								size="sm"
							></q-icon>
						</div>
					</q-input>

					<div class="required-field q-mt-sm">Password<span class="text-negative q-pl-xs">*</span></div>
					<q-input
						dense
						v-model="personalForm.password"
						borderless
						:type="isPwd ? 'password' : 'text'"
						placeholder="Enter Password"
						:rules="[(val) => (val !== null && val !== '') || '']"
						hide-bottom-space
						class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-lg"
					>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer q-mb-none"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input>

					<div class="required-field">Confirm Password<span class="text-negative q-pl-xs">*</span></div>
					<q-input
						dense
						v-model="personalForm.confirm_password"
						borderless
						:type="isConfirmPwd ? 'password' : 'text'"
						placeholder="Confirm Password"
						:rules="[
							(val) => (val !== null && val !== '') || '',
							(val) => isConfirmPasswordValid == true || '',
						]"
						hide-bottom-space
						class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-lg"
					>
						<template v-slot:append>
							<q-icon
								:name="isConfirmPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer q-mb-none"
								@click="isConfirmPwd = !isConfirmPwd"
							/>
						</template>
					</q-input>

					<p :class="`text-negative ${isConfirmPasswordValid && 'invisible'}`">Passwords do not match.</p>

					<!-- <div class="column q-gutter-y-sm">
            <div>Create a strong password:</div>
            <q-checkbox
              v-for="(item, index) in passwordStrengthValidation"
              :key="index"
              v-model="item.model"
              :label="item.label"
              dense
              disable
            ></q-checkbox>
          </div> -->

					<div
						:class="`flex q-mt-xl ${
							$q.screen.width > 767
								? 'justify-end q-gutter-x-md'
								: 'absolute-bottom column reverse full-width'
						}`"
					>
						<q-btn
							flat
							dense
							rounded
							no-caps
							label="Back"
							@click="addRegForm = 1"
							:class="`q-px-xl ${$q.screen.width < 768 && 'border-radius-10 bg-grey-4 q-mt-sm'}`"
						/>

						<!-- Disable the Next button if any required field is empty or passwords don't match -->
						<q-btn
							dense
							flat
							no-caps
							label="Next"
							type="submit"
							rounded
							:loading="validateUsernameRequest"
							:class="`border-accent-0 text-white bg-violet-0 q-px-xl ${
								$q.screen.width < 768 && 'border-radius-10'
							}`"
						/>
					</div>
				</q-form>

				<!-- FORM 3 | Last Form -->
				<q-form v-if="addRegForm === 3" :style="`${$q.screen.width < 768 && 'height: calc(100vh - 130px)'}`">
					<h1 v-if="$q.screen.width > 767" class="text-28 text-semibold q-my-none text-center">
						Personal Account Registration
					</h1>
					<div :class="`text-13 text-center ${$q.screen.width < 768 && 'q-my-md'}`">Step 3 of 3</div>
					<div v-if="$q.screen.width > 767" class="text-24 q-my-lg">Terms & Agreements</div>
					<div class="text-15 q-my-md">Please review and agree to the following:</div>
					<div class="text-14 q-mt-md">Terms of Service</div>
					<div class="flex justify-start items-center align-center q-mt-sm q-mb-md">
						<q-checkbox v-model="termsOfService" color="violet-0" dense class="q-mr-xs">
							I have read and agree to the
							<router-link
								to="/terms-of-service"
								class="core-text-accent-0 text-decoration-none text-semibold"
							>
								Terms of Service
							</router-link>
						</q-checkbox>
					</div>
					<div class="text-14 q-mt-lg">Privacy Policy</div>
					<div class="flex justify-start items-center align-center q-mt-sm q-mb-lg">
						<q-checkbox v-model="privacyPolicy" color="violet-0" dense>
							I have read and agree to the
							<router-link
								to="/data-privacy-policy"
								class="core-text-accent-0 text-decoration-none text-semibold"
							>
								Data Privacy Policy
							</router-link>
						</q-checkbox>
					</div>
					<div class="text-14 q-mt-lg">
						By checking the above boxes, you acknowledge that you have read and understood our Terms of
						Service and Privacy Policy, and you agree to comply with them.
					</div>
					<div
						:class="`flex q-mt-xl ${
							$q.screen.width > 767 ? 'justify-end q-gutter-x-md' : 'column reverse absolute-bottom'
						}`"
					>
						<q-btn
							flat
							dense
							no-caps
							rounded
							label="Back"
							@click="addRegForm = 2"
							:class="`q-px-xl ${$q.screen.width < 768 && 'border-radius-10 bg-grey-4 q-mt-sm'}`"
						/>
						<q-btn
							dense
							flat
							no-caps
							rounded
							:loading="btnLoading"
							label="Submit"
							@click="toRegConfirm"
							:disable="!isSubmitButtonActive"
							:class="`border-accent-0 text-white bg-violet-0 q-px-xl ${
								$q.screen.width < 768 && 'border-radius-10'
							}`"
						/>
					</div>
				</q-form>
			</div>

			<!-- FORM 4 | Address Form -->
			<q-form v-if="addRegForm === 4" @submit="addRegForm = 1" class="flex column justify-center items-center">
				<h1
					v-if="$q.screen.width > 767"
					:class="`${
						$q.screen.width > 767 ? 'q-my-lg' : 'q-pa-none q-ma-none'
					} text-33 text-semibold text-center `"
				>
					Address Information
				</h1>

				<div
					:class="`${$q.screen.width > 767 ? 'row q-gutter-x-md' : 'column full-width'} flex justify-center`"
				>
					<div>
						<div class="text-24 q-mb-lg">Primary Address</div>
						<div class="q-ma-none">
							<div class="q-mb-sm field-required">Region</div>
							<q-select
								class="border-radius-10 border-accent-0 core-select-field standard q-mb-md"
								dense
								borderless
								v-model="personalForm.region"
								:label="personalForm.region !== null ? '' : 'Select Region'"
								map-options
								:options="regionOptions.data"
								:disable="!regionOptions.data"
								:loading="regionOptions.loading"
								hide-bottom-space
								option-label="regionName"
								popup-content-class="bg-white"
								options-selected-class="selected-class"
								transition-show="scale"
								transition-hide="scale"
								:rules="[(val) => !!val || '']"
								@update:model-value="fetchProvinceState"
							/>
							<div class="q-mb-sm field-required">Province/State</div>
							<q-select
								class="border-radius-10 border-accent-0 core-select-field standard q-mb-md"
								dense
								borderless
								v-model="personalForm.province_state"
								:label="personalForm.province_state !== null ? '' : 'Select Province/State'"
								map-options
								:options="provinceOptions.data"
								:disable="!provinceOptions.data"
								:loading="provinceOptions.loading"
								:rules="[(val) => !!val || '']"
								hide-bottom-space
								popup-content-class="bg-white"
								options-selected-class="selected-class"
								transition-show="scale"
								transition-hide="scale"
								@update:model-value="fetchCitiesMunicipalities"
							/>
							<div class="q-mb-sm field-required">Municipality/City</div>
							<q-select
								class="border-radius-10 border-accent-0 core-select-field standard q-mb-md"
								dense
								borderless
								v-model="personalForm.municipality_city"
								:rules="[(val) => !!val || '']"
								:label="personalForm.municipality_city !== null ? '' : 'Select Municipality/City'"
								map-options
								:options="cityOptions.data"
								:disable="!cityOptions.data"
								:loading="cityOptions.loading"
								hide-bottom-space
								popup-content-class="bg-white"
								options-selected-class="selected-class"
								ransition-show="scale"
								transition-hide="scale"
								@update:model-value="fetchBarangays"
							/>
							<div class="q-mb-sm field-required">Barangay/District</div>
							<q-select
								class="border-radius-10 border-accent-0 core-select-field standard q-mb-md"
								dense
								:rules="[(val) => !!val || '']"
								borderless
								v-model="personalForm.barangay_district"
								:label="personalForm.barangay_district !== null ? '' : 'Select Barangay/District'"
								map-options
								:options="barangayOptions.data"
								:disable="!barangayOptions.data"
								:loading="barangayOptions.loading"
								hide-bottom-space
								popup-content-class="bg-white"
								options-selected-class="selected-class"
								transition-show="scale"
								transition-hide="scale"
								@update:model-value="setBarangay"
							/>
							<div class="q-mb-sm field-required">Postal/ZIP Code</div>
							<q-input
								dense
								borderless
								type="text"
								maxlength="4"
								min="0"
								max="9999"
								mask="####"
								v-model="personalForm.postal_zip_code"
								placeholder="Enter Postal or ZIP code"
								:rules="[
									(val) => /^[0-9]{4}$/.test(val) || '',
									(val) => (val !== null && val !== '') || '',
								]"
								hide-bottom-space
								class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
							/>
						</div>
					</div>

					<div>
						<div class="text-24 q-mb-lg">Detailed Location</div>
						<div class="required-field q-mb-sm">Unit/Room/Floor Number (Optional)</div>
						<q-input
							dense
							borderless
							v-model="personalForm.unit_room_floor_number"
							placeholder="Enter your unit, room, or floor number"
							hide-bottom-space
							class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
						/>

						<div class="required-field q-mb-sm">Building Name (Optional)</div>
						<q-input
							dense
							v-model="personalForm.building_name"
							borderless
							placeholder="Enter the name of your building"
							hide-bottom-space
							class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
						/>

						<div class="q-mb-sm">Lot/Block/Phase/House Number</div>
						<q-input
							dense
							v-model="personalForm.log_block_phase_house_number"
							borderless
							placeholder="Enter your lot, block, phase, or house number"
							hide-bottom-space
							class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
						/>

						<div class="q-mb-sm">Street Name</div>
						<q-input
							dense
							borderless
							v-model="personalForm.street_name"
							placeholder="Enter your street name"
							hide-bottom-space
							class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
						/>

						<div class="q-mb-sm">Subdivision/Residence Complex (Optional)</div>
						<q-input
							dense
							v-model="personalForm.subdivision_residence_complex"
							borderless
							placeholder="Enter your subdivision or residence complex"
							hide-bottom-space
							class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-xl"
						/>
					</div>
				</div>

				<div
					:class="`flex q-mt-xl ${
						$q.screen.width > 767 ? 'justify-center q-gutter-x-md' : 'column reverse full-width'
					}`"
				>
					<q-btn
						dense
						flat
						no-caps
						label="Back"
						@click="
							() => {
								resetAddress();
								addRegForm = 1;
							}
						"
						rounded
						:class="`q-px-xl ${$q.screen.width < 768 && 'q-mt-sm border-radius-10 bg-grey-4'}`"
					/>
					<q-btn
						dense
						flat
						no-caps
						label="Next"
						type="submit"
						:disable="!personalForm.postal_zip_code"
						:class="`q-px-md text-white bg-violet-0 q-px-xl ${
							$q.screen.width > 767 ? 'border-radius-15' : 'border-radius-10'
						}`"
					/>
				</div>
			</q-form>
			<mobile-calendar-dialog
				:modelValue="calendarDialogRef"
				:onSubmit="selectDateDialog"
				:onClose="() => (calendarDialogRef = false)"
			/>
		</div>
	</transition>
</template>

<script src="./scripts/RegistrationSteps.js"></script>

<style lang="scss" scoped>
@import './styles/Registration.scss';
</style>
