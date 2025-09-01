<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="core-forgot-password">
      <div :class="`form-container q-mx-auto fixed-center ${$q.screen.width < 768 && 'q-pa-lg'}`"
      >
        <q-form
          @submit="submitPassword()"
        >
        <!-- :style="`${$q.screen.width < 768 && 'height: calc(100vh - 130px)'}`" -->
          <h1
            class="text-28 text-semibold q-my-none text-center"
          >
            Reset Password
          </h1>

          <!-- <div class="text-24 q-mb-lg">Reset Password</div> -->


          <div class="required-field q-mt-sm">
            New Password<span class="text-negative q-pl-xs">*</span>
          </div>
          <q-input
            dense
            v-model="newPassword"
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
            v-model="confirmPassword"
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

          <p :class="`text-negative ${isConfirmPasswordValid && 'invisible'}`">
            Passwords do not match.
          </p>

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
            class="flex q-mt-lg justify-center q-gutter-x-md"
          >
            <!-- Disable the Next button if any required field is empty or passwords don't match -->
            <q-btn
              dense
              flat
              no-caps
              label="Continue"
              type="submit"
              rounded
              :loading="btnLoading"
              :class="`border-accent-0 text-white bg-violet-0 q-px-xl ${
                $q.screen.width < 768 && 'border-radius-10'
              }`"
            />
          </div>
        </q-form>

        <div class="text-center text-20 q-mt-sm">
						Don't have an account?<span
							@click="goToRegister()"
							class="text-accent-8 q-pl-xs register cursor-pointer"
							>Register</span
						>
					</div>
      </div>


    </div>
  </transition>
</template>

<script src="./scripts/ForgotPasswordForm.js"></script>

<style lang="scss" scoped>
@import "./styles/ForgotPassword.scss";
</style>
