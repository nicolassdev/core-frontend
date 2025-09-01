<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="core-registration">
      <div class="form-container q-mx-auto">
        <div v-if="$q.screen.width > 767">
          <h1 class="text-28 text-semibold q-my-none text-center">
            Organization Account Registration
          </h1>
        </div>
        <div class="text-13">
          Before you can proceed with the organization registration, we need to verify
          your identity. <br /><br />Please provide the following information
        </div>

        <q-form @submit="onSubmit">
          <!-- Organization Name -->
          <div class="text-13 q-mt-xl required-field">
            Organization Name<span class="text-negative q-pl-xs">*</span>
          </div>
          <q-input
            v-model="organizationForm.organization_name"
            dense
            borderless
            placeholder="Enter organization name"
            :rules="[(val) => (val !== null && val !== '') || '']"
            hide-bottom-space
            class="q-px-md core-input-field standard border-accent-0 border-radius-10"
          />
          <!-- Email Address -->
          <div class="text-13 q-mt-lg required-field">Email Address (Optional)</div>
          <q-input
            v-model="organizationForm.email_address"
            dense
            borderless
            placeholder="Enter email address"
            no-error-icon
            @update:model-value="updateEmailValue"
            :rules="[
              (val) => emailRules || 'Enter a valid email',
              (val) => validEmail || 'Email is already registered',
            ]"
            debounce="2000"
            @input="emailRules && (validEmailRequest = true)"
            bottom-slots
            input-class="core-input-field standard border-accent-0 border-radius-10 q-px-sm"
          >
            <template #hint>
              <div v-if="!validEmail" class="text-negative">
                Email is already registered
              </div>
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
          <!-- Contact Person's Name -->
          <div class="text-13 q-mt-sm required-field">
            Contact Person's Name<span class="text-negative q-pl-xs">*</span>
          </div>
          <q-input
            v-model="organizationForm.contact_persons_name"
            dense
            borderless
            placeholder="Enter contact person's name"
            :rules="[(val) => (val !== null && val !== '') || '']"
            hide-bottom-space
            class="q-px-md core-input-field standard border-accent-0 border-radius-10"
          />
          <!-- Contact Number -->
          <div class="text-13 q-mt-lg required-field">
            Contact Number <span class="text-negative q-pl-xs">*</span>
          </div>
          <q-input
            v-model="organizationForm.contact_number"
            unmasked-value
            dense
            mask="###-####-###"
            borderless
            placeholder="Enter Contact Number"
            :rules="[
              (val) => (!!val && String(val).trim() !== '') || '',
              (val) => /^9[0-9]{9}$/.test(val) || '',
            ]"
            hide-bottom-space
            class="q-px-md core-input-field standard border-accent-0 border-radius-10"
          >
            <template #prepend>
              <div class="text-black text-18">+63</div>
            </template>
          </q-input>
          <div class="text-13 q-mt-lg">Verification code will be sent via SMS</div>

          <div
            :class="`q-mt-xl ${
              $q.screen.width > 767
                ? 'flex justify-end q-gutter-x-md'
                : 'column reverse q-gutter-y-sm'
            } `"
          >
            <q-btn
              dense
              flat
              no-caps
              @click="toLogin"
              label="Back"
              rounded
              :class="`q-px-xl standard ${
                $q.screen.width < 768 && 'bg-grey-4 border-radius-10'
              }`"
            />
            <q-btn
              dense
              flat
              no-caps
              rounded
              :loading="validEmailRequest"
              type="submit"
              label="Next"
              :class="`${
                $q.screen.width < 768 && 'border-radius-10'
              } border-accent-0 text-white bg-violet-0 q-px-xl standard`"
            />
          </div>
        </q-form>
      </div>
    </div>
  </transition>
</template>

<script src="./scripts/OrgRegistration.js"></script>

<style lang="scss" scoped>
@import "./styles/Registration.scss";
</style>
