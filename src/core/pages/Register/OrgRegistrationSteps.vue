<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="core-registration flex justify-center column">
      <div class="form-container q-mx-auto flex justify-center items-center">
        <!-- FORM 1 -->
        <q-form
          v-if="addOrgRegForm === 1"
          @submit="addOrgRegForm = 2"
          :class="`${$q.screen.width < 768 && 'mobile-height'}`"
        >
          <div v-if="$q.screen.width > 767">
            <h1 class="text-28 text-semibold q-my-none text-center">
              Organization Account Registration
            </h1>
          </div>
          <div class="text-13 q-mr-lg text-center">Step 1 of 3</div>
          <div class="q-py-md"></div>

          <div class="text-24 q-mb-md">Organization Information</div>
          <div class="text-13">
            Now that your organization's identity has been verified, let's proceed with
            setting up your organization's account.
            <br /><br />Please provide the following information:
          </div>
          <!-- Organization Address -->
          <div class="required-field q-mt-lg">
            Organization Address<span class="text-negative q-pl-xs">*</span>
          </div>
          <q-input
            v-model="fullAddress"
            dense
            borderless
            readonly
            @click="addOrgRegForm = 4"
            placeholder="Enter organization address"
            :rules="[(val) => !!val || '']"
            hide-bottom-space
            class="q-px-md core-input-field standard border-accent-0 border-radius-10"
          >
            <template v-slot:append>
              <q-icon
                name="arrow_forward_ios"
                class="cursor-pointer text-grey"
                @click="addOrgRegForm = 4"
              />
            </template>
          </q-input>
          <br />
          <!-- Industry -->
          <div class="required-field">
            Industry<span class="text-negative q-pl-xs">*</span>
          </div>
          <q-select
            class="border-radius-10 border-accent-0 core-select-field standard q-mb-lg"
            dense
            borderless
            v-model="organizationForm.industry"
            :label="organizationForm.industry !== null ? '' : 'Select Industry'"
            map-options
            :options="optionsIndustry"
            :rules="[(val) => (val !== null && val !== '') || 'Industry is required']"
            hide-bottom-space
            popup-content-class="bg-white"
            options-selected-class="selected-class"
            transition-show="scale"
            transition-hide="scale"
          />
          <!-- Other relevant details -->
          <div class="required-field">Other relevant details</div>
          <q-input
            v-model="organizationForm.other_relevant_details"
            dense
            borderless
            placeholder="Enter any other relevant details"
            type="text"
            class="q-px-md core-input-field autogrow standard border-accent-0 border-radius-10 q-pr-md text-area"
          />
          <div class="q-py-md"></div>
          <div class="q-py-md"></div>
          <div
            :class="`${
              $q.screen.width > 767
                ? 'absolute-bottom-right q-gutter-x-md'
                : 'absolute-bottom column reverse q-gutter-y-sm'
            }`"
          >
            <q-btn
              dense
              flat
              no-caps
              @click="toOrgReg"
              label="Back"
              rounded
              :class="`q-px-xl ${$q.screen.width < 768 && 'bg-grey-4 border-radius-10'}`"
            />

            <q-btn
              dense
              flat
              no-caps
              rounded
              type="submit"
              label="Next"
              :class="`border-accent-0 text-white bg-violet-0 q-px-xl ${
                $q.screen.width < 768 && 'border-radius-10'
              }`"
            />
          </div>
        </q-form>

        <!-- FORM 2 -->
        <q-form
          v-if="addOrgRegForm === 2"
          :class="`full-width ${$q.screen.width < 768 && 'column mobile-height'}`"
          @submit="addOrgRegForm = 3"
        >
          <div v-if="$q.screen.width > 767">
            <h1 class="text-28 text-semibold q-my-none text-center">
              Organization Account Registration
            </h1>
          </div>
          <div class="text-13 text-center q-py-lg">Step 2 of 3</div>
          <div v-if="$q.screen.width > 767" class="text-24 q-mb-lg">Account Setup</div>
          <div>
            <div class="required-field">
              Username<span class="text-negative q-pl-xs">*</span>
            </div>
            <q-input
              dense
              borderless
              v-model="organizationForm.username"
              placeholder="Enter your desired username"
              :rules="[
                (val) => usernameRule || '',
                (val) => validUsername || 'Username is already registered',
              ]"
              debounce="2000"
              no-error-icon
              @update:model-value="updateUsername"
              bottom-slots
              input-class="core-input-field standard border-accent-0 border-radius-10 q-px-md"
            >
              <template #hint>
                <div v-if="!validUsername" class="text-negative">
                  Username is already registered
                </div>
              </template>
              <div class="absolute-right full-height items-center flex q-mr-md">
                <q-spinner
                  v-if="validateUsernameRequest"
                  color="grey-7"
                  size="sm"
                ></q-spinner>
                <q-icon
                  v-if="!usernameRule || !validUsername"
                  name="error"
                  class="text-negative"
                  size="sm"
                ></q-icon>
              </div>
            </q-input>
            <!-- <div> -->
            <div class="required-field q-mt-sm">
              Password<span class="text-negative q-pl-xs">*</span>
            </div>
            <q-input
              dense
              v-model="organizationForm.password"
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
            <div class="required-field">
              Confirm Password<span class="text-negative q-pl-xs">*</span>
            </div>
            <q-input
              dense
              v-model="organizationForm.confirm_password"
              borderless
              :type="isConfirmPwd ? 'password' : 'text'"
              placeholder="Confirm Password"
              :rules="[
                (val) => (val !== null && val !== '') || '',
                (val) => val === organizationForm.password || '',
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

            <p :class="`text-negative ${isConfirmPasswordValid && 'invisible'}`">
              Passwords do not match.
            </p>
          </div>

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
            :class="`q-mt-md ${
              $q.screen.width > 767
                ? 'flex justify-end q-gutter-x-md'
                : 'absolute-bottom column reverse q-gutter-y-sm'
            }`"
          >
            <q-btn
              dense
              flat
              no-caps
              @click="addOrgRegForm = 1"
              label="Back"
              rounded
              :class="`q-px-xl ${$q.screen.width < 768 && 'bg-grey-4 border-radius-10'}`"
            />
            <q-btn
              dense
              flat
              no-caps
              rounded
              :loading="validateUsernameRequest"
              type="submit"
              label="Next"
              :class="`border-accent-0 text-white bg-violet-0 q-px-xl ${
                $q.screen.width < 768 && 'border-radius-10'
              }`"
            />
          </div>
        </q-form>

        <!-- FORM 3 -->
        <q-form
          v-if="addOrgRegForm === 3"
          :class="`full-width ${$q.screen.width < 768 && 'flex column mobile-height'}`"
        >
          <div v-if="$q.screen.width > 767">
            <h1 class="text-28 text-semibold q-my-none text-center">
              Organization Account Registration
            </h1>
          </div>
          <div
            :class="`${
              $q.screen.width < 768 ? 'q-py-md' : 'q-py-lg'
            } text-13 text-center`"
          >
            Step 3 of 3
          </div>
          <div v-if="$q.screen.width > 767" class="text-24 q-mb-md">
            Terms & Agreements
          </div>
          <div class="text-15 q-my-md">Please review and agree to the following:</div>

          <div class="q-my-lg">
            <div class="text-14">Terms of Service</div>
            <q-checkbox dense v-model="termsOfService" color="violet-0">
              I have read and agreed to the
              <router-link
                to="terms-of-service"
                class="core-text-accent-0 text-decoration-none text-semibold"
              >
                Terms of Service
              </router-link>
            </q-checkbox>
            <div class="text-14 q-mt-md">Privacy Policy</div>
            <q-checkbox dense v-model="privacyPolicy" color="violet-0">
              I have read and agree to the
              <router-link
                to="data-privacy-policy"
                class="core-text-accent-0 text-decoration-none text-semibold"
              >
                Data Privacy Policy
              </router-link>
            </q-checkbox>
          </div>
          <div :class="`text-14 ${$q.screen.width < 768 ? 'q-my-md' : 'q-my-xl'} `">
            By checking the above boxes, you acknowledge that you have read and understood
            agree to comply with them. our Terms of Service and Privacy Policy, and you
          </div>

          <div
            :class="`${
              $q.screen.width > 767
                ? 'flex justify-end'
                : 'absolute-bottom column reverse q-gutter-y-sm'
            }`"
          >
            <q-btn
              dense
              flat
              no-caps
              @click="addOrgRegForm = 2"
              label="Back"
              rounded
              :class="`q-px-xl ${$q.screen.width < 768 && 'bg-grey-4 border-radius-10'}`"
            />
            <q-btn
              dense
              flat
              no-caps
              rounded
              label="Submit"
              @click="toOrgRegConfirm"
              :disable="!isSubmitButtonActive"
              :class="`${
                $q.screen.width < 768 && 'border-radius-10'
              } border-accent-0 text-white bg-violet-0 q-px-xl`"
            />
          </div>
        </q-form>
      </div>

      <!-- FORM 4 -->
      <q-form
        v-if="addOrgRegForm === 4"
        @submit="addOrgRegForm = 1"
        class="flex column justify-center items-center"
      >
        <h1
          v-if="$q.screen.width > 767"
          class="text-33 text-center text-semibold q-my-none"
        >
          Address Information
        </h1>

        <div
          :class="`${
            $q.screen.width > 767 ? 'row q-gutter-x-md' : 'column full-width'
          } flex justify-center`"
        >
          <!-- Primary Address -->
          <div class="q-ma-none">
            <div class="text-24 q-mb-md">Primary Address</div>
            <!-- Region -->
            <div class="q-mb-sm field-required">Region</div>
            <q-select
              class="border-radius-10 border-accent-0 core-select-field standard q-mb-md"
              dense
              borderless
              v-model="organizationForm.region"
              :label="organizationForm.region !== null ? '' : 'Select Region'"
              map-options
              option-label="regionName"
              :disable="!regionOptions.data"
              :options="regionOptions.data"
              :loading="regionOptions.loading"
              hide-bottom-space
              popup-content-class="bg-white"
              options-selected-class="selected-class"
              transition-show="scale"
              transition-hide="scale"
              :rules="[(val) => !!val || '']"
              @update:model-value="fetchProvinceState"
            />

            <!-- Province / State -->
            <div class="q-mb-sm field-required">Province/State</div>
            <q-select
              class="border-radius-10 border-accent-0 core-select-field standard q-mb-md"
              dense
              borderless
              v-model="organizationForm.province_state"
              :label="
                organizationForm.province_state !== null ? '' : 'Select Province/State'
              "
              map-options
              :options="provinceOptions.data"
              :loading="provinceOptions.loading"
              :disable="!provinceOptions.data"
              hide-bottom-space
              popup-content-class="bg-white"
              options-selected-class="selected-class"
              transition-show="scale"
              transition-hide="scale"
              :rules="[(val) => !!val || '']"
              @update:model-value="fetchCitiesMunicipalities"
            />

            <!-- Municipality / City -->
            <div class="q-mb-sm field-required">Municipality/City</div>
            <q-select
              class="border-radius-10 border-accent-0 core-select-field standard q-mb-md"
              dense
              borderless
              v-model="organizationForm.municipality_city"
              :label="
                organizationForm.municipality_city !== null
                  ? ''
                  : 'Select Municipality/City'
              "
              map-options
              :options="cityOptions.data"
              :loading="cityOptions.loading"
              :disable="!cityOptions.data"
              hide-bottom-space
              :rules="[(val) => !!val || '']"
              popup-content-class="bg-white"
              options-selected-class="selected-class"
              transition-show="scale"
              transition-hide="scale"
              @update:model-value="fetchBarangays"
            />

            <!-- Barangay / District -->
            <div class="q-mb-sm field-required">Barangay/District</div>
            <q-select
              class="border-radius-10 border-accent-0 core-select-field standard q-mb-md"
              dense
              borderless
              v-model="organizationForm.barangay_district"
              :label="
                organizationForm.barangay_district !== null
                  ? ''
                  : 'Select Barangay/District'
              "
              map-options
              :options="barangayOptions.data"
              :disable="!barangayOptions.data"
              :loading="barangayOptions.loading"
              :rules="[(val) => !!val || '']"
              hide-bottom-space
              popup-content-class="bg-white"
              options-selected-class="selected-class"
              transition-show="scale"
              transition-hide="scale"
              @update:model-value="setBarangay"
            />

            <!-- Postal / ZIP Code -->
            <div class="q-mb-sm field-required">Postal/ZIP Code</div>
            <q-input
              dense
              borderless
              type="text"
              maxlength="4"
              min="0"
              max="9999"
              mask="####"
              v-model="organizationForm.postal_zip_code"
              placeholder="Enter Postal or ZIP code"
              :rules="[
                (val) => /^[0-9]{4}$/.test(val) || '',
                (val) => (val !== null && val !== '') || '',
              ]"
              hide-bottom-space
              class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
            />
          </div>

          <!-- Detailed Address -->
          <div>
            <div class="text-24 q-mb-md">Detailed Address</div>
            <div class="q-mb-sm">Unit/Room/Floor Number (Optional)</div>
            <q-input
              dense
              borderless
              v-model="organizationForm.unit_room_floor_number"
              placeholder="Enter Unit/Room/Floor Number"
              hide-bottom-space
              class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
            />

            <div class="q-mb-sm">Building Name (Optional)</div>
            <q-input
              dense
              v-model="organizationForm.building_name"
              borderless
              placeholder="Enter the name of your building"
              hide-bottom-space
              class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
            />

            <div class="q-mb-sm">Lot/Block/Phase/House Number</div>
            <q-input
              dense
              v-model="organizationForm.lot_block_phase_house_name"
              borderless
              placeholder="Enter your Lot,Block,Phase, or House Number"
              hide-bottom-space
              class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
            />

            <div class="q-mb-sm">Street Name</div>
            <q-input
              dense
              borderless
              v-model="organizationForm.street_name"
              placeholder="Enter your Street Name"
              hide-bottom-space
              class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-md"
            />

            <div class="q-mb-sm">Subdivision/Residence Complex (Optional)</div>
            <q-input
              dense
              v-model="organizationForm.subdivision_residence_complex"
              borderless
              placeholder="Enter your Subdivision or Complex"
              hide-bottom-space
              class="q-px-md core-input-field standard border-accent-0 border-radius-10 q-mb-xl"
            />
          </div>

          <div
            :class="`flex justify-center full-width ${
              $q.screen.width < 768 ? 'column reverse q-gutter-y-sm' : 'q-gutter-x-md'
            }`"
          >
            <q-btn
              dense
              flat
              no-caps
              @click="
                () => {
                  resetAddress();
                  addOrgRegForm = 1;
                }
              "
              label="Back"
              rounded
              :class="`q-px-xl ${$q.screen.width < 768 && 'bg-grey-4 border-radius-10'}`"
            />
            <q-btn
              dense
              flat
              no-caps
              rounded
              type="submit"
              label="Done"
              :class="`${
                $q.screen.width < 768 && 'border-radius-10'
              } border-accent-0 text-white bg-violet-0 q-px-xl`"
            />
          </div>
        </div>
      </q-form>
    </div>
  </transition>
</template>

<script src="./scripts/OrgRegistrationSteps.js"></script>

<style lang="scss" scoped>
@import "./styles/Registration.scss";
</style>
